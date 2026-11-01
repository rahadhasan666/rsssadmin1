import React, { useState, useEffect, useRef } from 'react';
import { emailTemplates, renderTemplateHtml, dispatchEmailBroadcast } from '../../services/emailService';

export default function EmailTab({ users = [], onShowToast }) {
  const [recipientSelect, setRecipientSelect] = useState('ALL');
  const [templateKey, setTemplateKey] = useState('top_donor');
  const [subject, setSubject] = useState(emailTemplates.top_donor.subject);
  const [htmlBody, setHtmlBody] = useState(emailTemplates.top_donor.html);
  const [provider, setProvider] = useState('google_script');
  const [showEditor, setShowEditor] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Provider configuration state
  const [config, setConfig] = useState({
    googleScriptUrl: '',
    smtpSenderEmail: 'academycybercraft@gmail.com',
    smtpAppPassword: 'aham tdqz hnhk hrkw',
    emailjsPublicKey: '',
    emailjsServiceId: '',
    emailjsTemplateId: '',
    brevoApiKey: ''
  });

  const previewFrameRef = useRef(null);

  // When template changes, update subject and html body
  const handleTemplateChange = (key) => {
    setTemplateKey(key);
    const tpl = emailTemplates[key] || emailTemplates.custom;
    setSubject(tpl.subject);
    setHtmlBody(tpl.html);
  };

  // Update preview whenever htmlBody or recipient changes
  useEffect(() => {
    const frame = previewFrameRef.current;
    if (!frame) return;

    const selectedUser = recipientSelect !== 'ALL' ? users.find((u) => u.id === recipientSelect) : null;
    const compiled = renderTemplateHtml(htmlBody, selectedUser);

    const doc = frame.contentDocument || frame.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(compiled);
      doc.close();
    }
  }, [htmlBody, recipientSelect, users]);

  const handleSendBroadcast = async () => {
    if (!recipientSelect) {
      onShowToast("Please choose a target recipient or 'All Registered Donors'", "error");
      return;
    }

    let recipients = [];
    if (recipientSelect === 'ALL') {
      recipients = users.filter((u) => u.email && u.email.includes('@'));
    } else {
      const u = users.find((item) => item.id === recipientSelect);
      if (u && u.email) recipients = [u];
    }

    if (recipients.length === 0) {
      onShowToast("No valid recipient email address found!", "error");
      return;
    }

    setIsSending(true);
    onShowToast(`Initiating email broadcast to ${recipients.length} recipient(s)...`, "success");

    try {
      const result = await dispatchEmailBroadcast({
        recipients,
        rawSubject: subject,
        htmlBody,
        provider,
        config
      });

      if (result.successCount > 0) {
        onShowToast(`Successfully sent ${result.successCount} / ${recipients.length} Email(s)!`, "success");
      } else {
        alert("Email Sending Failed!\nReason: " + result.lastErrorMessage + "\n\nTip: Browser blocked direct SMTP request. Use Google Apps Script or Brevo API for guaranteed CORS-free delivery.");
        onShowToast("Email failed: " + result.lastErrorMessage, "error");
      }
    } catch (err) {
      onShowToast("Broadcast error: " + err.message, "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5 glossy-panel p-6 sm:p-7 rounded-3xl shadow-xl">
          <div className="specular-line" />
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center">
            <i className="fa-solid fa-paper-plane text-rose-500 mr-2.5" />
            Compose & Broadcast Email
          </h3>

          {/* Recipient Selection */}
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1 font-mono">
              Target Recipient:
            </label>
            <select
              value={recipientSelect}
              onChange={(e) => setRecipientSelect(e.target.value)}
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/40"
            >
              <option value="ALL">📢 ALL REGISTERED DONORS ({users.length})</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name || 'Unnamed'} ({u.bloodGroup || 'N/A'}) - {u.email || 'No Email'}
                </option>
              ))}
            </select>
          </div>

          {/* Template Selector */}
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1 font-mono">
              Select Email Template:
            </label>
            <select
              value={templateKey}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/40"
            >
              {Object.entries(emailTemplates).map(([key, tpl]) => (
                <option key={key} value={key}>
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Subject */}
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1 font-mono">
              Email Subject:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/40"
            />
          </div>

          {/* Email Service Provider Settings */}
          <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold text-zinc-700 dark:text-zinc-300">
              <span>
                <i className="fa-solid fa-server text-rose-500 mr-1.5" /> Email Service Provider:
              </span>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs focus:ring-2 focus:ring-rose-500/40"
              >
                <option value="google_script">⚡ Google Apps Script (100% Free & CORS Free)</option>
                <option value="smtpjs">SmtpJS / Gmail SMTP</option>
                <option value="emailjs">EmailJS REST API</option>
                <option value="brevo">Brevo (Sendinblue) API</option>
              </select>
            </div>

            {/* Google Apps Script Panel */}
            {provider === 'google_script' && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">
                    Google Apps Script Web App URL:
                  </label>
                  <input
                    type="url"
                    value={config.googleScriptUrl}
                    onChange={(e) => setConfig({ ...config, googleScriptUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/xxxx/exec"
                    className="w-full px-2.5 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono focus:ring-2 focus:ring-rose-500/40"
                  />
                </div>
                <div className="bg-rose-500/5 dark:bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <div className="flex items-center justify-between font-bold text-rose-600 dark:text-rose-400 mb-1">
                    <span>💡 1-Minute Unlimited Setup (No CORS Errors):</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "function doPost(e){ var d=JSON.parse(e.postData.contents); GmailApp.sendEmail(d.to, d.subject, '', {htmlBody:d.html, name:'RSSS Official'}); return ContentService.createTextOutput('OK'); }"
                        );
                        onShowToast("Script code copied to clipboard!", "success");
                      }}
                      className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 hover:bg-rose-500/30 text-rose-600 dark:text-rose-300 cursor-pointer"
                    >
                      Copy Code
                    </button>
                  </div>
                  1. Open <a href="https://script.google.com" target="_blank" rel="noreferrer" className="underline font-bold text-rose-500">script.google.com</a> &rarr; <em>New Project</em>.<br />
                  2. Paste:<br />
                  <code className="bg-white dark:bg-zinc-900 p-1.5 rounded border border-zinc-200 dark:border-zinc-800 text-[10px] block my-1 font-mono text-zinc-800 dark:text-emerald-400">
                    function doPost(e){`{ var d=JSON.parse(e.postData.contents); GmailApp.sendEmail(d.to, d.subject, '', {htmlBody:d.html, name:'RSSS Official'}); return ContentService.createTextOutput('OK'); }`}
                  </code>
                  3. Click <strong>Deploy &rarr; New deployment &rarr; Web App</strong>, set <em>Who has access</em> to <strong>"Anyone"</strong>, then copy URL here!
                </div>
              </div>
            )}

            {/* SmtpJS Settings */}
            {provider === 'smtpjs' && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Sender Email:</label>
                    <input
                      type="email"
                      value={config.smtpSenderEmail}
                      onChange={(e) => setConfig({ ...config, smtpSenderEmail: e.target.value })}
                      className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Gmail App Password:</label>
                    <input
                      type="password"
                      value={config.smtpAppPassword}
                      onChange={(e) => setConfig({ ...config, smtpAppPassword: e.target.value })}
                      className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400">Uses configured Gmail App Password (`ahamtdqzhnhkhrkw`).</p>
              </div>
            )}

            {/* EmailJS Settings */}
            {provider === 'emailjs' && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Public Key:</label>
                    <input
                      type="text"
                      placeholder="user_xxxx"
                      value={config.emailjsPublicKey}
                      onChange={(e) => setConfig({ ...config, emailjsPublicKey: e.target.value })}
                      className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Service ID:</label>
                    <input
                      type="text"
                      placeholder="service_xxxx"
                      value={config.emailjsServiceId}
                      onChange={(e) => setConfig({ ...config, emailjsServiceId: e.target.value })}
                      className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Template ID:</label>
                    <input
                      type="text"
                      placeholder="template_xxxx"
                      value={config.emailjsTemplateId}
                      onChange={(e) => setConfig({ ...config, emailjsTemplateId: e.target.value })}
                      className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Brevo Settings */}
            {provider === 'brevo' && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Brevo API Key (xkeysib-...):</label>
                  <input
                    type="password"
                    placeholder="xkeysib-xxxx"
                    value={config.brevoApiKey}
                    onChange={(e) => setConfig({ ...config, brevoApiKey: e.target.value })}
                    className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSendBroadcast}
            disabled={isSending}
            className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-xl shadow-rose-950/30 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-75"
          >
            {isSending ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm" />
                <span>Broadcasting Email...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane" />
                <span>Send HTML Email Broadcast</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Live Viewport & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center glossy-panel p-4 rounded-2xl shadow-md">
            <div className="specular-line" />
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <h4 className="font-extrabold text-xs text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
                Live HTML Email Render Viewport
              </h4>
            </div>

            <button
              onClick={() => setShowEditor(!showEditor)}
              className="text-xs font-bold px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] rounded-xl text-zinc-700 dark:text-zinc-300 transition flex items-center space-x-1 cursor-pointer"
            >
              <i className="fa-solid fa-code text-[10px]" />
              <span>{showEditor ? 'Hide Code' : 'Edit HTML Code'}</span>
            </button>
          </div>

          {/* Raw HTML Editor */}
          {showEditor && (
            <div className="glossy-panel p-4 rounded-2xl shadow-md">
              <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-2 font-mono">
                Edit Raw HTML Code:
              </label>
              <textarea
                rows={12}
                value={htmlBody}
                onChange={(e) => setHtmlBody(e.target.value)}
                className="w-full p-3 font-mono text-xs border border-white/[0.08] rounded-xl focus:ring-2 focus:ring-rose-500/40 bg-zinc-950/80 text-emerald-400 leading-relaxed"
              />
            </div>
          )}

          {/* Live Preview Frame Container */}
          <div className="glossy-panel p-2 rounded-3xl shadow-xl overflow-hidden min-h-[520px]">
            <iframe
              ref={previewFrameRef}
              title="Email Preview"
              className="w-full h-[520px] border-0 rounded-2xl bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


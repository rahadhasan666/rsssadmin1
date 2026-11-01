import React, { useState, useRef, useEffect } from 'react';
import { downloadCertificatePDF } from '../../services/pdfService';

export default function CertificateTab({ users = [], onShowToast }) {
  const [donorSearch, setDonorSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [donationCount, setDonationCount] = useState(4);
  const [awardTitle, setAwardTitle] = useState('Certificate of Appreciation');
  const [zoomScale, setZoomScale] = useState(0.85);
  const [isGenerating, setIsGenerating] = useState(false);

  const offscreenRef = useRef(null);

  // Auto-select first donor when users load if none selected
  useEffect(() => {
    if (!selectedUserId && users.length > 0) {
      setSelectedUserId(users[0].id);
      setDonationCount(users[0].totalDonations || 4);
    }
  }, [users, selectedUserId]);

  const filteredDonors = users.filter((u) => {
    const q = donorSearch.toLowerCase().trim();
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q) ||
      (u.bloodGroup || '').toLowerCase().includes(q) ||
      (u.address || '').toLowerCase().includes(q)
    );
  });

  const selectedUser = users.find((u) => u.id === selectedUserId) || users[0] || {
    name: 'Rahad Hasan',
    bloodGroup: 'O+',
    address: 'Panchbibi, Joypurhat',
    totalDonations: 4
  };

  const handleSelectDonor = (id) => {
    setSelectedUserId(id);
    const u = users.find((item) => item.id === id);
    if (u) {
      setDonationCount(u.totalDonations || 1);
    }
  };

  const handleDownload = async () => {
    if (!offscreenRef.current) return;
    setIsGenerating(true);
    onShowToast("Generating high-definition PDF certificate...", "success");

    try {
      await downloadCertificatePDF(offscreenRef.current, selectedUser.name || 'Donor');
      onShowToast("Certificate PDF Downloaded Successfully!", "success");
    } catch (err) {
      onShowToast("Failed to generate PDF: " + err.message, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Certificate Render Content (Reused for both offscreen capture and live interactive preview)
  const CertificateContent = ({ isOffscreen = false }) => (
    <div
      style={{
        width: '1000px',
        height: '700px',
        position: 'relative',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, rgba(254,243,199,0.95), #ffffff 50%, rgba(254,226,226,0.5))',
        overflow: 'hidden',
        color: '#111827',
        border: '16px solid #450a0a',
        fontFamily: "'Playfair Display', serif"
      }}
    >
      {/* Double Gold & Red Border Frame */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px', border: '4px solid rgba(245,158,11,0.8)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px', border: '1px solid rgba(127,29,29,0.4)', pointerEvents: 'none' }} />

      {/* Corner Floral Ornaments */}
      <div style={{ position: 'absolute', top: '28px', left: '28px', color: '#d97706', fontSize: '28px', opacity: 0.8 }}><i className="fa-solid fa-award" /></div>
      <div style={{ position: 'absolute', top: '28px', right: '28px', color: '#d97706', fontSize: '28px', opacity: 0.8 }}><i className="fa-solid fa-award" /></div>
      <div style={{ position: 'absolute', bottom: '28px', left: '28px', color: '#d97706', fontSize: '28px', opacity: 0.8 }}><i className="fa-solid fa-award" /></div>
      <div style={{ position: 'absolute', bottom: '28px', right: '28px', color: '#d97706', fontSize: '28px', opacity: 0.8 }}><i className="fa-solid fa-award" /></div>

      {/* Watermark Logo Overlay */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, pointerEvents: 'none', zIndex: 1 }}>
        <i className="fa-solid fa-droplet" style={{ fontSize: '340px', color: '#7f1d1d' }} />
      </div>

      {/* Certificate Header */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', right: '40px', textAlign: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '44px', height: '44px', background: '#991b1b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '22px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <i className="fa-solid fa-droplet" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '20px', fontWeight: 900, color: '#7f1d1d', letterSpacing: '0.1em', lineHeight: 1.1, margin: 0 }}>
              RONGDHONU SAMAJIK SEBA SONGOTHON
            </h2>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#d97706', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Government Registered Humanitarian Organization &bull; Joypurhat
            </div>
          </div>
        </div>

        {/* Award Banner Title */}
        <div style={{ marginTop: '14px', position: 'relative', display: 'inline-block' }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '28px', color: '#111827', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, padding: '0 20px' }}>
            {awardTitle || 'CERTIFICATE OF APPRECIATION'}
          </h1>
          <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #d97706, #b45309, #d97706, transparent)', marginTop: '4px' }} />
        </div>
      </div>

      {/* Certificate Center Content */}
      <div style={{ position: 'absolute', top: '180px', left: '60px', right: '60px', textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontStyle: 'italic', fontSize: '18px', color: '#6b7280', marginBottom: '6px' }}>
          This certificate is proudly and honorably presented to
        </div>

        {/* Recipient Name */}
        <h3 style={{ fontWeight: 900, fontSize: '38px', color: '#450a0a', letterSpacing: '0.05em', marginBottom: '8px', paddingBottom: '4px', borderBottom: '2px solid rgba(245,158,11,0.6)', display: 'inline-block', minWidth: '320px', lineHeight: 1.2 }}>
          {selectedUser.name || 'Donor Name'}
        </h3>

        {/* Blood Group & Location Subtitle */}
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563', marginTop: '4px', marginBottom: '18px', lineHeight: 1.4 }}>
          Blood Group: <strong style={{ color: '#b91c1c', fontWeight: 900, fontSize: '14px' }}>{selectedUser.bloodGroup || 'O+'}</strong>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>{selectedUser.address || 'Panchbibi, Joypurhat'}</span>
        </div>

        {/* Congratulatory Appreciation Body Paragraph */}
        <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#374151', maxWidth: '760px', margin: '0 auto', fontFamily: "'Times New Roman', Georgia, serif" }}>
          In sincere recognition and deep gratitude for your noble contribution to humanity by voluntarily donating blood{' '}
          <strong style={{ color: '#7f1d1d', fontWeight: 900, fontSize: '15px', padding: '0 4px' }}>
            {donationCount} Times
          </strong>.
          Your selfless blood donation has saved precious human lives and served as an inspiration to our community.
          We warmly honor and congratulate you for your extraordinary dedication and service.
        </p>
      </div>

      {/* Certificate Bottom Footer (Signatures & Seal) */}
      <div style={{ position: 'absolute', bottom: '35px', left: '60px', right: '60px', height: '110px', zIndex: 10 }}>
        {/* Left: Date & ID */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4b5563', lineHeight: 1.6 }}>
          <div>Issue Date: <span style={{ color: '#111827' }}>{new Date().toLocaleDateString('en-GB')}</span></div>
          <div>Certificate ID: <span style={{ color: '#7f1d1d', fontFamily: 'monospace' }}>RSSS-CERT-{selectedUser.id ? selectedUser.id.slice(0, 8).toUpperCase() : '812971'}</span></div>
        </div>

        {/* Middle: Gold Seal Badge */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ width: '76px', height: '76px', background: 'linear-gradient(135deg, #d97706, #fcd34d, #f59e0b)', borderRadius: '9999px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#450a0a', border: '4px solid #fef3c7', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
            <i className="fa-solid fa-ribbon" style={{ fontSize: '22px', color: '#7f1d1d' }} />
            <span style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginTop: '2px', lineHeight: 1 }}>RSSS OFFICIAL</span>
            <span style={{ fontSize: '7px', fontWeight: 700, lineHeight: 1 }}>LIFE SAVER</span>
          </div>
        </div>

        {/* Right: President Signature Block */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '230px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Alex Brush', cursive", fontWeight: 700, fontSize: '32px', color: '#1e3a8a', lineHeight: 1.0, height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Engr. Sabbir Mahmud (Nahid)
          </div>
          <div style={{ width: '210px', height: '1px', backgroundColor: '#6b7280', margin: '2px auto 6px auto' }} />
          <div style={{ fontWeight: 800, fontSize: '12px', color: '#111827', lineHeight: 1.2 }}>Engr. Sabbir Mahmud (Nahid)</div>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#7f1d1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px', lineHeight: 1.2 }}>
            President, RSSS Organization
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="space-y-6">
      {/* Control Bar */}
      <div className="glossy-panel p-6 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="specular-line" />
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Search Donor:</label>
            <div className="relative">
              <input
                type="text"
                value={donorSearch}
                onChange={(e) => setDonorSearch(e.target.value)}
                placeholder="Search name or phone..."
                className="px-3.5 py-2 pl-9 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 w-56"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-zinc-400 text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Select Donor:</label>
            <select
              value={selectedUserId}
              onChange={(e) => handleSelectDonor(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 min-w-[220px]"
            >
              {filteredDonors.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name || 'Unnamed'} ({u.bloodGroup || 'N/A'}) - {u.phone || 'N/A'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Donations:</label>
            <input
              type="number"
              min={1}
              value={donationCount}
              onChange={(e) => setDonationCount(Number(e.target.value) || 1)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold w-20 text-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Award Title:</label>
            <input
              type="text"
              value={awardTitle}
              onChange={(e) => setAwardTitle(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-bold w-48 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500/40"
            />
          </div>

          {/* Interactive Zoom Controls */}
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Preview Zoom:</label>
            <div className="inline-flex rounded-xl border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-950">
              {[0.7, 0.85, 1.0].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setZoomScale(s)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition cursor-pointer ${
                    zoomScale === s
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {Math.round(s * 100)}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white px-6 py-3 rounded-xl text-sm font-extrabold shadow-xl shadow-rose-950/30 transition-all flex items-center space-x-2.5 hover:scale-105 active:scale-95 text-nowrap cursor-pointer disabled:opacity-75"
        >
          {isGenerating ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin text-base" />
              <span>Generating HD PDF...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-file-arrow-down text-base" />
              <span>Download Premium Certificate (PDF)</span>
            </>
          )}
        </button>
      </div>

      {/* Certificate Stage */}
      <div className="flex flex-col items-center justify-center overflow-x-auto p-6 bg-zinc-100 dark:bg-zinc-950/80 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-inner">
        {/* Offscreen Fixed Render Root (Exactly 1000px x 700px for 300 DPI Export) */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1000px', height: '700px' }}>
          <div ref={offscreenRef}>
            <CertificateContent isOffscreen={true} />
          </div>
        </div>

        {/* Visible Scaled Interactive Certificate Preview */}
        <div
          className="transition-transform duration-300 origin-top shadow-2xl rounded-2xl overflow-hidden border-4 border-amber-500/20"
          style={{ transform: `scale(${zoomScale})`, marginBottom: `${(1 - zoomScale) * -350}px` }}
        >
          <CertificateContent isOffscreen={false} />
        </div>
      </div>
    </section>
  );
}


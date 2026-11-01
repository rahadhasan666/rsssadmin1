// Email Broadcast Templates & Dispatch Engine

export const emailTemplates = {
  top_donor: {
    name: "🏆 Highest Blood Donor Appreciation",
    subject: "🏆 Congratulations {{NAME}} - RSSS Top Blood Donor Appreciation Award!",
    html: `<div style="background-color: #f4f6f9; padding: 40px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
    <div style="background: linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%); padding: 35px 25px; text-align: center; color: white;">
      <div style="background: #fbbf24; width: 64px; height: 64px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px; font-size: 30px;">
        🏆
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px; font-family: Georgia, serif;">TOP BLOOD DONOR AWARD</h1>
      <p style="color: #fef08a; margin: 8px 0 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase;">Rongdhonu Samajik Seba Songothon (RSSS)</p>
    </div>
    <div style="padding: 35px 30px; text-align: center;">
      <h2 style="color: #111827; font-size: 22px; font-weight: 800; margin-bottom: 10px;">Congratulations, {{NAME}}! 🎉</h2>
      <p style="color: #4b5563; font-size: 14px; line-height: 1.7; margin-bottom: 25px;">
        On behalf of <strong>Rongdhonu Samajik Seba Songothon</strong>, we proudly honor and congratulate you for your outstanding contribution to saving lives! You have completed <strong style="color: #b91c1c; font-size: 16px;">{{DONATION_COUNT}} Blood Donations</strong>.
      </p>
      <div style="background: linear-gradient(135deg, #fef3c7, #fee2e2); border: 2px solid #f59e0b; border-radius: 16px; padding: 20px; margin-bottom: 30px; text-align: center;">
        <span style="font-size: 12px; font-weight: 800; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">Honored Donor Profile</span>
        <div style="font-size: 20px; font-weight: 900; color: #7f1d1d; margin-top: 5px;">{{NAME}}</div>
        <div style="font-size: 13px; font-weight: 700; color: #374151; margin-top: 4px;">Blood Group: <span style="color: #b91c1c; font-weight: 900;">{{BLOOD_GROUP}}</span> • {{ADDRESS}}</div>
      </div>
      <p style="color: #6b7280; font-size: 13px; line-height: 1.6;">
        Your voluntary blood donation brings hope and life to critically ill patients and emergency accident victims. May your noble humanitarian spirit continue to inspire others!
      </p>
    </div>
    <div style="background-color: #f9fafb; padding: 20px; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
      <div style="font-weight: 800; color: #4b5563;">Engr. Sabbir Mahmud (Nahid)</div>
      <div>President, Rongdhonu Samajik Seba Songothon (RSSS)</div>
      <div style="margin-top: 10px; font-size: 11px;">Joypurhat, Bangladesh • Official Blood Donation Portal</div>
    </div>
  </div>
</div>`
  },
  emergency: {
    name: "🚨 Emergency Blood Request Alert",
    subject: "🚨 URGENT BLOOD NEEDED: Blood Group {{BLOOD_GROUP}} Needed Immediately!",
    html: `<div style="background-color: #fef2f2; padding: 40px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 2px solid #ef4444;">
    <div style="background: linear-gradient(135deg, #991b1b 0%, #dc2626 100%); padding: 30px 25px; text-align: center; color: white;">
      <div style="font-size: 36px; margin-bottom: 10px;">🚨</div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">URGENT BLOOD NEEDED!</h1>
      <p style="color: #fecaca; margin: 6px 0 0 0; font-size: 13px; font-weight: 700;">Emergency Blood Donation Appeal • RSSS</p>
    </div>
    <div style="padding: 30px;">
      <p style="color: #1f2937; font-size: 15px; font-weight: 700;">Respected Donor {{NAME}},</p>
      <p style="color: #4b5563; font-size: 14px; line-height: 1.7;">
        An emergency patient in critical condition urgently requires blood donation. If you or anyone in your circle with <strong>Blood Group {{BLOOD_GROUP}}</strong> is eligible and available to donate, please contact immediately!
      </p>
      <div style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 18px; border-radius: 12px; margin: 20px 0;">
        <div style="font-size: 13px; font-weight: 800; color: #881337; text-transform: uppercase;">Emergency Case Details</div>
        <div style="font-size: 16px; font-weight: 900; color: #9f1239; margin-top: 6px;">Required Group: {{BLOOD_GROUP}}</div>
        <div style="font-size: 13px; color: #4c0519; margin-top: 4px;">Location: Hospital / Medical Center, {{ADDRESS}}</div>
        <div style="font-size: 13px; color: #4c0519; margin-top: 2px;">Helpline Hotline: 01700000000 / 01800000000</div>
      </div>
      <div style="text-align: center; margin-top: 25px;">
        <a href="tel:01700000000" style="background-color: #dc2626; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 14px; display: inline-block;">📞 Contact Emergency Helpline</a>
      </div>
    </div>
    <div style="background-color: #f8fafc; padding: 18px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
      Rongdhonu Samajik Seba Songothon • Saving Lives Together
    </div>
  </div>
</div>`
  },
  notice: {
    name: "📢 RSSS Announcement & Notice",
    subject: "📢 RSSS Official Update & Member Announcement for {{NAME}}",
    html: `<div style="background-color: #f8fafc; padding: 40px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px 25px; text-align: center; color: white;">
      <div style="font-size: 32px; margin-bottom: 8px;">📢</div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 900;">RSSS OFFICIAL ANNOUNCEMENT</h1>
      <p style="color: #bfdbfe; margin: 5px 0 0 0; font-size: 12px; font-weight: 600;">Rongdhonu Samajik Seba Songothon</p>
    </div>
    <div style="padding: 30px;">
      <p style="color: #1e293b; font-size: 15px; font-weight: 700;">Dear {{NAME}},</p>
      <p style="color: #334155; font-size: 14px; line-height: 1.7;">
        Warm greetings from Rongdhonu Samajik Seba Songothon! We appreciate your continued support and active participation as a valued member of our blood donor family.
      </p>
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 20px; margin: 20px 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        Please make sure your blood donation availability status in the RSSS Mobile App is updated. If you have recently donated blood, update your last donation date in your profile settings.
      </div>
      <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
        Thank you for being a lifeline for those in need!
      </p>
    </div>
    <div style="background-color: #f1f5f9; padding: 18px; text-align: center; font-size: 11px; color: #64748b;">
      Rongdhonu Samajik Seba Songothon • Joypurhat, Bangladesh
    </div>
  </div>
</div>`
  },
  custom: {
    name: "✉️ Custom HTML Email",
    subject: "Message from Rongdhonu Samajik Seba Songothon (RSSS)",
    html: `<div style="padding: 30px; font-family: sans-serif; background-color: #ffffff; border-radius: 16px;">
  <h2>Hello {{NAME}},</h2>
  <p>Type your custom message here...</p>
</div>`
  }
};

export function renderTemplateHtml(templateHtml, user) {
  const name = user ? (user.name || 'Respected Donor') : 'Rahad Hasan';
  const bloodGroup = user ? (user.bloodGroup || 'O+') : 'O+';
  const address = user ? (user.address || 'Panchbibi, Joypurhat') : 'Panchbibi, Joypurhat';
  const donations = user ? (user.totalDonations || 4) : 4;

  return templateHtml
    .replace(/{{NAME}}/g, name)
    .replace(/{{BLOOD_GROUP}}/g, bloodGroup)
    .replace(/{{ADDRESS}}/g, address)
    .replace(/{{DONATION_COUNT}}/g, donations);
}

// Inline SmtpJS engine helper
function sendViaSmtpJs(options) {
  return new Promise((resolve, reject) => {
    if (window.Email && typeof window.Email.send === 'function') {
      window.Email.send(options).then(resolve).catch(reject);
      return;
    }

    const postData = JSON.stringify({
      ...options,
      nocache: new Date().getTime(),
      Action: "Send"
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://smtpjs.com/v1/smtp.aspx", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error("HTTP Error " + xhr.status + ": " + xhr.statusText));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network Error sending SMTP email. Browser blocked CORS or no internet."));
    };
    xhr.send(postData);
  });
}

export async function dispatchEmailBroadcast({
  recipients,
  rawSubject,
  htmlBody,
  provider,
  config
}) {
  let successCount = 0;
  let lastErrorMessage = "";

  for (const user of recipients) {
    const personalizedHtml = renderTemplateHtml(htmlBody, user);
    const personalizedSubject = rawSubject
      .replace(/{{NAME}}/g, user.name || 'Valued Donor')
      .replace(/{{BLOOD_GROUP}}/g, user.bloodGroup || 'N/A');

    try {
      if (provider === 'google_script') {
        const scriptUrl = (config.googleScriptUrl || '').trim();
        if (!scriptUrl) {
          throw new Error("Google Apps Script Web App URL is required!");
        }

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: user.email,
            subject: personalizedSubject,
            html: personalizedHtml
          })
        });

        successCount++;

      } else if (provider === 'emailjs') {
        const { emailjsPublicKey, emailjsServiceId, emailjsTemplateId } = config;
        if (!emailjsPublicKey || !emailjsServiceId || !emailjsTemplateId) {
          throw new Error("EmailJS Public Key, Service ID & Template ID are required!");
        }

        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: emailjsServiceId.trim(),
            template_id: emailjsTemplateId.trim(),
            user_id: emailjsPublicKey.trim(),
            template_params: {
              to_email: user.email,
              to_name: user.name || 'Donor',
              subject: personalizedSubject,
              message_html: personalizedHtml
            }
          })
        });

        if (res.ok) {
          successCount++;
        } else {
          lastErrorMessage = await res.text();
        }

      } else if (provider === 'brevo') {
        const apiKey = (config.brevoApiKey || '').trim();
        const senderEmail = (config.smtpSenderEmail || 'academycybercraft@gmail.com').trim();
        if (!apiKey) {
          throw new Error("Brevo API Key is required!");
        }

        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': apiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: "Rongdhonu Samajik Seba Songothon", email: senderEmail },
            to: [{ email: user.email, name: user.name || "Donor" }],
            subject: personalizedSubject,
            htmlContent: personalizedHtml
          })
        });

        if (res.ok) {
          successCount++;
        } else {
          const errJson = await res.json();
          lastErrorMessage = errJson.message || JSON.stringify(errJson);
        }

      } else {
        // SmtpJS / Gmail SMTP
        const senderEmail = (config.smtpSenderEmail || 'academycybercraft@gmail.com').trim();
        const appPassword = (config.smtpAppPassword || 'ahamtdqzhnhkhrkw').replace(/\s+/g, '');

        const response = await sendViaSmtpJs({
          Host: "smtp.gmail.com",
          Username: senderEmail,
          Password: appPassword,
          To: user.email,
          From: senderEmail,
          Subject: personalizedSubject,
          Body: personalizedHtml
        });

        if (response === "OK" || String(response).toLowerCase().includes("ok")) {
          successCount++;
        } else {
          lastErrorMessage = String(response);
        }
      }
    } catch (e) {
      console.error("Error broadcasting to " + user.email, e);
      lastErrorMessage = e.message;
    }
  }

  return {
    successCount,
    totalCount: recipients.length,
    lastErrorMessage
  };
}


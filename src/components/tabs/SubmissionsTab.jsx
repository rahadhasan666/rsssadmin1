import React, { useState } from 'react';

const SUBMISSION_SECTIONS = [
  { id: 'all', label: 'All Submissions', icon: 'fa-list-check' },
  { id: 'support', label: 'Support Requests', icon: 'fa-headset', color: 'rose' },
  { id: 'financial', label: 'Financial Help', icon: 'fa-hand-holding-dollar', color: 'emerald' },
  { id: 'cyber', label: 'Cyber Reports', icon: 'fa-shield-halved', color: 'indigo' },
  { id: 'member', label: 'Member Apps', icon: 'fa-user-check', color: 'blue' },
  { id: 'testers', label: 'App Testers', icon: 'fa-laptop-code', color: 'purple' },
  { id: 'donation', label: 'Donation Requests', icon: 'fa-gift', color: 'amber' },
  { id: 'blood', label: 'Blood Requests', icon: 'fa-droplet', color: 'rose' },
  { id: 'mail', label: 'Email Queue', icon: 'fa-paper-plane', color: 'sky' },
];

export default function SubmissionsTab({
  supportRequests = [],
  financialHelp = [],
  cyberReports = [],
  memberApps = [],
  appTesters = [],
  donationRequests = [],
  bloodRequests = [],
  mailQueue = []
}) {
  const [activeSection, setActiveSection] = useState('all');

  const counts = {
    support: supportRequests.length,
    financial: financialHelp.length,
    cyber: cyberReports.length,
    member: memberApps.length,
    testers: appTesters.length,
    donation: donationRequests.length,
    blood: bloodRequests.length,
    mail: mailQueue.length,
  };

  const showSection = (sec) => activeSection === 'all' || activeSection === sec;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
            App Form Submissions & Support Requests
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Incoming user applications, emergency blood requests, and cyber help reports
          </p>
        </div>
        <span className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold px-3 py-1 rounded-full border border-rose-500/20 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block mr-1.5 animate-pulse" /> Firestore Real-time Sync
        </span>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {SUBMISSION_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const count = sec.id === 'all' ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[sec.id];
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <i className={`fa-solid ${sec.icon} text-[11px]`} />
              <span>{sec.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. Support Requests */}
      {showSection('support') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-headset text-rose-500 mr-2" /> Support Requests (`support_requests`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Phone</th>
                  <th className="py-3 px-4 font-bold">Email</th>
                  <th className="py-3 px-4 font-bold">Address</th>
                  <th className="py-3 px-4 font-bold">Reason</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {supportRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-zinc-400">
                      No support requests found.
                    </td>
                  </tr>
                ) : (
                  supportRequests.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{d.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono">{d.phone || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono text-zinc-500">{d.email || 'N/A'}</td>
                      <td className="py-3 px-4">{d.address || 'N/A'}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{d.reason || 'N/A'}</td>
                      <td className="py-3 px-4 text-xs font-mono text-zinc-400">
                        {d.createdAt?.toDate ? d.createdAt.toDate().toLocaleString() : 'Recent'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Financial Help Requests */}
      {showSection('financial') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-hand-holding-dollar text-emerald-500 mr-2" /> Financial Help Applications (`financial_help_requests`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Applicant</th>
                  <th className="py-3 px-4 font-bold">Phone / Email</th>
                  <th className="py-3 px-4 font-bold">Parents</th>
                  <th className="py-3 px-4 font-bold">Amount</th>
                  <th className="py-3 px-4 font-bold">Reason</th>
                  <th className="py-3 px-4 font-bold">Photo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {financialHelp.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-zinc-400">
                      No financial help applications found.
                    </td>
                  </tr>
                ) : (
                  financialHelp.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{d.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono">
                        {d.phone || 'N/A'}<br />
                        <span className="text-zinc-400 text-[11px]">{d.email || ''}</span>
                      </td>
                      <td className="py-3 px-4 text-xs">F: {d.fatherName || 'N/A'}<br />M: {d.motherName || 'N/A'}</td>
                      <td className="py-3 px-4 font-black font-mono text-emerald-600 dark:text-emerald-400">
                        {d.amount || '0'} BDT
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate">{d.reason || 'N/A'}</td>
                      <td className="py-3 px-4">
                        {d.photoUrl ? (
                          <a href={d.photoUrl} target="_blank" rel="noreferrer" className="inline-block hover:scale-105 transition">
                            <img src={d.photoUrl} className="w-10 h-10 object-cover rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm" alt="Document" />
                          </a>
                        ) : (
                          <span className="text-zinc-400">No Photo</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Cyber Help Reports */}
      {showSection('cyber') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-shield-halved text-indigo-500 mr-2" /> Cyber Security Reports (`cyber_help_reports`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Victim Name</th>
                  <th className="py-3 px-4 font-bold">Phone / Email</th>
                  <th className="py-3 px-4 font-bold">Platform</th>
                  <th className="py-3 px-4 font-bold">Incident Description</th>
                  <th className="py-3 px-4 font-bold">Profile Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {cyberReports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-400">
                      No cyber reports found.
                    </td>
                  </tr>
                ) : (
                  cyberReports.map((d) => {
                    const dat = d.data || {};
                    return (
                      <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                        <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{dat.name || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">
                          {dat.phone || 'N/A'}<br />
                          <span className="text-zinc-400 text-[11px]">{dat.email || ''}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-indigo-500">{dat.platform || 'N/A'}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{dat.incidentDescription || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <a
                            href={dat.profileLink || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="text-rose-500 hover:underline font-semibold text-xs"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square mr-1 text-[10px]" /> Link
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Member Applications */}
      {showSection('member') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-user-check text-blue-500 mr-2" /> Membership Applications (`member_applications`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Phone</th>
                  <th className="py-3 px-4 font-bold">Email</th>
                  <th className="py-3 px-4 font-bold">Qualification</th>
                  <th className="py-3 px-4 font-bold">Why Join?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {memberApps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-400">
                      No membership applications found.
                    </td>
                  </tr>
                ) : (
                  memberApps.map((d) => {
                    const dat = d.data || {};
                    return (
                      <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                        <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{dat['Name'] || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">{dat['Phone'] || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono text-zinc-400">{dat['Email'] || 'N/A'}</td>
                        <td className="py-3 px-4">{dat['Educational Qualification'] || 'N/A'}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{dat['Why do you want to join RSSS?'] || 'N/A'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. App Tester Applications */}
      {showSection('testers') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-laptop-code text-purple-500 mr-2" /> App Tester Applications (`app_tester_applications`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Device</th>
                  <th className="py-3 px-4 font-bold">OS Version</th>
                  <th className="py-3 px-4 font-bold">Experience</th>
                  <th className="py-3 px-4 font-bold">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {appTesters.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-400">
                      No tester applications found.
                    </td>
                  </tr>
                ) : (
                  appTesters.map((d) => {
                    const dat = d.data || {};
                    return (
                      <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                        <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{dat.name || 'N/A'}</td>
                        <td className="py-3 px-4">{dat.deviceModel || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">{dat.androidVersion || 'N/A'}</td>
                        <td className="py-3 px-4">{dat.testingExperience || 'N/A'}</td>
                        <td className="py-3 px-4 font-mono">{dat.phone || 'N/A'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Donation Requests */}
      {showSection('donation') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-gift text-amber-500 mr-2" /> Donation Requests (`donation_requests`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Name</th>
                  <th className="py-3 px-4 font-bold">Donation Type</th>
                  <th className="py-3 px-4 font-bold">Purpose</th>
                  <th className="py-3 px-4 font-bold">Phone</th>
                  <th className="py-3 px-4 font-bold">District</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {donationRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-400">
                      No donation requests found.
                    </td>
                  </tr>
                ) : (
                  donationRequests.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{d.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-bold text-amber-500">{d.type || 'N/A'}</td>
                      <td className="py-3 px-4 max-w-xs truncate">{d.purpose || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono">{d.phone || 'N/A'}</td>
                      <td className="py-3 px-4">{d.district || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. Blood Requests */}
      {showSection('blood') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-droplet text-rose-500 mr-2" /> Blood Requests (`blood_requests`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Patient Name</th>
                  <th className="py-3 px-4 font-bold">Blood Group</th>
                  <th className="py-3 px-4 font-bold">Bags</th>
                  <th className="py-3 px-4 font-bold">Hospital & Location</th>
                  <th className="py-3 px-4 font-bold">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {bloodRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-400">
                      No blood requests found.
                    </td>
                  </tr>
                ) : (
                  bloodRequests.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-zinc-100">{d.patientName || d.name || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono font-black text-rose-500">{d.bloodGroup || 'N/A'}</td>
                      <td className="py-3 px-4 font-mono">{d.bags || '1'} Bag(s)</td>
                      <td className="py-3 px-4">{d.hospital || ''}, {d.location || ''}</td>
                      <td className="py-3 px-4 font-mono">{d.phone || d.contact || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Email Queue */}
      {showSection('mail') && (
        <div className="glossy-panel rounded-3xl p-6 space-y-4 overflow-hidden shadow-xl">
          <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm flex items-center">
            <i className="fa-solid fa-paper-plane text-sky-500 mr-2" /> Email Queue / Mail Collection (`mail`)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Recipient (To)</th>
                  <th className="py-3 px-4 font-bold">Subject</th>
                  <th className="py-3 px-4 font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {mailQueue.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-zinc-400">
                      Email queue is empty.
                    </td>
                  </tr>
                ) : (
                  mailQueue.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-100">{d.to || 'N/A'}</td>
                      <td className="py-3 px-4">{d.message?.subject || 'N/A'}</td>
                      <td className="py-3 px-4 text-xs font-mono text-zinc-400">
                        {d.createdAt?.toDate ? d.createdAt.toDate().toLocaleString() : 'Just now'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}


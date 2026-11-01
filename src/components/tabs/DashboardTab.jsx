import React from 'react';
import CrmCharts from '../charts/CrmCharts';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DashboardTab({
  users = [],
  news = [],
  bloodRequests = [],
  supportRequests = [],
  isDark = true,
  onNavigateTab,
  onFilterBloodGroup,
  onOpenRegisterModal
}) {
  const totalUsers = users.length;
  const availableDonors = users.filter((u) => u.isAvailable).length;
  const verifiedMembers = users.filter((u) => u.isOrganizationMember).length;
  const availabilityRate = totalUsers > 0 ? ((availableDonors / totalUsers) * 100).toFixed(0) : 0;
  const totalRequests = bloodRequests.length;

  const recentUsers = users.slice(0, 6);

  return (
    <section className="space-y-8">
      {/* CRM Executive Control Bar */}
      <div className="glossy-panel rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="specular-line" />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 uppercase tracking-wider">
              Executive CRM Suite v2.0
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Cloud Sync: <span className="text-emerald-500 font-bold">100% Operational</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            RSSS Healthcare & Blood Bank Command Center
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Realtime donor lifecycle management, emergency dispatch tracking, and supply depth analytics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => onNavigateTab('submissions')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold glossy-panel text-zinc-800 dark:text-zinc-200 hover:text-rose-500 transition-all flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <i className="fa-solid fa-droplet text-rose-500" />
            <span>Emergency Requests ({totalRequests})</span>
          </button>
          
          <button
            onClick={onOpenRegisterModal}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <i className="fa-solid fa-user-plus text-xs" />
            <span>Onboard Donor</span>
          </button>
        </div>
      </div>

      {/* 4 Premium CRM Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Donors */}
        <div className="glossy-panel rounded-3xl p-6 hover:shadow-2xl hover:border-rose-500/40 transition-all duration-300 group overflow-hidden">
          <div className="specular-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono">Total Donors</p>
              <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-1 font-mono tracking-tight">
                {totalUsers}
              </h3>
              <div className="mt-2.5 flex items-center text-[11px] text-rose-500 font-bold font-mono">
                <i className="fa-solid fa-arrow-trend-up mr-1.5" /> +100% Verified Records
              </div>
            </div>
            <div className="w-13 h-13 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center text-2xl ring-1 ring-rose-500/20 group-hover:scale-110 transition-transform shadow-inner">
              <i className="fa-solid fa-users" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Pool Capacity</span>
            <span className="text-zinc-900 dark:text-white font-bold">{totalUsers} registered</span>
          </div>
        </div>

        {/* Available Donors */}
        <div className="glossy-panel rounded-3xl p-6 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden">
          <div className="specular-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono">Ready to Dispatch</p>
              <h3 className="text-3xl sm:text-4xl font-black text-emerald-500 mt-1 font-mono tracking-tight">
                {availableDonors}
              </h3>
              <div className="mt-2.5 flex items-center text-[11px] text-emerald-500 font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-ping" /> {availabilityRate}% Active Pool
              </div>
            </div>
            <div className="w-13 h-13 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform shadow-inner">
              <i className="fa-solid fa-heart-pulse" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Emergency Readiness</span>
            <span className="text-emerald-500 font-bold">Optimal</span>
          </div>
        </div>

        {/* Verified Members */}
        <div className="glossy-panel rounded-3xl p-6 hover:shadow-2xl hover:border-sky-500/40 transition-all duration-300 group overflow-hidden">
          <div className="specular-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono">Verified Badged</p>
              <h3 className="text-3xl sm:text-4xl font-black text-sky-500 mt-1 font-mono tracking-tight">
                {verifiedMembers}
              </h3>
              <div className="mt-2.5 flex items-center text-[11px] text-sky-500 font-bold font-mono">
                <i className="fa-solid fa-certificate mr-1.5" /> Official VIP Badges
              </div>
            </div>
            <div className="w-13 h-13 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center text-2xl ring-1 ring-sky-500/20 group-hover:scale-110 transition-transform shadow-inner">
              <i className="fa-solid fa-award" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Authentication</span>
            <span className="text-sky-500 font-bold">Encrypted Token</span>
          </div>
        </div>

        {/* Total Emergency Requests */}
        <div className="glossy-panel rounded-3xl p-6 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 group overflow-hidden">
          <div className="specular-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono">Emergency Requests</p>
              <h3 className="text-3xl sm:text-4xl font-black text-amber-500 mt-1 font-mono tracking-tight">
                {totalRequests}
              </h3>
              <div className="mt-2.5 flex items-center text-[11px] text-amber-500 font-bold font-mono">
                <i className="fa-solid fa-bell mr-1.5" /> Patient Calls Received
              </div>
            </div>
            <div className="w-13 h-13 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center text-2xl ring-1 ring-amber-500/20 group-hover:scale-110 transition-transform shadow-inner">
              <i className="fa-solid fa-hospital" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Fulfillment Pipeline</span>
            <span className="text-amber-500 font-bold">Active Watch</span>
          </div>
        </div>
      </div>

      {/* CRM Analytics Graphs Suite */}
      <CrmCharts
        users={users}
        bloodRequests={bloodRequests}
        supportRequests={supportRequests}
        isDark={isDark}
      />

      {/* Blood Bank Live Availability Matrix (8 Groups) */}
      <div className="glossy-panel rounded-3xl p-6 sm:p-7 overflow-hidden">
        <div className="specular-line" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center">
              <i className="fa-solid fa-cubes-stacked text-rose-500 mr-2.5" />
              Blood Bank Supply Depth & Quick Filter Grid
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Click any blood group tile to instantly filter the active donor database
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-400">8 Blood Types Categorized</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {BLOOD_GROUPS.map((group) => {
            const totalGroupDonors = users.filter((u) => u.bloodGroup === group).length;
            const readyCount = users.filter((u) => u.bloodGroup === group && u.isAvailable).length;
            const isDeficit = readyCount === 0;

            return (
              <button
                key={group}
                onClick={() => onFilterBloodGroup(group)}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer flex flex-col justify-between ${
                  isDeficit
                    ? 'border-rose-500/30 bg-rose-500/[0.04] hover:border-rose-500 hover:bg-rose-500/10'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-rose-500/50 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider group-hover:text-rose-500">
                    Group
                  </div>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight my-1">
                    {group}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/[0.06]">
                  <div className={`text-xs font-mono font-black ${isDeficit ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {readyCount} Ready
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {totalGroupDonors} total
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recently Registered Donors CRM Feed */}
      <div className="glossy-panel rounded-3xl p-6 sm:p-7 overflow-hidden">
        <div className="specular-line" />
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
              Recently Onboarded Donors
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Latest voluntary blood donors registered through RSSS Cloud & Android Mobile App
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('users')}
            className="text-xs font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1.5 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition"
          >
            <span>Open Donor Directory</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] border-b border-white/[0.08] text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Donor Profile</th>
                <th className="py-3.5 px-4">Group</th>
                <th className="py-3.5 px-4">Direct Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-sm">
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    No donor records registered yet. Click "+ Onboard Donor" above to register the first donor.
                  </td>
                </tr>
              ) : (
                recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-3.5 px-5 font-bold flex items-center space-x-3">
                      <img
                        src={u.profileImageUrl || ''}
                        className="w-9 h-9 rounded-xl object-cover border border-white/[0.1] shadow-sm"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'U')}&background=e11d48&color=fff`;
                        }}
                        alt={u.name}
                      />
                      <div>
                        <div className="text-zinc-900 dark:text-white font-bold flex items-center space-x-1.5">
                          <span>{u.name || 'Unnamed Donor'}</span>
                          {u.isOrganizationMember && (
                            <i className="fa-solid fa-circle-check text-emerald-400 text-xs" title="Verified Member" />
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">{u.userId || u.id.slice(0, 8)}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-rose-500 text-base">
                      {u.bloodGroup || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      {u.phone ? (
                        <a href={`tel:${u.phone}`} className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 flex items-center space-x-1.5">
                          <i className="fa-solid fa-phone text-[10px] text-zinc-400" />
                          <span>{u.phone}</span>
                        </a>
                      ) : (
                        <span className="text-zinc-500">N/A</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-zinc-400 max-w-xs truncate">
                      {u.address || 'Unspecified'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-black inline-flex items-center space-x-1.5 border ${
                          u.isAvailable
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-400'}`} />
                        <span>{u.isAvailable ? 'AVAILABLE' : 'BUSY'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onNavigateTab('users')}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.08] transition cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

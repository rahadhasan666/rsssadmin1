import React, { useState, useMemo } from 'react';

const BLOOD_GROUPS = ['ALL', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function UsersTab({
  users = [],
  filterGroup = 'ALL',
  onFilterGroupChange,
  onToggleStatus,
  onToggleBadge,
  onOpenEditModal,
  onOpenRegisterModal,
  onDeleteUser,
  onDownloadPDF
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((u) => {
      const matchesQuery =
        (u.name || '').toLowerCase().includes(q) ||
        (u.phone || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.address || '').toLowerCase().includes(q) ||
        (u.userId || '').toLowerCase().includes(q);
      const matchesGroup = filterGroup === 'ALL' || u.bloodGroup === filterGroup;
      return matchesQuery && matchesGroup;
    });
  }, [users, searchQuery, filterGroup]);

  return (
    <section className="space-y-6">
      {/* Control Bar */}
      <div className="glossy-panel p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="specular-line" />
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donor by name, phone, or address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glossy-input text-zinc-900 dark:text-white placeholder-zinc-500 text-sm focus:outline-none font-medium"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-zinc-400 text-xs" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={filterGroup}
            onChange={(e) => onFilterGroupChange(e.target.value)}
            className="px-4 py-2.5 rounded-2xl glossy-input text-zinc-900 dark:text-white text-sm font-bold focus:outline-none"
          >
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g} className="bg-zinc-900 text-white font-bold">
                {g === 'ALL' ? 'All Blood Groups' : g}
              </option>
            ))}
          </select>

          <button
            onClick={onDownloadPDF}
            className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-rose-950/40 transition-all flex items-center space-x-2 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-emerald-950/40 transition-all flex items-center space-x-2 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-user-plus text-xs" />
            <span>+ Add Donor</span>
          </button>
        </div>
      </div>

      {/* Full Users Table */}
      <div className="glossy-panel rounded-3xl overflow-hidden">
        <div className="specular-line" />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03] border-b border-white/[0.08] text-[11px] font-mono font-extrabold text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Donor Profile</th>
                <th className="py-4 px-4">Blood Group</th>
                <th className="py-4 px-4">Phone & Address</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Member Badge</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-zinc-400">
                    No matching donors found for "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-6 font-bold flex items-center space-x-3.5">
                      <img
                        src={u.profileImageUrl || ''}
                        className="w-10 h-10 rounded-2xl object-cover border border-white/[0.1] shadow-md"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'U')}&background=e11d48&color=fff`;
                        }}
                        alt={u.name}
                      />
                      <div>
                        <div className="text-zinc-900 dark:text-white font-extrabold text-sm">{u.name || 'Unnamed Donor'}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{u.userId || u.id.slice(0, 10)}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono font-black text-rose-500 text-lg">
                      {u.bloodGroup || 'N/A'}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs">
                      <div className="font-bold text-zinc-900 dark:text-zinc-200">
                        {u.phone ? (
                          <a href={`tel:${u.phone}`} className="hover:text-rose-500 transition">
                            {u.phone}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </div>
                      <div className="text-zinc-500 text-[11px] truncate max-w-xs">{u.address || 'No address specified'}</div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onToggleStatus(u.id, u.isAvailable)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-black inline-flex items-center space-x-1.5 border transition cursor-pointer ${
                          u.isAvailable
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/25 hover:bg-zinc-500/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-400'}`} />
                        <span>{u.isAvailable ? 'AVAILABLE' : 'BUSY'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onToggleBadge(u.id, u.isOrganizationMember)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-black inline-flex items-center space-x-1.5 border transition cursor-pointer ${
                          u.isOrganizationMember
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/25 hover:bg-sky-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/25 hover:bg-zinc-500/20'
                        }`}
                      >
                        <i className={`fa-solid ${u.isOrganizationMember ? 'fa-shield-halved' : 'fa-circle-plus'} text-xs`} />
                        <span>{u.isOrganizationMember ? 'VERIFIED MEMBER' : 'GRANT BADGE'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onOpenEditModal(u)}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 font-bold text-xs transition cursor-pointer"
                        >
                          <i className="fa-solid fa-pen text-[10px] mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => onDeleteUser(u.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs transition cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-[10px]" />
                        </button>
                      </div>
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

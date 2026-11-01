import React from 'react';

const TABS = [
  { id: 'dashboard', label: 'CRM Dashboard', icon: 'fa-chart-pie' },
  { id: 'users', label: 'Donor Directory', icon: 'fa-users' },
  { id: 'certificate', label: 'Certificate Studio', icon: 'fa-award' },
  { id: 'email', label: 'Broadcast Center', icon: 'fa-paper-plane' },
  { id: 'news', label: 'News & Advisories', icon: 'fa-newspaper' },
  { id: 'notices', label: 'App Announcements', icon: 'fa-bullhorn' },
  { id: 'submissions', label: 'Incoming Requests', icon: 'fa-inbox' },
  { id: 'applock', label: 'Remote App Lock', icon: 'fa-lock' },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  onLogout,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-30 md:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 glossy-panel border-r border-white/[0.08] text-zinc-800 dark:text-zinc-200 flex-shrink-0 flex flex-col justify-between z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="specular-line" />
        <div>
          {/* Org Logo & Brand Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-gradient-to-tr from-rose-600 to-red-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-xl shadow-rose-900/40 ring-4 ring-rose-500/20">
                <i className="fa-solid fa-droplet animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="font-black text-sm tracking-tight text-zinc-900 dark:text-white leading-tight">
                    RSSS BLOOD
                  </h1>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-500/15 text-rose-500 font-mono border border-rose-500/20">
                    CRM
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider">Executive Suite</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-mono font-extrabold text-zinc-400 uppercase tracking-widest">
              Core Modules
            </div>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/40 font-extrabold scale-[1.02]'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} w-5 text-center text-sm ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: Admin Info & Quick Controls */}
        <div className="p-4 border-t border-white/[0.08] space-y-3 bg-white/[0.01]">
          {/* Admin Identity Pill */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                AD
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-zinc-900 dark:text-white leading-none">Super Admin</div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">admin@admin.com</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Theme & Logout Controls */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onToggleTheme}
              className="py-2.5 px-3 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <i className={`fa-solid ${isDark ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-500'} text-xs`} />
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>
            <button
              onClick={onLogout}
              className="py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer border border-rose-500/20"
            >
              <i className="fa-solid fa-power-off text-xs" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

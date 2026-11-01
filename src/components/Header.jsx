import React from 'react';

const TAB_TITLES = {
  dashboard: 'CRM Executive Dashboard & Supply Intelligence',
  users: 'Blood Donor Directory & Active Roster',
  certificate: 'Official Certificate of Appreciation Studio',
  email: 'Multi-Channel Emergency Email Broadcast',
  news: 'Health Advisories & Organizational News',
  notices: 'Direct Mobile Announcements',
  submissions: 'Patient Requests, Cyber Reports & Membership Queue',
  applock: 'Mobile Application Remote Lock & Maintenance',
};

export default function Header({ activeTab, onOpenRegisterModal, onToggleMobileSidebar }) {
  return (
    <header className="glossy-panel border-b border-white/[0.08] px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-2xl">
      <div className="specular-line" />
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 -ml-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
        >
          <i className="fa-solid fa-bars text-base" />
        </button>
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
            <span>RSSS</span>
            <span>/</span>
            <span className="text-rose-500 font-bold uppercase tracking-wider">COMMAND CENTER</span>
            <span>/</span>
            <span className="capitalize text-zinc-500">{activeTab}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white tracking-tight">
            {TAB_TITLES[activeTab] || 'Admin Panel'}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
          <span className="hidden sm:inline">REALTIME SYNC ACTIVE</span>
          <span className="sm:hidden">LIVE</span>
        </span>

        <button
          onClick={onOpenRegisterModal}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <i className="fa-solid fa-user-plus text-xs" />
          <span className="hidden sm:inline">Register Donor</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </header>
  );
}

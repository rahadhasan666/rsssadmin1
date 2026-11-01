import React from 'react';

export default function LoadingOverlay({ message = "Connecting to RSSS Realtime Cloud..." }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-2xl">
      <div className="relative p-8 rounded-3xl glossy-dialog max-w-sm w-full mx-4 text-center overflow-hidden modal-enter">
        <div className="specular-line" />
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 bg-rose-600/30 rounded-full blur-2xl pointer-events-none" />

        {/* Executive Pulse Orb */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 opacity-20 animate-ping" />
          <div className="absolute inset-1 rounded-full border-2 border-rose-500/40 border-t-rose-500 animate-spin" />
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-rose-900/50 ring-4 ring-rose-500/20">
            <i className="fa-solid fa-droplet animate-pulse" />
          </div>
        </div>

        <h3 className="text-base font-black text-white tracking-tight">RSSS Executive CRM</h3>
        <p className="text-xs text-zinc-400 mt-1 mb-5">{message}</p>

        {/* Shimmer Progress Track */}
        <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600 rounded-full shimmer-sweep" />
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>256-BIT ENCRYPTION</span>
          <span className="text-emerald-400 font-bold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" /> SYNCING
          </span>
        </div>
      </div>
    </div>
  );
}


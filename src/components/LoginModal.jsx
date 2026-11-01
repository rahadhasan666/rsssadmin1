import React, { useState } from 'react';

export default function LoginModal({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email.trim(), password.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
      <div className="relative glossy-dialog rounded-3xl p-8 sm:p-10 max-w-md w-full text-center modal-enter overflow-hidden">
        <div className="specular-line" />
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Shield Icon */}
        <div className="relative w-16 h-16 bg-gradient-to-tr from-rose-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white text-2xl shadow-xl shadow-rose-900/50 ring-4 ring-rose-500/20">
          <i className="fa-solid fa-droplet animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">RSSS Admin CRM</h2>
        <p className="text-xs text-zinc-400 mt-1 mb-6">
          Rongdhonu Samajik Seba Songothon &bull; Executive Command Console
        </p>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-500/15 text-rose-300 text-xs font-bold rounded-2xl border border-rose-500/30 text-left flex items-center space-x-2.5 backdrop-blur-md">
            <i className="fa-solid fa-circle-exclamation text-base flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1.5 uppercase tracking-wider font-mono">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@admin.com"
                className="w-full px-4 py-3 pl-11 rounded-2xl glossy-input text-white placeholder-zinc-500 text-sm font-medium focus:outline-none transition-all"
              />
              <i className="fa-solid fa-envelope absolute left-4 top-3.5 text-zinc-500 text-sm" />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1.5 uppercase tracking-wider font-mono">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-11 rounded-2xl glossy-input text-white placeholder-zinc-500 text-sm font-medium focus:outline-none transition-all"
              />
              <i className="fa-solid fa-key absolute left-4 top-3.5 text-zinc-500 text-sm" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-600 text-white font-extrabold py-3.5 px-5 rounded-2xl transition-all duration-200 shadow-xl shadow-rose-950/50 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 text-sm disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Unlock Full CRM Console</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>AES-256 ENCRYPTED</span>
          <span className="inline-flex items-center text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" /> Firebase Realtime
          </span>
        </div>
      </div>
    </div>
  );
}

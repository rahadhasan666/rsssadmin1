import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2.5 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        return (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center space-x-3 pointer-events-auto backdrop-blur-xl border transition-all duration-300 animate-slideIn ${
              isSuccess
                ? 'bg-emerald-600/90 dark:bg-emerald-600/90 border-emerald-400/30 text-white shadow-emerald-950/40'
                : 'bg-rose-600/90 dark:bg-rose-600/90 border-rose-400/30 text-white shadow-rose-950/40'
            }`}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20 flex-shrink-0">
              <i className={`fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-triangle-exclamation'} text-xs`} />
            </div>
            <span className="leading-tight">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}


import React from 'react';

export default function NoticesTab({ notices = [], onOpenAddModal, onDeleteNotice }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">App Notices & Announcements</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Broadcast operational messages and urgent directives to mobile app users
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-900/20 transition-all flex items-center space-x-2 hover:scale-105 active:scale-95 w-fit cursor-pointer"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Post New Notice</span>
        </button>
      </div>

      <div className="space-y-3.5">
        {notices.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
            No active notices found. Click "+ Post New Notice" to broadcast an announcement.
          </div>
        ) : (
          notices.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-3xl glossy-panel shadow-sm hover:border-rose-500/30 transition-all flex items-start justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-lg flex-shrink-0 border border-rose-500/20">
                  <i className="fa-solid fa-bullhorn" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm">
                      {n.title || 'Notice'}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleDateString() : 'Announcement'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{n.content || ''}</p>
                </div>
              </div>
              <button
                onClick={() => onDeleteNotice(n.id)}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-bold transition flex-shrink-0 cursor-pointer"
              >
                <i className="fa-solid fa-trash mr-1 text-[10px]" /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}


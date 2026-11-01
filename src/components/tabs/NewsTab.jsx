import React from 'react';

export default function NewsTab({ news = [], onOpenAddModal, onOpenEditModal, onDeleteNews }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">App News & Health Blogs</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Publish articles, blood donation camp reports, and health advisories
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-900/20 transition-all flex items-center space-x-2 hover:scale-105 active:scale-95 w-fit cursor-pointer"
        >
          <i className="fa-solid fa-plus text-xs" />
          <span>Post New Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length === 0 ? (
          <div className="col-span-3 py-16 text-center text-zinc-400">
            No news articles found. Click "+ Post New Article" above to create one.
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="group glossy-panel rounded-3xl overflow-hidden flex flex-col justify-between hover:border-rose-500/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="relative overflow-hidden h-44 bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80';
                    }}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider font-mono">
                    Article
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-base mb-2 group-hover:text-rose-500 transition-colors line-clamp-1">
                    {item.title || 'Untitled'}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.content || ''}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/30">
                <span className="text-[11px] font-mono text-zinc-400">
                  {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Recent'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onOpenEditModal(item)}
                    className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <i className="fa-solid fa-pen text-[10px] mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDeleteNews(item.id)}
                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <i className="fa-solid fa-trash text-[10px]" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}


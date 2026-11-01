import React, { useState } from 'react';

export default function NoticeModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Notice title is required.');
      return;
    }
    if (!content.trim()) {
      setError('Notice content is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onSave({
        title: title.trim(),
        content: content.trim()
      });
      setTitle('');
      setContent('');
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to broadcast notice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-lg glossy-dialog rounded-3xl shadow-2xl overflow-hidden modal-enter">
        <div className="specular-line" />
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20">
              <i className="fa-solid fa-bullhorn" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">
                Broadcast Notice
              </h3>
              <p className="text-xs text-zinc-400">
                Push announcement or operational alert to mobile users
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium flex items-center space-x-2">
              <i className="fa-solid fa-triangle-exclamation" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">
              Notice Headline *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Urgent: Emergency Blood Drive in Mirpur"
              className="w-full px-4 py-2.5 rounded-xl glossy-input text-zinc-900 dark:text-white text-sm focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">
              Announcement Message *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Write the message details clearly..."
              className="w-full px-4 py-2.5 rounded-xl glossy-input text-zinc-900 dark:text-white text-sm focus:outline-none resize-none leading-relaxed"
              required
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {loading && <i className="fa-solid fa-spinner fa-spin" />}
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

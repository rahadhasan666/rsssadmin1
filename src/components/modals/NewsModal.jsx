import React, { useState, useEffect } from 'react';

export default function NewsModal({ isOpen, onClose, initialData, onSave }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setImageUrl(initialData.imageUrl || '');
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setImageUrl('');
      setContent('');
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Article title is required.');
      return;
    }
    if (!content.trim()) {
      setError('Article content is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onSave({
        title: title.trim(),
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80',
        content: content.trim()
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save news article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-xl glossy-dialog rounded-3xl shadow-2xl overflow-hidden modal-enter">
        <div className="specular-line" />
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold border border-rose-500/20">
              <i className="fa-solid fa-newspaper" />
            </div>
            <div>
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base">
                {initialData ? 'Edit News Article' : 'Publish News Article'}
              </h3>
              <p className="text-xs text-zinc-400">
                {initialData ? 'Update article details and banner' : 'Post updates to mobile app news feed'}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {error && (
            <div className="p-3.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium flex items-center space-x-2">
              <i className="fa-solid fa-triangle-exclamation" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free Blood Donation Camp in Dhaka"
              className="w-full px-4 py-2.5 rounded-xl glossy-input text-zinc-900 dark:text-white text-sm focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">
              Banner Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl glossy-input text-zinc-900 dark:text-white text-sm focus:outline-none font-mono text-xs"
            />
            {imageUrl && (
              <div className="mt-2 relative rounded-xl overflow-hidden h-32 border border-white/[0.1]">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Write the full news body, venue details, donor guidelines, etc..."
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
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
            >
              {loading && <i className="fa-solid fa-spinner fa-spin" />}
              <span>{initialData ? 'Update Article' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

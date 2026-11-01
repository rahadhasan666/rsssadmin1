import React, { useState, useEffect } from 'react';

export default function AppLockTab({
  appStatus = {},
  onToggleLock,
  onSaveAnnouncement,
  onShowToast
}) {
  const isLocked = appStatus.isMaintenanceMode === true || appStatus.isLocked === true;

  const [title, setTitle] = useState(appStatus.maintenanceTitle || 'App Under Maintenance / কাস্টম সার্ভিস আপডেট');
  const [message, setMessage] = useState(
    appStatus.maintenanceMessage ||
      'Our app is currently undergoing scheduled system updates & maintenance to enhance service performance and security. We will be back online shortly!'
  );
  const [fbUrl, setFbUrl] = useState(appStatus.developerFacebookUrl || 'https://facebook.com/h4x007/');
  const [isSaving, setIsSaving] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    if (appStatus.maintenanceTitle) setTitle(appStatus.maintenanceTitle);
    if (appStatus.maintenanceMessage) setMessage(appStatus.maintenanceMessage);
    if (appStatus.developerFacebookUrl) setFbUrl(appStatus.developerFacebookUrl);
  }, [appStatus.maintenanceTitle, appStatus.maintenanceMessage, appStatus.developerFacebookUrl]);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      // Toggle to opposite of current state
      await onToggleLock(!isLocked);
    } finally {
      setIsToggling(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveAnnouncement(
        title.trim() || 'App Under Maintenance / কাস্টম সার্ভিস আপডেট',
        message.trim() || 'Our app is currently undergoing scheduled system updates & maintenance.',
        fbUrl.trim() || 'https://facebook.com/h4x007/'
      );
      onShowToast("Maintenance Announcement Saved Successfully!", "success");
    } catch (err) {
      onShowToast("Error saving announcement: " + err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Live Lock Status Banner Card */}
        <div
          className={`p-8 rounded-3xl border-2 shadow-xl backdrop-blur-xl transition-all duration-300 ${
            isLocked
              ? 'bg-rose-500/10 border-rose-500/30 shadow-rose-950/20'
              : 'bg-emerald-500/10 border-emerald-500/30 shadow-emerald-950/10'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border ${
                  isLocked
                    ? 'bg-rose-500/20 text-rose-500 dark:text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                }`}
              >
                <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}`} />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3.5 py-1.5 font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center border ${
                      isLocked
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full mr-2 ${
                        isLocked ? 'bg-rose-500 animate-ping' : 'bg-emerald-500 animate-pulse'
                      }`}
                    />
                    {isLocked ? 'APP IS LOCKED (MAINTENANCE MODE ACTIVE)' : 'App Active & Unlocked'}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mt-2 tracking-tight">
                  {isLocked
                    ? 'Mobile App is Locked & Under Maintenance'
                    : 'Mobile App is Running Normally'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {isLocked
                    ? 'Users opening the mobile app will see the Lottie Maintenance Screen and cannot access features.'
                    : 'All users can access the app features, blood requests, and donor directories.'}
                </p>
              </div>
            </div>

            {/* Main Toggle Button */}
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className={`px-8 py-4 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center space-x-3 text-nowrap cursor-pointer disabled:opacity-75 ${
                isLocked
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-emerald-950/40'
                  : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-950/40'
              }`}
            >
              {isToggling ? (
                <i className="fa-solid fa-spinner fa-spin text-base" />
              ) : (
                <i className={`fa-solid ${isLocked ? 'fa-lock-open' : 'fa-lock'} text-base`} />
              )}
              <span>
                {isToggling
                  ? 'Updating Cloud State...'
                  : isLocked
                  ? 'UNLOCK APP NOW'
                  : 'LOCK APP NOW'}
              </span>
            </button>
          </div>
        </div>

        {/* Maintenance Customization Form */}
        <div className="glossy-panel p-8 rounded-3xl shadow-xl space-y-6">
          <div className="specular-line" />
          <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center">
              <i className="fa-solid fa-sliders text-rose-500 mr-2.5" />
              Customize Remote Maintenance Announcement
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              This custom title and explanation message will be displayed to mobile users when the app is locked.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1.5 font-mono">
                Maintenance Header Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="App Under Maintenance / কাস্টম সার্ভিস আপডেট"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1.5 font-mono">
                Maintenance Explanation Message (English & Bengali)
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Our app is currently undergoing scheduled system updates & maintenance to enhance service performance and security. We will be back online shortly!"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 uppercase mb-1.5 font-mono">
                Developer Support Facebook URL
              </label>
              <input
                type="url"
                value={fbUrl}
                onChange={(e) => setFbUrl(e.target.value)}
                placeholder="https://facebook.com/h4x007/"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500"
              />
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-950/20 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer disabled:opacity-75"
              >
                <i className="fa-solid fa-floppy-disk" />
                <span>{isSaving ? 'Saving Announcement...' : 'Save Maintenance Announcement'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


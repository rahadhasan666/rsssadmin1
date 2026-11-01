import React, { useState } from 'react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function RegisterUserModal({ isOpen, onClose, onRegister, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: 'A+',
    address: '',
    dob: '2000-01-01',
    profileImageUrl: '',
    isAvailable: true,
    isOrgMember: false
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onRegister(formData);
      onShowToast("New User Registered Successfully!", "success");
      onClose();
    } catch (err) {
      onShowToast(err.message || "Failed to register user", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
      <div className="relative glossy-dialog rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl modal-enter overflow-hidden">
        <div className="specular-line" />
        
        <div className="flex justify-between items-center border-b border-white/[0.08] pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg border border-emerald-500/20">
              <i className="fa-solid fa-user-plus" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                Register New Donor / User
              </h3>
              <p className="text-[11px] text-zinc-400 font-medium">Adds to cloud directory without logging out admin</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer">
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[72vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahad Hasan"
              className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="user@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Initial Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min 6 characters"
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="017XXXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Blood Group *</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white font-black focus:outline-none"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg} className="bg-zinc-900 text-white font-bold">{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Address / Location</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Panchbibi, Joypurhat"
              className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-zinc-400 mb-1 uppercase font-mono">Profile Image URL</label>
              <input
                type="url"
                value={formData.profileImageUrl}
                onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl text-sm glossy-input text-zinc-900 dark:text-white focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">Ready for Blood Donation</p>
              <p className="text-[11px] text-zinc-400">Can receive urgent donation alerts</p>
            </div>
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white">Organization Member Badge</p>
              <p className="text-[11px] text-zinc-400">Displays official verified member badge</p>
            </div>
            <input
              type="checkbox"
              checked={formData.isOrgMember}
              onChange={(e) => setFormData({ ...formData, isOrgMember: e.target.checked })}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-60 cursor-pointer"
            >
              {submitting && <i className="fa-solid fa-spinner fa-spin" />}
              <span>Create Donor Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

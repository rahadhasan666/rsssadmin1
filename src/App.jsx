import React, { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import {
  db,
  loginAdmin,
  logoutAdmin,
  autoSignInAdmin,
  registerNewDonor,
  updateUserStatus,
  updateUserBadge,
  updateUserDetails,
  deleteUserRecord,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  createNotice,
  deleteNotice,
  updateAppLockState,
  saveAppLockCustomization
} from './firebase';

import Toast from './components/Toast';
import LoginModal from './components/LoginModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';

import DashboardTab from './components/tabs/DashboardTab';
import UsersTab from './components/tabs/UsersTab';
import CertificateTab from './components/tabs/CertificateTab';
import EmailTab from './components/tabs/EmailTab';
import NewsTab from './components/tabs/NewsTab';
import NoticesTab from './components/tabs/NoticesTab';
import SubmissionsTab from './components/tabs/SubmissionsTab';
import AppLockTab from './components/tabs/AppLockTab';

import RegisterUserModal from './components/modals/RegisterUserModal';
import EditUserModal from './components/modals/EditUserModal';
import NewsModal from './components/modals/NewsModal';
import NoticeModal from './components/modals/NoticeModal';

import { downloadDonorsPDF } from './services/pdfService';

export default function App() {
  // Authentication State
  const [isAuthed, setIsAuthed] = useState(() => {
    return sessionStorage.getItem('rsss_admin_authed') === 'true';
  });
  const [loginError, setLoginError] = useState('');

  // Dark / Light Theme State (default dark for high-end look)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('rsss_admin_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFilterGroup, setUserFilterGroup] = useState('ALL');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Firestore Realtime Collections State
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [financialHelp, setFinancialHelp] = useState([]);
  const [cyberReports, setCyberReports] = useState([]);
  const [memberApps, setMemberApps] = useState([]);
  const [appTesters, setAppTesters] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [mailQueue, setMailQueue] = useState([]);
  const [appStatus, setAppStatus] = useState({});

  // Modals State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Sync Theme with DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rsss_admin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rsss_admin_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Auth Operations
  const handleLogin = async (email, password) => {
    setLoginError('');
    try {
      await loginAdmin(email, password);
      sessionStorage.setItem('rsss_admin_authed', 'true');
      setIsAuthed(true);
      showToast('Admin logged in successfully', 'success');
    } catch (err) {
      console.error(err);
      setLoginError(err.message || 'Invalid credentials.');
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('rsss_admin_authed');
    setIsAuthed(false);
    await logoutAdmin().catch(() => {});
    showToast('Logged out of admin console', 'info');
  };

  // Setup Realtime Firestore Listeners on Auth
  useEffect(() => {
    if (!isAuthed) return;

    // Ensure Firebase has an active session for rules
    autoSignInAdmin();

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setUsers(list);
      setIsInitialLoading(false);
    }, (err) => {
      console.warn('Users listener:', err);
      setIsInitialLoading(false);
    });

    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setNews(list);
    }, (err) => console.warn('News listener:', err));

    const unsubNotices = onSnapshot(collection(db, 'notices'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setNotices(list);
    }, (err) => console.warn('Notices listener:', err));

    const unsubSupport = onSnapshot(collection(db, 'support_requests'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setSupportRequests(list);
    }, (err) => console.warn('Support listener:', err));

    const unsubFinancial = onSnapshot(collection(db, 'financial_help_requests'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setFinancialHelp(list);
    }, (err) => console.warn('Financial help listener:', err));

    const unsubCyber = onSnapshot(collection(db, 'cyber_help_reports'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setCyberReports(list);
    }, (err) => console.warn('Cyber listener:', err));

    const unsubMember = onSnapshot(collection(db, 'member_applications'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setMemberApps(list);
    }, (err) => console.warn('Member apps listener:', err));

    const unsubTesters = onSnapshot(collection(db, 'app_tester_applications'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setAppTesters(list);
    }, (err) => console.warn('App testers listener:', err));

    const unsubDonations = onSnapshot(collection(db, 'donation_requests'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setDonationRequests(list);
    }, (err) => console.warn('Donation listener:', err));

    const unsubBlood = onSnapshot(collection(db, 'blood_requests'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setBloodRequests(list);
    }, (err) => console.warn('Blood requests listener:', err));

    const unsubMail = onSnapshot(collection(db, 'mail'), (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setMailQueue(list);
    }, (err) => console.warn('Mail listener:', err));

    const unsubAppStatus = onSnapshot(doc(db, 'system_config', 'app_status'), (docSnap) => {
      if (docSnap.exists()) {
        setAppStatus(docSnap.data());
      }
    }, (err) => console.warn('App status listener:', err));

    return () => {
      unsubUsers();
      unsubNews();
      unsubNotices();
      unsubSupport();
      unsubFinancial();
      unsubCyber();
      unsubMember();
      unsubTesters();
      unsubDonations();
      unsubBlood();
      unsubMail();
      unsubAppStatus();
    };
  }, [isAuthed]);

  // User Actions
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await updateUserStatus(userId, !currentStatus);
      showToast(`Donor availability updated to ${!currentStatus ? 'Available' : 'Unavailable'}`, 'success');
    } catch (err) {
      showToast('Error updating status: ' + err.message, 'error');
    }
  };

  const handleToggleBadge = async (userId, currentBadge) => {
    try {
      await updateUserBadge(userId, !currentBadge);
      showToast(`Organization Member badge updated`, 'success');
    } catch (err) {
      showToast('Error updating badge: ' + err.message, 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to permanently delete this donor's record?")) return;
    try {
      await deleteUserRecord(userId);
      showToast('Donor deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting donor: ' + err.message, 'error');
    }
  };

  const handleOpenEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEditUser = async (userId, data) => {
    await updateUserDetails(userId, data);
  };

  const handleRegisterDonor = async (formData) => {
    return await registerNewDonor(formData);
  };

  // PDF Export
  const handleDownloadDonorsPDF = () => {
    downloadDonorsPDF(users, userFilterGroup);
    showToast(`Exported ${userFilterGroup} Donors Directory PDF`, 'success');
  };

  // News Actions
  const handleOpenAddNews = () => {
    setEditingNews(null);
    setIsNewsModalOpen(true);
  };

  const handleOpenEditNews = (item) => {
    setEditingNews(item);
    setIsNewsModalOpen(true);
  };

  const handleSaveNews = async (data) => {
    if (editingNews) {
      await updateNewsArticle(editingNews.id, data);
      showToast('News article updated successfully!', 'success');
    } else {
      await createNewsArticle(data);
      showToast('News article published successfully!', 'success');
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteNewsArticle(newsId);
      showToast('Article deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting news: ' + err.message, 'error');
    }
  };

  // Notice Actions
  const handleOpenAddNotice = () => {
    setIsNoticeModalOpen(true);
  };

  const handleSaveNotice = async (data) => {
    await createNotice(data);
    showToast('Notice broadcasted to mobile users!', 'success');
  };

  const handleDeleteNotice = async (noticeId) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await deleteNotice(noticeId);
      showToast('Notice deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting notice: ' + err.message, 'error');
    }
  };

  // App Remote Lock
  const handleToggleLock = async (targetStatus) => {
    const actionWord = targetStatus ? 'LOCK' : 'UNLOCK';
    if (!window.confirm(`Are you sure you want to ${actionWord} the mobile app for all users?`)) {
      return;
    }
    try {
      await updateAppLockState(targetStatus);
      showToast(
        `Mobile app remote lock ${targetStatus ? 'ACTIVATED (App Locked)' : 'DEACTIVATED (App Unlocked)'}!`,
        targetStatus ? 'warning' : 'success'
      );
    } catch (err) {
      showToast('Error toggling app lock: ' + err.message, 'error');
    }
  };

  const handleSaveAppLockCustomization = async (title, msg, fb) => {
    await saveAppLockCustomization(title, msg, fb);
  };

  // Filter blood group helper from Dashboard
  const handleFilterFromDashboard = (bloodGroup) => {
    setUserFilterGroup(bloodGroup);
    setActiveTab('users');
  };

  // If not logged in, show Executive Login Gate
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Toast toasts={toasts} />
        <LoginModal onLogin={handleLogin} error={loginError} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex font-sans antialiased selection:bg-rose-500 selection:text-white transition-colors duration-200 ${
        isDark ? 'crm-canvas-dark text-zinc-100 dark' : 'crm-canvas-light text-zinc-900'
      }`}
    >
      <Toast toasts={toasts} />
      {isInitialLoading && <LoadingOverlay message="Synchronizing RSSS Realtime Cloud & CRM Analytics..." />}

      {/* Floating / Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileSidebarOpen(false);
        }}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          activeTab={activeTab}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              users={users}
              news={news}
              bloodRequests={bloodRequests}
              supportRequests={supportRequests}
              isDark={isDark}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onFilterBloodGroup={handleFilterFromDashboard}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              users={users}
              filterGroup={userFilterGroup}
              onFilterGroupChange={setUserFilterGroup}
              onToggleStatus={handleToggleStatus}
              onToggleBadge={handleToggleBadge}
              onOpenEditModal={handleOpenEditUser}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
              onDeleteUser={handleDeleteUser}
              onDownloadPDF={handleDownloadDonorsPDF}
            />
          )}

          {activeTab === 'certificate' && (
            <CertificateTab
              users={users}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'email' && (
            <EmailTab
              users={users}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'news' && (
            <NewsTab
              news={news}
              onOpenAddModal={handleOpenAddNews}
              onOpenEditModal={handleOpenEditNews}
              onDeleteNews={handleDeleteNews}
            />
          )}

          {activeTab === 'notices' && (
            <NoticesTab
              notices={notices}
              onOpenAddModal={handleOpenAddNotice}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {activeTab === 'submissions' && (
            <SubmissionsTab
              supportRequests={supportRequests}
              financialHelp={financialHelp}
              cyberReports={cyberReports}
              memberApps={memberApps}
              appTesters={appTesters}
              donationRequests={donationRequests}
              bloodRequests={bloodRequests}
              mailQueue={mailQueue}
            />
          )}

          {activeTab === 'applock' && (
            <AppLockTab
              appStatus={appStatus}
              onToggleLock={handleToggleLock}
              onSaveAnnouncement={handleSaveAppLockCustomization}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <RegisterUserModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterDonor}
        onShowToast={showToast}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSave={handleSaveEditUser}
        onShowToast={showToast}
      />

      <NewsModal
        isOpen={isNewsModalOpen}
        onClose={() => {
          setIsNewsModalOpen(false);
          setEditingNews(null);
        }}
        initialData={editingNews}
        onSave={handleSaveNews}
      />

      <NoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onSave={handleSaveNotice}
      />
    </div>
  );
}

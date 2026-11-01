import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInAnonymously
} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBu7hH8nl88RkTLk85tR7ulnOIYvEblh-w",
  authDomain: "rsss-444ba.firebaseapp.com",
  projectId: "rsss-444ba",
  storageBucket: "rsss-444ba.firebasestorage.app",
  messagingSenderId: "448170053161",
  appId: "1:448170053161:web:df8e5f5a4eadfdf6d05638"
};

// Initialize Primary App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Authentication Operations
export async function loginAdmin(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (authErr) {
    if (authErr.code === 'auth/user-not-found') {
      return await createUserWithEmailAndPassword(auth, email, password);
    }
    throw authErr;
  }
}

export async function logoutAdmin() {
  await signOut(auth);
}

export async function ensureAdminAuth() {
  if (
    !auth.currentUser ||
    (auth.currentUser.email !== 'admin@admin.com' && auth.currentUser.email !== 'academycybercraft@gmail.com')
  ) {
    try {
      await signInWithEmailAndPassword(auth, 'admin@admin.com', 'rahad7880');
    } catch (err) {
      console.warn("Admin sign-in verification:", err);
    }
  }
}

export function autoSignInAdmin(defaultEmail = 'admin@admin.com', defaultPass = 'rahad7880') {
  if (!auth.currentUser) {
    signInWithEmailAndPassword(auth, defaultEmail, defaultPass).catch(() => {
      signInAnonymously(auth).catch(err => console.warn("Anon sign-in fallback:", err));
    });
  }
}

// User Registration via Secondary App Instance (to avoid logging out the current admin session)
export async function registerNewDonor(formData) {
  const secondaryApp = getApps().find(a => a.name === 'Secondary') || initializeApp(firebaseConfig, 'Secondary');
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const userCred = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
    const uid = userCred.user.uid;

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const userId = "RSSS" + randomNum;

    const userData = {
      userId: userId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      bloodGroup: formData.bloodGroup,
      dateOfBirth: formData.dob || '2000-01-01',
      profileImageUrl: formData.profileImageUrl ? formData.profileImageUrl.trim() : null,
      isAvailable: Boolean(formData.isAvailable),
      isOrganizationMember: Boolean(formData.isOrgMember),
      isTwoStepEnabled: false,
      totalDonations: 0,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', uid), userData);
    await signOut(secondaryAuth);
    return uid;
  } catch (err) {
    await signOut(secondaryAuth).catch(() => {});
    throw err;
  }
}

// User Operations
export async function updateUserStatus(userId, isAvailable) {
  return await updateDoc(doc(db, 'users', userId), { isAvailable });
}

export async function updateUserBadge(userId, isOrganizationMember) {
  return await updateDoc(doc(db, 'users', userId), { isOrganizationMember });
}

export async function updateUserDetails(userId, data) {
  return await updateDoc(doc(db, 'users', userId), data);
}

export async function deleteUserRecord(userId) {
  return await deleteDoc(doc(db, 'users', userId));
}

// News Operations
export async function createNewsArticle(data) {
  return await addDoc(collection(db, 'news'), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function updateNewsArticle(newsId, data) {
  return await updateDoc(doc(db, 'news', newsId), data);
}

export async function deleteNewsArticle(newsId) {
  return await deleteDoc(doc(db, 'news', newsId));
}

// Notices Operations
export async function createNotice(data) {
  return await addDoc(collection(db, 'notices'), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function deleteNotice(noticeId) {
  return await deleteDoc(doc(db, 'notices', noticeId));
}

// App Remote Lock & Maintenance Operations
export async function updateAppLockState(newStatus) {
  await ensureAdminAuth();
  const boolVal = Boolean(newStatus);
  return await setDoc(doc(db, 'system_config', 'app_status'), {
    isMaintenanceMode: boolVal,
    isLocked: boolVal,
    status: boolVal ? 'locked' : 'active',
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function saveAppLockCustomization(title, message, fbUrl) {
  await ensureAdminAuth();
  return await setDoc(doc(db, 'system_config', 'app_status'), {
    maintenanceTitle: title,
    maintenanceMessage: message,
    developerFacebookUrl: fbUrl,
    updatedAt: serverTimestamp()
  }, { merge: true });
}


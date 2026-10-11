import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from './firebase';

export type { User };

// Helper to translate Firebase Auth errors to user-friendly messages
export function formatAuthError(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';
  const code = error.code || '';
  const message = error.message || '';

  if (
    code === 'auth/user-not-found' ||
    code === 'auth/wrong-password' ||
    code === 'auth/invalid-credential'
  ) {
    return 'Invalid email address or password.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account with this email address already exists.';
  }
  if (code === 'auth/weak-password') {
    return 'Password should be at least 6 characters long.';
  }
  if (code === 'auth/invalid-email') {
    return 'Please enter a valid email address.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many unsuccessful attempts. Please try again later.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error. Please check your internet connection.';
  }

  return message || 'Authentication failed. Please try again.';
}

let demoUserSession: User | null = null;
const demoListeners: Set<(user: User | null) => void> = new Set();

export const firebaseAuthService = {
  // Register new user with email and password
  async registerWithEmail(
    email: string,
    pass: string,
    name?: string
  ): Promise<User> {
    if (!isFirebaseConfigured) {
      // Demo fallback if Firebase env vars not configured
      const demoUser = {
        uid: `demo-${Date.now()}`,
        email,
        displayName: name || email.split('@')[0],
      } as User;
      demoUserSession = demoUser;
      demoListeners.forEach((cb) => cb(demoUserSession));
      return demoUser;
    }

    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      pass
    );
    if (name && credential.user) {
      await updateProfile(credential.user, { displayName: name });
    }
    return credential.user;
  },

  // Login existing user with email and password
  async loginWithEmail(email: string, pass: string): Promise<User> {
    if (!isFirebaseConfigured) {
      // Demo fallback if Firebase env vars not configured
      const demoUser = {
        uid: `demo-user`,
        email,
        displayName: email.split('@')[0],
      } as User;
      demoUserSession = demoUser;
      demoListeners.forEach((cb) => cb(demoUserSession));
      return demoUser;
    }

    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      pass
    );
    return credential.user;
  },

  // Logout user
  async logoutUser(): Promise<void> {
    if (!isFirebaseConfigured) {
      demoUserSession = null;
      demoListeners.forEach((cb) => cb(null));
      return;
    }
    await signOut(firebaseAuth);
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!isFirebaseConfigured) {
      demoListeners.add(callback);
      // Immediately notify current demo session state
      callback(demoUserSession);
      return () => {
        demoListeners.delete(callback);
      };
    }
    return onAuthStateChanged(firebaseAuth, callback);
  },

  // Get current logged in user
  getCurrentUser(): User | null {
    if (!isFirebaseConfigured) return demoUserSession;
    return firebaseAuth.currentUser;
  },

  // Update user profile display name
  async updateUserProfile(displayName: string): Promise<void> {
    if (!isFirebaseConfigured) {
      if (demoUserSession) {
        demoUserSession = {
          ...demoUserSession,
          displayName,
        } as User;
        demoListeners.forEach((cb) => cb(demoUserSession));
      }
      return;
    }
    const user = firebaseAuth.currentUser;
    if (user) {
      await updateProfile(user, { displayName });
    }
  },

  // Send password reset email
  async sendPasswordReset(email: string): Promise<void> {
    if (!isFirebaseConfigured) {
      throw new Error(
        'Password reset is unavailable in demo mode. Please configure Firebase environment variables (VITE_FIREBASE_API_KEY).'
      );
    }
    await firebaseSendPasswordResetEmail(firebaseAuth, email);
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
};

import { User, UserRole } from '../types';

// Mock stored current user
let currentUser: User = {
  id: 'user-passenger-01',
  name: 'Barat Ankam',
  email: 'barat@example.com',
  phone: '+91 98765 43210',
  role: 'passenger',
  emergencyContact: '+91 91234 56789'
};

/**
 * Auth Service - Ready for Firebase Authentication / Custom JWT Auth API.
 * Currently uses mock state in memory and localStorage fallback.
 */
export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    // Future API: await firebaseAuth.currentUser or GET /api/v1/auth/me
    return new Promise((resolve) => {
      setTimeout(() => resolve(currentUser), 150);
    });
  },

  switchRole: (role: UserRole): User => {
    if (role === 'driver') {
      currentUser = {
        id: 'user-driver-01',
        name: 'R. Koteswara Rao (Driver)',
        email: 'driver.kotesh@findmybus.in',
        phone: '+91 98480 12345',
        role: 'driver'
      };
    } else if (role === 'admin') {
      currentUser = {
        id: 'user-admin-01',
        name: 'APSRTC Admin Portal',
        email: 'admin@findmybus.in',
        phone: '+91 866 2570005',
        role: 'admin'
      };
    } else {
      currentUser = {
        id: 'user-passenger-01',
        name: 'Barat Ankam',
        email: 'barat@example.com',
        phone: '+91 98765 43210',
        role: 'passenger',
        emergencyContact: '+91 91234 56789'
      };
    }
    return currentUser;
  },

  loginWithEmail: async (email: string, password: string): Promise<User> => {
    // Future API: await signInWithEmailAndPassword(auth, email, password)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 4) {
          reject(new Error('Invalid password. Minimum 4 characters required.'));
        } else {
          currentUser = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0].toUpperCase(),
            email: email,
            phone: '+91 98765 43210',
            role: 'passenger'
          };
          resolve(currentUser);
        }
      }, 400);
    });
  },

  register: async (data: { name: string; email: string; phone: string; password: string }): Promise<User> => {
    // Future API: await createUserWithEmailAndPassword(auth, email, password)
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = {
          id: 'user-' + Date.now(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: 'passenger'
        };
        resolve(currentUser);
      }, 400);
    });
  },

  updateProfile: async (updates: Partial<User>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = { ...currentUser, ...updates };
        resolve(currentUser);
      }, 300);
    });
  },

  logout: async (): Promise<void> => {
    // Future API: await signOut(auth)
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200);
    });
  }
};

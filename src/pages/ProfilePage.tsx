import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import { firebaseAuthService, User, formatAuthError } from '../services/firebaseAuth';

export const ProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    firebaseAuthService.getCurrentUser()
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
      setCurrentUser(user);
      if (user) {
        setFullName(user.displayName || user.email?.split('@')[0] || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const cleanName = fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      setErrorMessage('Full Name must be at least 2 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await firebaseAuthService.updateUserProfile(cleanName);
      setIsLoading(false);
      setSuccessMessage('Profile name updated successfully!');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(formatAuthError(err));
    }
  };

  const getInitial = () => {
    if (fullName) return fullName.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'P';
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Passenger Profile</h1>
        <p className="text-slate-600 text-base mt-1">
          Manage your personal details and travel preferences.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-2xl shrink-0">
            {getInitial()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {fullName || 'Passenger Account'}
            </h2>
            <p className="text-sm text-slate-500">
              {email || 'Find My Bus Member'}
            </p>
          </div>
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <Input
            label="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            icon={<UserIcon className="w-5 h-5 text-slate-400" />}
            required
          />

          <div className="space-y-1">
            <Input
              label="Email Address (Account Identifier)"
              value={email}
              disabled
              readOnly
              placeholder="No email address"
              icon={<Mail className="w-5 h-5 text-slate-400" />}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Email address is fixed to your authentication account.</span>
            </p>
          </div>

          <div className="space-y-1">
            <Input
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled
              readOnly
              placeholder="Not configured (requires database persistence)"
              icon={<Phone className="w-5 h-5 text-slate-400" />}
            />
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Phone number editing requires database/backend persistence.</span>
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              className="font-bold bg-blue-700 hover:bg-blue-800 text-white"
            >
              {isLoading ? 'Saving...' : 'Save Profile Changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;

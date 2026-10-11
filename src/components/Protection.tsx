import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { firebaseAuthService, User } from '../services/firebaseAuth';
import { LoadingState } from './ui';

interface ProtectionProps {
  children: React.ReactNode;
}

export const Protection: React.FC<ProtectionProps> = ({ children }) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    firebaseAuthService.getCurrentUser()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <LoadingState message="Checking authentication..." size="md" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default Protection;

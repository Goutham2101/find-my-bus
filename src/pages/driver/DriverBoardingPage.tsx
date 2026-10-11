import React, { useState, useEffect } from 'react';
import { driverService } from '../../services/driverService';
import { DriverTripManifest } from '../../types';
import { PassengerManifest } from '../../components/driver/PassengerManifest';
import { LoadingState } from '../../components/common/LoadingState';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DriverBoardingPage: React.FC = () => {
  const [manifest, setManifest] = useState<DriverTripManifest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchManifest = () => {
    setIsLoading(true);
    driverService.getDriverTripManifest().then((m) => {
      setManifest(m);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchManifest();
  }, []);

  if (isLoading || !manifest) {
    return <LoadingState message="Loading passenger boarding manifest..." />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/driver"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      <PassengerManifest manifest={manifest} onRefreshManifest={fetchManifest} />
    </div>
  );
};

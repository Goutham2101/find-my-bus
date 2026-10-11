import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { driverService } from '../../services/driverService';
import { DriverTripManifest } from '../../types';
import { LoadingState } from '../../components/common/LoadingState';
import { Bus, Navigation, UserCheck, Play, Square, ShieldCheck, MapPin } from 'lucide-react';

export const DriverDashboardPage: React.FC = () => {
  const [manifest, setManifest] = useState<DriverTripManifest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    driverService.getDriverTripManifest().then((m) => {
      setManifest(m);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !manifest) {
    return <LoadingState message="Loading driver console..." />;
  }

  const handleToggleTrip = async () => {
    const newStatus = manifest.status === 'Active' ? 'Scheduled' : 'Active';
    const updated = await driverService.updateTripStatus(newStatus);
    setManifest({ ...updated });
  };

  const boardedCount = manifest.passengers.filter((p) => p.isBoarded).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Console Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Driver & Conductor Portal
              </span>
              <h1 className="text-xl font-black text-white">APSRTC Super Luxury • {manifest.busNumber}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                manifest.status === 'Active'
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                  : 'bg-amber-900/80 text-amber-300 border border-amber-700'
              }`}
            >
              Trip Status: {manifest.status}
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs">
          <div>
            <span className="text-slate-400 uppercase font-semibold block">Route</span>
            <span className="font-bold text-white text-sm">{manifest.routeName}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-semibold block">Scheduled Departure</span>
            <span className="font-bold text-white text-sm">{manifest.departureTime}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase font-semibold block">Passenger Check-in</span>
            <span className="font-extrabold text-emerald-400 text-sm">
              {boardedCount} / {manifest.passengers.length} Boarded
            </span>
          </div>
        </div>

        {/* Start / Stop Trip Control Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          {manifest.status !== 'Active' ? (
            <button
              onClick={handleToggleTrip}
              className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Trip & Broadcast GPS
            </button>
          ) : (
            <button
              onClick={handleToggleTrip}
              className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" /> End Trip & Stop GPS
            </button>
          )}

          <Link
            to="/driver/boarding"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" /> Boarding Manifest
          </Link>
          <Link
            to="/driver/trip"
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" /> GPS & Route Controls
          </Link>
        </div>
      </div>
    </div>
  );
};

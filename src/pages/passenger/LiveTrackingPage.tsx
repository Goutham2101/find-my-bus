import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LiveLocationData } from '../../types';
import { trackingService } from '../../services/trackingService';
import { MapContainer } from '../../components/tracking/MapContainer';
import { LiveTrackingCard } from '../../components/tracking/LiveTrackingCard';
import { LockedTrackingCard } from '../../components/tracking/LockedTrackingCard';
import { LoadingState } from '../../components/common/LoadingState';
import { Navigation, ShieldAlert, ArrowLeft, RefreshCw, Settings2 } from 'lucide-react';

export const LiveTrackingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();

  // Interactive demo override state for quick testing of all security states
  const [demoStateOverride, setDemoStateOverride] = useState<string>('auto');

  const [locationData, setLocationData] = useState<LiveLocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTrackingData = () => {
    setIsLoading(true);
    const targetId = bookingId || 'FMB-AP-98241';

    trackingService.getLiveLocationForBooking(targetId).then((data) => {
      if (demoStateOverride === 'eligible') {
        setLocationData({ ...data, securityState: 'Eligible', isGpsAvailable: true, currentStatus: 'On Route' });
      } else if (demoStateOverride === 'not_started') {
        setLocationData({ ...data, securityState: 'LockedNotStarted', isGpsAvailable: false, currentStatus: 'Starting Soon' });
      } else if (demoStateOverride === 'future_date') {
        setLocationData({ ...data, securityState: 'LockedFutureDate', isGpsAvailable: false, currentStatus: 'Not Started' });
      } else if (demoStateOverride === 'invalid') {
        setLocationData({ ...data, securityState: 'InvalidBooking', isGpsAvailable: false });
      } else {
        setLocationData(data);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchTrackingData();
  }, [bookingId, demoStateOverride]);

  if (isLoading || !locationData) {
    return <LoadingState message="Connecting to APSRTC GPS telemetry feed..." />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Interactive Demo Test Controller Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-amber-400" />
          <span className="font-bold">GPS Eligibility Security Testing Suite:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setDemoStateOverride('auto')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              demoStateOverride === 'auto' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Auto (Booking {bookingId || 'FMB-AP-98241'})
          </button>
          <button
            onClick={() => setDemoStateOverride('eligible')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              demoStateOverride === 'eligible' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Active Journey Today (Unlocked)
          </button>
          <button
            onClick={() => setDemoStateOverride('not_started')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              demoStateOverride === 'not_started' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            2. Today Not Started
          </button>
          <button
            onClick={() => setDemoStateOverride('future_date')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              demoStateOverride === 'future_date' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            3. Journey Date Tomorrow (Locked)
          </button>
          <button
            onClick={() => setDemoStateOverride('invalid')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              demoStateOverride === 'invalid' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            4. Invalid Ticket
          </button>
        </div>
      </div>

      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/my-bookings"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-600" />
              Live Bus GPS Tracking
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Booking Ref: <span className="font-mono font-bold text-slate-800">{locationData.bookingId}</span>
            </p>
          </div>
        </div>

        <button
          onClick={fetchTrackingData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Sync Telemetry
        </button>
      </div>

      {/* SECURITY GATING EVALUATION */}
      {locationData.securityState !== 'Eligible' ? (
        <LockedTrackingCard
          securityState={locationData.securityState as any}
          journeyDate={new Date().toISOString().split('T')[0]}
          bookingId={locationData.bookingId}
        />
      ) : (
        /* UNLOCKED FULL TRACKING UI */
        <div className="space-y-6">
          <MapContainer locationData={locationData} />
          <LiveTrackingCard locationData={locationData} onRefresh={fetchTrackingData} />
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { LiveLocationData } from '../../types';
import { Clock, Navigation, Phone, ShieldCheck, User, RefreshCw, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface LiveTrackingCardProps {
  locationData: LiveLocationData;
  onRefresh?: () => void;
}

export const LiveTrackingCard: React.FC<LiveTrackingCardProps> = ({ locationData, onRefresh }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-6">
      {/* Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Status</span>
          <div className="flex items-center gap-2 mt-0.5">
            <StatusBadge status={locationData.currentStatus} size="md" />
            <span className="text-xs text-slate-500">Updated {locationData.lastUpdated}</span>
          </div>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh GPS
          </button>
        )}
      </div>

      {/* Primary ETA & Distance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl text-center">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
            Estimated Arrival (ETA)
          </span>
          <span className="text-2xl font-black text-blue-900">{locationData.etaMinutes} mins</span>
          <span className="block text-[10px] text-blue-600 font-medium">To Boarding Stop</span>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-2xl text-center">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Distance Remaining
          </span>
          <span className="text-2xl font-black text-emerald-900">{locationData.distanceRemainingKm} km</span>
          <span className="block text-[10px] text-emerald-600 font-medium">On National Highway</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Next Stop
          </span>
          <span className="text-base font-extrabold text-slate-800 truncate block">
            {locationData.nextStopName}
          </span>
          <span className="block text-[10px] text-slate-400 font-medium">Approaching Soon</span>
        </div>
      </div>

      {/* Driver & Bus Info Box */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{locationData.driverName}</h4>
            <p className="text-xs text-slate-500 font-medium">Assigned Driver • Bus #{locationData.busNumber}</p>
          </div>
        </div>

        <a
          href={`tel:${locationData.driverPhone}`}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" /> Call Driver
        </a>
      </div>

      {/* GPS Fallback Warning notice if signal is lost or temporary */}
      {!locationData.isGpsAvailable && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Live location is temporarily unavailable. Showing last known location recorded.</span>
        </div>
      )}
    </div>
  );
};

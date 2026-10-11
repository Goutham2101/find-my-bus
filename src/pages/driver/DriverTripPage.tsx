import React, { useState } from 'react';
import { Navigation, MapPin, Radio, ShieldCheck, AlertCircle, Wifi } from 'lucide-react';

export const DriverTripPage: React.FC = () => {
  const [gpsSignalState, setGpsSignalState] = useState<'Active' | 'Permission Required' | 'Disabled' | 'Signal Lost'>('Active');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-600" />
              Driver GPS Telemetry Control
            </h1>
            <p className="text-xs text-slate-500 font-medium">Manage browser/device geolocation broadcast</p>
          </div>

          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              gpsSignalState === 'Active'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            GPS Status: {gpsSignalState}
          </span>
        </div>

        {/* GPS Permission Explanation Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-2">
          <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
            Location Permission Required
          </h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Location permission is required to share your bus location in real-time with passengers waiting at upcoming stops.
          </p>
        </div>

        {/* Interactive GPS Test Controls */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Simulate Driver Geolocation Status:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Active', 'Permission Required', 'Disabled', 'Signal Lost'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setGpsSignalState(st)}
                className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                  gpsSignalState === st
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

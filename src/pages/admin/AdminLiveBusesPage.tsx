import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Navigation, Bus, Radio, RefreshCw } from 'lucide-react';

export const AdminLiveBusesPage: React.FC = () => {
  const [fleet, setFleet] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getLiveFleet().then((data: any) => {
      setFleet(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Connecting to WebSocket Live Fleet Stream..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" /> Live Fleet Tracking Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium">Real-time GPS telemetry feed ready for Socket.IO integration</p>
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> WebSocket Socket.IO Ready
        </span>
      </div>

      {/* Fleet Map Overview Container */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 h-80 border border-slate-800 shadow-xl relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        ></div>

        <div className="text-center z-10 space-y-2">
          <Bus className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="text-base font-bold">APSRTC Master Control Fleet Map</h3>
          <p className="text-xs text-slate-400">Monitoring {fleet.length} Active Bus Vehicles in Real-Time</p>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fleet.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900">{item.busNumber}</span>
              <StatusBadge status={item.status} size="sm" />
            </div>

            <p className="text-xs font-bold text-blue-700">{item.route}</p>
            <p className="text-xs text-slate-500">Driver: <strong className="text-slate-800">{item.driverName}</strong></p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Speed: <strong className="text-slate-900">{item.speed} km/h</strong></span>
              <span>Updated: {item.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

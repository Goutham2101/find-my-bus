import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Trip } from '../../types';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Calendar, Plus } from 'lucide-react';

export const AdminTripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllTrips().then((t) => {
      setTrips(t);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Loading trip schedules..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Trip Schedule Dispatch</h1>
          <p className="text-xs text-slate-500 font-medium">Assign drivers, buses, and departure slots</p>
        </div>

        <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Schedule Trip
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {trips.map((trip) => (
            <div key={trip.id} className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{trip.bus.operatorName}</h3>
                <p className="text-xs text-slate-500">
                  {trip.route.routeName} ({trip.journeyDate} at {trip.departureTime})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={trip.status} size="sm" />
                <span className="text-xs font-bold text-slate-700">Driver: {trip.driverName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Route } from '../../types';
import { LoadingState } from '../../components/common/LoadingState';
import { MapPin, Plus } from 'lucide-react';

export const AdminRoutesPage: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllRoutes().then((r) => {
      setRoutes(r);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Loading route catalog..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Route & Intermediate Stops Management</h1>
          <p className="text-xs text-slate-500 font-medium">Configure highway corridors across Andhra Pradesh</p>
        </div>

        <button
          onClick={() => alert('Add route modal triggered')}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Route
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">{route.routeName}</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                {route.status}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {route.distanceKm} km • Est. Duration: {route.estimatedDurationHours} hours
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-bold">
              <span>{route.stops.length} Intermediate Boarding Stops</span>
              <button className="hover:underline">View Stops</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { DriverUser } from '../../mockData/adminData';
import { LoadingState } from '../../components/common/LoadingState';
import { UserCheck, Plus, Phone } from 'lucide-react';

export const AdminDriversPage: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllDrivers().then((d) => {
      setDrivers(d);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Loading driver duty roster..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Driver & Conductor Roster</h1>
          <p className="text-xs text-slate-500 font-medium">Manage driver licenses, assigned buses, and duty status</p>
        </div>

        <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drivers.map((drv) => (
          <div key={drv.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{drv.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{drv.licenseNumber}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {drv.status}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
              <p>Assigned Vehicle: <strong className="text-slate-900">{drv.assignedBusNumber}</strong></p>
              <p className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone: <strong className="text-slate-900">{drv.phone}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { FileSpreadsheet, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-black text-slate-900">System Performance & Occupancy Reports</h1>
        <p className="text-xs text-slate-500 font-medium">Analytics reports generated from mock system logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">On-Time Departure Rate</h3>
          <p className="text-2xl font-black text-emerald-600">94.2%</p>
          <p className="text-xs text-slate-500">Evaluated across 128 daily trips</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">Average Seat Occupancy</h3>
          <p className="text-2xl font-black text-blue-700">86.5%</p>
          <p className="text-xs text-slate-500">Peak weekend occupancy: 95%</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <CheckCircle className="w-6 h-6 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">Digital Ticket Adoption</h3>
          <p className="text-2xl font-black text-slate-900">78.0%</p>
          <p className="text-xs text-slate-500">Keypad / SMS Ticket Boarding: 22%</p>
        </div>
      </div>
    </div>
  );
};

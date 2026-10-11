import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bus, ShieldCheck } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { StatusBadge } from '../ui';

export interface BusHeaderProps {
  bus: BusTrip;
  searchBackUrl: string;
}

export const BusHeader: React.FC<BusHeaderProps> = ({ bus, searchBackUrl }) => {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div>
        <Link
          to={searchBackUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </Link>
      </div>

      {/* Operator & Service Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {bus.operator}
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                {bus.serviceName} • <span className="font-semibold text-slate-900">{bus.busNumber}</span>
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                bus.operatorType === 'RTC'
                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                  : 'bg-purple-100 text-purple-900 border border-purple-200'
              }`}
            >
              {bus.operatorType === 'RTC' ? 'APSRTC (Govt)' : 'Private Operator'}
            </span>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {bus.isAC ? 'AC' : 'Non-AC'}
            </span>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {bus.isSleeper ? 'Sleeper' : 'Seater'}
            </span>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {bus.category}
            </span>
          </div>
        </div>

        {/* Live seat status badge */}
        <div className="shrink-0 flex items-center gap-3 md:flex-col md:items-end">
          <StatusBadge
            status={bus.availableSeats < 10 ? 'delayed' : 'on-time'}
            label={`${bus.availableSeats} seats available out of ${bus.totalSeats}`}
          />
        </div>
      </div>
    </div>
  );
};

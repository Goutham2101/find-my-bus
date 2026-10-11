import React from 'react';
import { MapPin, Clock, Calendar, ArrowRight } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card } from '../ui';

export interface JourneySummaryCardProps {
  bus: BusTrip;
  journeyDate: string;
}

export const JourneySummaryCard: React.FC<JourneySummaryCardProps> = ({
  bus,
  journeyDate,
}) => {
  const formattedDateDisplay = React.useMemo(() => {
    try {
      const d = new Date(journeyDate);
      if (isNaN(d.getTime())) return journeyDate;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return journeyDate;
    }
  }, [journeyDate]);

  return (
    <Card className="bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
      {/* Journey Date Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Scheduled Journey
          </span>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <span>{bus.departureLocation}</span>
            <ArrowRight className="w-5 h-5 text-blue-700" />
            <span>{bus.arrivalLocation}</span>
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm font-semibold self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-blue-700" />
          <span>Journey Date: <strong>{formattedDateDisplay}</strong></span>
        </div>
      </div>

      {/* Main Timing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Departure */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wide bg-blue-100 px-2 py-0.5 rounded">
            DEPARTURE
          </span>
          <div className="text-3xl font-black text-slate-900 pt-1">
            {bus.departureTimeFormatted}
          </div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-blue-700 shrink-0" />
            <span>{bus.departureLocation}</span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {bus.departureStation}
          </p>
        </div>

        {/* Duration Arrow indicator */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center my-2 md:my-0">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-500" />
            Total Duration: {bus.duration}
          </span>
          <div className="w-full max-w-[160px] flex items-center justify-center gap-2 my-2">
            <div className="h-0.5 flex-1 bg-slate-300 rounded" />
            <ArrowRight className="w-5 h-5 text-blue-700 shrink-0" />
            <div className="h-0.5 flex-1 bg-slate-300 rounded" />
          </div>
          <span className="text-xs text-slate-500 font-semibold">Direct Transit Service</span>
        </div>

        {/* Arrival */}
        <div className="md:col-span-4 space-y-1.5 md:text-right">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded">
            ARRIVAL
          </span>
          <div className="text-3xl font-black text-slate-900 pt-1">
            {bus.arrivalTimeFormatted}
          </div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1.5 md:justify-end">
            <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{bus.arrivalLocation}</span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {bus.arrivalStation}
          </p>
        </div>
      </div>
    </Card>
  );
};

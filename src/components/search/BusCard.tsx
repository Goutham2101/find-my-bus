import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, ShieldCheck, Armchair } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card, Button, StatusBadge } from '../ui';

export interface BusCardProps {
  bus: BusTrip;
}

export const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/bus/${bus.id}`);
  };

  const handleSelectSeats = () => {
    navigate(`/booking/${bus.id}/seats`);
  };

  return (
    <Card className="hover:border-blue-300 transition-all duration-200 p-5 sm:p-6 bg-white space-y-4">
      {/* Top Bar: Operator Name, Badges & Seats */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-extrabold text-lg text-slate-900">{bus.operator}</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
            {bus.busNumber}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded ${
              bus.operatorType === 'RTC'
                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                : 'bg-purple-100 text-purple-900 border border-purple-200'
            }`}
          >
            {bus.operatorType}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {bus.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {bus.availableSeats < 10 ? (
            <StatusBadge status="delayed" label={`${bus.availableSeats} seats left`} />
          ) : (
            <StatusBadge status="on-time" label={`${bus.availableSeats} seats available`} />
          )}
        </div>
      </div>

      {/* Main Trip Timing & Route Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Departure */}
        <div className="md:col-span-4 space-y-1">
          <div className="text-2xl font-black text-slate-900">
            {bus.departureTimeFormatted}
          </div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
            <span>{bus.departureLocation}</span>
          </div>
          <p className="text-xs text-slate-500 truncate" title={bus.departureStation}>
            {bus.departureStation}
          </p>
        </div>

        {/* Duration indicator */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center my-1 md:my-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {bus.duration}
          </span>
          <div className="w-full max-w-[140px] flex items-center justify-center gap-1 my-1">
            <div className="h-0.5 flex-1 bg-slate-300 rounded" />
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="h-0.5 flex-1 bg-slate-300 rounded" />
          </div>
          <span className="text-xs text-slate-400">Direct Route</span>
        </div>

        {/* Arrival */}
        <div className="md:col-span-4 space-y-1 md:text-right">
          <div className="text-2xl font-black text-slate-900">
            {bus.arrivalTimeFormatted}
          </div>
          <div className="text-sm font-bold text-slate-800 flex items-center gap-1 md:justify-end">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{bus.arrivalLocation}</span>
          </div>
          <p className="text-xs text-slate-500 truncate" title={bus.arrivalStation}>
            {bus.arrivalStation}
          </p>
        </div>
      </div>

      {/* Amenities & Action Bar */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Amenities preview */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
          {bus.amenities.map((item) => (
            <span key={item} className="px-2 py-1 bg-slate-50 rounded border border-slate-200">
              {item}
            </span>
          ))}
        </div>

        {/* Fare and Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">Starting from</span>
            <span className="text-2xl font-black text-blue-900">₹{bus.fare}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleViewDetails}
              variant="outline"
              size="sm"
              className="text-sm px-3.5 min-h-[40px]"
            >
              View Details
            </Button>
            <Button
              onClick={handleSelectSeats}
              variant="primary"
              size="sm"
              className="text-sm px-4 min-h-[40px] font-bold bg-amber-400 hover:bg-amber-300 text-blue-950 border-0"
              leftIcon={<Armchair className="w-4 h-4" />}
            >
              Select Seats
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

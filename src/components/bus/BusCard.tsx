import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trip } from '../../types';
import { Bus, Clock, ShieldCheck, Star, MapPin, Wifi, Zap, Droplets } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

interface BusCardProps {
  trip: Trip;
}

export const BusCard: React.FC<BusCardProps> = ({ trip }) => {
  const navigate = useNavigate();
  const { setSelectedTrip } = useBooking();

  const handleSelectSeats = () => {
    setSelectedTrip(trip);
    navigate(`/booking/${trip.id}/seats`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 md:p-6 mb-4">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">{trip.bus.operatorName}</h3>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  trip.bus.operatorType === 'APSRTC'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}
              >
                {trip.bus.operatorType}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
              <span>{trip.bus.busNumber}</span>
              <span>•</span>
              <span>{trip.bus.busType}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{trip.bus.rating}</span>
            <span className="text-slate-400 font-normal">({trip.bus.totalReviews})</span>
          </div>
        </div>
      </div>

      {/* Timing and Fare Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Departure -> Duration -> Arrival */}
        <div className="md:col-span-8 grid grid-cols-3 gap-2 text-center md:text-left items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="text-lg font-extrabold text-slate-900">{trip.departureTime}</span>
            <span className="block text-xs font-semibold text-slate-600 truncate">{trip.route.sourceCity}</span>
            <span className="block text-[11px] text-slate-400 truncate">{trip.boardingPoints[0]?.name}</span>
          </div>

          <div className="text-center">
            <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {trip.route.estimatedDurationHours} hrs
            </span>
            <div className="w-full flex items-center my-1 px-2">
              <div className="h-0.5 bg-slate-300 flex-1 relative">
                <div className="w-2 h-2 rounded-full bg-blue-600 absolute left-0 -top-0.75"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-600 absolute right-0 -top-0.75"></div>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Direct Route</span>
          </div>

          <div className="text-right">
            <span className="text-lg font-extrabold text-slate-900">{trip.arrivalTime}</span>
            <span className="block text-xs font-semibold text-slate-600 truncate">{trip.route.destinationCity}</span>
            <span className="block text-[11px] text-slate-400 truncate">{trip.droppingPoints[0]?.name}</span>
          </div>
        </div>

        {/* Fare & Seat Action */}
        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 md:pl-4 md:border-l md:border-slate-100">
          <div className="text-right w-full sm:w-auto">
            <span className="text-xs text-slate-500 block">Starting from</span>
            <span className="text-2xl font-black text-slate-900">₹{trip.startingFare}</span>
            <span className="block text-xs font-semibold text-emerald-600">
              {trip.availableSeatsCount} seats available
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to={`/bus/${trip.bus.id}`}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center flex-1 sm:flex-initial"
            >
              Details
            </Link>
            <button
              onClick={handleSelectSeats}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors text-center flex-1 sm:flex-initial"
            >
              Select Seats
            </button>
          </div>
        </div>
      </div>

      {/* Amenities Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex flex-wrap items-center gap-3">
          {trip.bus.amenities.slice(0, 4).map((a, idx) => (
            <span key={idx} className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-600">
              {a.includes('WiFi') && <Wifi className="w-3 h-3 text-blue-600" />}
              {a.includes('Charging') && <Zap className="w-3 h-3 text-amber-500" />}
              {a.includes('Water') && <Droplets className="w-3 h-3 text-cyan-600" />}
              {a}
            </span>
          ))}
        </div>

        <span className="text-[11px] font-medium text-slate-400">
          Trip Date: {trip.journeyDate}
        </span>
      </div>
    </div>
  );
};

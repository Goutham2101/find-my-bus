import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bus, Trip } from '../../types';
import { busService } from '../../services/busService';
import { tripService } from '../../services/tripService';
import { RouteTimeline } from '../../components/bus/RouteTimeline';
import { LoadingState } from '../../components/common/LoadingState';
import { Bus as BusIcon, ShieldCheck, Clock, Star, MapPin, Wifi, Zap, Droplets, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BusDetailsPage: React.FC = () => {
  const { busId } = useParams<{ busId: string }>();
  const navigate = useNavigate();
  const { setSelectedTrip } = useBooking();

  const [bus, setBus] = useState<Bus | null>(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    busService.getBusById(busId || 'bus-apsrtc-01').then((b) => {
      setBus(b);
      tripService.getTripById('trip-nsp-hyd-01').then((t) => {
        setTrip(t);
        setIsLoading(false);
      });
    });
  }, [busId]);

  if (isLoading || !bus || !trip) {
    return <LoadingState message="Loading bus details and route schedule..." />;
  }

  const handleSelectSeats = () => {
    setSelectedTrip(trip);
    navigate(`/booking/${trip.id}/seats`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <BusIcon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{bus.operatorName}</h1>
              <p className="text-xs text-slate-500 font-medium">
                {bus.busNumber} • {bus.busType} ({bus.layoutType} Seating)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> {bus.rating} ({bus.totalReviews} Reviews)
            </span>
          </div>
        </div>

        {/* Schedule & Fare summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Departure</span>
            <span className="text-xl font-black text-slate-900">{trip.departureTime}</span>
            <p className="text-xs font-semibold text-slate-600">{trip.route.sourceCity}</p>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Duration & Destination</span>
            <span className="text-xl font-black text-slate-900">{trip.route.estimatedDurationHours} hrs → {trip.arrivalTime}</span>
            <p className="text-xs font-semibold text-slate-600">{trip.route.destinationCity}</p>
          </div>

          <div className="text-right flex flex-col justify-center">
            <span className="text-xs text-slate-500 block">Starting Fare</span>
            <span className="text-3xl font-black text-blue-700">₹{trip.startingFare}</span>
          </div>
        </div>

        {/* Amenities Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Onboard Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {bus.amenities.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 border border-slate-200/60">
                {item.includes('WiFi') && <Wifi className="w-4 h-4 text-blue-600" />}
                {item.includes('Charging') && <Zap className="w-4 h-4 text-amber-500" />}
                {item.includes('Water') && <Droplets className="w-4 h-4 text-cyan-600" />}
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSelectSeats}
            className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Proceed to Seat Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Route Timeline and Boarding / Dropping Points */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <RouteTimeline route={trip.route} />
        </div>

        <div className="md:col-span-5 space-y-6">
          {/* Cancellation Policy */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">APSRTC Cancellation & Refund Terms</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>Before 24 hours departure</span>
                <span className="font-bold text-emerald-600">90% Refund</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>12 - 24 hours before departure</span>
                <span className="font-bold text-amber-600">75% Refund</span>
              </li>
              <li className="flex justify-between">
                <span>Within 12 hours of departure</span>
                <span className="font-bold text-rose-600">No Refund</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

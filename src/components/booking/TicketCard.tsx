import React from 'react';
import { Booking } from '../../types';
import { Bus, MapPin, Calendar, Clock, Download, Share2, Navigation, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';

interface TicketCardProps {
  booking: Booking;
  onDownload?: () => void;
  onShare?: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ booking, onDownload, onShare }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-2xl mx-auto my-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 sm:p-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">{booking.trip.bus.operatorName}</h3>
              <p className="text-xs text-blue-200 font-medium">{booking.trip.bus.busType} • {booking.trip.bus.busNumber}</p>
            </div>
          </div>
          <StatusBadge status={booking.bookingStatus} />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-blue-200 block text-[10px] uppercase font-semibold">Booking ID</span>
            <span className="font-mono font-extrabold text-sm text-amber-300">{booking.id}</span>
          </div>
          <div className="text-right">
            <span className="text-blue-200 block text-[10px] uppercase font-semibold">Ticket Number</span>
            <span className="font-mono font-bold text-sm text-white">{booking.ticketNumber}</span>
          </div>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
        {/* Route & Schedule Row */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Boarding</span>
              <span className="text-base font-extrabold text-slate-900">{booking.trip.route.sourceCity}</span>
              <p className="text-xs text-slate-500 font-medium">{booking.boardingPoint}</p>
            </div>

            <div className="flex flex-col items-center px-4">
              <span className="text-xs font-bold text-blue-700">{booking.trip.route.estimatedDurationHours} hrs</span>
              <div className="w-24 h-0.5 bg-blue-300 relative my-1">
                <div className="w-2 h-2 rounded-full bg-blue-700 absolute -top-0.75 left-0"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-600 absolute -top-0.75 right-0"></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Direct Trip</span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Destination</span>
              <span className="text-base font-extrabold text-slate-900">{booking.trip.route.destinationCity}</span>
              <p className="text-xs text-slate-500 font-medium">{booking.droppingPoint}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-bold">{booking.journeyDate}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 justify-end">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-bold">{booking.trip.departureTime}</span>
            </div>
          </div>
        </div>

        {/* Passenger Manifest Box */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <TicketIcon className="w-4 h-4 text-blue-600" /> Passenger Details & Assigned Seats
          </h4>
          <div className="divide-y divide-slate-100">
            {booking.passengers.map((p, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{p.name}</span>
                  <span className="text-slate-500">{p.gender}, {p.age} yrs</span>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 font-black rounded-lg border border-blue-200">
                    Seat {p.seatNumber}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amount Paid & Actions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Amount Paid</span>
            <span className="text-xl font-black text-slate-900">₹{booking.totalAmount}</span>
            <span className="text-[10px] font-bold text-emerald-600 ml-2">({booking.paymentMethod} - Verified)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Downloading e-Ticket PDF for Booking ${booking.id}...`)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1"
              title="Download Ticket PDF"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              onClick={() => alert(`Ticket link copied to clipboard!`)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1"
              title="Share Ticket"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Tracking Action Button */}
        <div className="pt-2">
          <Link
            to={`/track/${booking.id}`}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Track Bus Live GPS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

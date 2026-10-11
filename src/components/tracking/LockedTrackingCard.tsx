import React from 'react';
import { Lock, Calendar, Clock, ShieldAlert, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LockedTrackingCardProps {
  securityState: 'LockedFutureDate' | 'LockedNotStarted' | 'InvalidBooking';
  journeyDate?: string;
  bookingId?: string;
}

export const LockedTrackingCard: React.FC<LockedTrackingCardProps> = ({
  securityState,
  journeyDate,
  bookingId
}) => {
  if (securityState === 'LockedFutureDate') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl my-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wider inline-block mb-3">
          Security Rule Enforced
        </span>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Live tracking is locked until your journey date
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          As per APSRTC security policy, live bus GPS tracking is activated strictly on the date of travel ({journeyDate}). GPS signal will automatically unlock 30 minutes before departure time.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Scheduled Journey Date: <strong className="text-slate-900">{journeyDate}</strong></span>
        </div>
        <Link
          to="/my-bookings"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          Return to My Bookings
        </Link>
      </div>
    );
  }

  if (securityState === 'LockedNotStarted') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl my-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200 shadow-sm">
          <Clock className="w-8 h-8" />
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-full border border-blue-200 uppercase tracking-wider inline-block mb-3">
          Trip Scheduled Today
        </span>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Your bus has not started the trip yet
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Your journey is today, but the driver has not yet clicked "Start Trip". Bus tracking will automatically become live when the trip commences from the originating bus station.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 mb-6">
          <Ticket className="w-4 h-4 text-emerald-600" />
          <span>Booking Reference: <strong className="text-slate-900 font-mono">{bookingId}</strong></span>
        </div>
        <Link
          to="/my-bookings"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          Check Booking Details
        </Link>
      </div>
    );
  }

  // Invalid booking or unauthorized access
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xl my-6">
      <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200 shadow-sm">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Live tracking is available only for passengers with a valid booking
      </h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        We could not locate an active ticket matching reference "{bookingId}". Please log in with the passenger account used during booking.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/search"
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          Book a Bus Ticket
        </Link>
        <Link
          to="/my-bookings"
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

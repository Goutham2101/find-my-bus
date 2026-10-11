import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { QRCodeCard } from '../../components/booking/QRCodeCard';
import { TicketCard } from '../../components/booking/TicketCard';
import { CheckCircle2, Ticket, Navigation, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookingSuccessPage: React.FC = () => {
  const { completedBooking } = useBooking();

  if (!completedBooking) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-sm font-semibold text-slate-600">No recent completed booking found.</p>
        <Link to="/my-bookings" className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold inline-block">
          Go to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Confirmed Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 text-center shadow-xl space-y-3">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black">Booking Confirmed!</h1>
        <p className="text-sm text-emerald-100 max-w-lg mx-auto">
          Your e-Ticket and SMS notification have been dispatched. Ticket Reference:{' '}
          <strong className="font-mono underline text-white">{completedBooking.id}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Digital Ticket Card */}
        <div className="lg:col-span-7">
          <TicketCard booking={completedBooking} />
        </div>

        {/* Right QR & Offline Verification Pass Card */}
        <div className="lg:col-span-5 space-y-6">
          <QRCodeCard booking={completedBooking} />

          <div className="flex flex-col gap-3">
            <Link
              to={`/track/${completedBooking.id}`}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors text-center flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" /> Track Live Bus Location
            </Link>

            <Link
              to="/my-bookings"
              className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> View All My Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Clock,
  Ticket,
  Navigation,
  ArrowRight,
  Info,
} from 'lucide-react';
import { StoredBooking } from '../../services/bookingStorage';
import { Card, Button, StatusBadge } from '../ui';

export interface BookingCardProps {
  booking: StoredBooking;
  isUpcoming?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isUpcoming = true,
}) => {
  const navigate = useNavigate();
  const [showTrackModal, setShowTrackModal] = useState(false);

  const handleViewTicket = () => {
    const params = new URLSearchParams();
    params.append('seats', booking.seats.join(','));
    params.append('date', booking.journeyDate);
    params.append('from', booking.from);
    params.append('to', booking.to);

    navigate(`/booking/${booking.tripId}/confirmation?${params.toString()}`);
  };

  const handleTrackBus = () => {
    setShowTrackModal(true);
  };

  const formattedDateDisplay = React.useMemo(() => {
    try {
      const d = new Date(booking.journeyDate);
      if (isNaN(d.getTime())) return booking.journeyDate;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return booking.journeyDate;
    }
  }, [booking.journeyDate]);

  return (
    <>
      <Card className="bg-white border border-slate-200 p-5 sm:p-6 space-y-4 hover:border-blue-300 transition-all duration-200 shadow-sm">
        {/* Top Reference Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3 flex-wrap text-xs">
            <span className="font-black text-slate-900 text-sm">
              {booking.id}
            </span>
            <span className="text-slate-500 font-semibold">
              Ticket: <strong className="text-slate-800">{booking.ticketNumber}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {booking.bookingStatus === 'CONFIRMED' ? (
              <StatusBadge status="on-time" label="Confirmed" />
            ) : booking.bookingStatus === 'COMPLETED' ? (
              <StatusBadge status="completed" label="Completed" />
            ) : (
              <StatusBadge status="cancelled" label="Cancelled" />
            )}
          </div>
        </div>

        {/* Journey Route & Timing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Departure */}
          <div className="md:col-span-4 space-y-1">
            <div className="text-2xl font-black text-slate-900">
              {booking.departureTimeFormatted}
            </div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
              <span>{booking.from}</span>
            </div>
            <p className="text-xs text-slate-500 truncate" title={booking.departureStation}>
              {booking.departureStation}
            </p>
          </div>

          {/* Arrow */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center my-1 md:my-0">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              {formattedDateDisplay}
            </span>
            <div className="w-full max-w-[120px] flex items-center justify-center gap-1 my-1">
              <div className="h-0.5 flex-1 bg-slate-300 rounded" />
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="h-0.5 flex-1 bg-slate-300 rounded" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Direct Transit</span>
          </div>

          {/* Arrival */}
          <div className="md:col-span-4 space-y-1 md:text-right">
            <div className="text-2xl font-black text-slate-900">
              {booking.arrivalTimeFormatted}
            </div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1 md:justify-end">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{booking.to}</span>
            </div>
            <p className="text-xs text-slate-500 truncate" title={booking.arrivalStation}>
              {booking.arrivalStation}
            </p>
          </div>
        </div>

        {/* Bus Info & Seat Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="space-y-0.5">
            <span className="text-slate-500 block">Operator & Bus</span>
            <span className="font-bold text-slate-900 text-sm">
              {booking.operator} ({booking.busNumber})
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-500 block">Selected Seats ({booking.passengerCount})</span>
            <span className="font-extrabold text-blue-900 text-sm">
              {booking.seats.join(', ')}
            </span>
          </div>

          <div className="space-y-0.5 text-right">
            <span className="text-slate-500 block">Total Fare</span>
            <span className="font-black text-emerald-700 text-base">
              ₹{booking.totalAmount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
          <Button
            onClick={handleTrackBus}
            variant="outline"
            size="sm"
            className="text-xs font-bold flex items-center gap-1.5"
          >
            <Navigation className="w-4 h-4 text-emerald-700" />
            <span>Track Bus</span>
          </Button>

          <Button
            onClick={handleViewTicket}
            variant="primary"
            size="sm"
            className="text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5"
          >
            <Ticket className="w-4 h-4" />
            <span>View Ticket</span>
          </Button>
        </div>
      </Card>

      {/* Track Bus Notice Modal */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setShowTrackModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-900 z-10 border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Bus Tracking Status</h3>
                <p className="text-xs text-slate-500">Booking ID: {booking.id}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 leading-relaxed text-slate-700">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Live Tracking Notice:</strong> Live bus GPS location becomes available on your journey date (<strong>{formattedDateDisplay}</strong>) when the assigned bus starts its active trip.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setShowTrackModal(false)}
                variant="primary"
                size="sm"
                className="font-bold"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

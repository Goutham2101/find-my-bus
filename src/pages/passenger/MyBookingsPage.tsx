import React, { useState, useEffect } from 'react';
import { Booking } from '../../types';
import { bookingService } from '../../services/bookingService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { Modal } from '../../components/common/Modal';
import { Ticket, Navigation, Calendar, MapPin, AlertCircle, Eye, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Completed' | 'Cancelled'>('All');

  // Cancel dialog state
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);

  useEffect(() => {
    setIsLoading(true);
    bookingService.getUserBookings().then((data) => {
      setBookings(data);
      setIsLoading(false);
    });
  }, []);

  const handleCancelBooking = async () => {
    if (!selectedBookingForCancel) return;
    const updated = await bookingService.cancelBooking(selectedBookingForCancel.id);
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setSelectedBookingForCancel(null);
    alert(`Booking ${updated.id} has been cancelled. Refund initiated to original payment method.`);
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'Upcoming') return b.bookingStatus === 'Confirmed';
    if (activeTab === 'Completed') return b.bookingStatus === 'Completed';
    if (activeTab === 'Cancelled') return b.bookingStatus === 'Cancelled';
    return true;
  });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Passenger Bookings</h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your AP bus tickets, check live GPS tracking eligibility, and download e-Tickets.
          </p>
        </div>

        <Link
          to="/search"
          className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          Book New Bus Ticket
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200">
        {(['All', 'Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === tab
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List Stream */}
      {isLoading ? (
        <LoadingState message="Loading passenger booking history..." />
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isToday = booking.journeyDate === todayStr;
            const isFuture = booking.journeyDate > todayStr;
            const isTripActive = booking.trip.status === 'Active';

            return (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{booking.trip.bus.operatorName}</h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Booking ID: <span className="font-mono font-bold text-amber-700">{booking.id}</span> • Ticket: {booking.ticketNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={booking.bookingStatus} />
                    <StatusBadge status={booking.paymentStatus} size="sm" />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">Route</span>
                    <span className="font-bold text-slate-900 block text-sm">
                      {booking.trip.route.sourceCity} → {booking.trip.route.destinationCity}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">Journey Date & Time</span>
                    <span className="font-bold text-slate-900 block text-sm">
                      {booking.journeyDate} ({booking.trip.departureTime})
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">Seat(s) & Passengers</span>
                    <span className="font-bold text-blue-700 block text-sm">
                      Seat {booking.selectedSeats.join(', ')} ({booking.passengers.length} Person)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-400 font-semibold block uppercase text-[10px]">Amount Paid</span>
                    <span className="font-black text-slate-900 text-base">₹{booking.totalAmount}</span>
                  </div>
                </div>

                {/* Actions & Gating Warnings */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500">
                    {isFuture && (
                      <span className="text-amber-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Live tracking will be available on your journey date ({booking.journeyDate}).
                      </span>
                    )}
                    {isToday && !isTripActive && (
                      <span className="text-blue-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Bus tracking will be available when the trip starts.
                      </span>
                    )}
                    {isToday && isTripActive && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                        Bus is active now! Live GPS tracking unlocked.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Track Button Gating */}
                    <Link
                      to={`/track/${booking.id}`}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                        isToday && isTripActive
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      {isToday && isTripActive ? 'Track Live Bus' : 'View Track Details'}
                    </Link>

                    {booking.bookingStatus === 'Confirmed' && (
                      <button
                        onClick={() => setSelectedBookingForCancel(booking)}
                        className="px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No bookings found"
          description="You don't have any bookings matching the selected tab."
          actionLabel="Search Buses Now"
          onAction={() => navigate('/search')}
        />
      )}

      {/* Cancel Dialog Modal */}
      <Modal
        isOpen={!!selectedBookingForCancel}
        onClose={() => setSelectedBookingForCancel(null)}
        title="Confirm Booking Cancellation"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Are you sure you want to cancel booking <strong className="font-mono text-slate-900">{selectedBookingForCancel?.id}</strong>?
          </p>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-800 font-medium">
            Refund of ₹{selectedBookingForCancel?.totalAmount} will be processed back to original payment method ({selectedBookingForCancel?.paymentMethod}) within 24-48 hours.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setSelectedBookingForCancel(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Keep Ticket
            </button>
            <button
              onClick={handleCancelBooking}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl"
            >
              Yes, Cancel Ticket
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

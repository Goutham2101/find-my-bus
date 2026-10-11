import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Booking } from '../../types';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Search } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    adminService.getAllBookings().then((b) => {
      setBookings(b);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingState message="Loading passenger booking master ledger..." />;

  const filtered = bookings.filter(
    (b) =>
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.passengers.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Master Bookings Ledger</h1>
          <p className="text-xs text-slate-500 font-medium">Search & monitor all system tickets</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Booking ID, Ticket #, or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {filtered.map((b) => (
            <div key={b.id} className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono font-bold text-xs text-amber-700">{b.id}</span>
                <h4 className="text-sm font-bold text-slate-900">{b.passengers[0]?.name}</h4>
                <p className="text-xs text-slate-500">
                  {b.trip.route.sourceCity} → {b.trip.route.destinationCity} ({b.journeyDate})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={b.bookingStatus} size="sm" />
                <span className="text-sm font-black text-slate-900">₹{b.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

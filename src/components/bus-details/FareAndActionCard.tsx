import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Armchair, Navigation, Info, ShieldAlert, CheckCircle } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card, Button, StatusBadge } from '../ui';

export interface FareAndActionCardProps {
  bus: BusTrip;
  journeyDate: string;
  fromQuery?: string;
  toQuery?: string;
}

export const FareAndActionCard: React.FC<FareAndActionCardProps> = ({
  bus,
  journeyDate,
  fromQuery,
  toQuery,
}) => {
  const navigate = useNavigate();

  const handleSelectSeats = () => {
    const params = new URLSearchParams();
    if (journeyDate) params.append('date', journeyDate);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);

    navigate(`/booking/${bus.id}/seats?${params.toString()}`);
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Primary Fare & Seat Select Card */}
      <Card className="bg-white border-2 border-blue-600 shadow-md p-6 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
            Ticket Pricing
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-900">₹{bus.fare}</span>
            <span className="text-sm text-slate-500 font-medium">/ seat</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            Starting fare. Final amount may depend on selected seat category and booking details.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800">Seat Availability:</span>
          <StatusBadge
            status={bus.availableSeats < 10 ? 'delayed' : 'on-time'}
            label={`${bus.availableSeats} Left`}
          />
        </div>

        <Button
          onClick={handleSelectSeats}
          variant="primary"
          size="lg"
          className="w-full font-bold text-lg bg-amber-400 hover:bg-amber-300 text-blue-950 border-0 py-3.5 shadow-md"
          leftIcon={<Armchair className="w-5 h-5" />}
        >
          Select Seats
        </Button>
      </Card>

      {/* Cancellation & Policy Info */}
      <Card className="bg-slate-50 border border-slate-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-blue-700" />
          <span>Cancellation & Policy</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Cancellation and refund rules will be shown according to the service's booking policy.
        </p>
      </Card>

      {/* Live Tracking Information Notice */}
      <Card className="bg-blue-50 border border-blue-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
          <Navigation className="w-4 h-4 text-emerald-700" />
          <span>Live Bus Tracking</span>
        </div>
        <p className="text-xs text-blue-900 leading-relaxed">
          Live bus tracking becomes available on your journey date for confirmed bookings when the assigned trip is active.
        </p>
      </Card>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Calendar, Armchair, AlertCircle, ArrowUpRight } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card, Button } from '../ui';

export interface BookingSummaryProps {
  bus: BusTrip;
  selectedSeats: string[];
  journeyDate: string;
  onContinue: () => void;
  maxSeatsWarning?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  bus,
  selectedSeats,
  journeyDate,
  onContinue,
  maxSeatsWarning = false,
}) => {
  const passengerCount = selectedSeats.length;
  const totalFare = passengerCount * bus.fare;

  const formattedDateDisplay = React.useMemo(() => {
    try {
      const d = new Date(journeyDate);
      if (isNaN(d.getTime())) return journeyDate;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return journeyDate;
    }
  }, [journeyDate]);

  return (
    <div className="space-y-6 sticky top-24">
      <Card className="bg-white border-2 border-blue-600 shadow-md p-6 space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Booking Summary
          </span>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>{bus.departureLocation}</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
            <span>{bus.arrivalLocation}</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>{formattedDateDisplay}</span>
          </p>
        </div>

        {/* Max Seats Warning Message */}
        {maxSeatsWarning && (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>You can select up to 6 seats per booking.</span>
          </div>
        )}

        {/* Selected Seats Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Selected Seats:</span>
            <span className="font-bold text-slate-900">
              {passengerCount > 0 ? selectedSeats.join(', ') : 'None selected'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Passengers:</span>
            <span className="font-bold text-slate-900">{passengerCount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">Fare per seat:</span>
            <span className="font-bold text-slate-900">₹{bus.fare}</span>
          </div>

          {passengerCount > 0 && (
            <div className="text-xs text-slate-500 text-right bg-slate-50 p-2 rounded border border-slate-100 font-semibold">
              Calculation: ₹{bus.fare} × {passengerCount}
            </div>
          )}
        </div>

        {/* Total Price & Continue Action */}
        <div className="border-t border-slate-200 pt-4 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-slate-900">Total Amount:</span>
            <div className="text-right">
              <span className="text-3xl font-black text-blue-900">₹{totalFare}</span>
            </div>
          </div>

          <Button
            onClick={onContinue}
            disabled={passengerCount === 0}
            variant="primary"
            size="lg"
            className="w-full font-bold text-lg bg-amber-400 hover:bg-amber-300 text-blue-950 disabled:bg-slate-200 disabled:text-slate-400 border-0 py-3.5 shadow-md"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Continue to Passengers
          </Button>

          {passengerCount === 0 && (
            <p className="text-xs text-center text-slate-500 italic">
              Please select at least one seat to proceed.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Lock, Calendar, ShieldCheck } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card, Button } from '../ui';
import { PaymentMethodType } from './PaymentMethodSelector';

export interface FareSummaryCardProps {
  bus: BusTrip;
  seatNumbers: string[];
  journeyDate: string;
  paymentMethod: PaymentMethodType;
  isValid: boolean;
  isProcessing: boolean;
  onPay: () => void;
}

export const FareSummaryCard: React.FC<FareSummaryCardProps> = ({
  bus,
  seatNumbers,
  journeyDate,
  paymentMethod,
  isValid,
  isProcessing,
  onPay,
}) => {
  const passengerCount = seatNumbers.length;
  const subtotal = passengerCount * bus.fare;
  const convenienceFee = paymentMethod === 'Counter' ? 0 : 15;
  const totalAmount = subtotal + convenienceFee;

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
            Fare Summary
          </span>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>{bus.departureLocation}</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
            <span>{bus.arrivalLocation}</span>
          </h3>
          <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>Date: {formattedDateDisplay}</span>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Selected Seats:</span>
            <span className="font-bold text-slate-900">{seatNumbers.join(', ')}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Base Fare (₹{bus.fare} × {passengerCount}):</span>
            <span className="font-bold text-slate-900">₹{subtotal}</span>
          </div>

          {convenienceFee > 0 && (
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Convenience Fee (Mock):</span>
              <span className="font-semibold text-slate-900">₹{convenienceFee}</span>
            </div>
          )}

          {paymentMethod === 'Counter' && (
            <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200 font-semibold">
              Counter Payment: No online processing fee.
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-4 space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-base font-bold text-slate-900">Total Payable:</span>
            <div className="text-right">
              <span className="text-3xl font-black text-blue-900">₹{totalAmount}</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={onPay}
            disabled={!isValid || isProcessing}
            isLoading={isProcessing}
            variant="primary"
            size="lg"
            className="w-full font-bold text-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-200 disabled:text-slate-400 border-0 py-3.5 shadow-md"
            rightIcon={!isProcessing ? <ArrowRight className="w-5 h-5" /> : undefined}
          >
            {paymentMethod === 'Counter'
              ? `Confirm & Pay ₹${totalAmount} at Counter`
              : `Pay ₹${totalAmount}`}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Demo Encryption</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

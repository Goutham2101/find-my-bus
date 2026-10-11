import React, { useState, useEffect, useMemo } from 'react';
import {
  Bus,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Armchair,
  FileText,
  User,
  Share2,
  Copy,
  AlertCircle,
  X,
  ShieldAlert,
  PhoneCall,
} from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card, Button, StatusBadge } from '../ui';

export interface DigitalTicketProps {
  bus: BusTrip;
  seatNumbers: string[];
  journeyDate: string;
  fromLocation: string;
  toLocation: string;
  bookingId: string;
  ticketNumber: string;
  totalAmount: number;
  bookingStatus?: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({
  bus,
  seatNumbers,
  journeyDate,
  fromLocation,
  toLocation,
  bookingId,
  ticketNumber,
  totalAmount,
  bookingStatus = 'CONFIRMED',
}) => {
  const [shareSuccessMessage, setShareSuccessMessage] = useState('');
  const [shareErrorMessage, setShareErrorMessage] = useState('');
  const [showManualCopyModal, setShowManualCopyModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);

  // Safe Arrival Check-in state loaded per specific booking ID from localStorage
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`find_my_bus_safe_arrival_${bookingId}`) === 'true';
    } catch {
      return false;
    }
  });

  // Keep state in sync if bookingId prop changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`find_my_bus_safe_arrival_${bookingId}`) === 'true';
      setIsCheckedIn(saved);
    } catch {
      setIsCheckedIn(false);
    }
  }, [bookingId]);

  const handleSafeArrivalCheckIn = () => {
    if (bookingStatus === 'CANCELLED') return;
    try {
      localStorage.setItem(`find_my_bus_safe_arrival_${bookingId}`, 'true');
    } catch (e) {
      console.error('Failed to save arrival check-in state to localStorage', e);
    }
    setIsCheckedIn(true);
  };

  const formattedDateDisplay = useMemo(() => {
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

  // Construct privacy-safe journey share text (excluding passenger email/phone)
  const shareText = useMemo(() => {
    return [
      `Find My Bus - Journey Details`,
      `Ticket Number: ${ticketNumber}`,
      `Booking ID: ${bookingId}`,
      `Operator: ${bus.operator} (${bus.busNumber})`,
      `Route: ${fromLocation} → ${toLocation}`,
      `Travel Date: ${formattedDateDisplay}`,
      `Departure & Arrival: ${bus.departureTimeFormatted} - ${bus.arrivalTimeFormatted}`,
      `Seat(s): ${seatNumbers.join(', ')}`,
    ].join('\n');
  }, [
    ticketNumber,
    bookingId,
    bus.operator,
    bus.busNumber,
    bus.departureTimeFormatted,
    bus.arrivalTimeFormatted,
    fromLocation,
    toLocation,
    formattedDateDisplay,
    seatNumbers,
  ]);

  const handleShareJourney = async () => {
    setShareSuccessMessage('');
    setShareErrorMessage('');

    // 1. Try Native Web Share API if supported
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Find My Bus - Ticket ${ticketNumber}`,
          text: shareText,
        });
        setShareSuccessMessage('Journey details shared successfully!');
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return; // User cancelled share prompt
      }
    }

    // 2. Try Clipboard API fallback
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareSuccessMessage('Journey details copied to clipboard!');
        return;
      } catch {
        // Fall back to manual copy modal if clipboard write fails
      }
    }

    // 3. Fallback: Open manual copy modal if browser APIs are unavailable or denied
    setShowManualCopyModal(true);
  };

  const isCancelled = bookingStatus === 'CANCELLED';

  return (
    <Card className="bg-white border-2 border-slate-300 shadow-xl p-6 sm:p-8 space-y-6 print:shadow-none print:border-black rounded-2xl">
      {/* Ticket Header & Brand */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-black shrink-0">
            <Bus className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase block">
              Digital Boarding Pass
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Find My Bus</h2>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{isCancelled ? 'CANCELLED' : 'CONFIRMED'}</span>
          </div>

          <div className="flex flex-wrap items-center sm:justify-end gap-2 print:hidden">
            <Button
              type="button"
              onClick={() => setShowSosModal(true)}
              variant="danger"
              size="sm"
              className="font-bold flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white shadow-2xs"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS Emergency</span>
            </Button>

            <Button
              type="button"
              onClick={handleShareJourney}
              variant="outline"
              size="sm"
              className="font-bold flex items-center gap-1.5 text-xs border-blue-300 text-blue-900 hover:bg-blue-50"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Share My Journey</span>
            </Button>
          </div>
        </div>
      </div>

      {shareSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{shareSuccessMessage}</span>
        </div>
      )}

      {shareErrorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs font-semibold flex items-center gap-2 print:hidden">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{shareErrorMessage}</span>
        </div>
      )}

      {/* Booking References Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <div>
          <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">
            Booking ID
          </span>
          <span className="text-slate-900 font-black text-sm">{bookingId}</span>
        </div>
        <div>
          <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">
            Ticket Number
          </span>
          <span className="text-slate-900 font-black text-sm">{ticketNumber}</span>
        </div>
        <div>
          <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">
            Selected Seats
          </span>
          <span className="text-blue-900 font-black text-sm">{seatNumbers.join(', ')}</span>
        </div>
        <div>
          <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">
            Total Paid
          </span>
          <span className="text-emerald-700 font-black text-sm">₹{totalAmount}</span>
        </div>
      </div>

      {/* Main Journey Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-100 pb-6">
        {/* Departure */}
        <div className="md:col-span-5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
            DEPARTURE
          </span>
          <div className="text-2xl font-black text-slate-900 pt-1">
            {bus.departureTimeFormatted}
          </div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
            <span>{fromLocation}</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{bus.departureStation}</p>
        </div>

        {/* Journey Duration */}
        <div className="md:col-span-2 flex flex-col items-center justify-center text-center my-2 md:my-0">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {bus.duration}
          </span>
          <div className="w-full max-w-[100px] h-0.5 bg-blue-600 rounded my-1.5" />
          <span className="text-[10px] text-slate-400 font-semibold">{bus.serviceName}</span>
        </div>

        {/* Arrival */}
        <div className="md:col-span-5 space-y-1 md:text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            ARRIVAL
          </span>
          <div className="text-2xl font-black text-slate-900 pt-1">
            {bus.arrivalTimeFormatted}
          </div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-1.5 md:justify-end">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{toLocation}</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{bus.arrivalStation}</p>
        </div>
      </div>

      {/* Operator & Service Details */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
        <div>
          <span className="text-slate-500 block">Operator & Bus Number</span>
          <span className="text-slate-900 font-bold text-sm">
            {bus.operator} ({bus.busNumber})
          </span>
        </div>

        <div>
          <span className="text-slate-500 block">Travel Date</span>
          <span className="text-slate-900 font-bold text-sm flex items-center gap-1">
            <Calendar className="w-4 h-4 text-blue-700" />
            {formattedDateDisplay}
          </span>
        </div>

        <div>
          <span className="text-slate-500 block">Bus Category</span>
          <span className="text-slate-900 font-bold text-sm">{bus.category}</span>
        </div>
      </div>

      {/* Passenger Breakdown List */}
      <div className="space-y-2 border-t border-slate-100 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Passenger & Seat Allocation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {seatNumbers.map((seat, index) => (
            <div
              key={seat}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-bold text-slate-900">Passenger {index + 1}</span>
              </div>
              <span className="font-extrabold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                Seat {seat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safe Arrival Check-in Section (Eligible when not cancelled) */}
      {!isCancelled && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Safe Arrival Check-in</h4>
                <p className="text-xs text-slate-500">Confirm your safe journey arrival</p>
              </div>
            </div>

            {isCheckedIn ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Safe Arrival Confirmed</span>
              </div>
            ) : (
              <Button
                type="button"
                onClick={handleSafeArrivalCheckIn}
                variant="primary"
                size="sm"
                className="font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I Arrived Safely</span>
              </Button>
            )}
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            Note: This is a local UI check-in for ticket status tracking only. It does not dispatch SMS notifications, alert emergency contacts, or verify physical GPS location.
          </p>
        </div>
      )}

      {/* Demo QR Code Area & Boarding Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Boarding Verification Instructions</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md">
            Passengers can present either their <strong>Booking ID ({bookingId})</strong> or <strong>Seat Number</strong> to the bus conductor upon boarding.
          </p>
          <p className="text-[11px] font-semibold text-blue-800">
            QR is optional. You can also board using your Booking ID + Seat Number.
          </p>
        </div>

        {/* Visual Demo QR Representation */}
        <div className="bg-white p-3 rounded-xl border border-slate-300 flex flex-col items-center justify-center shrink-0 shadow-xs text-center space-y-1">
          <div className="w-24 h-24 bg-slate-900 p-2 rounded-lg flex items-center justify-center text-white">
            <QrCode className="w-20 h-20 text-white" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            {bookingId}
          </span>
        </div>
      </div>

      {/* Manual Copy Fallback Modal */}
      {showManualCopyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setShowManualCopyModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-900 z-10 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-700" />
                <span>Copy Journey Details</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowManualCopyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Select and copy the privacy-safe journey details below to share with your family or friends:
            </p>

            <textarea
              readOnly
              value={shareText}
              rows={8}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 select-all leading-relaxed"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                onClick={() => setShowManualCopyModal(false)}
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Emergency Assistance Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setShowSosModal(false)}
          />
          <div
            className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-900 z-10 border border-slate-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sos-modal-title"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
                <ShieldAlert className="w-6 h-6 shrink-0 text-red-600" />
                <h3 id="sos-modal-title">Emergency Assistance</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close Emergency Assistance Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-red-900 text-xs font-medium leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p>
                <strong>Calling Notice:</strong> Tapping a helpline opens your device's dialer interface. No automated call or alert is dispatched without your confirmation.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Emergency Quick-Dial Options
              </h4>

              {/* 1. National Emergency 112 */}
              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-2xs group"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5" />
                  <div>
                    <div className="font-extrabold text-base">112</div>
                    <div className="text-xs text-red-100 font-normal">
                      National Emergency Response Service
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-md font-bold">
                  Call 112
                </span>
              </a>

              {/* 2. Women Helpline 1091 */}
              <a
                href="tel:1091"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-2xs group"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="font-extrabold text-base">1091</div>
                    <div className="text-xs text-slate-300 font-normal">
                      Women Helpline Service
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-md font-bold border border-slate-700">
                  Call 1091
                </span>
              </a>

              {/* 3. Bus Operator Helpline Availability Check */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">
                  Bus Operator Helpline ({bus.operator})
                </span>
                <p className="text-slate-500 leading-relaxed">
                  Operator contact phone details are currently unavailable in dataset. Please contact terminal staff or dial 112/1091 for urgent help.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button
                type="button"
                onClick={() => setShowSosModal(false)}
                variant="outline"
                size="sm"
                className="font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DigitalTicket;

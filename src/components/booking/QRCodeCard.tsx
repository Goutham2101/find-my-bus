import React from 'react';
import { Booking } from '../../types';
import { QrCode, Phone, CheckCircle, Info } from 'lucide-react';

interface QRCodeCardProps {
  booking: Booking;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ booking }) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
            Digital Boarding Pass
          </h4>
        </div>
        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-900/80 text-emerald-300 border border-emerald-700 rounded-full">
          Verified Active
        </span>
      </div>

      {/* Prominent Keypad-Phone Friendly Text Verification Banner */}
      <div className="bg-blue-950/80 border border-blue-800 rounded-xl p-4 text-xs space-y-2">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-blue-200 leading-relaxed font-medium">
            <strong className="text-white">QR code is OPTIONAL for boarding.</strong> You can simply inform the bus conductor your <span className="underline font-bold text-amber-300">Booking ID</span> or <span className="underline font-bold text-amber-300">Name + Seat Number</span> (suitable for keypad phones & SMS tickets).
          </p>
        </div>
      </div>

      {/* QR Code SVG / Visual Simulation */}
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner max-w-xs mx-auto">
        {/* Mock QR SVG Matrix */}
        <div className="w-44 h-44 bg-slate-900 p-3 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-10 h-10 border-4 border-white bg-slate-900 flex items-center justify-center">
              <div className="w-4 h-4 bg-white"></div>
            </div>
            <div className="w-10 h-10 border-4 border-white bg-slate-900 flex items-center justify-center">
              <div className="w-4 h-4 bg-white"></div>
            </div>
          </div>

          {/* Random QR pixels representation */}
          <div className="my-2 grid grid-cols-6 gap-1.5 px-2">
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-slate-900"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-slate-900"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-slate-900"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-slate-900"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-white rounded-xs"></div>
            <div className="h-2 bg-slate-900"></div>
          </div>

          <div className="flex justify-between items-end">
            <div className="w-10 h-10 border-4 border-white bg-slate-900 flex items-center justify-center">
              <div className="w-4 h-4 bg-white"></div>
            </div>
            <div className="text-[9px] font-mono text-white opacity-80 text-right leading-tight">
              FMB-AP<br />VERIFIED
            </div>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-slate-700 mt-2">
          {booking.qrCodeValue}
        </span>
      </div>

      {/* Prominent Verification Identifiers Grid */}
      <div className="grid grid-cols-2 gap-3 text-center bg-slate-800/80 p-4 rounded-xl border border-slate-700">
        <div>
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Booking ID</span>
          <span className="text-sm font-mono font-extrabold text-amber-400">{booking.id}</span>
        </div>
        <div>
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Ticket Number</span>
          <span className="text-sm font-mono font-bold text-white">{booking.ticketNumber}</span>
        </div>
        <div>
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Primary Passenger</span>
          <span className="text-xs font-bold text-white truncate">{booking.passengers[0]?.name}</span>
        </div>
        <div>
          <span className="block text-[10px] font-semibold uppercase text-slate-400">Assigned Seat(s)</span>
          <span className="text-xs font-bold text-emerald-400">{booking.selectedSeats.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

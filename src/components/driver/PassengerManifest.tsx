import React, { useState } from 'react';
import { DriverTripManifest } from '../../types';
import { driverService } from '../../services/driverService';
import { QrCode, Search, CheckCircle, AlertTriangle, UserCheck, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';

interface PassengerManifestProps {
  manifest: DriverTripManifest;
  onRefreshManifest: () => void;
}

export const PassengerManifest: React.FC<PassengerManifestProps> = ({ manifest, onRefreshManifest }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [verifyMessage, setVerifyMessage] = useState<{ success: boolean; text: string } | null>(null);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleVerify = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = customQuery || searchQuery;
    if (!q.trim()) return;

    const res = await driverService.verifyAndBoardPassenger(q);
    setVerifyMessage({
      success: res.success,
      text: res.message
    });
    setSearchQuery('');
    onRefreshManifest();
  };

  const simulateQrScanSuccess = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsQrScannerOpen(false);
      handleVerify(undefined, 'FMB-AP-98241');
    }, 1200);
  };

  const boardedCount = manifest.passengers.filter((p) => p.isBoarded).length;

  return (
    <div className="space-y-6">
      {/* Boarding Summary Bar */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-amber-900">Today's Passenger Manifest</h3>
          <p className="text-xs text-amber-700 font-medium">Bus #{manifest.busNumber} • {manifest.routeName}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-amber-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Boarded</span>
            <span className="text-lg font-black text-emerald-700">
              {boardedCount} / {manifest.passengers.length}
            </span>
          </div>

          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" /> Scan Ticket QR
          </button>
        </div>
      </div>

      {/* Manual Verification Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-sm font-bold text-slate-800 mb-2">Manual Ticket Verification</h4>
        <p className="text-xs text-slate-500 mb-4">
          For keypad phone users without app access, enter Booking ID, Ticket Number, Name, or Seat Number:
        </p>

        <form onSubmit={(e) => handleVerify(e)} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Booking ID (e.g. FMB-AP-98241), Name, or Seat #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Verify & Board
          </button>
        </form>

        {/* Status Message Alert */}
        {verifyMessage && (
          <div
            className={`mt-4 p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
              verifyMessage.success
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {verifyMessage.success ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{verifyMessage.text}</span>
          </div>
        )}
      </div>

      {/* Manifest Passenger List Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">Passenger Seat List</h4>
          <span className="text-xs text-slate-500">Check-in Conductor Screen</span>
        </div>

        <div className="divide-y divide-slate-100">
          {manifest.passengers.map((p, idx) => (
            <div key={idx} className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-sm flex items-center justify-center border border-blue-200">
                  {p.seatNumber}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{p.passengerName}</h5>
                  <p className="text-xs text-slate-500">
                    <span className="font-mono font-semibold text-slate-700">{p.bookingId}</span> • {p.boardingPoint}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {p.isBoarded ? (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> Boarded {p.boardedAt ? `(${p.boardedAt})` : ''}
                  </span>
                ) : (
                  <button
                    onClick={() => handleVerify(undefined, p.bookingId)}
                    className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-xs font-bold transition-colors"
                  >
                    Mark Boarded
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Scanner Simulation Modal */}
      <Modal isOpen={isQrScannerOpen} onClose={() => setIsQrScannerOpen(false)} title="Conductor Ticket QR Scanner">
        <div className="text-center space-y-4">
          <div className="relative w-64 h-64 bg-slate-900 rounded-2xl mx-auto overflow-hidden border-2 border-amber-500 flex items-center justify-center">
            {isScanning ? (
              <div className="text-white space-y-2">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-mono">Verifying Digital Ticket Signature...</p>
              </div>
            ) : (
              <>
                {/* Simulated Camera Viewfinder Grid */}
                <div className="absolute inset-4 border-2 border-dashed border-amber-400 opacity-60 rounded-xl"></div>
                <div className="w-full h-1 bg-amber-500 absolute top-1/2 -translate-y-1/2 animate-bounce"></div>
                <p className="text-xs text-slate-400 font-mono">Point camera at passenger QR code</p>
              </>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Scanning validates booking status in real-time and prevents duplicate boarding.
          </p>

          <button
            onClick={simulateQrScanSuccess}
            disabled={isScanning}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Simulate Scanning Ticket FMB-AP-98241
          </button>
        </div>
      </Modal>
    </div>
  );
};

import React, { useState } from 'react';
import { Seat } from '../../types';
import { User } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  layoutType: '2x2' | '1x2' | '2x1';
  isSleeper: boolean;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  onToggleSeat,
  layoutType,
  isSleeper
}) => {
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');

  const visibleSeats = isSleeper
    ? seats.filter((s) => s.deck === activeDeck)
    : seats;

  const isSelected = (seat: Seat) => selectedSeats.some((s) => s.id === seat.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-6 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px]">✓</div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-slate-300 border border-slate-400"></div>
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-pink-100 border-2 border-pink-400"></div>
          <span>Ladies Reserved</span>
        </div>
      </div>

      {/* Sleeper Deck Switcher */}
      {isSleeper && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveDeck('lower')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeDeck === 'lower'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lower Deck
            </button>
            <button
              onClick={() => setActiveDeck('upper')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeDeck === 'upper'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upper Deck
            </button>
          </div>
        </div>
      )}

      {/* Bus Container Outline */}
      <div className="max-w-md mx-auto border-2 border-slate-300 rounded-3xl p-5 bg-slate-50/50 relative">
        {/* Driver Section at Front */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Front / Driver
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs" title="Driver Seat">
            🚗
          </div>
        </div>

        {/* Seat Matrix Grid */}
        <div className="grid gap-3">
          {/* Group seats by Row */}
          {Array.from(new Set(visibleSeats.map((s) => s.row)))
            .sort((a, b) => a - b)
            .map((rowNum) => {
              const rowSeats = visibleSeats.filter((s) => s.row === rowNum);

              return (
                <div key={rowNum} className="flex items-center justify-between gap-2">
                  {/* Left Column(s) */}
                  <div className="flex gap-2">
                    {rowSeats
                      .filter((s) => (layoutType === '1x2' ? s.column === 1 : s.column <= 2))
                      .map((seat) => {
                        const sel = isSelected(seat);
                        return (
                          <button
                            key={seat.id}
                            disabled={seat.isOccupied}
                            onClick={() => onToggleSeat(seat)}
                            className={`relative transition-all rounded-xl p-2 flex flex-col items-center justify-center font-bold border-2 ${
                              isSleeper ? 'w-16 h-20' : 'w-12 h-12 text-xs'
                            } ${
                              seat.isOccupied
                                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
                                : sel
                                ? 'bg-blue-600 border-blue-700 text-white shadow-md scale-105'
                                : seat.isLadiesReserved
                                ? 'bg-pink-50 border-pink-300 text-pink-700 hover:bg-pink-100'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50'
                            }`}
                          >
                            <span className="text-xs">{seat.seatNumber}</span>
                            <span className="text-[10px] font-medium opacity-80">₹{seat.price}</span>
                            {seat.isLadiesReserved && !seat.isOccupied && !sel && (
                              <span className="absolute top-0.5 right-0.5 text-[9px] text-pink-600">♀</span>
                            )}
                          </button>
                        );
                      })}
                  </div>

                  {/* Aisle Spacer */}
                  <div className="flex-1 text-center border-b border-dotted border-slate-200 text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
                    Aisle
                  </div>

                  {/* Right Column(s) */}
                  <div className="flex gap-2">
                    {rowSeats
                      .filter((s) => (layoutType === '1x2' ? s.column >= 2 : s.column >= 3))
                      .map((seat) => {
                        const sel = isSelected(seat);
                        return (
                          <button
                            key={seat.id}
                            disabled={seat.isOccupied}
                            onClick={() => onToggleSeat(seat)}
                            className={`relative transition-all rounded-xl p-2 flex flex-col items-center justify-center font-bold border-2 ${
                              isSleeper ? 'w-16 h-20' : 'w-12 h-12 text-xs'
                            } ${
                              seat.isOccupied
                                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-75'
                                : sel
                                ? 'bg-blue-600 border-blue-700 text-white shadow-md scale-105'
                                : seat.isLadiesReserved
                                ? 'bg-pink-50 border-pink-300 text-pink-700 hover:bg-pink-100'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50'
                            }`}
                          >
                            <span className="text-xs">{seat.seatNumber}</span>
                            <span className="text-[10px] font-medium opacity-80">₹{seat.price}</span>
                            {seat.isLadiesReserved && !seat.isOccupied && !sel && (
                              <span className="absolute top-0.5 right-0.5 text-[9px] text-pink-600">♀</span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Back / Rear Bus Section */}
        <div className="mt-6 pt-3 border-t-2 border-dashed border-slate-300 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Rear of Bus
          </span>
        </div>
      </div>
    </div>
  );
};

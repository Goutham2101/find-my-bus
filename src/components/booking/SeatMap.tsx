import React from 'react';
import { Armchair, Check, XCircle, Lock, CircleDot } from 'lucide-react';
import { Seat } from '../../data/mockSeats';
import { Card } from '../ui';

export interface SeatMapProps {
  seats: Seat[];
  selectedSeatNumbers: string[];
  onToggleSeat: (seatNumber: string) => void;
  isSleeper?: boolean;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeatNumbers,
  onToggleSeat,
  isSleeper = false,
}) => {
  // Determine number of columns in layout
  const maxCol = Math.max(...seats.map((s) => s.column), 4);
  const is1Plus2 = maxCol === 3;

  // Group seats by row
  const rowsMap: Record<number, Seat[]> = {};
  seats.forEach((seat) => {
    if (!rowsMap[seat.row]) rowsMap[seat.row] = [];
    rowsMap[seat.row].push(seat);
  });

  const rowNumbers = Object.keys(rowsMap)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Card className="bg-slate-50 border-2 border-slate-300 p-6 space-y-6 shadow-sm">
      {/* Front Bus Indicator / Driver Cabin */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-slate-500 tracking-wider">
          <CircleDot className="w-4 h-4 text-slate-400" />
          <span>Front of Bus / Entrance</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700">
          <svg
            className="w-5 h-5 text-slate-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeWidth="2" d="M12 3v18M3 12h18M6 6l12 12" />
          </svg>
          <span>Driver</span>
        </div>
      </div>

      {/* Main Seating Grid */}
      <div className="space-y-3 max-w-md mx-auto py-2">
        {rowNumbers.map((rowNum) => {
          const rowSeats = rowsMap[rowNum];

          return (
            <div key={rowNum} className="flex items-center justify-between gap-2">
              {/* Left Seats Group (Col 1 or Col 1 & 2) */}
              <div className="flex items-center gap-2">
                {rowSeats
                  .filter((s) => s.column <= (is1Plus2 ? 1 : 2))
                  .map((seat) => renderSeatButton(seat, selectedSeatNumbers, onToggleSeat))}
              </div>

              {/* Central Aisle */}
              <div
                className="flex-1 min-w-[24px] sm:min-w-[40px] text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-x border-slate-200 py-1 select-none"
                aria-hidden="true"
              >
                Aisle
              </div>

              {/* Right Seats Group (Cols 2 & 3 or Cols 3 & 4) */}
              <div className="flex items-center gap-2">
                {rowSeats
                  .filter((s) => s.column > (is1Plus2 ? 1 : 2))
                  .map((seat) => renderSeatButton(seat, selectedSeatNumbers, onToggleSeat))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rear Bus Indicator */}
      <div className="border-t-2 border-dashed border-slate-300 pt-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Rear of Bus
      </div>
    </Card>
  );
};

// Helper renderer for individual seat button
function renderSeatButton(
  seat: Seat,
  selectedSeatNumbers: string[],
  onToggleSeat: (seatNumber: string) => void
) {
  const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
  const isOccupied = seat.status === 'occupied';
  const isReserved = seat.status === 'reserved';
  const isAvailable = !isOccupied && !isReserved;

  let btnStyle =
    'relative flex flex-col items-center justify-center rounded-xl font-bold transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-w-[48px] min-h-[48px] p-1.5 shadow-2xs border-2';

  if (isSelected) {
    btnStyle += ' bg-blue-700 text-amber-300 border-blue-900 shadow-md scale-105';
  } else if (isOccupied) {
    btnStyle += ' bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed';
  } else if (isReserved) {
    btnStyle += ' bg-pink-100 text-pink-700 border-pink-300 cursor-not-allowed';
  } else {
    btnStyle +=
      ' bg-white text-slate-800 border-slate-300 hover:border-blue-600 hover:bg-blue-50';
  }

  const ariaLabel = `Seat ${seat.seatNumber}, ${
    isSelected ? 'selected' : isOccupied ? 'occupied' : isReserved ? 'reserved' : 'available'
  } ${seat.type}`;

  return (
    <button
      type="button"
      key={seat.id}
      onClick={() => isAvailable && onToggleSeat(seat.seatNumber)}
      disabled={!isAvailable}
      className={btnStyle}
      aria-label={ariaLabel}
      title={`Seat ${seat.seatNumber} (${seat.type}) - ${
        isSelected
          ? 'Selected'
          : isOccupied
          ? 'Occupied'
          : isReserved
          ? 'Reserved'
          : `₹${seat.price}`
      }`}
    >
      <span className="text-xs font-black tracking-tight">{seat.seatNumber}</span>
      <span className="text-[10px] opacity-80 flex items-center gap-0.5 mt-0.5">
        {isSelected ? (
          <Check className="w-3 h-3 stroke-[3]" />
        ) : isOccupied ? (
          <XCircle className="w-3 h-3" />
        ) : isReserved ? (
          <Lock className="w-3 h-3" />
        ) : (
          <Armchair className="w-3 h-3" />
        )}
      </span>
    </button>
  );
}

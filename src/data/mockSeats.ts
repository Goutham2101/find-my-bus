import { BusTrip } from './mockBuses';

export type SeatStatus = 'available' | 'selected' | 'occupied' | 'reserved';
export type SeatType = 'window' | 'aisle' | 'regular' | 'sleeper';

export interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  column: number; // 1, 2, (gap/aisle), 3, 4
  deck?: 'lower' | 'upper';
  type: SeatType;
  status: SeatStatus;
  price: number;
}

// Generate realistic mock seats for a bus trip
export function getMockSeatsForTrip(bus: BusTrip): Seat[] {
  const seats: Seat[] = [];
  const total = bus.totalSeats || 40;
  const isSleeper = bus.isSleeper;
  const is1Plus2 = total <= 30; // 1+2 layout for luxury/sleeper, 2+2 for standard

  const cols = is1Plus2 ? 3 : 4;
  const rows = Math.ceil(total / cols);

  // Pre-determined occupied seat indices for realistic distribution
  const occupiedIndices = new Set([2, 5, 8, 12, 15, 19, 23, 27, 31, 35]);

  let count = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      count++;
      if (count > total) break;

      const seatLetter = String.fromCharCode(64 + r); // A, B, C...
      const seatNumber = `${seatLetter}${c}`;
      
      let type: SeatType = 'regular';
      if (isSleeper) {
        type = 'sleeper';
      } else if (c === 1 || c === cols) {
        type = 'window';
      } else {
        type = 'aisle';
      }

      // Initial status (occupied vs available)
      let initialStatus: SeatStatus = 'available';
      if (occupiedIndices.has(count)) {
        initialStatus = 'occupied';
      } else if (count === 4 || count === 10) {
        initialStatus = 'reserved';
      }

      seats.push({
        id: `${bus.id}-seat-${seatNumber}`,
        seatNumber,
        row: r,
        column: c,
        type,
        status: initialStatus,
        price: bus.fare,
      });
    }
  }

  return seats;
}

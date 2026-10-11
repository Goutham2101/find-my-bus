import { Booking, Passenger } from '../types';
import { MOCK_BOOKINGS } from '../mockData/bookings';
import { MOCK_TRIPS } from '../mockData/trips';

export interface CreateBookingDTO {
  tripId: string;
  journeyDate: string;
  boardingPoint: string;
  droppingPoint: string;
  selectedSeats: string[];
  passengers: Passenger[];
  totalAmount: number;
  baseFare: number;
  taxes: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet';
}

export const bookingService = {
  getUserBookings: async (userId: string = 'user-passenger-01'): Promise<Booking[]> => {
    // Future API: GET /api/v1/bookings/my-bookings
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_BOOKINGS);
      }, 300);
    });
  },

  getBookingById: async (bookingId: string): Promise<Booking | null> => {
    // Future API: GET /api/v1/bookings/:bookingId
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = MOCK_BOOKINGS.find((b) => b.id.toLowerCase() === bookingId.toLowerCase());
        resolve(found || MOCK_BOOKINGS[0]);
      }, 200);
    });
  },

  createBooking: async (data: CreateBookingDTO): Promise<Booking> => {
    // Future API: POST /api/v1/bookings
    return new Promise((resolve) => {
      setTimeout(() => {
        const trip = MOCK_TRIPS.find((t) => t.id === data.tripId) || MOCK_TRIPS[0];
        const randomId = `FMB-AP-${Math.floor(10000 + Math.random() * 90000)}`;
        const randomTkt = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        const newBooking: Booking = {
          id: randomId,
          ticketNumber: randomTkt,
          userId: 'user-passenger-01',
          tripId: data.tripId,
          trip: trip,
          journeyDate: data.journeyDate,
          boardingPoint: data.boardingPoint,
          droppingPoint: data.droppingPoint,
          passengers: data.passengers,
          selectedSeats: data.selectedSeats,
          totalAmount: data.totalAmount,
          baseFare: data.baseFare,
          taxes: data.taxes,
          bookingStatus: 'Confirmed',
          paymentStatus: 'Paid',
          paymentMethod: data.paymentMethod,
          bookingDate: new Date().toISOString(),
          qrCodeValue: `FMB-CONFIRMED-${randomId}-${trip.bus.busNumber.replace(/\s+/g, '')}-${data.passengers[0]?.name.toUpperCase()}`
        };

        MOCK_BOOKINGS.unshift(newBooking);
        resolve(newBooking);
      }, 500);
    });
  },

  cancelBooking: async (bookingId: string): Promise<Booking> => {
    // Future API: POST /api/v1/bookings/:bookingId/cancel
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const target = MOCK_BOOKINGS.find((b) => b.id === bookingId);
        if (target) {
          target.bookingStatus = 'Cancelled';
          target.paymentStatus = 'Refunded';
          resolve(target);
        } else {
          reject(new Error('Booking not found'));
        }
      }, 350);
    });
  }
};

import { DriverTripManifest } from '../types';
import { MOCK_BOOKINGS } from '../mockData/bookings';

let mockDriverManifest: DriverTripManifest = {
  tripId: 'trip-nsp-hyd-01',
  busNumber: 'AP 39 Z 1008',
  routeName: 'Narasaraopeta to Hyderabad',
  departureTime: '06:30 AM',
  status: 'Active',
  passengers: [
    {
      bookingId: 'FMB-AP-98241',
      ticketNumber: 'TKT-2026-9824',
      passengerName: 'Barat Ankam',
      seatNumber: '12',
      gender: 'Male',
      boardingPoint: 'Narasaraopeta RTC Bus Stand',
      isBoarded: true,
      boardedAt: '06:28 AM'
    },
    {
      bookingId: 'FMB-AP-98241',
      ticketNumber: 'TKT-2026-9824',
      passengerName: 'Sita Ankam',
      seatNumber: '13',
      gender: 'Female',
      boardingPoint: 'Narasaraopeta RTC Bus Stand',
      isBoarded: false
    },
    {
      bookingId: 'FMB-AP-55410',
      ticketNumber: 'TKT-2026-5541',
      passengerName: 'Venkat Rao',
      seatNumber: '14',
      gender: 'Male',
      boardingPoint: 'Prakash Nagar Arch',
      isBoarded: false
    },
    {
      bookingId: 'FMB-AP-88122',
      ticketNumber: 'TKT-2026-8812',
      passengerName: 'Latha Devi',
      seatNumber: '15',
      gender: 'Female',
      boardingPoint: 'Chilakaluripet Bypass',
      isBoarded: false
    }
  ]
};

export const driverService = {
  getDriverTripManifest: async (driverId: string = 'drv-01'): Promise<DriverTripManifest> => {
    // Future API: GET /api/v1/driver/trip-manifest
    return new Promise((resolve) => setTimeout(() => resolve(mockDriverManifest), 200));
  },

  verifyAndBoardPassenger: async (searchQuery: string): Promise<{ success: boolean; message: string; passengerName?: string; seatNumber?: string }> => {
    // Future API: POST /api/v1/driver/board-passenger
    return new Promise((resolve) => {
      setTimeout(() => {
        const query = searchQuery.trim().toLowerCase();
        const p = mockDriverManifest.passengers.find(
          (item) =>
            item.bookingId.toLowerCase() === query ||
            item.ticketNumber.toLowerCase() === query ||
            item.passengerName.toLowerCase().includes(query) ||
            item.seatNumber.toLowerCase() === query
        );

        if (!p) {
          resolve({
            success: false,
            message: 'No passenger found matching Booking ID, Ticket #, or Seat number.'
          });
          return;
        }

        if (p.isBoarded) {
          resolve({
            success: false,
            message: `Passenger already boarded at ${p.boardedAt || 'earlier'}.`,
            passengerName: p.passengerName,
            seatNumber: p.seatNumber
          });
          return;
        }

        p.isBoarded = true;
        p.boardedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        resolve({
          success: true,
          message: `Passenger ${p.passengerName} (Seat ${p.seatNumber}) successfully verified & boarded.`,
          passengerName: p.passengerName,
          seatNumber: p.seatNumber
        });
      }, 400);
    });
  },

  updateTripStatus: async (status: 'Scheduled' | 'Active' | 'Completed'): Promise<DriverTripManifest> => {
    mockDriverManifest.status = status;
    return mockDriverManifest;
  }
};

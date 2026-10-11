export interface StoredBooking {
  id: string; // Booking ID e.g. FMB-2026-101-A1B2
  ticketNumber: string; // e.g. TK-98410107
  tripId: string;
  operator: string;
  busNumber: string;
  serviceName: string;
  journeyDate: string; // YYYY-MM-DD
  from: string;
  to: string;
  departureTimeFormatted: string;
  arrivalTimeFormatted: string;
  departureStation: string;
  arrivalStation: string;
  seats: string[];
  passengerCount: number;
  totalAmount: number;
  bookingStatus: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'Paid' | 'Pending';
  createdAt: string;
}

const STORAGE_KEY = 'find_my_bus_bookings_v1';

// Seed demo bookings if localStorage is empty to ensure a rich demo experience
const DEMO_BOOKINGS: StoredBooking[] = [
  {
    id: 'FMB-2026-101-A1A2',
    ticketNumber: 'TK-98410107',
    tripId: 'bus-101',
    operator: 'APSRTC',
    busNumber: 'AP 16 Z 4052',
    serviceName: 'Super Luxury Express',
    journeyDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    from: 'Narasaraopeta',
    to: 'Vijayawada',
    departureTimeFormatted: '05:30 AM',
    arrivalTimeFormatted: '08:15 AM',
    departureStation: 'RTC Bus Stand, Narasaraopeta',
    arrivalStation: 'Pandit Nehru Bus Station (PNBS), Vijayawada',
    seats: ['A1', 'A2'],
    passengerCount: 2,
    totalAmount: 375,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'Paid',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'FMB-2026-102-B1',
    ticketNumber: 'TK-98410208',
    tripId: 'bus-102',
    operator: 'APSRTC',
    busNumber: 'AP 07 Z 1984',
    serviceName: 'Indra AC Service',
    journeyDate: '2026-09-15', // Past date
    from: 'Narasaraopeta',
    to: 'Vijayawada',
    departureTimeFormatted: '07:00 AM',
    arrivalTimeFormatted: '09:30 AM',
    departureStation: 'RTC Bus Stand, Narasaraopeta',
    arrivalStation: 'Pandit Nehru Bus Station (PNBS), Vijayawada',
    seats: ['B1'],
    passengerCount: 1,
    totalAmount: 275,
    bookingStatus: 'COMPLETED',
    paymentStatus: 'Paid',
    createdAt: '2026-09-14T10:00:00.000Z',
  },
];

export const bookingStorage = {
  getBookings(): StoredBooking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Save initial demo dataset to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_BOOKINGS));
        return DEMO_BOOKINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEMO_BOOKINGS;
    }
  },

  getBookingById(id: string): StoredBooking | undefined {
    const bookings = this.getBookings();
    return bookings.find((b) => b.id === id);
  },

  saveBooking(booking: StoredBooking): void {
    try {
      const bookings = this.getBookings();
      const existingIndex = bookings.findIndex((b) => b.id === booking.id);
      if (existingIndex >= 0) {
        bookings[existingIndex] = booking;
      } else {
        bookings.unshift(booking);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save booking to localStorage', e);
    }
  },
};

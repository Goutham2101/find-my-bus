import { Booking } from '../types';
import { MOCK_TRIPS } from './trips';

const getTodayDateStr = () => new Date().toISOString().split('T')[0];
const getTomorrowDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};
const getYesterdayDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'FMB-AP-98241',
    ticketNumber: 'TKT-2026-9824',
    userId: 'user-passenger-01',
    tripId: MOCK_TRIPS[0].id,
    trip: MOCK_TRIPS[0],
    journeyDate: getTodayDateStr(),
    boardingPoint: 'Narasaraopeta RTC Bus Stand (06:30 AM)',
    droppingPoint: 'MGBS Bus Terminal Hyderabad (12:00 PM)',
    passengers: [
      { name: 'Barat Ankam', age: 24, gender: 'Male', seatNumber: '12', isBoarded: true, boardedAtTime: '06:28 AM' },
      { name: 'Sita Ankam', age: 22, gender: 'Female', seatNumber: '13', isBoarded: false }
    ],
    selectedSeats: ['12', '13'],
    totalAmount: 1040,
    baseFare: 960,
    taxes: 80,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    bookingDate: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    qrCodeValue: 'FMB-CONFIRMED-FMB-AP-98241-AP39Z1008-BARAT'
  },
  {
    id: 'FMB-AP-77319',
    ticketNumber: 'TKT-2026-7731',
    userId: 'user-passenger-01',
    tripId: MOCK_TRIPS[2].id, // Scheduled for today 08:00 AM
    trip: MOCK_TRIPS[2],
    journeyDate: getTodayDateStr(),
    boardingPoint: 'PNBS Vijayawada Platform 12 (08:00 AM)',
    droppingPoint: 'Dwaraka Bus Stand Visakhapatnam (02:30 PM)',
    passengers: [
      { name: 'Barat Ankam', age: 24, gender: 'Male', seatNumber: '08', isBoarded: false }
    ],
    selectedSeats: ['08'],
    totalAmount: 670,
    baseFare: 620,
    taxes: 50,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    bookingDate: new Date(Date.now() - 3600000 * 12).toISOString(),
    qrCodeValue: 'FMB-CONFIRMED-FMB-AP-77319-AP39Z4421-BARAT'
  },
  {
    id: 'FMB-AP-44102',
    ticketNumber: 'TKT-2026-4410',
    userId: 'user-passenger-01',
    tripId: MOCK_TRIPS[3].id, // Tomorrow
    trip: MOCK_TRIPS[3],
    journeyDate: getTomorrowDateStr(),
    boardingPoint: 'Narasaraopeta Clock Tower (10:00 PM)',
    droppingPoint: 'KPHB Hyderabad (03:30 AM)',
    passengers: [
      { name: 'Barat Ankam', age: 24, gender: 'Male', seatNumber: 'L21', isBoarded: false }
    ],
    selectedSeats: ['L21'],
    totalAmount: 960,
    baseFare: 890,
    taxes: 70,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    bookingDate: new Date().toISOString(),
    qrCodeValue: 'FMB-CONFIRMED-FMB-AP-44102-AP39W7712-BARAT'
  },
  {
    id: 'FMB-AP-11099',
    ticketNumber: 'TKT-2026-1109',
    userId: 'user-passenger-01',
    tripId: MOCK_TRIPS[1].id,
    trip: { ...MOCK_TRIPS[1], journeyDate: getYesterdayDateStr(), status: 'Completed' },
    journeyDate: getYesterdayDateStr(),
    boardingPoint: 'Guntur NTR Bus Station (10:45 PM)',
    droppingPoint: 'Ameerpet Metro (03:15 AM)',
    passengers: [
      { name: 'Barat Ankam', age: 24, gender: 'Male', seatNumber: '04', isBoarded: true }
    ],
    selectedSeats: ['04'],
    totalAmount: 810,
    baseFare: 750,
    taxes: 60,
    bookingStatus: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'NetBanking',
    bookingDate: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    qrCodeValue: 'FMB-COMPLETED-FMB-AP-11099'
  },
  {
    id: 'FMB-AP-00821',
    ticketNumber: 'TKT-2026-0082',
    userId: 'user-passenger-01',
    tripId: MOCK_TRIPS[0].id,
    trip: MOCK_TRIPS[0],
    journeyDate: getYesterdayDateStr(),
    boardingPoint: 'Narasaraopeta RTC Stand',
    droppingPoint: 'MGBS Hyderabad',
    passengers: [
      { name: 'Kalyan Kumar', age: 30, gender: 'Male', seatNumber: '18', isBoarded: false }
    ],
    selectedSeats: ['18'],
    totalAmount: 520,
    baseFare: 480,
    taxes: 40,
    bookingStatus: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: 'UPI',
    bookingDate: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    qrCodeValue: 'FMB-CANCELLED-FMB-AP-00821'
  }
];

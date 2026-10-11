export type UserRole = 'passenger' | 'driver' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  emergencyContact?: string;
  avatarUrl?: string;
}

export type BusType = 'RTC Super Luxury' | 'RTC Ultra Deluxe' | 'RTC Garuda Plus' | 'AC Sleeper' | 'Non-AC Sleeper' | 'AC Seater' | 'Non-AC Seater';
export type OperatorType = 'APSRTC' | 'Private';

export interface Bus {
  id: string;
  operatorName: string;
  operatorType: OperatorType;
  busNumber: string;
  busType: BusType;
  totalSeats: number;
  layoutType: '2x2' | '1x2' | '2x1';
  amenities: string[];
  rating: number;
  totalReviews: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

export interface Stop {
  id: string;
  name: string;
  city: string;
  landmark?: string;
  sequenceOrder: number;
  estimatedArrivalOffsetMinutes: number; // minutes from trip start
}

export interface Route {
  id: string;
  routeName: string;
  sourceCity: string;
  destinationCity: string;
  distanceKm: number;
  estimatedDurationHours: number;
  stops: Stop[];
  status: 'Active' | 'Inactive';
}

export interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  column: number;
  deck: 'lower' | 'upper';
  type: 'seater' | 'sleeper';
  isWindow: boolean;
  isLadiesReserved?: boolean;
  isOccupied: boolean;
  price: number;
}

export interface Trip {
  id: string;
  busId: string;
  bus: Bus;
  routeId: string;
  route: Route;
  departureTime: string; // ISO string or format e.g. "06:30 AM"
  arrivalTime: string;
  journeyDate: string; // YYYY-MM-DD
  startingFare: number;
  availableSeatsCount: number;
  boardingPoints: { id: string; name: string; time: string; address: string }[];
  droppingPoints: { id: string; name: string; time: string; address: string }[];
  status: 'Scheduled' | 'Active' | 'Completed' | 'Cancelled';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
}

export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled' | 'Pending';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber: string;
  isBoarded?: boolean;
  boardedAtTime?: string;
}

export interface Booking {
  id: string; // e.g. "FMB-AP-98241"
  ticketNumber: string; // e.g. "TKT-2026-7782"
  userId: string;
  tripId: string;
  trip: Trip;
  journeyDate: string; // YYYY-MM-DD
  boardingPoint: string;
  droppingPoint: string;
  passengers: Passenger[];
  selectedSeats: string[];
  totalAmount: number;
  baseFare: number;
  taxes: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet';
  bookingDate: string; // ISO format
  qrCodeValue: string;
}

export type TripGpsStatus = 'Not Started' | 'Starting Soon' | 'On Route' | 'Approaching Boarding Stop' | 'Delayed' | 'Arrived' | 'Trip Completed' | 'Location Unavailable';

export interface LiveLocationData {
  bookingId: string;
  tripId: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  latitude: number;
  longitude: number;
  speedKmH: number;
  lastUpdated: string;
  currentStatus: TripGpsStatus;
  nextStopName: string;
  etaMinutes: number;
  distanceRemainingKm: number;
  gpsSignal: 'Active' | 'Weak' | 'Disabled' | 'Permission Required';
  isGpsAvailable: boolean;
  securityState: 'Eligible' | 'LockedFutureDate' | 'LockedNotStarted' | 'InvalidBooking';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'reminder' | 'live_update' | 'delay' | 'payment';
  timestamp: string;
  isRead: boolean;
  bookingId?: string;
}

export interface DriverTripManifest {
  tripId: string;
  busNumber: string;
  routeName: string;
  departureTime: string;
  status: 'Scheduled' | 'Active' | 'Completed';
  passengers: {
    bookingId: string;
    ticketNumber: string;
    passengerName: string;
    seatNumber: string;
    gender: string;
    boardingPoint: string;
    isBoarded: boolean;
    boardedAt?: string;
  }[];
}

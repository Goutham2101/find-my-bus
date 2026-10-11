import { LiveLocationData, TripGpsStatus } from '../types';
import { MOCK_BOOKINGS } from '../mockData/bookings';

/**
 * Tracking Service - Ready for Socket.IO WebSocket live location updates and Geolocation API.
 */
export const trackingService = {
  getLiveLocationForBooking: async (bookingId: string): Promise<LiveLocationData> => {
    // Future API: GET /api/v1/tracking/booking/:bookingId or socket.emit('join-trip-room', tripId)
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = MOCK_BOOKINGS.find((b) => b.id.toLowerCase() === bookingId.toLowerCase());
        const todayStr = new Date().toISOString().split('T')[0];

        if (!booking) {
          resolve({
            bookingId,
            tripId: '',
            busNumber: 'Unknown',
            driverName: 'N/A',
            driverPhone: 'N/A',
            latitude: 16.2355,
            longitude: 80.0496,
            speedKmH: 0,
            lastUpdated: new Date().toLocaleTimeString(),
            currentStatus: 'Location Unavailable',
            nextStopName: 'Unknown',
            etaMinutes: 0,
            distanceRemainingKm: 0,
            gpsSignal: 'Disabled',
            isGpsAvailable: false,
            securityState: 'InvalidBooking'
          });
          return;
        }

        const isToday = booking.journeyDate === todayStr;
        const isTripActive = booking.trip.status === 'Active';

        if (!isToday && booking.journeyDate > todayStr) {
          // Future date lock
          resolve({
            bookingId: booking.id,
            tripId: booking.tripId,
            busNumber: booking.trip.bus.busNumber,
            driverName: booking.trip.driverName || 'Assigned Driver',
            driverPhone: booking.trip.driverPhone || 'Contact Depot',
            latitude: 16.2355,
            longitude: 80.0496,
            speedKmH: 0,
            lastUpdated: 'Locked',
            currentStatus: 'Not Started',
            nextStopName: booking.boardingPoint,
            etaMinutes: 0,
            distanceRemainingKm: 0,
            gpsSignal: 'Disabled',
            isGpsAvailable: false,
            securityState: 'LockedFutureDate'
          });
          return;
        }

        if (isToday && !isTripActive) {
          // Journey today but trip not started yet
          resolve({
            bookingId: booking.id,
            tripId: booking.tripId,
            busNumber: booking.trip.bus.busNumber,
            driverName: booking.trip.driverName || 'Assigned Driver',
            driverPhone: booking.trip.driverPhone || 'Contact Depot',
            latitude: 16.2355,
            longitude: 80.0496,
            speedKmH: 0,
            lastUpdated: 'Trip Scheduled',
            currentStatus: 'Starting Soon',
            nextStopName: booking.boardingPoint,
            etaMinutes: 45,
            distanceRemainingKm: 12,
            gpsSignal: 'Permission Required',
            isGpsAvailable: false,
            securityState: 'LockedNotStarted'
          });
          return;
        }

        // Fully Eligible Live GPS Tracking (Active trip today!)
        resolve({
          bookingId: booking.id,
          tripId: booking.tripId,
          busNumber: booking.trip.bus.busNumber,
          driverName: booking.trip.driverName || 'R. Koteswara Rao',
          driverPhone: booking.trip.driverPhone || '+91 98480 12345',
          latitude: 16.2415, // Near Guntur/Chilakaluripet NH-16
          longitude: 80.1245,
          speedKmH: 62,
          lastUpdated: 'Just now (10 sec ago)',
          currentStatus: 'On Route',
          nextStopName: 'Guntur NTR Bus Station',
          etaMinutes: 22,
          distanceRemainingKm: 18.5,
          gpsSignal: 'Active',
          isGpsAvailable: true,
          securityState: 'Eligible'
        });
      }, 300);
    });
  }
};

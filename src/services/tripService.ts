import { Trip, Seat } from '../types';
import { MOCK_TRIPS, generateSeatMap } from '../mockData/trips';

export interface TripSearchParams {
  from: string;
  to: string;
  date?: string;
  busType?: string;
  operatorType?: 'APSRTC' | 'Private' | 'All';
  isAc?: boolean;
}

export const tripService = {
  searchTrips: async (params: TripSearchParams): Promise<Trip[]> => {
    // Future API: GET /api/v1/trips/search?from=...&to=...&date=...
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_TRIPS];

        if (params.from && params.from.trim() !== '') {
          const fromLower = params.from.toLowerCase();
          results = results.filter(
            (t) =>
              t.route.sourceCity.toLowerCase().includes(fromLower) ||
              t.route.stops.some((s) => s.name.toLowerCase().includes(fromLower) || s.city.toLowerCase().includes(fromLower))
          );
        }

        if (params.to && params.to.trim() !== '') {
          const toLower = params.to.toLowerCase();
          results = results.filter(
            (t) =>
              t.route.destinationCity.toLowerCase().includes(toLower) ||
              t.route.stops.some((s) => s.name.toLowerCase().includes(toLower) || s.city.toLowerCase().includes(toLower))
          );
        }

        if (params.operatorType && params.operatorType !== 'All') {
          results = results.filter((t) => t.bus.operatorType === params.operatorType);
        }

        if (params.isAc !== undefined) {
          results = results.filter((t) => t.bus.busType.includes('AC') === params.isAc);
        }

        resolve(results);
      }, 300);
    });
  },

  getTripById: async (tripId: string): Promise<Trip | null> => {
    // Future API: GET /api/v1/trips/:tripId
    return new Promise((resolve) => {
      setTimeout(() => {
        const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];
        resolve(trip);
      }, 200);
    });
  },

  getSeatsForTrip: async (tripId: string): Promise<Seat[]> => {
    // Future API: GET /api/v1/trips/:tripId/seats
    return new Promise((resolve) => {
      setTimeout(() => {
        const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];
        const seats = generateSeatMap(trip.bus.layoutType, trip.bus.busType.includes('Sleeper') ? 'sleeper' : 'seater', trip.startingFare);
        resolve(seats);
      }, 250);
    });
  }
};

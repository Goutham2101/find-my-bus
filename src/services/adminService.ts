import { MOCK_ADMIN_STATS, MOCK_REVENUE_CHART, MOCK_DRIVERS, DriverUser } from '../mockData/adminData';
import { MOCK_BUSES } from '../mockData/buses';
import { MOCK_ROUTES, MOCK_TRIPS } from '../mockData/trips';
import { MOCK_BOOKINGS } from '../mockData/bookings';
import { Bus, Route, Trip, Booking } from '../types';

export const adminService = {
  getDashboardStats: async () => {
    // Future API: GET /api/v1/admin/dashboard-stats
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ADMIN_STATS), 150));
  },

  getRevenueChartData: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_REVENUE_CHART), 150));
  },

  getAllBuses: async (): Promise<Bus[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_BUSES), 150));
  },

  getAllRoutes: async (): Promise<Route[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ROUTES), 150));
  },

  getAllTrips: async (): Promise<Trip[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_TRIPS), 150));
  },

  getAllDrivers: async (): Promise<DriverUser[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DRIVERS), 150));
  },

  getAllBookings: async (): Promise<Booking[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_BOOKINGS), 150));
  },

  getLiveFleet: async () => {
    // Socket.IO / Redis Live Fleet monitoring mock feed
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            busNumber: 'AP 39 Z 1008',
            operator: 'APSRTC Super Luxury',
            route: 'Narasaraopeta -> Hyderabad',
            driverName: 'R. Koteswara Rao',
            speed: 64,
            currentLocation: 'NH-16, Near Chilakaluripet',
            status: 'On Route',
            lastUpdated: '10s ago',
            lat: 16.2415,
            lng: 80.1245
          },
          {
            busNumber: 'AP 39 Z 4421',
            operator: 'APSRTC Garuda Plus',
            route: 'Vijayawada -> Visakhapatnam',
            driverName: 'M. Samba Siva Rao',
            speed: 72,
            currentLocation: 'Eluru Highway Pass',
            status: 'On Route',
            lastUpdated: '25s ago',
            lat: 16.7107,
            lng: 81.0952
          },
          {
            busNumber: 'AP 07 TE 9988',
            operator: 'Morning Star Travels',
            route: 'Guntur -> Hyderabad',
            driverName: 'S. Venkateswarlu',
            speed: 0,
            currentLocation: 'Guntur NTR Bus Stand',
            status: 'Starting Soon',
            lastUpdated: '1m ago',
            lat: 16.3067,
            lng: 80.4365
          }
        ]);
      }, 200);
    });
  }
};

import { Bus } from '../types';
import { MOCK_BUSES } from '../mockData/buses';

/**
 * Bus Service - Ready for MongoDB Bus Model API
 */
export const busService = {
  getAllBuses: async (): Promise<Bus[]> => {
    // Future API: GET /api/v1/buses
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_BUSES), 200));
  },

  getBusById: async (busId: string): Promise<Bus | null> => {
    // Future API: GET /api/v1/buses/:busId
    return new Promise((resolve) => {
      const bus = MOCK_BUSES.find((b) => b.id === busId) || MOCK_BUSES[0];
      setTimeout(() => resolve(bus), 200);
    });
  },

  addBus: async (busData: Omit<Bus, 'id' | 'rating' | 'totalReviews'>): Promise<Bus> => {
    // Future API: POST /api/v1/buses
    const newBus: Bus = {
      ...busData,
      id: `bus-custom-${Date.now()}`,
      rating: 4.5,
      totalReviews: 1
    };
    MOCK_BUSES.push(newBus);
    return newBus;
  }
};

import { Route } from '../types';
import { MOCK_ROUTES } from '../mockData/trips';
import { MOCK_CITIES } from '../mockData/locations';

export const routeService = {
  getAllRoutes: async (): Promise<Route[]> => {
    // Future API: GET /api/v1/routes
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ROUTES), 200));
  },

  getCities: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_CITIES), 100));
  },

  getRouteById: async (routeId: string): Promise<Route | null> => {
    // Future API: GET /api/v1/routes/:routeId
    return new Promise((resolve) => {
      const route = MOCK_ROUTES.find((r) => r.id === routeId) || MOCK_ROUTES[0];
      setTimeout(() => resolve(route), 200);
    });
  }
};

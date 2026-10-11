import { NotificationItem } from '../types';
import { MOCK_NOTIFICATIONS } from '../mockData/notifications';

export const notificationService = {
  getUserNotifications: async (userId: string = 'user-passenger-01'): Promise<NotificationItem[]> => {
    // Future API: GET /api/v1/notifications
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_NOTIFICATIONS]), 200);
    });
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    // Future API: PUT /api/v1/notifications/:id/read
    const notif = MOCK_NOTIFICATIONS.find((n) => n.id === notificationId);
    if (notif) notif.isRead = true;
  }
};

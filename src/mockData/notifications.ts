import { NotificationItem } from '../types';

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'user-passenger-01',
    title: 'Booking Confirmed!',
    message: 'Your ticket FMB-AP-98241 for Narasaraopeta to Hyderabad on today at 06:30 AM is confirmed.',
    type: 'booking',
    timestamp: '10 minutes ago',
    isRead: false,
    bookingId: 'FMB-AP-98241'
  },
  {
    id: 'notif-02',
    userId: 'user-passenger-01',
    title: 'Bus Started Journey',
    message: 'APSRTC Super Luxury (AP 39 Z 1008) has departed from Narasaraopeta RTC Bus Stand.',
    type: 'live_update',
    timestamp: '25 minutes ago',
    isRead: false,
    bookingId: 'FMB-AP-98241'
  },
  {
    id: 'notif-03',
    userId: 'user-passenger-01',
    title: 'Journey Reminder',
    message: 'Your trip to Hyderabad is scheduled today. Boarding point: Narasaraopeta RTC Bus Stand.',
    type: 'reminder',
    timestamp: '2 hours ago',
    isRead: true,
    bookingId: 'FMB-AP-98241'
  },
  {
    id: 'notif-04',
    userId: 'user-passenger-01',
    title: 'Payment Received',
    message: 'Payment of ₹1,040 received successfully via UPI for ticket FMB-AP-98241.',
    type: 'payment',
    timestamp: '1 day ago',
    isRead: true,
    bookingId: 'FMB-AP-98241'
  },
  {
    id: 'notif-05',
    userId: 'user-passenger-01',
    title: 'Upcoming Trip Tomorrow',
    message: 'Orange Travels AC Sleeper to Hyderabad departs tomorrow at 10:00 PM.',
    type: 'reminder',
    timestamp: '3 hours ago',
    isRead: true,
    bookingId: 'FMB-AP-44102'
  }
];

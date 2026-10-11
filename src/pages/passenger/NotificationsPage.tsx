import React, { useState, useEffect } from 'react';
import { NotificationItem } from '../../types';
import { notificationService } from '../../services/notificationService';
import { NotificationCard } from '../../components/notifications/NotificationCard';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { Bell, CheckCheck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    setIsLoading(true);
    notificationService.getUserNotifications().then((data) => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, []);

  const handleMarkAsRead = (id: string) => {
    notificationService.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.isRead : true));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">Notifications & Alerts</h1>
            <p className="text-xs text-slate-500 font-medium">Trip updates, booking confirmations & delay alerts</p>
          </div>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
        >
          <CheckCheck className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setFilter('all')}
          className={`pb-2 px-3 text-xs font-bold border-b-2 ${
            filter === 'all' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`pb-2 px-3 text-xs font-bold border-b-2 ${
            filter === 'unread' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500'
          }`}
        >
          Unread ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {isLoading ? (
        <LoadingState message="Fetching notification alerts..." />
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((n) => (
            <NotificationCard key={n.id} notification={n} onMarkAsRead={handleMarkAsRead} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No notifications"
          description="You are all caught up! Trip updates and booking receipts will show up here."
        />
      )}
    </div>
  );
};

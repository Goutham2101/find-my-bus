import React from 'react';
import { NotificationItem } from '../../types';
import { Ticket, Clock, Navigation, CheckCircle, CreditCard, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'booking':
        return <Ticket className="w-5 h-5 text-blue-600" />;
      case 'live_update':
        return <Navigation className="w-5 h-5 text-emerald-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-indigo-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        notification.isRead
          ? 'bg-white border-slate-200 opacity-90'
          : 'bg-blue-50/50 border-blue-200 shadow-2xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {notification.title}
              {!notification.isRead && (
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
            <span className="text-[10px] text-slate-400 font-medium block mt-2">
              {notification.timestamp}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-[11px] font-bold text-blue-700 hover:text-blue-900"
            >
              Mark Read
            </button>
          )}

          {notification.bookingId && (
            <Link
              to={`/track/${notification.bookingId}`}
              className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold"
            >
              View Track
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

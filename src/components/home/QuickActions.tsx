import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, Navigation, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Search Buses',
      description: 'Find buses between locations and view available schedules.',
      path: '/search',
      icon: <Search className="w-6 h-6 text-blue-700" />,
      badgeBg: 'bg-blue-100',
    },
    {
      title: 'My Bookings',
      description: 'View your booked journeys, tickets, and boarding details.',
      path: '/my-bookings',
      icon: <Bookmark className="w-6 h-6 text-indigo-700" />,
      badgeBg: 'bg-indigo-100',
    },
    {
      title: 'Track My Bus',
      description: 'Track an eligible active journey on your travel date.',
      path: '/search?mode=track',
      icon: <Navigation className="w-6 h-6 text-emerald-700" />,
      badgeBg: 'bg-emerald-100',
    },
    {
      title: 'Help & Support',
      description: 'Get help with bookings, tickets, and travel guidelines.',
      path: '/profile',
      icon: <HelpCircle className="w-6 h-6 text-amber-700" />,
      badgeBg: 'bg-amber-100',
    },
  ];

  return (
    <section className="py-2" aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="sr-only">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {actions.map((action) => (
          <Link key={action.title} to={action.path} className="group block focus:outline-none">
            <Card
              variant="default"
              className="h-full flex flex-col justify-between transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-md group-focus:ring-2 group-focus:ring-blue-600"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl ${action.badgeBg} flex items-center justify-center shrink-0`}
                  >
                    {action.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

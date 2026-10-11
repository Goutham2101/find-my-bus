import React from 'react';
import { Navigation, Clock, Armchair, Ticket, Bell, Map } from 'lucide-react';
import { Card } from '../ui';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      title: 'Live Bus Tracking',
      description: 'See your booked bus location when live tracking is available on your trip date.',
      icon: <Navigation className="w-6 h-6 text-blue-700" />,
    },
    {
      title: 'ETA Updates',
      description: 'View estimated arrival information and stop-by-stop schedule updates.',
      icon: <Clock className="w-6 h-6 text-emerald-700" />,
    },
    {
      title: 'Easy Seat Booking',
      description: 'Choose your preferred available seat from clear visual seating layouts.',
      icon: <Armchair className="w-6 h-6 text-indigo-700" />,
    },
    {
      title: 'Digital Ticket',
      description: 'Access your booking details, ticket number, and optional QR pass anytime.',
      icon: <Ticket className="w-6 h-6 text-amber-700" />,
    },
    {
      title: 'Journey Notifications',
      description: 'Receive important booking confirmation, timing, and travel updates.',
      icon: <Bell className="w-6 h-6 text-purple-700" />,
    },
    {
      title: 'Route Information',
      description: 'View full route details, boarding points, and destination stop info.',
      icon: <Map className="w-6 h-6 text-teal-700" />,
    },
  ];

  return (
    <section className="space-y-6 py-4" aria-labelledby="key-features-heading">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 id="key-features-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Key Platform Features
        </h2>
        <p className="text-slate-600 text-base">
          Everything you need for a comfortable, transparent, and hassle-free transit experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col gap-3 bg-white border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

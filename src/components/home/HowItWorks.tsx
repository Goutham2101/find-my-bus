import React from 'react';
import { Search, Compass, CheckCircle2, Navigation, Info } from 'lucide-react';
import { Card } from '../ui';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Enter your starting point, destination, and journey date.',
      icon: <Search className="w-6 h-6 text-blue-700" />,
    },
    {
      number: '02',
      title: 'Choose',
      description: 'Compare available buses and select your preferred seat.',
      icon: <Compass className="w-6 h-6 text-indigo-700" />,
    },
    {
      number: '03',
      title: 'Book',
      description: 'Enter passenger details and confirm your booking.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-700" />,
    },
    {
      number: '04',
      title: 'Track',
      description: 'On your journey date, track your booked bus when the trip becomes active.',
      icon: <Navigation className="w-6 h-6 text-amber-700" />,
    },
  ];

  return (
    <section className="space-y-6 py-4" aria-labelledby="how-it-works-heading">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          How Find My Bus Works
        </h2>
        <p className="text-slate-600 text-base">
          Four simple steps to plan, book, and complete your journey smoothly.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step) => (
          <Card key={step.number} className="relative flex flex-col justify-between space-y-4 bg-white border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 tracking-wider">
                STEP {step.number}
              </span>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                {step.icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Mandatory Tracking Clarity Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm leading-relaxed">
          <span className="font-bold">Important Note on Live Tracking: </span>
          Live bus tracking becomes active only for eligible confirmed bookings on the scheduled journey date when the bus starts its trip.
        </div>
      </div>
    </section>
  );
};

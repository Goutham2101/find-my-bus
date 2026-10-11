import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Bus, Navigation, Clock, ArrowRight } from 'lucide-react';
import { Card, Button } from '../ui';

export const TrackingExplanation: React.FC = () => {
  const navigate = useNavigate();

  const flowSteps = [
    {
      step: 'Passenger Booking',
      detail: 'Confirmed Ticket',
      icon: <Ticket className="w-6 h-6 text-blue-700" />,
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
    },
    {
      step: 'Assigned Bus',
      detail: 'Trip Activated on Date',
      icon: <Bus className="w-6 h-6 text-indigo-700" />,
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    },
    {
      step: 'Live Location',
      detail: 'Active Route Signal',
      icon: <Navigation className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
    {
      step: 'ETA Updates',
      detail: 'Estimated Stop Arrival',
      icon: <Clock className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
    },
  ];

  return (
    <section className="py-4" aria-labelledby="tracking-explanation-heading">
      <Card className="bg-slate-900 text-white border-0 shadow-lg p-6 sm:p-10 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-800 text-amber-300 tracking-wider">
            TRANSPARENT TRACKING
          </span>
          <h2 id="tracking-explanation-heading" className="text-2xl sm:text-4xl font-extrabold text-white">
            Know Where Your Bus Is
          </h2>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
            Live bus tracking becomes available on your journey date for confirmed bookings when the assigned trip is active.
          </p>
        </div>

        {/* Visual Flow Representation */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
            Tracking Availability Workflow
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {flowSteps.map((item, index) => (
              <React.Fragment key={item.step}>
                <div className={`p-4 rounded-lg border ${item.bg} flex flex-col justify-between space-y-3 relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold opacity-75">0{index + 1}</span>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{item.step}</h4>
                    <p className="text-xs opacity-80 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => navigate('/search?mode=track')}
            variant="primary"
            size="lg"
            className="bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold border-0"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Learn About Tracking
          </Button>
        </div>
      </Card>
    </section>
  );
};

import React from 'react';
import { Route } from '../../types';
import { MapPin, Clock } from 'lucide-react';

interface RouteTimelineProps {
  route: Route;
  departureTime?: string;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ route }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-blue-600" />
        Route & Intermediate Boarding/Dropping Stops
      </h4>

      <div className="relative border-l-2 border-blue-200 ml-3 pl-6 space-y-6">
        {route.stops.map((stop, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === route.stops.length - 1;

          return (
            <div key={stop.id} className="relative">
              {/* Dot */}
              <div
                className={`absolute -left-8.5 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  isFirst
                    ? 'bg-blue-600 border-blue-700 text-white ring-4 ring-blue-100'
                    : isLast
                    ? 'bg-emerald-600 border-emerald-700 text-white ring-4 ring-emerald-100'
                    : 'bg-white border-blue-500 text-blue-700'
                }`}
              >
                {stop.sequenceOrder}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">{stop.name}</span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    +{stop.estimatedArrivalOffsetMinutes} mins
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {stop.city} {stop.landmark ? `(${stop.landmark})` : ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

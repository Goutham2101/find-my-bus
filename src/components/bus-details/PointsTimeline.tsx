import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { BusTrip } from '../../data/mockBuses';
import { Card } from '../ui';

export interface PointsTimelineProps {
  bus: BusTrip;
}

export const PointsTimeline: React.FC<PointsTimelineProps> = ({ bus }) => {
  // Generate stop points for timeline if explicit list not provided
  const routeStops: string[] = React.useMemo(() => {
    if (bus.routeStops && bus.routeStops.length > 0) return bus.routeStops;
    const stops = [bus.departureLocation];
    if (bus.departureLocation === 'Narasaraopeta' && bus.arrivalLocation === 'Vijayawada') {
      stops.push('Chilakaluripet', 'Guntur');
    } else if (!stops.includes(bus.arrivalLocation)) {
      stops.push('En-route Junction');
    }
    stops.push(bus.arrivalLocation);
    return Array.from(new Set(stops));
  }, [bus]);

  return (
    <div className="space-y-6">
      {/* Boarding & Dropping Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Boarding Points */}
        <Card className="bg-white border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Boarding Points</h3>
              <p className="text-xs text-slate-500">Pick-up locations & timetable</p>
            </div>
          </div>

          <div className="space-y-3">
            {bus.boardingPoints.map((point, index) => (
              <div key={point} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{point}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Expected Boarding: {index === 0 ? bus.departureTimeFormatted : 'En-route pickup'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dropping Points */}
        <Card className="bg-white border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
              <MapPin className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Dropping Points</h3>
              <p className="text-xs text-slate-500">Drop-off locations & timetable</p>
            </div>
          </div>

          <div className="space-y-3">
            {bus.droppingPoints.map((point, index) => (
              <div key={point} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{point}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Expected Drop: {index === bus.droppingPoints.length - 1 ? bus.arrivalTimeFormatted : 'En-route drop'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Route Timeline */}
      <Card className="bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Navigation className="w-5 h-5 text-blue-700" />
          <h3 className="font-bold text-slate-900 text-lg">Route Timeline & Key Stops</h3>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
          {routeStops.map((stop: string, idx: number) => (
            <div key={stop} className="relative flex items-center gap-4">
              <div className="absolute -left-6 w-5 h-5 rounded-full bg-white border-4 border-blue-700 shrink-0" />
              <div className="flex items-center justify-between w-full p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 text-sm">{stop}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">
                  {idx === 0
                    ? `Start: ${bus.departureTimeFormatted}`
                    : idx === routeStops.length - 1
                    ? `Destination: ${bus.arrivalTimeFormatted}`
                    : 'En-route stop'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

import React from 'react';
import {
  Zap,
  Droplets,
  Wifi,
  Wind,
  Sun,
  ShieldCheck,
  Armchair,
  Bed,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../ui';

export interface AmenitiesListProps {
  amenities: string[];
}

export const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('ac') && !lower.includes('non-ac')) return <Wind className="w-5 h-5 text-blue-600" />;
    if (lower.includes('charging')) return <Zap className="w-5 h-5 text-amber-600" />;
    if (lower.includes('water')) return <Droplets className="w-5 h-5 text-blue-500" />;
    if (lower.includes('wifi') || lower.includes('wi-fi')) return <Wifi className="w-5 h-5 text-purple-600" />;
    if (lower.includes('reading') || lower.includes('light')) return <Sun className="w-5 h-5 text-amber-500" />;
    if (lower.includes('sleeper') || lower.includes('berth') || lower.includes('blanket') || lower.includes('pillow'))
      return <Bed className="w-5 h-5 text-indigo-600" />;
    if (lower.includes('pushback') || lower.includes('reclining') || lower.includes('seating'))
      return <Armchair className="w-5 h-5 text-emerald-600" />;
    if (lower.includes('tracking')) return <Navigation className="w-5 h-5 text-emerald-600" />;
    return <ShieldCheck className="w-5 h-5 text-blue-600" />;
  };

  return (
    <Card className="bg-white border border-slate-200 p-5 space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-900 text-lg">Bus Amenities & Facilities</h3>
        <p className="text-xs text-slate-500">Provided on this service</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {amenities.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
          >
            <div className="p-2 bg-white rounded-md border border-slate-200 shrink-0">
              {getAmenityIcon(item)}
            </div>
            <span className="font-bold text-sm text-slate-800">{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

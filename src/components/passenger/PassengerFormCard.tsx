import React from 'react';
import { User, Armchair } from 'lucide-react';
import { Card, Input } from '../ui';

export interface PassengerInfo {
  seatNumber: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
}

export interface PassengerFormCardProps {
  index: number;
  passenger: PassengerInfo;
  onChange: (index: number, field: keyof PassengerInfo, value: string) => void;
}

export const PassengerFormCard: React.FC<PassengerFormCardProps> = ({
  index,
  passenger,
  onChange,
}) => {
  return (
    <Card className="bg-white border border-slate-200 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-700" />
          <span>Passenger {index + 1}</span>
        </h3>
        <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
          <Armchair className="w-3.5 h-3.5" />
          <span>Seat {passenger.seatNumber}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-6">
          <Input
            label="Full Name *"
            placeholder="Full Name (as on ID card)"
            value={passenger.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            required
          />
        </div>

        {/* Age */}
        <div className="sm:col-span-3">
          <Input
            label="Age *"
            type="number"
            min="1"
            max="119"
            placeholder="Age"
            value={passenger.age}
            onChange={(e) => onChange(index, 'age', e.target.value)}
            required
          />
        </div>

        {/* Gender */}
        <div className="sm:col-span-3 flex flex-col gap-1.5">
          <label className="block text-sm font-semibold text-slate-800">
            Gender *
          </label>
          <select
            value={passenger.gender}
            onChange={(e) => onChange(index, 'gender', e.target.value as any)}
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium cursor-pointer"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

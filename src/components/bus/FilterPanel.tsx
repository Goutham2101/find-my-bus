import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterPanelProps {
  operatorType: 'All' | 'APSRTC' | 'Private';
  setOperatorType: (val: 'All' | 'APSRTC' | 'Private') => void;
  busTypeFilter: string;
  setBusTypeFilter: (val: string) => void;
  isAcOnly: boolean;
  setIsAcOnly: (val: boolean) => void;
  timeFilter: 'All' | 'Morning' | 'Afternoon' | 'Night';
  setTimeFilter: (val: 'All' | 'Morning' | 'Afternoon' | 'Night') => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  operatorType,
  setOperatorType,
  busTypeFilter,
  setBusTypeFilter,
  isAcOnly,
  setIsAcOnly,
  timeFilter,
  setTimeFilter,
  onReset
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          Filter Buses
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Operator Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Operator Service
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['All', 'APSRTC', 'Private'] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setOperatorType(op)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                operatorType === op
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* AC / Non-AC Toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold text-slate-700">Air Conditioning (AC Only)</span>
          <input
            type="checkbox"
            checked={isAcOnly}
            onChange={(e) => setIsAcOnly(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
        </label>
      </div>

      {/* Bus Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Bus Layout / Seating
        </label>
        <select
          value={busTypeFilter}
          onChange={(e) => setBusTypeFilter(e.target.value)}
          className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        >
          <option value="All">All Bus Types</option>
          <option value="RTC Super Luxury">RTC Super Luxury</option>
          <option value="RTC Garuda Plus">RTC Garuda Plus</option>
          <option value="AC Sleeper">AC Sleeper (1x2)</option>
          <option value="AC Seater">AC Seater (2x2)</option>
        </select>
      </div>

      {/* Departure Time */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Departure Time
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setTimeFilter('Morning')}
            className={`p-2 rounded-xl border text-center font-medium ${
              timeFilter === 'Morning'
                ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Morning
            <span className="block text-[10px] text-slate-400 font-normal">06 AM - 12 PM</span>
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('Night')}
            className={`p-2 rounded-xl border text-center font-medium ${
              timeFilter === 'Night'
                ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Night
            <span className="block text-[10px] text-slate-400 font-normal">06 PM - 12 AM</span>
          </button>
        </div>
      </div>
    </div>
  );
};

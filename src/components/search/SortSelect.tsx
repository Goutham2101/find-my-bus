import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption =
  | 'earliest'
  | 'latest'
  | 'price_low'
  | 'price_high'
  | 'duration';

export interface SortSelectProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0"
      >
        <ArrowUpDown className="w-4 h-4 text-blue-700" />
        <span>Sort By:</span>
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 cursor-pointer min-h-[38px]"
      >
        <option value="earliest">Departure: Earliest</option>
        <option value="latest">Departure: Latest</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="duration">Duration: Shortest</option>
      </select>
    </div>
  );
};

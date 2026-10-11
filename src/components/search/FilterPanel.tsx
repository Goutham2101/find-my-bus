import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { Button, Card } from '../ui';

export interface FilterState {
  operatorType: string[]; // ['RTC', 'Private']
  categories: string[]; // ['AC', 'Non-AC', 'Sleeper', 'Seater']
  departureTimes: string[]; // ['before_6am', '6am_12pm', '12pm_6pm', 'after_6pm']
  arrivalTimes: string[]; // ['before_6am', '6am_12pm', '12pm_6pm', 'after_6pm']
  maxPrice: number;
}

export interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearFilters: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const toggleArrayFilter = (field: keyof FilterState, value: string) => {
    const currentList = (filters[field] as string[]) || [];
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];

    onFilterChange({
      ...filters,
      [field]: updated,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      maxPrice: Number(e.target.value),
    });
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Filter className="w-5 h-5 text-blue-700" />
          <span>Filter Buses</span>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* 1. Operator Type */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-slate-800">Bus Type</h4>
        <div className="space-y-1.5">
          {[
            { id: 'RTC', label: 'APSRTC (Government)' },
            { id: 'Private', label: 'Private Operators' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.operatorType.includes(item.id)}
                onChange={() => toggleArrayFilter('operatorType', item.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Bus Category & AC */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-slate-800">Category & Comfort</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'AC', label: 'AC' },
            { id: 'Non-AC', label: 'Non-AC' },
            { id: 'Seater', label: 'Seater' },
            { id: 'Sleeper', label: 'Sleeper' },
          ].map((item) => {
            const isSelected = filters.categories.includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleArrayFilter('categories', item.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold text-center border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Departure Time */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-slate-800">Departure Time</h4>
        <div className="space-y-1.5">
          {[
            { id: 'before_6am', label: 'Before 6:00 AM' },
            { id: '6am_12pm', label: '6:00 AM – 12:00 PM' },
            { id: '12pm_6pm', label: '12:00 PM – 6:00 PM' },
            { id: 'after_6pm', label: 'After 6:00 PM' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.departureTimes.includes(item.id)}
                onChange={() => toggleArrayFilter('departureTimes', item.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Arrival Time */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-slate-800">Arrival Time</h4>
        <div className="space-y-1.5">
          {[
            { id: 'before_6am', label: 'Before 6:00 AM' },
            { id: '6am_12pm', label: '6:00 AM – 12:00 PM' },
            { id: '12pm_6pm', label: '12:00 PM – 6:00 PM' },
            { id: 'after_6pm', label: 'After 6:00 PM' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.arrivalTimes.includes(item.id)}
                onChange={() => toggleArrayFilter('arrivalTimes', item.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Max Fare Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <h4 className="font-bold text-slate-800">Max Price</h4>
          <span className="font-bold text-blue-900">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-blue-700 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹100</span>
          <span>₹1000</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <Card className="hidden lg:block bg-white border border-slate-200 p-5 sticky top-24">
        {content}
      </Card>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <h3 className="font-bold text-lg text-slate-900">Filters</h3>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <Button
                onClick={onCloseMobile}
                variant="primary"
                className="w-full font-bold bg-blue-700 text-white py-3"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

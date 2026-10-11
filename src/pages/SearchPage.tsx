import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Calendar, MapPin, Bus } from 'lucide-react';
import { MOCK_BUSES, BusTrip } from '../data/mockBuses';
import {
  SearchForm,
  FilterPanel,
  FilterState,
  SortSelect,
  SortOption,
  BusCard,
} from '../components/search';
import { EmptyState, LoadingState, Button } from '../components/ui';

const DEFAULT_FILTERS: FilterState = {
  operatorType: [],
  categories: [],
  departureTimes: [],
  arrivalTimes: [],
  maxPrice: 1000,
};

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters with fallback defaults
  const fromQuery = searchParams.get('from') || 'Narasaraopeta';
  const toQuery = searchParams.get('to') || 'Vijayawada';
  const dateQuery =
    searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('earliest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Search Submission
  const handleSearchSubmit = (from: string, to: string, date: string) => {
    setIsLoading(true);
    setSearchParams({ from, to, date });
    setTimeout(() => setIsLoading(false), 250);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Helper to parse HH:MM into hour
  const getHour = (timeStr: string) => {
    const [h] = timeStr.split(':');
    return parseInt(h, 10);
  };

  // Filter & Sort Logic
  const filteredBuses = useMemo(() => {
    return MOCK_BUSES.filter((bus) => {
      // 1. Route filter (case-insensitive location matching)
      if (fromQuery.trim()) {
        const fromLower = fromQuery.toLowerCase();
        const matchFrom =
          bus.departureLocation.toLowerCase().includes(fromLower) ||
          bus.departureStation.toLowerCase().includes(fromLower);
        if (!matchFrom) {
          // If searching for a route outside exact mock data, show available AP buses instead of hard-failing
          const routeExistsInMock = MOCK_BUSES.some((b) =>
            b.departureLocation.toLowerCase().includes(fromLower)
          );
          if (routeExistsInMock) return false;
        }
      }

      if (toQuery.trim()) {
        const toLower = toQuery.toLowerCase();
        const matchTo =
          bus.arrivalLocation.toLowerCase().includes(toLower) ||
          bus.arrivalStation.toLowerCase().includes(toLower);
        if (!matchTo) {
          const routeExistsInMock = MOCK_BUSES.some((b) =>
            b.arrivalLocation.toLowerCase().includes(toLower)
          );
          if (routeExistsInMock) return false;
        }
      }

      // 2. Operator Type Filter
      if (
        filters.operatorType.length > 0 &&
        !filters.operatorType.includes(bus.operatorType)
      ) {
        return false;
      }

      // 3. Category & Comfort Filter
      if (filters.categories.length > 0) {
        const matchesCategory = filters.categories.some((cat) => {
          if (cat === 'AC') return bus.isAC;
          if (cat === 'Non-AC') return !bus.isAC;
          if (cat === 'Sleeper') return bus.isSleeper;
          if (cat === 'Seater') return !bus.isSleeper;
          return false;
        });
        if (!matchesCategory) return false;
      }

      // 4. Departure Time Filter
      if (filters.departureTimes.length > 0) {
        const depHour = getHour(bus.departureTime);
        const matchesDep = filters.departureTimes.some((slot) => {
          if (slot === 'before_6am') return depHour < 6;
          if (slot === '6am_12pm') return depHour >= 6 && depHour < 12;
          if (slot === '12pm_6pm') return depHour >= 12 && depHour < 18;
          if (slot === 'after_6pm') return depHour >= 18;
          return false;
        });
        if (!matchesDep) return false;
      }

      // 5. Arrival Time Filter
      if (filters.arrivalTimes.length > 0) {
        const arrHour = getHour(bus.arrivalTime);
        const matchesArr = filters.arrivalTimes.some((slot) => {
          if (slot === 'before_6am') return arrHour < 6;
          if (slot === '6am_12pm') return arrHour >= 6 && arrHour < 12;
          if (slot === '12pm_6pm') return arrHour >= 12 && arrHour < 18;
          if (slot === 'after_6pm') return arrHour >= 18;
          return false;
        });
        if (!matchesArr) return false;
      }

      // 6. Max Fare Filter
      if (bus.fare > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'earliest':
          return a.departureTime.localeCompare(b.departureTime);
        case 'latest':
          return b.departureTime.localeCompare(a.departureTime);
        case 'price_low':
          return a.fare - b.fare;
        case 'price_high':
          return b.fare - a.fare;
        case 'duration':
          return a.durationMinutes - b.durationMinutes;
        default:
          return 0;
      }
    });
  }, [fromQuery, toQuery, filters, sortOption]);

  // Format date nicely
  const formattedDate = useMemo(() => {
    try {
      const d = new Date(dateQuery);
      if (isNaN(d.getTime())) return dateQuery;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateQuery;
    }
  }, [dateQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Compact Search Form Header */}
      <SearchForm
        initialFrom={fromQuery}
        initialTo={toQuery}
        initialDate={dateQuery}
        onSearch={handleSearchSubmit}
      />

      {/* 2. Results Header & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
            <span>Buses from</span>
            <span className="text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              {fromQuery}
            </span>
            <span>to</span>
            <span className="text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              {toQuery}
            </span>
          </h1>
          <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-600 flex-wrap">
            <span className="font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded text-xs">
              {filteredBuses.length} {filteredBuses.length === 1 ? 'bus' : 'buses'} found
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Sorting & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
          <Button
            onClick={() => setIsMobileFilterOpen(true)}
            variant="outline"
            size="sm"
            className="lg:hidden text-sm font-semibold flex items-center gap-1.5"
          >
            <Filter className="w-4 h-4 text-blue-700" />
            <span>Filters</span>
          </Button>

          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      {/* Main Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Bus List Results */}
        <div className="lg:col-span-3 space-y-4">
          {isLoading ? (
            <LoadingState message="Searching available bus routes..." size="md" />
          ) : filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)
          ) : (
            <EmptyState
              title="No buses found"
              description="Try changing your filters, price range, or search locations."
              icon={<Bus className="w-8 h-8 text-blue-700" />}
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trip } from '../../types';
import { tripService } from '../../services/tripService';
import { SearchForm } from '../../components/bus/SearchForm';
import { FilterPanel } from '../../components/bus/FilterPanel';
import { BusCard } from '../../components/bus/BusCard';
import { LoadingState } from '../../components/common/LoadingState';
import { EmptyState } from '../../components/common/EmptyState';
import { Bus } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || 'Narasaraopeta';
  const to = searchParams.get('to') || 'Hyderabad';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filter States
  const [operatorType, setOperatorType] = useState<'All' | 'APSRTC' | 'Private'>('All');
  const [busTypeFilter, setBusTypeFilter] = useState<string>('All');
  const [isAcOnly, setIsAcOnly] = useState<boolean>(false);
  const [timeFilter, setTimeFilter] = useState<'All' | 'Morning' | 'Afternoon' | 'Night'>('All');

  useEffect(() => {
    setIsLoading(true);
    tripService
      .searchTrips({ from, to, date, operatorType, isAc: isAcOnly ? true : undefined })
      .then((res) => {
        let filtered = [...res];

        if (busTypeFilter !== 'All') {
          filtered = filtered.filter((t) => t.bus.busType === busTypeFilter);
        }

        if (timeFilter === 'Morning') {
          filtered = filtered.filter((t) => t.departureTime.includes('AM'));
        } else if (timeFilter === 'Night') {
          filtered = filtered.filter((t) => t.departureTime.includes('PM'));
        }

        setTrips(filtered);
      })
      .finally(() => setIsLoading(false));
  }, [from, to, date, operatorType, busTypeFilter, isAcOnly, timeFilter]);

  const handleResetFilters = () => {
    setOperatorType('All');
    setBusTypeFilter('All');
    setIsAcOnly(false);
    setTimeFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search Banner */}
      <SearchForm initialFrom={from} initialTo={to} initialDate={date} compact />

      {/* Main Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Panel */}
        <div className="lg:col-span-3">
          <FilterPanel
            operatorType={operatorType}
            setOperatorType={setOperatorType}
            busTypeFilter={busTypeFilter}
            setBusTypeFilter={setBusTypeFilter}
            isAcOnly={isAcOnly}
            setIsAcOnly={setIsAcOnly}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Results Stream */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Available Buses ({trips.length})
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Showing results for <span className="font-semibold text-slate-800">{from}</span> →{' '}
                <span className="font-semibold text-slate-800">{to}</span> on {date}
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Sorted by Departure Time
            </span>
          </div>

          {isLoading ? (
            <LoadingState message="Fetching live APSRTC and private bus schedules..." />
          ) : trips.length > 0 ? (
            trips.map((trip) => <BusCard key={trip.id} trip={trip} />)
          ) : (
            <EmptyState
              title="No buses found for this route"
              description="Try adjusting your date or filter options to explore available services."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

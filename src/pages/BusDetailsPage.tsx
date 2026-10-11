import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { MOCK_BUSES } from '../data/mockBuses';
import {
  BusHeader,
  JourneySummaryCard,
  PointsTimeline,
  AmenitiesList,
  FareAndActionCard,
} from '../components/bus-details';
import { EmptyState } from '../components/ui';

export const BusDetailsPage: React.FC = () => {
  const { busId } = useParams<{ busId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read URL query parameters for journey context
  const dateQuery =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const fromQuery = searchParams.get('from') || undefined;
  const toQuery = searchParams.get('to') || undefined;

  // Find target bus from mock dataset
  const bus = MOCK_BUSES.find((b) => b.id === busId);

  // Reconstruct back search URL preserving parameters
  const searchBackUrl = React.useMemo(() => {
    const params = new URLSearchParams();
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    if (dateQuery) params.append('date', dateQuery);
    return `/search?${params.toString()}`;
  }, [fromQuery, toQuery, dateQuery]);

  // Handle bus not found
  if (!bus) {
    return (
      <div className="py-8 max-w-2xl mx-auto">
        <EmptyState
          title="Bus not found"
          description="The bus you're looking for is no longer available or the link is invalid."
          icon={<Bus className="w-8 h-8 text-blue-700" />}
          actionLabel="Back to Search"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Page Header & Back Button */}
      <BusHeader bus={bus} searchBackUrl={searchBackUrl} />

      {/* 2. Main Content Grid (Desktop: 2 Columns, Mobile: 1 Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Details (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Journey Timing & Date Summary */}
          <JourneySummaryCard bus={bus} journeyDate={dateQuery} />

          {/* Boarding, Dropping & Route Timeline */}
          <PointsTimeline bus={bus} />

          {/* Amenities & Facilities */}
          <AmenitiesList amenities={bus.amenities} />
        </div>

        {/* Sidebar Fare & Action (4 cols on desktop) */}
        <div className="lg:col-span-4">
          <FareAndActionCard
            bus={bus}
            journeyDate={dateQuery}
            fromQuery={fromQuery}
            toQuery={toQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default BusDetailsPage;

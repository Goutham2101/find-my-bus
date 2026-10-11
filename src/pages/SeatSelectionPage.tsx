import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Bus, MapPin, Calendar, Clock } from 'lucide-react';
import { MOCK_BUSES } from '../data/mockBuses';
import { getMockSeatsForTrip, Seat } from '../data/mockSeats';
import { SeatLegend, SeatMap, BookingSummary } from '../components/booking';
import { EmptyState, Card } from '../components/ui';
import { firebaseAuthService } from '../services/firebaseAuth';

export const SeatSelectionPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read URL query parameters
  const dateQuery =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const fromQuery = searchParams.get('from');
  const toQuery = searchParams.get('to');

  // Find matching bus trip from mock dataset
  const bus = useMemo(() => {
    return MOCK_BUSES.find((b) => b.id === tripId);
  }, [tripId]);

  // Generate initial seats for selected bus
  const initialSeats = useMemo(() => {
    if (!bus) return [];
    return getMockSeatsForTrip(bus);
  }, [bus]);

  // Local state for selected seat numbers
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>([]);
  const [maxSeatsWarning, setMaxSeatsWarning] = useState(false);

  // Toggle seat selection with 6-seat limit
  const handleToggleSeat = (seatNumber: string) => {
    setMaxSeatsWarning(false);
    if (selectedSeatNumbers.includes(seatNumber)) {
      setSelectedSeatNumbers((prev) => prev.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeatNumbers.length >= 6) {
        setMaxSeatsWarning(true);
        return;
      }
      setSelectedSeatNumbers((prev) => [...prev, seatNumber]);
    }
  };

  // Reconstruct URL parameters for navigation
  const queryParamsString = useMemo(() => {
    const params = new URLSearchParams();
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    return params.toString();
  }, [dateQuery, fromQuery, toQuery]);

  // Handle Continue to Passenger Details
  const handleContinue = () => {
    if (selectedSeatNumbers.length === 0) return;
    const params = new URLSearchParams();
    params.append('seats', selectedSeatNumbers.join(','));
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);

    const passengerUrl = `/booking/${tripId}/passenger?${params.toString()}`;

    if (firebaseAuthService.isAuthenticated()) {
      navigate(passengerUrl);
    } else {
      navigate('/login', { state: { from: passengerUrl } });
    }
  };

  // If trip is not found
  if (!bus) {
    return (
      <div className="py-8 max-w-2xl mx-auto">
        <EmptyState
          title="Trip not found"
          description="The selected bus trip could not be found."
          icon={<Bus className="w-8 h-8 text-blue-700" />}
          actionLabel="Back to Search"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  const departureCity = fromQuery || bus.departureLocation;
  const arrivalCity = toQuery || bus.arrivalLocation;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Page Header & Back Link */}
      <div className="space-y-4">
        <div>
          <Link
            to={`/bus/${bus.id}?${queryParamsString}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bus Details</span>
          </Link>
        </div>

        <Card className="bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded">
                STEP 1 OF 3 • SEAT SELECTION
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Select Your Seats
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Bus className="w-4 h-4 text-blue-700" />
              <span>{bus.operator}</span> • <span>{bus.serviceName}</span> (
              <span className="font-extrabold text-slate-900">{bus.busNumber}</span>)
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-semibold text-slate-700 pt-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>
                {departureCity} ({bus.departureTimeFormatted}) → {arrivalCity} ({bus.arrivalTimeFormatted})
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-900 bg-blue-50 px-3 py-1 rounded border border-blue-200">
              <Calendar className="w-4 h-4 text-blue-700" />
              <span>Journey Date: {dateQuery}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 2. Main Content Grid (Desktop: 2 Columns, Mobile: 1 Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Legend & Interactive Seat Map */}
        <div className="lg:col-span-8 space-y-6">
          <SeatLegend />

          <SeatMap
            seats={initialSeats}
            selectedSeatNumbers={selectedSeatNumbers}
            onToggleSeat={handleToggleSeat}
            isSleeper={bus.isSleeper}
          />
        </div>

        {/* Right Side: Booking Summary & Continue Action */}
        <div className="lg:col-span-4">
          <BookingSummary
            bus={bus}
            selectedSeats={selectedSeatNumbers}
            journeyDate={dateQuery}
            onContinue={handleContinue}
            maxSeatsWarning={maxSeatsWarning}
          />
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;

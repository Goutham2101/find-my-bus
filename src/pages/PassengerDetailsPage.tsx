import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bus, MapPin, Calendar, Users, ShieldCheck } from 'lucide-react';
import { MOCK_BUSES } from '../data/mockBuses';
import { PassengerFormCard, PassengerInfo, ContactFormCard } from '../components/passenger';
import { EmptyState, Card, Button } from '../components/ui';

export const PassengerDetailsPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read URL query parameters
  const seatsQuery = searchParams.get('seats');
  const dateQuery =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const fromQuery = searchParams.get('from');
  const toQuery = searchParams.get('to');

  // Parse selected seat numbers
  const seatNumbers = useMemo(() => {
    if (!seatsQuery) return [];
    return seatsQuery
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }, [seatsQuery]);

  // Find target bus trip from mock dataset
  const bus = useMemo(() => {
    return MOCK_BUSES.find((b) => b.id === tripId);
  }, [tripId]);

  // Form State
  const [passengerList, setPassengerList] = useState<PassengerInfo[]>(() => {
    return seatNumbers.map((seat) => ({
      seatNumber: seat,
      name: '',
      age: '',
      gender: 'Male',
    }));
  });

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  // Handle passenger field updates
  const handlePassengerChange = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    setPassengerList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Reconstruct seat selection URL
  const seatSelectionUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    return `/booking/${tripId}/seats?${params.toString()}`;
  }, [tripId, dateQuery, fromQuery, toQuery]);

  // Validate form
  const isFormValid = useMemo(() => {
    if (passengerList.length === 0) return false;

    // Validate each passenger
    for (const p of passengerList) {
      if (!p.name.trim()) return false;
      const ageNum = parseInt(p.age, 10);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 120) return false;
      if (!p.gender) return false;
    }

    // Validate contact info
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) return false;
    if (!email.trim() || !email.includes('@') || !email.includes('.')) return false;

    return true;
  }, [passengerList, mobile, email]);

  // Handle Submit & Continue to Payment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !bus) return;

    const params = new URLSearchParams();
    params.append('seats', seatNumbers.join(','));
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);

    navigate(`/booking/${bus.id}/payment?${params.toString()}`);
  };

  // 1. Validation: Trip Not Found
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

  // 2. Validation: No Seats Selected
  if (seatNumbers.length === 0) {
    return (
      <div className="py-8 max-w-2xl mx-auto">
        <EmptyState
          title="No seats selected"
          description="Please select your preferred seats before entering passenger details."
          icon={<Users className="w-8 h-8 text-blue-700" />}
          actionLabel="Back to Seat Selection"
          onAction={() => navigate(seatSelectionUrl)}
        />
      </div>
    );
  }

  const departureCity = fromQuery || bus.departureLocation;
  const arrivalCity = toQuery || bus.arrivalLocation;
  const passengerCount = seatNumbers.length;
  const totalFare = passengerCount * bus.fare;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Back Button & Header Summary */}
      <div className="space-y-4">
        <div>
          <Link
            to={seatSelectionUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Seat Selection</span>
          </Link>
        </div>

        <Card className="bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded">
                STEP 2 OF 3 • PASSENGER DETAILS
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Passenger Information
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
              <span>Date: {dateQuery}</span>
            </div>

            <div className="flex items-center gap-2 text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Seats: {seatNumbers.join(', ')}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid (Desktop: 2 Columns, Mobile: 1 Column) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Passenger & Contact Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* Passenger Input Cards for each seat */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Passenger Information</h2>
            {passengerList.map((passenger, index) => (
              <PassengerFormCard
                key={passenger.seatNumber}
                index={index}
                passenger={passenger}
                onChange={handlePassengerChange}
              />
            ))}
          </div>

          {/* Primary Contact Details */}
          <ContactFormCard
            mobile={mobile}
            email={email}
            onMobileChange={setMobile}
            onEmailChange={setEmail}
          />
        </div>

        {/* Right Column: Booking Summary & Continue Action */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <Card className="bg-white border-2 border-blue-600 shadow-md p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Booking Overview
              </span>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>{departureCity}</span>
                <ArrowRight className="w-4 h-4 text-blue-700" />
                <span>{arrivalCity}</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>Date: {dateQuery}</span>
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Selected Seats:</span>
                <span className="font-bold text-slate-900">{seatNumbers.join(', ')}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Passengers Count:</span>
                <span className="font-bold text-slate-900">{passengerCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Fare per seat:</span>
                <span className="font-bold text-slate-900">₹{bus.fare}</span>
              </div>

              <div className="text-xs text-slate-500 text-right bg-slate-50 p-2 rounded border border-slate-100 font-semibold">
                Calculation: ₹{bus.fare} × {passengerCount}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-slate-900">Total Fare:</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-900">₹{totalFare}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                variant="primary"
                size="lg"
                className="w-full font-bold text-lg bg-amber-400 hover:bg-amber-300 text-blue-950 disabled:bg-slate-200 disabled:text-slate-400 border-0 py-3.5 shadow-md"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Continue to Payment
              </Button>

              {!isFormValid && (
                <p className="text-xs text-center text-slate-500 italic">
                  Fill in all passenger details and primary contact info to continue.
                </p>
              )}
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetailsPage;

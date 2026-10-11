import React, { useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Printer, Home, Bookmark, Bus } from 'lucide-react';
import { MOCK_BUSES } from '../data/mockBuses';
import { bookingStorage } from '../services/bookingStorage';
import { DigitalTicket } from '../components/booking';
import { EmptyState, Card, Button } from '../components/ui';

export const BookingConfirmationPage: React.FC = () => {
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

  // Generate deterministic demo booking IDs
  const bookingId = useMemo(() => {
    if (!bus) return 'FMB-2026-000';
    const cleanSeats = seatNumbers.join('');
    return `FMB-2026-${bus.id.replace('bus-', '')}-${cleanSeats}`;
  }, [bus, seatNumbers]);

  const ticketNumber = useMemo(() => {
    return `TK-984${bus ? bus.id.replace('bus-', '') : '101'}07`;
  }, [bus]);

  const totalAmount = useMemo(() => {
    if (!bus) return 0;
    return seatNumbers.length * bus.fare + 15;
  }, [bus, seatNumbers]);

  const departureCity = fromQuery || bus?.departureLocation || '';
  const arrivalCity = toQuery || bus?.arrivalLocation || '';

  // Persist confirmed booking into localStorage safely without duplication
  useEffect(() => {
    if (bus && seatNumbers.length > 0) {
      bookingStorage.saveBooking({
        id: bookingId,
        ticketNumber,
        tripId: bus.id,
        operator: bus.operator,
        busNumber: bus.busNumber,
        serviceName: bus.serviceName,
        journeyDate: dateQuery,
        from: departureCity,
        to: arrivalCity,
        departureTimeFormatted: bus.departureTimeFormatted,
        arrivalTimeFormatted: bus.arrivalTimeFormatted,
        departureStation: bus.departureStation,
        arrivalStation: bus.arrivalStation,
        seats: seatNumbers,
        passengerCount: seatNumbers.length,
        totalAmount,
        bookingStatus: 'CONFIRMED',
        paymentStatus: 'Paid',
        createdAt: new Date().toISOString(),
      });
    }
  }, [bus, bookingId, ticketNumber, seatNumbers, dateQuery, departureCity, arrivalCity, totalAmount]);

  // Back Navigation URL to Seat Selection (for empty seats fallback)
  const seatSelectionUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    return `/booking/${tripId}/seats?${params.toString()}`;
  }, [tripId, dateQuery, fromQuery, toQuery]);

  const handlePrint = () => {
    window.print();
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
          description="No active seat selection found for confirmation."
          icon={<CheckCircle2 className="w-8 h-8 text-blue-700" />}
          actionLabel="Back to Seat Selection"
          onAction={() => navigate(seatSelectionUrl)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Success Banner Header */}
      <Card className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl border-0 shadow-lg text-center space-y-4 print:hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 uppercase tracking-wider inline-block">
            Payment Successful
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white pt-1">
            Booking Confirmed!
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Your journey has been reserved. Below is your official digital boarding pass and ticket summary.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={handlePrint}
            variant="primary"
            className="bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold border-0"
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print / Download Ticket
          </Button>

          <Link to="/my-bookings">
            <Button
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20 border-white/30"
              leftIcon={<Bookmark className="w-4 h-4" />}
            >
              View My Bookings
            </Button>
          </Link>

          <Link to="/">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>

      {/* Main Digital Ticket Component */}
      <DigitalTicket
        bus={bus}
        seatNumbers={seatNumbers}
        journeyDate={dateQuery}
        fromLocation={departureCity}
        toLocation={arrivalCity}
        bookingId={bookingId}
        ticketNumber={ticketNumber}
        totalAmount={totalAmount}
      />

      {/* Action Footer (Hidden during browser print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
        <p className="text-xs text-slate-500 font-medium">
          Need assistance? Present your Booking ID <strong>({bookingId})</strong> at the departure terminal counter.
        </p>

        <div className="flex items-center gap-3">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Ticket
          </Button>
          <Link to="/">
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;

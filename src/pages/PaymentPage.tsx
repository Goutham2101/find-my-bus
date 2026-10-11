import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Bus, MapPin, Calendar, Users, ShieldCheck, Lock } from 'lucide-react';
import { MOCK_BUSES } from '../data/mockBuses';
import {
  PaymentMethodSelector,
  PaymentMethodType,
  PaymentFormFields,
  FareSummaryCard,
} from '../components/payment';
import { EmptyState, Card } from '../components/ui';

export const PaymentPage: React.FC = () => {
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

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('user@upi');
  const [cardName, setCardName] = useState('John Doe');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [selectedBank, setSelectedBank] = useState('SBI');
  const [isProcessing, setIsProcessing] = useState(false);

  // Back Navigation URL to Passenger Details
  const passengerDetailsUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (seatsQuery) params.append('seats', seatsQuery);
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    return `/booking/${tripId}/passenger?${params.toString()}`;
  }, [tripId, seatsQuery, dateQuery, fromQuery, toQuery]);

  // Back Navigation URL to Seat Selection (for empty seats fallback)
  const seatSelectionUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (dateQuery) params.append('date', dateQuery);
    if (fromQuery) params.append('from', fromQuery);
    if (toQuery) params.append('to', toQuery);
    return `/booking/${tripId}/seats?${params.toString()}`;
  }, [tripId, dateQuery, fromQuery, toQuery]);

  // Frontend Validation for selected payment method
  const isPaymentValid = useMemo(() => {
    if (paymentMethod === 'UPI') {
      return upiId.trim().length >= 3 && upiId.includes('@');
    }
    if (paymentMethod === 'Card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      return (
        cardName.trim().length >= 2 &&
        cleanNum.length >= 15 &&
        cardExpiry.trim().length >= 4 &&
        cardCvv.trim().length >= 3
      );
    }
    if (paymentMethod === 'NetBanking') {
      return selectedBank.trim().length > 0;
    }
    if (paymentMethod === 'Counter') {
      return true;
    }
    return false;
  }, [paymentMethod, upiId, cardName, cardNumber, cardExpiry, cardCvv, selectedBank]);

  // Handle Mock Pay Button Action
  const handlePay = () => {
    if (!isPaymentValid || !bus || isProcessing) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const params = new URLSearchParams();
      if (seatsQuery) params.append('seats', seatsQuery);
      if (dateQuery) params.append('date', dateQuery);
      if (fromQuery) params.append('from', fromQuery);
      if (toQuery) params.append('to', toQuery);

      navigate(`/booking/${bus.id}/confirmation?${params.toString()}`);
    }, 600);
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
          description="Please select your preferred seats before proceeding to payment."
          icon={<Users className="w-8 h-8 text-blue-700" />}
          actionLabel="Back to Seat Selection"
          onAction={() => navigate(seatSelectionUrl)}
        />
      </div>
    );
  }

  const departureCity = fromQuery || bus.departureLocation;
  const arrivalCity = toQuery || bus.arrivalLocation;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Back Button & Header Summary */}
      <div className="space-y-4">
        <div>
          <Link
            to={passengerDetailsUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Passenger Details</span>
          </Link>
        </div>

        <Card className="bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded">
                STEP 3 OF 3 • PAYMENT
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Payment
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Payment Method Selection & Form */}
        <div className="lg:col-span-8 space-y-6">
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
          />

          <PaymentFormFields
            method={paymentMethod}
            upiId={upiId}
            onUpiIdChange={setUpiId}
            cardName={cardName}
            onCardNameChange={setCardName}
            cardNumber={cardNumber}
            onCardNumberChange={setCardNumber}
            cardExpiry={cardExpiry}
            onCardExpiryChange={setCardExpiry}
            cardCvv={cardCvv}
            onCardCvvChange={setCardCvv}
            selectedBank={selectedBank}
            onBankChange={setSelectedBank}
          />
        </div>

        {/* Right Column: Fare Summary & Pay Button */}
        <div className="lg:col-span-4">
          <FareSummaryCard
            bus={bus}
            seatNumbers={seatNumbers}
            journeyDate={dateQuery}
            paymentMethod={paymentMethod}
            isValid={isPaymentValid}
            isProcessing={isProcessing}
            onPay={handlePay}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

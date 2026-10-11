import React from 'react';
import { QrCode, CreditCard, Landmark, Banknote, Info } from 'lucide-react';
import { Card, Input } from '../ui';
import { PaymentMethodType } from './PaymentMethodSelector';

export interface PaymentFormFieldsProps {
  method: PaymentMethodType;
  upiId: string;
  onUpiIdChange: (val: string) => void;
  cardName: string;
  onCardNameChange: (val: string) => void;
  cardNumber: string;
  onCardNumberChange: (val: string) => void;
  cardExpiry: string;
  onCardExpiryChange: (val: string) => void;
  cardCvv: string;
  onCardCvvChange: (val: string) => void;
  selectedBank: string;
  onBankChange: (val: string) => void;
}

export const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({
  method,
  upiId,
  onUpiIdChange,
  cardName,
  onCardNameChange,
  cardNumber,
  onCardNumberChange,
  cardExpiry,
  onCardExpiryChange,
  cardCvv,
  onCardCvvChange,
  selectedBank,
  onBankChange,
}) => {
  if (method === 'UPI') {
    return (
      <Card className="bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <QrCode className="w-5 h-5 text-blue-700" />
          <h4 className="font-bold text-slate-900 text-base">Enter UPI ID</h4>
        </div>

        <Input
          label="UPI Virtual Private Address (VPA) *"
          placeholder="e.g. mobile@upi or username@okaxis"
          value={upiId}
          onChange={(e) => onUpiIdChange(e.target.value)}
          helperText="Supports Google Pay, PhonePe, Paytm, BHIM, and Cred UPI."
          required
        />
      </Card>
    );
  }

  if (method === 'Card') {
    return (
      <Card className="bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <CreditCard className="w-5 h-5 text-purple-700" />
          <h4 className="font-bold text-slate-900 text-base">Credit or Debit Card Details</h4>
        </div>

        <div className="space-y-3">
          <Input
            label="Cardholder Name *"
            placeholder="Name as printed on card"
            value={cardName}
            onChange={(e) => onCardNameChange(e.target.value)}
            required
          />

          <Input
            label="Card Number *"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => onCardNumberChange(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry Date *"
              placeholder="MM/YY"
              maxLength={5}
              value={cardExpiry}
              onChange={(e) => onCardExpiryChange(e.target.value)}
              required
            />

            <Input
              label="CVV / Security Code *"
              type="password"
              placeholder="123"
              maxLength={4}
              value={cardCvv}
              onChange={(e) => onCardCvvChange(e.target.value)}
              required
            />
          </div>
        </div>
      </Card>
    );
  }

  if (method === 'NetBanking') {
    return (
      <Card className="bg-white border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Landmark className="w-5 h-5 text-emerald-700" />
          <h4 className="font-bold text-slate-900 text-base">Select Net Banking Bank</h4>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="block text-sm font-semibold text-slate-800">
            Popular Banks *
          </label>
          <select
            value={selectedBank}
            onChange={(e) => onBankChange(e.target.value)}
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium cursor-pointer"
          >
            <option value="SBI">State Bank of India (SBI)</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="ICICI">ICICI Bank</option>
            <option value="AXIS">Axis Bank</option>
            <option value="PNB">Punjab National Bank</option>
            <option value="CANARA">Canara Bank</option>
          </select>
        </div>
      </Card>
    );
  }

  // Counter / Cash
  return (
    <Card className="bg-amber-50 border border-amber-200 p-5 space-y-3 text-amber-950">
      <div className="flex items-center gap-2 font-bold text-base text-amber-900">
        <Banknote className="w-5 h-5 text-amber-700" />
        <h4>Pay Cash at Terminal Counter</h4>
      </div>
      <p className="text-sm leading-relaxed">
        Your seat reservation will be held. Please arrive at the terminal counter at least 15 minutes before departure time to make your payment and receive your printed boarding pass.
      </p>
    </Card>
  );
};

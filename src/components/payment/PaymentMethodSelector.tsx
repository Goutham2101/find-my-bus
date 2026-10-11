import React from 'react';
import { QrCode, CreditCard, Landmark, Banknote } from 'lucide-react';

export type PaymentMethodType = 'UPI' | 'Card' | 'NetBanking' | 'Counter';

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const methods: {
    id: PaymentMethodType;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'UPI',
      label: 'UPI Payment',
      description: 'GPay, PhonePe, Paytm, BHIM',
      icon: <QrCode className="w-5 h-5 text-blue-700" />,
    },
    {
      id: 'Card',
      label: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: <CreditCard className="w-5 h-5 text-purple-700" />,
    },
    {
      id: 'NetBanking',
      label: 'Net Banking',
      description: 'SBI, HDFC, ICICI, Axis & more',
      icon: <Landmark className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'Counter',
      label: 'Pay at Counter / Cash',
      description: 'Pay cash before boarding at terminal',
      icon: <Banknote className="w-5 h-5 text-amber-700" />,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-slate-900">Select Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => {
          const isSelected = selectedMethod === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMethod(m.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50/70 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isSelected ? 'bg-white shadow-2xs' : 'bg-slate-100'
                }`}
              >
                {m.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{m.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-700 bg-blue-700'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{m.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import { Card, Input } from '../ui';

export interface ContactFormCardProps {
  mobile: string;
  email: string;
  onMobileChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

export const ContactFormCard: React.FC<ContactFormCardProps> = ({
  mobile,
  email,
  onMobileChange,
  onEmailChange,
}) => {
  return (
    <Card className="bg-white border border-slate-200 p-5 space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <span>Primary Contact Details</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Your booking confirmation and SMS ticket will be sent here
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Mobile Phone Number *"
          type="tel"
          placeholder="e.g. 9876543210"
          value={mobile}
          onChange={(e) => onMobileChange(e.target.value)}
          icon={<Phone className="w-5 h-5 text-slate-500" />}
          helperText="Required for SMS ticket and trip updates"
          required
        />

        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. passenger@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          icon={<Mail className="w-5 h-5 text-slate-500" />}
          helperText="Required for electronic ticket confirmation"
          required
        />
      </div>
    </Card>
  );
};

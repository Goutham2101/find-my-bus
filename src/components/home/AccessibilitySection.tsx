import React from 'react';
import { ShieldCheck, Smartphone, Hash, QrCode, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../ui';

export const AccessibilitySection: React.FC = () => {
  const highlights = [
    {
      title: 'Simple & High-Contrast Interface',
      description: 'Clear typography and large readable text designed for easy navigation by elderly passengers and all age groups.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
    },
    {
      title: 'Mobile & Feature Phone Ready',
      description: 'Fully responsive for smartphones. Supports feature phones using plain Booking ID and SMS details without requiring a smartphone.',
      icon: <Smartphone className="w-6 h-6 text-emerald-700" />,
    },
    {
      title: 'Booking ID & Ticket Number',
      description: 'Every confirmed trip receives a clear numeric Booking ID and Ticket Number for simple verbal or manual check-in.',
      icon: <Hash className="w-6 h-6 text-indigo-700" />,
    },
    {
      title: 'Optional QR Pass',
      description: 'Optional digital QR ticket for instant smartphone scanning at the terminal—never mandatory for boarding.',
      icon: <QrCode className="w-6 h-6 text-amber-700" />,
    },
  ];

  return (
    <section className="space-y-6 py-4" aria-labelledby="accessibility-heading">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 id="accessibility-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Designed for Every Passenger
        </h2>
        <p className="text-slate-600 text-base">
          Built with accessibility and convenience at the core for all travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((item) => (
          <Card key={item.title} className="bg-white border border-slate-200 flex items-start gap-4 p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search, ArrowRight, Bus } from 'lucide-react';
import { Button, Card, Input } from '../ui';

export const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  
  // Default values as per requirement
  const [from, setFrom] = useState('Narasaraopeta');
  const [to, setTo] = useState('Vijayawada');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from.trim()) params.append('from', from.trim());
    if (to.trim()) params.append('to', to.trim());
    if (date) params.append('date', date);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl border border-blue-800/50 overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 text-center md:text-left">
        {/* Main Heading & Subtitle */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/80 text-amber-300 text-sm font-semibold border border-blue-700/60 shadow-inner">
            <Bus className="w-4 h-4 text-amber-400 stroke-[2.5]" aria-hidden="true" />
            <span>Reliable Public Transit & Intercity Bus Booking</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Find Your Bus. <br className="hidden sm:inline" />
            <span className="text-amber-400">Track Your Journey.</span>
          </h1>

          <p className="text-base sm:text-xl text-blue-100/90 font-normal leading-relaxed max-w-2xl">
            Search buses, book your seat, and stay informed about your journey with Find My Bus.
          </p>
        </div>

        {/* Bus Search Card */}
        <Card className="bg-white text-slate-900 shadow-2xl p-4 sm:p-6 rounded-xl border border-slate-200">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* From Field */}
              <Input
                label="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure location"
                icon={<MapPin className="w-5 h-5 text-blue-700" />}
                required
              />

              {/* To Field */}
              <Input
                label="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination city/station"
                icon={<MapPin className="w-5 h-5 text-amber-600" />}
                required
              />

              {/* Journey Date Field */}
              <Input
                label="Journey Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                icon={<Calendar className="w-5 h-5 text-blue-700" />}
                required
              />
            </div>

            {/* Search Action Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                className="w-full md:w-auto font-bold text-lg bg-blue-700 hover:bg-blue-800 text-white min-h-[50px] shadow-md"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Search Buses
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

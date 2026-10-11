import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CITIES } from '../../mockData/locations';
import { MapPin, Calendar, ArrowRightLeft, Search } from 'lucide-react';

interface SearchFormProps {
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  compact?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialFrom = 'Narasaraopeta',
  initialTo = 'Hyderabad',
  initialDate,
  compact = false
}) => {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split('T')[0];

  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [journeyDate, setJourneyDate] = useState(initialDate || todayStr);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${journeyDate}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 ${
        compact ? 'max-w-4xl' : 'max-w-5xl'
      } mx-auto`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* From City */}
        <div className="md:col-span-4 relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            From
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              {MOCK_CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 transition-colors shadow-2xs hover:rotate-180 duration-300"
            title="Swap Origin & Destination"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To City */}
        <div className="md:col-span-4 relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            To
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              {MOCK_CITIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Journey Date */}
        <div className="md:col-span-3 relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Journey Date
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              min={todayStr}
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Quick Choice Chips & Search Button */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Routes:</span>
          <button
            type="button"
            onClick={() => {
              setFromCity('Narasaraopeta');
              setToCity('Hyderabad');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
          >
            Narasaraopeta → Hyd
          </button>
          <button
            type="button"
            onClick={() => {
              setFromCity('Vijayawada');
              setToCity('Visakhapatnam');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
          >
            Vijayawada → Vskp
          </button>
          <button
            type="button"
            onClick={() => {
              setFromCity('Guntur');
              setToCity('Tirupati');
            }}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
          >
            Guntur → Tirupati
          </button>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search Buses
        </button>
      </div>
    </form>
  );
};

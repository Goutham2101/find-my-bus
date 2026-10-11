import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { Input, Button, Card } from '../ui';

export interface SearchFormProps {
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  onSearch: (from: string, to: string, date: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  initialFrom = 'Narasaraopeta',
  initialTo = 'Vijayawada',
  initialDate = '',
  onSearch,
}) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(() => {
    if (initialDate) return initialDate;
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (initialFrom) setFrom(initialFrom);
    if (initialTo) setTo(initialTo);
    if (initialDate) setDate(initialDate);
  }, [initialFrom, initialTo, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to, date);
  };

  return (
    <Card className="bg-white border border-slate-200 shadow-sm p-4 sm:p-5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        <div className="sm:col-span-4">
          <Input
            label="From Location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Departure location"
            icon={<MapPin className="w-5 h-5 text-blue-700" />}
            required
          />
        </div>

        <div className="sm:col-span-4">
          <Input
            label="To Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination city"
            icon={<MapPin className="w-5 h-5 text-amber-600" />}
            required
          />
        </div>

        <div className="sm:col-span-3">
          <Input
            label="Journey Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            icon={<Calendar className="w-5 h-5 text-blue-700" />}
            required
          />
        </div>

        <div className="sm:col-span-1">
          <Button
            type="submit"
            variant="primary"
            className="w-full font-bold bg-blue-700 hover:bg-blue-800 text-white min-h-[44px]"
            title="Search Buses"
          >
            <Search className="w-5 h-5" />
            <span className="sm:hidden ml-2">Search Buses</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};

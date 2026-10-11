import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Ticket, ShieldQuestion, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui';

export const HelpPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-700" />
            <span>Help & Support Center</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Frequently asked questions and guidance for finding, tracking, and booking bus journeys.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">1. Searching Buses</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your departure city, destination, and travel date on the home or search page to compare available schedules and fares.
          </p>
        </Card>

        <Card className="p-5 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Ticket className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">2. Seat Selection & Tickets</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Choose your preferred seat from the interactive seat layout, enter passenger details, and proceed to complete your digital booking.
          </p>
        </Card>

        <Card className="p-5 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <ShieldQuestion className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">3. Managing Bookings</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Access your active and completed tickets anytime under the My Bookings tab after signing into your passenger account.
          </p>
        </Card>
      </div>

      <Card className="p-6 border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Need Assistance?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          For prototype testing or inquiry support regarding the Find My Bus platform, please contact your administrator or project supervisor.
        </p>
      </Card>
    </div>
  );
};

export default HelpPage;

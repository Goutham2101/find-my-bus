import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7 text-blue-700" />
            <span>Terms of Service</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            General terms and guidelines for using the Find My Bus service prototype.
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

      <Card className="p-6 sm:p-8 border border-slate-200 space-y-6 text-slate-700 leading-relaxed text-sm">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Platform Scope</h2>
          <p>
            Find My Bus provides search, seat selection, and digital ticket confirmation user interfaces for public transportation bus routes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Ticket Booking Prototype</h2>
          <p>
            Bookings generated through this interface represent simulated digital tickets for application demonstration purposes. Real-world bus boarding is subject to official transport operator policies and verification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. User Responsibilities</h2>
          <p>
            Passengers are responsible for providing accurate contact details during passenger form entry to ensure valid ticket generation and receipt retrieval.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 italic">
            Note: These Terms of Service outline operational guidelines for the Find My Bus platform prototype.
          </p>
        </section>
      </Card>
    </div>
  );
};

export default TermsPage;

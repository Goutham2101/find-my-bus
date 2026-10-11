import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-blue-700" />
            <span>Privacy Policy</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Information regarding data usage and privacy on the Find My Bus platform.
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
          <h2 className="text-lg font-bold text-slate-900">1. Overview</h2>
          <p>
            Find My Bus is a public transit bus search, seat selection, and prototype booking application. This policy outlines how user inputs and account details are handled within the prototype environment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Information Handled</h2>
          <p>
            The application processes passenger names, email addresses, phone numbers, and booking parameters (dates, routes, selected seats) entered during session workflows. Authentication details are processed using Firebase Authentication service where configured.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Storage & Local Persistence</h2>
          <p>
            Demo booking records are saved locally within your web browser's storage (`localStorage`) to preserve tickets between page navigation. Sensitive payment credentials (such as full credit card numbers or banking passwords) are never stored.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-500 italic">
            Note: This Privacy Policy applies to the Find My Bus platform prototype. Formal production data governance policies will be established upon backend API deployment.
          </p>
        </section>
      </Card>
    </div>
  );
};

export default PrivacyPage;

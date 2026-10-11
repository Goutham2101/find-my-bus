import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Card, Button } from '../ui';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4" aria-labelledby="cta-heading">
      <Card className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white text-center p-8 sm:p-12 space-y-6 shadow-xl border-0">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 id="cta-heading" className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to find your bus?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg">
            Search available buses and plan your journey with ease.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/search')}
            size="lg"
            variant="primary"
            className="bg-amber-400 text-blue-950 hover:bg-amber-300 font-bold border-0 px-8 py-3.5 min-h-[50px] shadow-lg text-lg"
            leftIcon={<Search className="w-5 h-5" />}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Search Buses
          </Button>
        </div>
      </Card>
    </section>
  );
};

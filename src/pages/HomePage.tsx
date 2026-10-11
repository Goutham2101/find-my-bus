import React from 'react';
import { HeroSearch } from '../components/home/HeroSearch';
import { QuickActions } from '../components/home/QuickActions';
import { HowItWorks } from '../components/home/HowItWorks';
import { KeyFeatures } from '../components/home/KeyFeatures';
import { TrackingExplanation } from '../components/home/TrackingExplanation';
import { AccessibilitySection } from '../components/home/AccessibilitySection';
import { CtaSection } from '../components/home/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-6">
      {/* 1. Hero Section & Search Form */}
      <HeroSearch />

      {/* 2. Quick Action Shortcuts */}
      <QuickActions />

      {/* 3. How Find My Bus Works */}
      <HowItWorks />

      {/* 4. Key Platform Features */}
      <KeyFeatures />

      {/* 5. Live Tracking Availability Rule & Explanation */}
      <TrackingExplanation />

      {/* 6. Designed for Every Passenger (Accessibility) */}
      <AccessibilitySection />

      {/* 7. Call To Action */}
      <CtaSection />
    </div>
  );
};

export default HomePage;

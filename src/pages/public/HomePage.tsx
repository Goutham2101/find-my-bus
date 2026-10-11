import React from 'react';
import { SearchForm } from '../../components/bus/SearchForm';
import { Bus, Navigation, Ticket, ShieldCheck, Clock, Bell, MapPin, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Grid SVG */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-700/80 text-blue-200 rounded-full text-xs font-semibold border border-blue-600/50">
            <Bus className="w-3.5 h-3.5 text-emerald-400" />
            Official Andhra Pradesh Bus Booking & GPS Portal
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Find Your Bus. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-emerald-300 to-white">
              Track Your Journey.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Real-time APSRTC & private bus schedules, instant seat selection, digital tickets, and GPS live tracking for seamless travel across AP.
          </p>

          {/* Embedded Search Form */}
          <div className="pt-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/search"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all text-center group space-y-2"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Search Bus</h3>
            <p className="text-xs text-slate-500">Find APSRTC & private buses</p>
          </Link>

          <Link
            to="/my-bookings"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all text-center group space-y-2"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">My Bookings</h3>
            <p className="text-xs text-slate-500">View & download e-tickets</p>
          </Link>

          <Link
            to="/track/FMB-AP-98241"
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all text-center group space-y-2"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Track My Bus</h3>
            <p className="text-xs text-slate-500">Live GPS & ETA updates</p>
          </Link>

          <div
            onClick={() => alert('Support helpline: 0866-2570005 (APSRTC 24/7)')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all text-center group space-y-2 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">24/7 Support</h3>
            <p className="text-xs text-slate-500">RTC helpline & assistance</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Step-by-Step Guide</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">How Find My Bus Works</h2>
          <p className="text-sm text-slate-600">Simple and accessible travel booking for all commuters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Search', desc: 'Select source city, destination, and travel date.', icon: Search },
            { step: '02', title: 'Book', desc: 'Choose your preferred seats and make secure payment.', icon: Ticket },
            { step: '03', title: 'Travel', desc: 'Board bus with SMS ticket or optional QR pass.', icon: Bus },
            { step: '04', title: 'Track', desc: 'Follow bus live location & ETA on journey date.', icon: Navigation }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3 shadow-2xs">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Step {item.step}
              </span>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Highlights */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Built for Reliability</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Platform Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Live GPS Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track bus location in real time starting on your journey date once the trip becomes active.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Accurate ETA Updates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Know exact minutes remaining before your bus arrives at your specific boarding stop.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Digital & Keypad Phone Ticket</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                QR code boarding is optional. Simply state your Booking ID or Seat Number to conductor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

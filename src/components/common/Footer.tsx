import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, ShieldCheck, PhoneCall, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Find My <span className="text-blue-500">Bus</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Official live bus tracking and ticket booking portal across Andhra Pradesh. Powered by APSRTC integration and verified private operators.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Bus Fleet
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-400" />
                Real-Time ETA
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">Search Buses</Link>
              </li>
              <li>
                <Link to="/track/FMB-AP-98241" className="hover:text-white transition-colors">Track My Bus</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-white transition-colors">My Bookings</Link>
              </li>
              <li>
                <Link to="/notifications" className="hover:text-white transition-colors">Notifications</Link>
              </li>
            </ul>
          </div>

          {/* Major AP Routes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Popular AP Routes</h4>
            <ul className="space-y-2 text-sm">
              <li>Narasaraopeta → Hyderabad</li>
              <li>Vijayawada → Visakhapatnam</li>
              <li>Guntur → Tirupati</li>
              <li>Amaravati → Narasaraopeta</li>
              <li>Chilakaluripet → Guntur</li>
              <li>Sattenapalli → Ongole</li>
            </ul>
          </div>

          {/* Portals & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Portals & Support</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link to="/driver" className="text-amber-400 hover:underline flex items-center gap-1">
                  Driver & Conductor Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-emerald-400 hover:underline flex items-center gap-1">
                  Admin Fleet Management
                </Link>
              </li>
            </ul>
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-300 font-medium mb-1 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" /> 24/7 RTC Helpline
              </p>
              <p className="text-sm font-bold text-white">0866 - 2570005</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Find My Bus. Designed for Andhra Pradesh Commuters.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

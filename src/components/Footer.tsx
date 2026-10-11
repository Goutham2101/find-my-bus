import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="bg-amber-400 text-blue-950 p-1.5 rounded-md">
                <Bus className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <span>Find My Bus</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Safe, reliable, and accessible public transit bus tracking and booking platform built for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-3">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-amber-400 transition-colors">
                  Search Buses
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-amber-400 transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* User Account */}
          <div>
            <h4 className="text-white font-bold text-base mb-3">Account</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-amber-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-amber-400 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-amber-400 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h4 className="text-white font-bold text-base mb-3">Support & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/help" className="hover:text-amber-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Find My Bus. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for accessible & reliable public transportation.
          </p>
        </div>
      </div>
    </footer>
  );
};

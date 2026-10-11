import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus, Search, Navigation, User, Bell, Menu, X, LogOut, Ticket, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, logoutUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-700/20 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1">
                Find My <span className="text-blue-700">Bus</span>
              </span>
              <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest -mt-1">
                APSRTC & Private Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/search') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              Search Buses
            </Link>
            <Link
              to="/track/FMB-AP-98241"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/track') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-600 animate-pulse" />
              Track Bus
            </Link>
            <Link
              to="/my-bookings"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/my-bookings') ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Ticket className="w-4 h-4" />
              My Bookings
            </Link>
          </nav>

          {/* Right Action Icons & User Info */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/notifications"
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden space-x-2">
            <Link to="/notifications" className="p-2 text-slate-600">
              <Bell className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/search"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50"
          >
            Search Buses
          </Link>
          <Link
            to="/track/FMB-AP-98241"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50 text-blue-700 font-semibold"
          >
            Track Live Bus
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50"
          >
            My Bookings
          </Link>
          <Link
            to="/notifications"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-base font-medium rounded-lg text-slate-800 hover:bg-slate-50"
          >
            Notifications
          </Link>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/driver"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-800 bg-amber-50 rounded-lg mb-1"
            >
              <Bus className="w-4 h-4" /> Driver Portal
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg"
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </Link>
          </div>

          {user ? (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 text-xs text-red-600 font-medium border border-red-200 rounded-lg hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

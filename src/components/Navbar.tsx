import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bus, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { firebaseAuthService, User } from '../services/firebaseAuth';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    firebaseAuthService.getCurrentUser()
  );

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    await firebaseAuthService.logoutUser();
    closeMenu();
    navigate('/');
  };

  const getUserDisplayName = (user: User) => {
    if (user.displayName) return user.displayName.split(' ')[0];
    if (user.email) return user.email.split('@')[0];
    return 'Passenger';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Buses', path: '/search' },
    { name: 'My Bookings', path: '/my-bookings' },
    { name: 'Track Bus', path: '/search?mode=track' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-white font-bold text-xl sm:text-2xl tracking-tight focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md py-1 px-2"
            aria-label="Find My Bus - Home"
          >
            <div className="bg-amber-400 text-blue-950 p-2 rounded-lg flex items-center justify-center">
              <Bus className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
            </div>
            <span>Find My Bus</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-md text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    isActive
                      ? 'bg-blue-800 text-amber-300 font-bold border-b-2 border-amber-400'
                      : 'text-blue-100 hover:bg-blue-800/80 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-blue-800/90 hover:bg-blue-800 px-3.5 py-2 rounded-lg text-sm font-bold text-amber-300 border border-blue-700 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-amber-400" />
                  <span>Hi, {getUserDisplayName(currentUser)}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-semibold text-blue-100 hover:text-white hover:bg-blue-800/80 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-base font-semibold text-white hover:bg-blue-800/70 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-base font-bold bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2.5 rounded-lg text-blue-100 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" aria-hidden="true" />
              ) : (
                <Menu className="w-7 h-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-blue-950 border-t border-blue-800/80 px-4 pt-3 pb-6 space-y-2 shadow-inner"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg font-semibold block transition-colors ${
                    isActive
                      ? 'bg-blue-800 text-amber-300 font-bold'
                      : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="pt-4 border-t border-blue-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="px-4 py-2 text-sm font-bold text-amber-300 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-amber-400" />
                  <span>Logged in as {getUserDisplayName(currentUser)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-center py-3 text-lg font-bold text-white bg-red-900/80 hover:bg-red-800 rounded-lg flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center py-3 text-lg font-semibold text-white bg-blue-900 border border-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center py-3 text-lg font-bold bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

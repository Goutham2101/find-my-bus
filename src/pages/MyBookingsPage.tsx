import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Clock, CheckCircle2, Lock } from 'lucide-react';
import { bookingStorage, StoredBooking } from '../services/bookingStorage';
import { firebaseAuthService, User } from '../services/firebaseAuth';
import { BookingCard } from '../components/bookings';
import { EmptyState, Card } from '../components/ui';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    firebaseAuthService.getCurrentUser()
  );
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Listen to Firebase Auth state updates
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch saved bookings when authenticated
  useEffect(() => {
    if (currentUser) {
      const loaded = bookingStorage.getBookings();
      setBookings(loaded);
    }
  }, [currentUser]);

  const todayISO = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // Split bookings into Upcoming and Past/Completed
  const { upcomingBookings, pastBookings } = useMemo(() => {
    const upcoming: StoredBooking[] = [];
    const past: StoredBooking[] = [];

    bookings.forEach((b) => {
      if (b.journeyDate >= todayISO && b.bookingStatus !== 'CANCELLED') {
        upcoming.push(b);
      } else {
        past.push(b);
      }
    });

    return { upcomingBookings: upcoming, pastBookings: past };
  }, [bookings, todayISO]);

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  // 1. Unauthenticated Protection State
  if (!currentUser) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Bookings
          </h1>
          <p className="text-slate-600 text-base mt-1">
            View your upcoming and previous bus journeys.
          </p>
        </div>

        <EmptyState
          title="Login Required"
          description="Please sign in with your account to view your booked tickets, boarding passes, and travel history."
          icon={<Lock className="w-8 h-8 text-blue-700" />}
          actionLabel="Login to Account"
          onAction={() => navigate('/login')}
        />
      </div>
    );
  }

  // 2. Global Empty State (when logged-in user has 0 total bookings)
  if (bookings.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Bookings
          </h1>
          <p className="text-slate-600 text-base mt-1">
            View your upcoming and previous bus journeys.
          </p>
        </div>

        <EmptyState
          title="No bookings yet"
          description="You haven't booked any bus tickets yet. Search available routes to plan your journey."
          icon={<Bookmark className="w-8 h-8 text-blue-700" />}
          actionLabel="Search Buses"
          onAction={() => navigate('/search')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          My Bookings
        </h1>
        <p className="text-slate-600 text-base mt-1">
          View your upcoming and previous bus journeys.
        </p>
      </div>

      {/* Category Tabs: Upcoming vs Completed / Previous */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'upcoming'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Upcoming Journeys</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-black bg-white/20">
            {upcomingBookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-sm transition-all cursor-pointer ${
            activeTab === 'past'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Completed / Previous</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-black bg-white/20">
            {pastBookings.length}
          </span>
        </button>
      </div>

      {/* Bookings List Display */}
      <div className="space-y-4">
        {displayedBookings.length > 0 ? (
          displayedBookings.map((b) => (
            <BookingCard key={b.id} booking={b} isUpcoming={activeTab === 'upcoming'} />
          ))
        ) : (
          <Card className="bg-white border border-slate-200 p-8 text-center space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              No {activeTab === 'upcoming' ? 'Upcoming' : 'Previous'} Bookings
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {activeTab === 'upcoming'
                ? "You don't have any scheduled upcoming bus trips right now."
                : "You don't have any previous or completed travel history."}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;

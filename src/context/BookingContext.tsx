import React, { createContext, useContext, useState } from 'react';
import { Trip, Seat, Passenger, Booking } from '../types';

interface BookingContextType {
  selectedTrip: Trip | null;
  journeyDate: string;
  selectedSeats: Seat[];
  boardingPoint: string;
  droppingPoint: string;
  passengers: Passenger[];
  completedBooking: Booking | null;
  setSelectedTrip: (trip: Trip | null) => void;
  setJourneyDate: (date: string) => void;
  toggleSeat: (seat: Seat) => void;
  setBoardingPoint: (bp: string) => void;
  setDroppingPoint: (dp: string) => void;
  setPassengersData: (passengers: Passenger[]) => void;
  setCompletedBooking: (booking: Booking | null) => void;
  clearBookingFlow: () => void;
  calculateTotalAmount: () => { baseFare: number; taxes: number; totalAmount: number };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [journeyDate, setJourneyDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [boardingPoint, setBoardingPoint] = useState<string>('');
  const [droppingPoint, setDroppingPoint] = useState<string>('');
  const [passengers, setPassengersData] = useState<Passenger[]>([]);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  const toggleSeat = (seat: Seat) => {
    if (seat.isOccupied) return;
    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 6) {
          alert('You can select a maximum of 6 seats per booking.');
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const calculateTotalAmount = () => {
    const baseFare = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const taxes = Math.round(baseFare * 0.05); // 5% GST
    return {
      baseFare,
      taxes,
      totalAmount: baseFare + taxes
    };
  };

  const clearBookingFlow = () => {
    setSelectedTrip(null);
    setSelectedSeats([]);
    setBoardingPoint('');
    setDroppingPoint('');
    setPassengersData([]);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedTrip,
        journeyDate,
        selectedSeats,
        boardingPoint,
        droppingPoint,
        passengers,
        completedBooking,
        setSelectedTrip,
        setJourneyDate,
        toggleSeat,
        setBoardingPoint,
        setDroppingPoint,
        setPassengersData,
        setCompletedBooking,
        clearBookingFlow,
        calculateTotalAmount
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

import { Bus } from '../types';

export const MOCK_BUSES: Bus[] = [
  {
    id: 'bus-apsrtc-01',
    operatorName: 'APSRTC - Palnadu Express',
    operatorType: 'APSRTC',
    busNumber: 'AP 39 Z 1008',
    busType: 'RTC Super Luxury',
    totalSeats: 36,
    layoutType: '2x2',
    amenities: ['Pushback Seats', 'Charging Point', 'Emergency Exit', 'Luggage Rack', 'CCTV'],
    rating: 4.6,
    totalReviews: 320,
    status: 'Active'
  },
  {
    id: 'bus-apsrtc-02',
    operatorName: 'APSRTC - Amaravati Executive',
    operatorType: 'APSRTC',
    busNumber: 'AP 39 Z 4421',
    busType: 'RTC Garuda Plus',
    totalSeats: 40,
    layoutType: '2x2',
    amenities: ['Air Conditioning', 'Live Tracking', 'Water Bottle', 'Reclining Seats', 'Reading Light', 'Charging Point'],
    rating: 4.8,
    totalReviews: 540,
    status: 'Active'
  },
  {
    id: 'bus-morning-star-01',
    operatorName: 'Morning Star Travels',
    operatorType: 'Private',
    busNumber: 'AP 07 TE 9988',
    busType: 'AC Sleeper',
    totalSeats: 30,
    layoutType: '1x2',
    amenities: ['AC Sleeper Berths', 'Free High Speed WiFi', 'Personal TV Screen', 'Blanket & Pillow', 'Reading Lamp', 'Water Bottle', 'Live GPS Tracking'],
    rating: 4.7,
    totalReviews: 890,
    status: 'Active'
  },
  {
    id: 'bus-kaveri-01',
    operatorName: 'Kaveri Travels',
    operatorType: 'Private',
    busNumber: 'AP 16 TX 5543',
    busType: 'AC Seater',
    totalSeats: 36,
    layoutType: '2x2',
    amenities: ['AC Seater', 'Charging Point', 'Water Bottle', 'Clean Seat Covers', 'Live Tracking'],
    rating: 4.5,
    totalReviews: 210,
    status: 'Active'
  },
  {
    id: 'bus-orange-01',
    operatorName: 'Orange Tours & Travels',
    operatorType: 'Private',
    busNumber: 'AP 39 W 7712',
    busType: 'AC Sleeper',
    totalSeats: 30,
    layoutType: '1x2',
    amenities: ['Multi-Axle Volvo', 'Premium Bedding', 'Charging Outlets', 'Individual AC Vents', 'Bottled Water', 'Snacks'],
    rating: 4.9,
    totalReviews: 1200,
    status: 'Active'
  },
  {
    id: 'bus-apsrtc-03',
    operatorName: 'APSRTC - Express Connect',
    operatorType: 'APSRTC',
    busNumber: 'AP 39 Z 2255',
    busType: 'Non-AC Seater',
    totalSeats: 44,
    layoutType: '2x2',
    amenities: ['Standard Seats', 'Luggage Compartment', 'Emergency Glass Hammer'],
    rating: 4.2,
    totalReviews: 180,
    status: 'Active'
  }
];

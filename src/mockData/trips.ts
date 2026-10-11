import { Trip, Seat, Route } from '../types';
import { MOCK_BUSES } from './buses';

export const MOCK_ROUTES: Route[] = [
  {
    id: 'route-nsp-hyd',
    routeName: 'Narasaraopeta to Hyderabad (via Guntur)',
    sourceCity: 'Narasaraopeta',
    destinationCity: 'Hyderabad',
    distanceKm: 275,
    estimatedDurationHours: 5.5,
    status: 'Active',
    stops: [
      { id: 's1', name: 'Narasaraopeta RTC Bus Stand', city: 'Narasaraopeta', sequenceOrder: 1, estimatedArrivalOffsetMinutes: 0 },
      { id: 's2', name: 'Chilakaluripet Bypass', city: 'Chilakaluripet', sequenceOrder: 2, estimatedArrivalOffsetMinutes: 35 },
      { id: 's3', name: 'NTR Bus Station', city: 'Guntur', sequenceOrder: 3, estimatedArrivalOffsetMinutes: 75 },
      { id: 's4', name: 'Suryapet Bypass', city: 'Suryapet', sequenceOrder: 4, estimatedArrivalOffsetMinutes: 210 },
      { id: 's5', name: 'LB Nagar', city: 'Hyderabad', sequenceOrder: 5, estimatedArrivalOffsetMinutes: 300 },
      { id: 's6', name: 'MGBS Hyderabad', city: 'Hyderabad', sequenceOrder: 6, estimatedArrivalOffsetMinutes: 330 }
    ]
  },
  {
    id: 'route-vja-vskp',
    routeName: 'Vijayawada to Visakhapatnam (via Eluru & Rajahmundry)',
    sourceCity: 'Vijayawada',
    destinationCity: 'Visakhapatnam',
    distanceKm: 350,
    estimatedDurationHours: 6.5,
    status: 'Active',
    stops: [
      { id: 's10', name: 'Pandit Nehru Bus Station (PNBS)', city: 'Vijayawada', sequenceOrder: 1, estimatedArrivalOffsetMinutes: 0 },
      { id: 's11', name: 'Eluru Bypass', city: 'Eluru', sequenceOrder: 2, estimatedArrivalOffsetMinutes: 70 },
      { id: 's12', name: 'Rajahmundry Morampudi', city: 'Rajahmundry', sequenceOrder: 3, estimatedArrivalOffsetMinutes: 180 },
      { id: 's13', name: 'Anakapalle Bypass', city: 'Anakapalle', sequenceOrder: 4, estimatedArrivalOffsetMinutes: 330 },
      { id: 's14', name: 'Dwaraka Bus Stand (RTC Complex)', city: 'Visakhapatnam', sequenceOrder: 5, estimatedArrivalOffsetMinutes: 390 }
    ]
  },
  {
    id: 'route-gnt-tpt',
    routeName: 'Guntur to Tirupati (via Ongole & Nellore)',
    sourceCity: 'Guntur',
    destinationCity: 'Tirupati',
    distanceKm: 380,
    estimatedDurationHours: 7.0,
    status: 'Active',
    stops: [
      { id: 's20', name: 'NTR Bus Station', city: 'Guntur', sequenceOrder: 1, estimatedArrivalOffsetMinutes: 0 },
      { id: 's21', name: 'Chilakaluripet RTC', city: 'Chilakaluripet', sequenceOrder: 2, estimatedArrivalOffsetMinutes: 45 },
      { id: 's22', name: 'Ongole RTC Bus Station', city: 'Ongole', sequenceOrder: 3, estimatedArrivalOffsetMinutes: 130 },
      { id: 's23', name: 'Nellore Bypass', city: 'Nellore', sequenceOrder: 4, estimatedArrivalOffsetMinutes: 260 },
      { id: 's24', name: 'Tirupati Central Bus Station', city: 'Tirupati', sequenceOrder: 5, estimatedArrivalOffsetMinutes: 420 }
    ]
  }
];

// Helper to generate seat map
export const generateSeatMap = (layout: '2x2' | '1x2' | '2x1', type: 'seater' | 'sleeper', basePrice: number): Seat[] => {
  const seats: Seat[] = [];
  
  if (layout === '2x2') {
    // 9 rows of 4 seats = 36 seats
    let seatNo = 1;
    for (let r = 1; r <= 9; r++) {
      for (let c = 1; c <= 4; c++) {
        const isLadies = r <= 2 && (c === 1 || c === 4);
        const isOccupied = (r * 4 + c) % 3 === 0 || (r === 1 && c === 2);
        seats.push({
          id: `seat-${seatNo}`,
          seatNumber: `${seatNo}`,
          row: r,
          column: c,
          deck: 'lower',
          type: 'seater',
          isWindow: c === 1 || c === 4,
          isLadiesReserved: isLadies,
          isOccupied: isOccupied,
          price: basePrice + (c === 1 || c === 4 ? 30 : 0)
        });
        seatNo++;
      }
    }
  } else {
    // 1x2 layout with Lower & Upper decks (15 lower, 15 upper = 30 sleeper berths)
    let seatNo = 1;
    ['lower', 'upper'].forEach((deck) => {
      const prefix = deck === 'lower' ? 'L' : 'U';
      for (let r = 1; r <= 5; r++) {
        for (let c = 1; c <= 3; c++) {
          const isLadies = r === 1 && c === 1;
          const isOccupied = (r + c + (deck === 'upper' ? 2 : 0)) % 3 === 1;
          seats.push({
            id: `seat-${prefix}${r}${c}`,
            seatNumber: `${prefix}${r}${c}`,
            row: r,
            column: c,
            deck: deck as 'lower' | 'upper',
            type: 'sleeper',
            isWindow: c === 1 || c === 3,
            isLadiesReserved: isLadies,
            isOccupied: isOccupied,
            price: basePrice + (deck === 'upper' ? 50 : 0) + (c === 1 ? 40 : 0)
          });
          seatNo++;
        }
      }
    });
  }
  return seats;
};

// Today's date helper formatted as YYYY-MM-DD
const getTodayDateStr = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const getTomorrowDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-nsp-hyd-01',
    busId: MOCK_BUSES[0].id,
    bus: MOCK_BUSES[0],
    routeId: MOCK_ROUTES[0].id,
    route: MOCK_ROUTES[0],
    departureTime: '06:30 AM',
    arrivalTime: '12:00 PM',
    journeyDate: getTodayDateStr(),
    startingFare: 480,
    availableSeatsCount: 18,
    boardingPoints: [
      { id: 'bp1', name: 'Narasaraopeta RTC Bus Stand', time: '06:30 AM', address: 'Main RTC Complex, Prakash Nagar' },
      { id: 'bp2', name: 'Prakash Nagar Arch', time: '06:40 AM', address: 'Prakash Nagar Junction, Narasaraopeta' },
      { id: 'bp3', name: 'Chilakaluripet Bypass', time: '07:05 AM', address: 'Bypass Flyover, Chilakaluripet' }
    ],
    droppingPoints: [
      { id: 'dp1', name: 'LB Nagar Ring Road', time: '11:30 AM', address: 'Near Metro Station Pillar 12' },
      { id: 'dp2', name: 'MGBS Bus Terminal', time: '12:00 PM', address: 'Platform 34, MGBS Hyderabad' }
    ],
    status: 'Active',
    driverId: 'drv-01',
    driverName: 'R. Koteswara Rao',
    driverPhone: '+91 98480 12345'
  },
  {
    id: 'trip-nsp-hyd-02',
    busId: MOCK_BUSES[2].id,
    bus: MOCK_BUSES[2],
    routeId: MOCK_ROUTES[0].id,
    route: MOCK_ROUTES[0],
    departureTime: '09:45 PM',
    arrivalTime: '03:15 AM',
    journeyDate: getTodayDateStr(),
    startingFare: 750,
    availableSeatsCount: 12,
    boardingPoints: [
      { id: 'bp4', name: 'Clock Tower Centre', time: '09:45 PM', address: 'Morning Star Office, Clock Tower' },
      { id: 'bp5', name: 'Guntur NTR Bus Station', time: '10:45 PM', address: 'Private Bus Stand Road, Guntur' }
    ],
    droppingPoints: [
      { id: 'dp3', name: 'LB Nagar', time: '02:45 AM', address: 'Opposite Big Bazaar' },
      { id: 'dp4', name: 'Ameerpet Metro', time: '03:15 AM', address: 'Metro Station Exit 2' }
    ],
    status: 'Active',
    driverId: 'drv-02',
    driverName: 'S. Venkateswarlu',
    driverPhone: '+91 94401 67890'
  },
  {
    id: 'trip-vja-vskp-01',
    busId: MOCK_BUSES[1].id,
    bus: MOCK_BUSES[1],
    routeId: MOCK_ROUTES[1].id,
    route: MOCK_ROUTES[1],
    departureTime: '08:00 AM',
    arrivalTime: '02:30 PM',
    journeyDate: getTodayDateStr(),
    startingFare: 620,
    availableSeatsCount: 22,
    boardingPoints: [
      { id: 'bp10', name: 'PNBS Vijayawada Platform 12', time: '08:00 AM', address: 'Pandit Nehru Bus Station' },
      { id: 'bp11', name: 'Benz Circle', time: '08:20 AM', address: 'Benz Circle Flyover Junction' }
    ],
    droppingPoints: [
      { id: 'dp10', name: 'Gajuwaka Junction', time: '02:00 PM', address: 'National Highway Signal' },
      { id: 'dp11', name: 'Dwaraka Bus Stand (RTC Complex)', time: '02:30 PM', address: 'Visakhapatnam Central RTC' }
    ],
    status: 'Scheduled',
    driverId: 'drv-03',
    driverName: 'M. Samba Siva Rao',
    driverPhone: '+91 98662 33445'
  },
  {
    id: 'trip-future-nsp-hyd',
    busId: MOCK_BUSES[4].id,
    bus: MOCK_BUSES[4],
    routeId: MOCK_ROUTES[0].id,
    route: MOCK_ROUTES[0],
    departureTime: '10:00 PM',
    arrivalTime: '03:30 AM',
    journeyDate: getTomorrowDateStr(),
    startingFare: 890,
    availableSeatsCount: 16,
    boardingPoints: [
      { id: 'bp20', name: 'Narasaraopeta Clock Tower', time: '10:00 PM', address: 'Orange Travels Office' }
    ],
    droppingPoints: [
      { id: 'dp20', name: 'KPHB Hyderabad', time: '03:30 AM', address: 'KPHB Metro Station' }
    ],
    status: 'Scheduled',
    driverId: 'drv-04',
    driverName: 'P. Rambabu',
    driverPhone: '+91 99599 11223'
  }
];

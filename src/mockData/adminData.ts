export interface DriverUser {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  experienceYears: number;
  assignedBusId: string;
  assignedBusNumber: string;
  status: 'On Duty' | 'Off Duty' | 'On Trip';
}

export const MOCK_DRIVERS: DriverUser[] = [
  {
    id: 'drv-01',
    name: 'R. Koteswara Rao',
    phone: '+91 98480 12345',
    licenseNumber: 'AP-PAL-2015-88392',
    experienceYears: 12,
    assignedBusId: 'bus-apsrtc-01',
    assignedBusNumber: 'AP 39 Z 1008',
    status: 'On Trip'
  },
  {
    id: 'drv-02',
    name: 'S. Venkateswarlu',
    phone: '+91 94401 67890',
    licenseNumber: 'AP-GNT-2012-44109',
    experienceYears: 15,
    assignedBusId: 'bus-morning-star-01',
    assignedBusNumber: 'AP 07 TE 9988',
    status: 'On Duty'
  },
  {
    id: 'drv-03',
    name: 'M. Samba Siva Rao',
    phone: '+91 98662 33445',
    licenseNumber: 'AP-NTR-2018-11204',
    experienceYears: 8,
    assignedBusId: 'bus-apsrtc-02',
    assignedBusNumber: 'AP 39 Z 4421',
    status: 'On Duty'
  },
  {
    id: 'drv-04',
    name: 'P. Rambabu',
    phone: '+91 99599 11223',
    licenseNumber: 'AP-PRK-2010-90811',
    experienceYears: 18,
    assignedBusId: 'bus-orange-01',
    assignedBusNumber: 'AP 39 W 7712',
    status: 'Off Duty'
  }
];

export const MOCK_ADMIN_STATS = {
  activeBusesCount: 42,
  todayTripsCount: 128,
  todayBookingsCount: 1450,
  totalRevenueToday: 894500,
  activePassengers: 920,
  onTimePercentage: 94.2,
  pendingIssuesCount: 3
};

export const MOCK_REVENUE_CHART = [
  { day: 'Mon', revenue: 640000, bookings: 980 },
  { day: 'Tue', revenue: 710000, bookings: 1120 },
  { day: 'Wed', revenue: 680000, bookings: 1050 },
  { day: 'Thu', revenue: 790000, bookings: 1240 },
  { day: 'Fri', revenue: 950000, bookings: 1520 },
  { day: 'Sat', revenue: 1120000, bookings: 1840 },
  { day: 'Sun', revenue: 1250000, bookings: 1980 }
];

export interface CityLocation {
  id: string;
  name: string;
  district: string;
  state: string;
  popularStops: string[];
}

export const MOCK_CITIES: CityLocation[] = [
  {
    id: 'narasaraopeta',
    name: 'Narasaraopeta',
    district: 'Palnadu',
    state: 'Andhra Pradesh',
    popularStops: ['RTC Bus Stand', 'Prakash Nagar Arch', 'Clock Tower Centre', 'Kotappakonda Junction']
  },
  {
    id: 'guntur',
    name: 'Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    popularStops: ['NTR Bus Station (RTC)', 'Auto Nagar', 'Manipuram Bridge', 'Collectorate Signal']
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    district: 'NTR District',
    state: 'Andhra Pradesh',
    popularStops: ['Pandit Nehru Bus Station (PNBS)', 'Benz Circle', 'Ramavarappadu Ring', 'Prakasam Barrage']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    popularStops: ['MGBS (Mahatma Gandhi Bus Station)', 'Ameerpet', 'Kukatpally Housing Board (KPHB)', 'Lakdikapul', 'LB Nagar']
  },
  {
    id: 'amaravati',
    name: 'Amaravati',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    popularStops: ['Secretariat Complex', 'High Court Junction', 'Rayapudi Cross', 'Seed Access Road']
  },
  {
    id: 'chilakaluripet',
    name: 'Chilakaluripet',
    district: 'Palnadu',
    state: 'Andhra Pradesh',
    popularStops: ['RTC Bus Complex', 'Kalamu Junction', 'NH-16 Bypass']
  },
  {
    id: 'sattenapalli',
    name: 'Sattenapalli',
    district: 'Palnadu',
    state: 'Andhra Pradesh',
    popularStops: ['Sattenapalli RTC Bus Station', 'Station Road', 'Guntur Road Bypass']
  },
  {
    id: 'ongole',
    name: 'Ongole',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    popularStops: ['Ongole RTC Bus Station', 'Addanki Bus Stand', 'Maddipadu Junction']
  },
  {
    id: 'tenali',
    name: 'Tenali',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    popularStops: ['Tenali RTC Bus Stand', 'Ganguu Vari Thota', 'Chenchupet']
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    popularStops: ['Central Bus Station (CBS)', 'Alipiri Depot', 'Kapila Theertham Ring']
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    popularStops: ['Dwaraka Bus Station (RTC Complex)', 'Maddilapalem', 'Gajuwaka Junction', 'NAD Junction']
  }
];

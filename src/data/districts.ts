import type { District } from './types';

export const districts: District[] = [
  { id: 'kri', name: 'Krishnagiri', state: 'Tamil Nadu', lat: 12.5266, lng: 78.2150 },
  { id: 'kan', name: 'Kanchipuram', state: 'Tamil Nadu', lat: 12.8342, lng: 79.7016 },
  { id: 'che', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { id: 'cov', name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
  { id: 'mad', name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 },
  { id: 'sal', name: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460 },
  { id: 'thj', name: 'Thanjavur', state: 'Tamil Nadu', lat: 10.7870, lng: 79.1378 },
  { id: 'tvl', name: 'Tiruvallur', state: 'Tamil Nadu', lat: 13.1467, lng: 79.9253 },
];

export const districtNames = districts.map((d) => d.name);

export const villages = [
  'Denkanikottai',
  'Shoolagiri',
  'Hosur',
  'Kelamangalam',
  'Thally',
  'Anchetty',
  'Mathigiri',
  'Burgur',
];

export const departments = [
  'Department of School Education',
  'Public Works Department',
  'Department of Health & Family Welfare',
  'Tamil Nadu Water Supply & Drainage Board',
  'Department of Rural Development',
  'Highways Department',
  'Department of Agriculture',
];

export const categories = ['Infrastructure', 'Education', 'Healthcare', 'Water Supply', 'Rural Development'] as const;

export const states = ['Tamil Nadu'];

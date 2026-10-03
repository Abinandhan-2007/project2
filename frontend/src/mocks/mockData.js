/**
 * Mock data for TrustLoop frontend development and testing.
 * Cleanly decoupled so swapping to live REST endpoints is a single-file edit.
 */

export const MOCK_CATEGORIES = [
  {
    id: 'electrical',
    name: 'Electrical Services',
    description: 'Licensed electricians for wiring, panel upgrades, EV chargers & repairs',
    icon: 'Zap',
    count: 24,
    color: 'indigo',
    popular: true,
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Pipefitting',
    description: 'Leak detection, pipe repair, water heater installation & drain clearing',
    icon: 'Wrench',
    count: 31,
    color: 'blue',
    popular: true,
  },
  {
    id: 'appliances',
    name: 'Appliance Repair',
    description: 'Refrigerators, washing machines, HVAC systems & kitchen equipment',
    icon: 'Tv',
    count: 18,
    color: 'emerald',
    popular: true,
  },
  {
    id: 'tutoring',
    name: 'Academic Tutoring',
    description: 'STEM subjects, coding, standardized test prep & language instruction',
    icon: 'GraduationCap',
    count: 42,
    color: 'purple',
    popular: false,
  },
];

export const MOCK_POPULAR_SERVICES = [
  {
    id: 'srv-1',
    title: 'Whole-Home Circuit Breaker Panel Inspection & Upgrade',
    category: 'Electrical Services',
    providerName: 'Sam Rivera',
    providerInitials: 'SR',
    rating: 4.9,
    reviewCount: 84,
    hourlyRate: 75,
    estimatedHours: '2-4 hrs',
    verified: true,
    availableToday: true,
    badges: ['Licensed Master Electrician', 'Verifiable Claim Ready'],
  },
  {
    id: 'srv-2',
    title: 'Emergency Leak Diagnostic & High-Pressure Pipe Repair',
    category: 'Plumbing & Pipefitting',
    providerName: 'Elena Rostova',
    providerInitials: 'ER',
    rating: 4.8,
    reviewCount: 62,
    hourlyRate: 85,
    estimatedHours: '1-3 hrs',
    verified: true,
    availableToday: true,
    badges: ['Certified Plumber', 'Photo Evidence Guarantee'],
  },
  {
    id: 'srv-3',
    title: 'Smart Inverter Refrigerator & Compressor Troubleshooting',
    category: 'Appliance Repair',
    providerName: 'Marcus Vance',
    providerInitials: 'MV',
    rating: 4.95,
    reviewCount: 110,
    hourlyRate: 65,
    estimatedHours: '1-2 hrs',
    verified: true,
    availableToday: false,
    badges: ['Appliance Specialist', 'Ohm/Volts Readings Logged'],
  },
  {
    id: 'srv-4',
    title: 'Data Structures & Algorithms / Systems Architecture Coaching',
    category: 'Academic Tutoring',
    providerName: 'Dr. Priya Sharma',
    providerInitials: 'PS',
    rating: 5.0,
    reviewCount: 47,
    hourlyRate: 90,
    estimatedHours: '1 hr sessions',
    verified: true,
    availableToday: true,
    badges: ['Ph.D. Computer Science', 'Recorded Milestones'],
  },
];

export const MOCK_TRUST_METRICS = [
  { label: 'Verifiable Claims Resolved', value: '1,420+' },
  { label: 'Evidence Gap Coverage Rate', value: '98.4%' },
  { label: 'Dispute Reduction Time', value: '72% Faster' },
  { label: 'Verified Trade Professionals', value: '350+' },
];

export const DEMO_USERS = {
  customer: {
    email: 'customer@trustloop.com',
    password: 'password123',
    fullName: 'Alex Morgan',
    role: 'CUSTOMER',
    avatar: 'AM',
  },
  provider: {
    email: 'provider@trustloop.com',
    password: 'password123',
    fullName: 'Sam Rivera',
    role: 'PROVIDER',
    trade: 'Master Electrician',
    avatar: 'SR',
  },
  admin: {
    email: 'admin@trustloop.com',
    password: 'password123',
    fullName: 'Platform Admin',
    role: 'ADMIN',
    avatar: 'PA',
  },
};

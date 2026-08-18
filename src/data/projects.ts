import type { Project } from './types';

// Helper to generate blockchain-style hashes
function hash(seed: string): string {
  let h = '0x';
  for (let i = 0; i < seed.length; i++) {
    h += (seed.charCodeAt(i) * 31 + i * 7).toString(16).slice(-2);
  }
  return h.padEnd(66, 'a').slice(0, 18) + '...';
}

function recordId(seed: string): string {
  const n = seed.charCodeAt(0) * seed.charCodeAt(1);
  return `REC-${n % 999}-${seed.slice(-4).toUpperCase()}`;
}

export const projects: Project[] = [
  {
    id: 'PRJ-KRI-2024-892',
    name: 'Village Road Development',
    description:
      'Construction of a 4.2 km all-weather road connecting Denkanikottai to the Kelamangalam main highway, serving 6 villages and improving access to the primary health centre.',
    district: 'Krishnagiri',
    state: 'Tamil Nadu',
    location: { lat: 12.5266, lng: 78.2150, village: 'Denkanikottai' },
    department: 'Public Works Department',
    category: 'Infrastructure',
    budget: 5000000,
    fundsReleased: 4500000,
    spent: 3250000,
    remaining: 1250000,
    status: 'In Progress',
    progress: 40,
    financialProgress: 65,
    startDate: '2024-06-15',
    estimatedCompletion: '2025-03-30',
    contractor: 'Bharat Infrastructure Pvt Ltd',
    expenditureBreakdown: [
      { name: 'Materials', value: 1625000 },
      { name: 'Labour', value: 975000 },
      { name: 'Equipment', value: 455000 },
      { name: 'Logistics', value: 195000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-06-15', description: 'Project budget sanctioned by district administration', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Initial Funds Released', date: '2024-07-01', description: '45% of approved budget released to project account', status: 'Completed', progress: 100, verified: true, evidence: 'Fund transfer receipt #TW9821' },
      { id: 'M3', name: 'Work Commenced', date: '2024-07-20', description: 'Site mobilisation and ground-breaking ceremony', status: 'Completed', progress: 100, verified: true, evidence: 'Geotagged site photos' },
      { id: 'M4', name: 'Current Milestone — Sub-Grade Preparation', date: '2024-12-10', description: 'Earthwork, compaction and sub-grade preparation for 40% of road length', status: 'In Progress', progress: 40, verified: false },
      { id: 'M5', name: 'Final Inspection', date: '2025-03-15', description: 'Quality audit and final inspection by PWD committee', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-001', recipient: 'Bharat Infrastructure Pvt Ltd', role: 'Primary Contractor', amount: 2000000, date: '2024-07-25', status: 'Cleared', transactionId: 'TXN-KRI-8821' },
      { id: 'PAY-002', recipient: 'UltraTech Cement Dealer', role: 'Cement Supplier', amount: 650000, date: '2024-09-10', status: 'Cleared', transactionId: 'TXN-KRI-8822' },
      { id: 'PAY-003', recipient: 'District Labour Board', role: 'Labour Wages', amount: 375000, date: '2024-10-15', status: 'Cleared', transactionId: 'TXN-KRI-8823' },
      { id: 'PAY-004', recipient: 'Shakti Equipment Rentals', role: 'Equipment Supplier', amount: 225000, date: '2024-11-20', status: 'Processing', transactionId: 'TXN-KRI-8824' },
    ],
    documents: [
      { id: 'DOC-01', title: 'Project Sanction Order', type: 'Document', uploadDate: '2024-06-15', location: 'Krishnagiri Collectorate', uploadedBy: 'District Collector Office', verified: true },
      { id: 'DOC-02', title: 'Contractor Agreement', type: 'Document', uploadDate: '2024-07-05', location: 'PWD Division Office', uploadedBy: 'Executive Engineer', verified: true },
      { id: 'DOC-03', title: 'Site Survey Report', type: 'Audit', uploadDate: '2024-07-18', location: 'Denkanikottai', uploadedBy: 'Survey Officer', verified: true },
    ],
    evidence: [
      { id: 'EV-01', title: 'Site Ground-Breaking Photo', type: 'Photo', uploadDate: '2024-07-20', location: 'Denkanikottai (12.52°N, 78.21°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-02', title: 'Sub-Grade Work Progress', type: 'Photo', uploadDate: '2024-12-01', location: 'Kelamangalam Highway Stretch', uploadedBy: 'Site Engineer', verified: false },
      { id: 'EV-03', title: 'Material Quality Test Report', type: 'Receipt', uploadDate: '2024-09-15', location: 'PWD Lab Hosur', uploadedBy: 'Quality Analyst', verified: true },
    ],
    blockchainRecord: { recordId: recordId('PRJ-KRI-2024-892'), transactionHash: hash('PRJ-KRI-2024-892'), timestamp: '2024-06-15T10:30:00Z', verified: true },
  },
  {
    id: 'PRJ-KRI-2024-731',
    name: 'Panchayat Union Middle School Upgradation',
    description:
      'Upgradation of Panchayat Union Middle School to High School — adding 4 classrooms, a science lab, library, and separate sanitation facilities for 320 students.',
    district: 'Krishnagiri',
    state: 'Tamil Nadu',
    location: { lat: 12.7406, lng: 78.0850, village: 'Shoolagiri' },
    department: 'Department of School Education',
    category: 'Education',
    budget: 12000000,
    fundsReleased: 9600000,
    spent: 7800000,
    remaining: 1800000,
    status: 'In Progress',
    progress: 65,
    financialProgress: 65,
    startDate: '2024-03-01',
    estimatedCompletion: '2025-01-15',
    contractor: 'EduBuild Constructions',
    expenditureBreakdown: [
      { name: 'Materials', value: 3900000 },
      { name: 'Labour', value: 2340000 },
      { name: 'Equipment', value: 1092000 },
      { name: 'Logistics', value: 468000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-03-01', description: 'Sanctioned under SSA scheme', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Foundation Work', date: '2024-04-15', description: 'Excavation and footing cast', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Superstructure', date: '2024-08-10', description: 'Walls and roofing for 2 blocks', status: 'Completed', progress: 100, verified: true },
      { id: 'M4', name: 'Current Milestone — Finishing Work', date: '2024-11-20', description: 'Plastering, flooring and painting in progress', status: 'In Progress', progress: 65, verified: false },
      { id: 'M5', name: 'Handover & Inspection', date: '2025-01-10', description: 'Final inspection by BEO', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-101', recipient: 'EduBuild Constructions', role: 'Primary Contractor', amount: 4800000, date: '2024-04-10', status: 'Cleared', transactionId: 'TXN-EDU-7711' },
      { id: 'PAY-102', recipient: 'Sri Balaji Steel Suppliers', role: 'Steel Supplier', amount: 1560000, date: '2024-05-20', status: 'Cleared', transactionId: 'TXN-EDU-7712' },
      { id: 'PAY-103', recipient: 'District Labour Board', role: 'Labour Wages', amount: 936000, date: '2024-07-15', status: 'Cleared', transactionId: 'TXN-EDU-7713' },
      { id: 'PAY-104', recipient: 'A to Z Furniture', role: 'Lab Equipment', amount: 504000, date: '2024-10-01', status: 'Pending', transactionId: 'TXN-EDU-7714' },
    ],
    documents: [
      { id: 'DOC-11', title: 'SSA Sanction Order', type: 'Document', uploadDate: '2024-03-01', location: 'DEO Office Krishnagiri', uploadedBy: 'District Educational Officer', verified: true },
      { id: 'DOC-12', title: 'Building Plan Approval', type: 'Document', uploadDate: '2024-03-20', location: 'DTCP Krishnagiri', uploadedBy: 'Planning Officer', verified: true },
    ],
    evidence: [
      { id: 'EV-11', title: 'Foundation Site Photo', type: 'Photo', uploadDate: '2024-04-15', location: 'Shoolagiri (12.74°N, 78.08°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-12', title: 'Block A Roofing Photo', type: 'Photo', uploadDate: '2024-08-10', location: 'Shoolagiri', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-13', title: 'Finishing Progress', type: 'Photo', uploadDate: '2024-11-20', location: 'Shoolagiri', uploadedBy: 'Site Engineer', verified: false },
    ],
    blockchainRecord: { recordId: recordId('PRJ-KRI-2024-731'), transactionHash: hash('PRJ-KRI-2024-731'), timestamp: '2024-03-01T09:00:00Z', verified: true },
  },
  {
    id: 'PRJ-CHE-2024-512',
    name: 'Smart Street Lighting — Zone 4',
    description:
      'Installation of 1,200 LED street lights with centralised monitoring across Zone 4 of Chennai Corporation, reducing energy consumption by 45%.',
    district: 'Chennai',
    state: 'Tamil Nadu',
    location: { lat: 13.0827, lng: 80.2707 },
    department: 'Department of Rural Development',
    category: 'Infrastructure',
    budget: 35000000,
    fundsReleased: 35000000,
    spent: 33250000,
    remaining: 1750000,
    status: 'Completed',
    progress: 100,
    financialProgress: 95,
    startDate: '2023-10-01',
    estimatedCompletion: '2024-06-30',
    contractor: 'GreenLight Energy Solutions',
    expenditureBreakdown: [
      { name: 'Materials', value: 19950000 },
      { name: 'Labour', value: 6650000 },
      { name: 'Equipment', value: 4655000 },
      { name: 'Logistics', value: 1995000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2023-10-01', description: 'Corporation council approval', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Procurement Complete', date: '2023-12-15', description: '1,200 LED units procured', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Installation', date: '2024-04-20', description: 'All 1,200 units installed', status: 'Completed', progress: 100, verified: true },
      { id: 'M4', name: 'Commissioning & Testing', date: '2024-06-15', description: 'Centralised monitoring system live', status: 'Completed', progress: 100, verified: true },
      { id: 'M5', name: 'Final Inspection', date: '2024-06-28', description: 'Handover to Corporation', status: 'Completed', progress: 100, verified: true },
    ],
    payments: [
      { id: 'PAY-201', recipient: 'GreenLight Energy Solutions', role: 'Primary Contractor', amount: 21000000, date: '2023-11-01', status: 'Cleared', transactionId: 'TXN-CHE-5511' },
      { id: 'PAY-202', recipient: 'Philips Lighting India', role: 'LED Supplier', amount: 8312500, date: '2023-12-20', status: 'Cleared', transactionId: 'TXN-CHE-5512' },
      { id: 'PAY-203', recipient: 'Chennai Electricians Union', role: 'Installation Labour', amount: 2660000, date: '2024-05-01', status: 'Cleared', transactionId: 'TXN-CHE-5513' },
      { id: 'PAY-204', recipient: 'IoT Monitoring Systems', role: 'Monitoring Software', amount: 1277500, date: '2024-06-10', status: 'Cleared', transactionId: 'TXN-CHE-5514' },
    ],
    documents: [
      { id: 'DOC-21', title: 'Council Resolution', type: 'Document', uploadDate: '2023-10-01', location: 'Chennai Corporation', uploadedBy: 'Commissioner Office', verified: true },
      { id: 'DOC-22', title: 'Energy Audit Report', type: 'Audit', uploadDate: '2024-07-05', location: 'Chennai Corporation', uploadedBy: 'Audit Officer', verified: true },
    ],
    evidence: [
      { id: 'EV-21', title: 'Installed Light — Anna Salai', type: 'Photo', uploadDate: '2024-04-20', location: 'Anna Salai (13.08°N, 80.27°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-22', title: 'Monitoring Dashboard Screenshot', type: 'Photo', uploadDate: '2024-06-15', location: 'Corporation HQ', uploadedBy: 'Project Manager', verified: true },
    ],
    blockchainRecord: { recordId: recordId('PRJ-CHE-2024-512'), transactionHash: hash('PRJ-CHE-2024-512'), timestamp: '2023-10-01T14:00:00Z', verified: true },
  },
  {
    id: 'PRJ-MAD-2024-345',
    name: 'Primary Health Centre Renovation',
    description:
      'Renovation and modernisation of the Madurai East PHC with new outpatient ward, pharmacy, and medical equipment for serving 15,000 rural residents.',
    district: 'Madurai',
    state: 'Tamil Nadu',
    location: { lat: 9.9252, lng: 78.1198 },
    department: 'Department of Health & Family Welfare',
    category: 'Healthcare',
    budget: 85000000,
    fundsReleased: 68000000,
    spent: 76500000,
    remaining: -8500000,
    status: 'Flagged',
    progress: 55,
    financialProgress: 90,
    startDate: '2024-01-10',
    estimatedCompletion: '2024-10-30',
    contractor: 'MedCare Infrastructures',
    expenditureBreakdown: [
      { name: 'Materials', value: 38250000 },
      { name: 'Labour', value: 19125000 },
      { name: 'Equipment', value: 15300000 },
      { name: 'Logistics', value: 3825000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-01-10', description: 'Health dept sanction', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Civil Work', date: '2024-04-01', description: 'Structural renovation', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Current Milestone — Equipment Installation', date: '2024-09-15', description: 'Medical equipment being installed', status: 'In Progress', progress: 55, verified: false },
      { id: 'M4', name: 'Staffing & Handover', date: '2024-10-30', description: 'DHS handover', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-301', recipient: 'MedCare Infrastructures', role: 'Primary Contractor', amount: 42000000, date: '2024-02-15', status: 'Cleared', transactionId: 'TXN-MAD-3311' },
      { id: 'PAY-302', recipient: 'Allengers Medical Systems', role: 'Medical Equipment', amount: 25500000, date: '2024-08-01', status: 'Cleared', transactionId: 'TXN-MAD-3312' },
      { id: 'PAY-303', recipient: 'MedCare Infrastructures', role: 'Supplementary Invoice', amount: 9000000, date: '2024-09-20', status: 'Flagged', transactionId: 'TXN-MAD-3313' },
    ],
    documents: [
      { id: 'DOC-31', title: 'DHS Sanction Order', type: 'Document', uploadDate: '2024-01-10', location: 'DHS Madurai', uploadedBy: 'Deputy Director Health', verified: true },
    ],
    evidence: [
      { id: 'EV-31', title: 'PHC Renovation Progress', type: 'Photo', uploadDate: '2024-04-01', location: 'Madurai East (9.92°N, 78.11°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-32', title: 'Equipment Delivery Receipt', type: 'Receipt', uploadDate: '2024-08-01', location: 'PHC Madurai East', uploadedBy: 'Store Officer', verified: false },
    ],
    blockchainRecord: { recordId: recordId('PRJ-MAD-2024-345'), transactionHash: hash('PRJ-MAD-2024-345'), timestamp: '2024-01-10T11:00:00Z', verified: true },
  },
  {
    id: 'PRJ-COV-2024-688',
    name: 'Rural Drinking Water Pipeline — Phase 2',
    description:
      'Laying of 18 km drinking water pipeline connecting the Bhavani river treatment plant to 12 villages in Coimbatore rural belt, benefiting 8,500 residents.',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    location: { lat: 11.0168, lng: 76.9558 },
    department: 'Tamil Nadu Water Supply & Drainage Board',
    category: 'Water Supply',
    budget: 145000000,
    fundsReleased: 116000000,
    spent: 87000000,
    remaining: 29000000,
    status: 'Delayed',
    progress: 48,
    financialProgress: 60,
    startDate: '2024-02-01',
    estimatedCompletion: '2024-11-30',
    contractor: 'TWAD Contractor Consortium',
    expenditureBreakdown: [
      { name: 'Materials', value: 43500000 },
      { name: 'Labour', value: 26100000 },
      { name: 'Equipment', value: 13050000 },
      { name: 'Logistics', value: 4350000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-02-01', description: 'TWAD board approval', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Pipeline Procurement', date: '2024-04-10', description: '18 km of pipes procured', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Current Milestone — Laying Work', date: '2024-10-01', description: '8.6 km of pipeline laid', status: 'In Progress', progress: 48, verified: false },
      { id: 'M4', name: 'Testing & Commissioning', date: '2024-12-15', description: 'Pressure testing and connection', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-401', recipient: 'TWAD Contractor Consortium', role: 'Primary Contractor', amount: 58000000, date: '2024-03-15', status: 'Cleared', transactionId: 'TXN-COV-6611' },
      { id: 'PAY-402', recipient: 'Jindal Steel Pipes', role: 'Pipe Supplier', amount: 26100000, date: '2024-04-20', status: 'Cleared', transactionId: 'TXN-COV-6612' },
      { id: 'PAY-403', recipient: 'Coimbatore Labour Union', role: 'Labour Wages', amount: 2900000, date: '2024-08-01', status: 'Processing', transactionId: 'TXN-COV-6613' },
    ],
    documents: [
      { id: 'DOC-41', title: 'TWAD Technical Sanction', type: 'Document', uploadDate: '2024-02-01', location: 'TWAD Coimbatore', uploadedBy: 'Chief Engineer', verified: true },
    ],
    evidence: [
      { id: 'EV-41', title: 'Pipeline Trenching Photo', type: 'Photo', uploadDate: '2024-07-15', location: 'Coimbatore Rural (11.01°N, 76.95°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-42', title: 'Pipe Laying Progress', type: 'Photo', uploadDate: '2024-10-01', location: 'Village 7', uploadedBy: 'Site Engineer', verified: false },
    ],
    blockchainRecord: { recordId: recordId('PRJ-COV-2024-688'), transactionHash: hash('PRJ-COV-2024-688'), timestamp: '2024-02-01T08:30:00Z', verified: true },
  },
  {
    id: 'PRJ-SAL-2024-204',
    name: 'Anganwadi Centre Construction',
    description:
      'Construction of 3 new Anganwadi centres in Salem rural blocks providing nutrition and early education for 180 children aged 3-6 years.',
    district: 'Salem',
    state: 'Tamil Nadu',
    location: { lat: 11.6643, lng: 78.1460 },
    department: 'Department of Rural Development',
    category: 'Rural Development',
    budget: 9000000,
    fundsReleased: 7200000,
    spent: 5400000,
    remaining: 1800000,
    status: 'In Progress',
    progress: 70,
    financialProgress: 60,
    startDate: '2024-05-01',
    estimatedCompletion: '2025-02-28',
    contractor: 'Salem Rural Builders',
    expenditureBreakdown: [
      { name: 'Materials', value: 2700000 },
      { name: 'Labour', value: 1620000 },
      { name: 'Equipment', value: 810000 },
      { name: 'Logistics', value: 270000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-05-01', description: 'Block development office sanction', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Foundation', date: '2024-06-15', description: 'All 3 centres foundation cast', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Current Milestone — Superstructure', date: '2024-10-20', description: 'Walls and roof for 2 centres complete', status: 'In Progress', progress: 70, verified: false },
      { id: 'M4', name: 'Handover', date: '2025-02-20', description: 'Inspection and handover to ICDS', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-501', recipient: 'Salem Rural Builders', role: 'Primary Contractor', amount: 3600000, date: '2024-06-01', status: 'Cleared', transactionId: 'TXN-SAL-2211' },
      { id: 'PAY-502', recipient: 'Salem Cement Depot', role: 'Cement Supplier', amount: 1080000, date: '2024-07-10', status: 'Cleared', transactionId: 'TXN-SAL-2212' },
      { id: 'PAY-503', recipient: 'District Labour Board', role: 'Labour Wages', amount: 720000, date: '2024-09-01', status: 'Processing', transactionId: 'TXN-SAL-2213' },
    ],
    documents: [
      { id: 'DOC-51', title: 'ICDS Sanction Order', type: 'Document', uploadDate: '2024-05-01', location: 'BDO Office Salem', uploadedBy: 'Block Development Officer', verified: true },
    ],
    evidence: [
      { id: 'EV-51', title: 'Centre 1 Foundation Photo', type: 'Photo', uploadDate: '2024-06-15', location: 'Salem Block 3 (11.66°N, 78.14°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-52', title: 'Centre 2 Roofing Photo', type: 'Photo', uploadDate: '2024-10-20', location: 'Salem Block 3', uploadedBy: 'Site Engineer', verified: false },
    ],
    blockchainRecord: { recordId: recordId('PRJ-SAL-2024-204'), transactionHash: hash('PRJ-SAL-2024-204'), timestamp: '2024-05-01T10:00:00Z', verified: true },
  },
  {
    id: 'PRJ-THJ-2024-119',
    name: 'Canal Desilting & Restoration',
    description:
      'Desilting and lining of 12 km of irrigation canal in Thanjavur delta belt, improving water flow to 2,400 acres of paddy fields.',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    location: { lat: 10.7870, lng: 79.1378 },
    department: 'Department of Agriculture',
    category: 'Rural Development',
    budget: 22000000,
    fundsReleased: 17600000,
    spent: 15400000,
    remaining: 2200000,
    status: 'Completed',
    progress: 100,
    financialProgress: 70,
    startDate: '2024-01-15',
    estimatedCompletion: '2024-05-30',
    contractor: 'Cauvery Irrigation Works',
    expenditureBreakdown: [
      { name: 'Materials', value: 7700000 },
      { name: 'Labour', value: 4620000 },
      { name: 'Equipment', value: 2310000 },
      { name: 'Logistics', value: 770000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-01-15', description: 'Agriculture dept sanction', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Desilting Complete', date: '2024-03-20', description: '12 km desilted', status: 'Completed', progress: 100, verified: true },
      { id: 'M3', name: 'Canal Lining', date: '2024-05-01', description: 'Concrete lining complete', status: 'Completed', progress: 100, verified: true },
      { id: 'M4', name: 'Final Inspection', date: '2024-05-28', description: 'AEE inspection passed', status: 'Completed', progress: 100, verified: true },
    ],
    payments: [
      { id: 'PAY-601', recipient: 'Cauvery Irrigation Works', role: 'Primary Contractor', amount: 11000000, date: '2024-02-01', status: 'Cleared', transactionId: 'TXN-THJ-1111' },
      { id: 'PAY-602', recipient: 'Delta Concrete Suppliers', role: 'Concrete Supplier', amount: 3850000, date: '2024-04-01', status: 'Cleared', transactionId: 'TXN-THJ-1112' },
      { id: 'PAY-603', recipient: 'Thanjavur Labour Board', role: 'Labour Wages', amount: 550000, date: '2024-05-15', status: 'Cleared', transactionId: 'TXN-THJ-1113' },
    ],
    documents: [
      { id: 'DOC-61', title: 'Agriculture Dept Sanction', type: 'Document', uploadDate: '2024-01-15', location: 'AEE Office Thanjavur', uploadedBy: 'Assistant Executive Engineer', verified: true },
      { id: 'DOC-62', title: 'Completion Certificate', type: 'Audit', uploadDate: '2024-05-28', location: 'AEE Office Thanjavur', uploadedBy: 'AEE', verified: true },
    ],
    evidence: [
      { id: 'EV-61', title: 'Desilted Canal Photo', type: 'Photo', uploadDate: '2024-03-20', location: 'Thanjavur Delta (10.78°N, 79.13°E)', uploadedBy: 'Site Engineer', verified: true },
      { id: 'EV-62', title: 'Lined Canal Photo', type: 'Photo', uploadDate: '2024-05-01', location: 'Thanjavur Delta', uploadedBy: 'Site Engineer', verified: true },
    ],
    blockchainRecord: { recordId: recordId('PRJ-THJ-2024-119'), transactionHash: hash('PRJ-THJ-2024-119'), timestamp: '2024-01-15T09:30:00Z', verified: true },
  },
  {
    id: 'PRJ-KAN-2024-877',
    name: 'Bus Terminus Modernisation',
    description:
      'Modernisation of Kanchipuram bus terminus with new shelter, digital display boards, sanitation facilities, and parking for 40 buses.',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    location: { lat: 12.8342, lng: 79.7016 },
    department: 'Highways Department',
    category: 'Infrastructure',
    budget: 48000000,
    fundsReleased: 24000000,
    spent: 12000000,
    remaining: 12000000,
    status: 'Planned',
    progress: 15,
    financialProgress: 25,
    startDate: '2024-09-01',
    estimatedCompletion: '2025-06-30',
    contractor: 'To Be Tendered',
    expenditureBreakdown: [
      { name: 'Materials', value: 6000000 },
      { name: 'Labour', value: 3600000 },
      { name: 'Equipment', value: 1800000 },
      { name: 'Logistics', value: 600000 },
    ],
    milestones: [
      { id: 'M1', name: 'Budget Approved', date: '2024-09-01', description: 'Highways dept sanction', status: 'Completed', progress: 100, verified: true },
      { id: 'M2', name: 'Current Milestone — Tendering', date: '2024-10-15', description: 'Tender floated, bids under evaluation', status: 'In Progress', progress: 15, verified: false },
      { id: 'M3', name: 'Construction Start', date: '2025-01-01', description: 'Contractor mobilisation', status: 'Pending', progress: 0, verified: false },
      { id: 'M4', name: 'Completion', date: '2025-06-15', description: 'Final handover', status: 'Pending', progress: 0, verified: false },
    ],
    payments: [
      { id: 'PAY-701', recipient: 'TNSTC Civil Division', role: 'Site Preparation', amount: 12000000, date: '2024-09-20', status: 'Cleared', transactionId: 'TXN-KAN-8811' },
    ],
    documents: [
      { id: 'DOC-71', title: 'Highways Sanction Order', type: 'Document', uploadDate: '2024-09-01', location: 'Highways Office Kanchipuram', uploadedBy: 'Divisional Engineer', verified: true },
      { id: 'DOC-72', title: 'Tender Notice', type: 'Document', uploadDate: '2024-10-15', location: 'Highways Office Kanchipuram', uploadedBy: 'Divisional Engineer', verified: true },
    ],
    evidence: [
      { id: 'EV-71', title: 'Site Survey Photo', type: 'Photo', uploadDate: '2024-09-05', location: 'Kanchipuram Bus Stand (12.83°N, 79.70°E)', uploadedBy: 'Survey Officer', verified: true },
    ],
    blockchainRecord: { recordId: recordId('PRJ-KAN-2024-877'), transactionHash: hash('PRJ-KAN-2024-877'), timestamp: '2024-09-01T13:00:00Z', verified: true },
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.contractor.toLowerCase().includes(q) ||
      p.payments.some((pay) => pay.transactionId.toLowerCase().includes(q))
  );
}

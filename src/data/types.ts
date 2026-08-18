export type ProjectStatus = 'Completed' | 'In Progress' | 'Delayed' | 'Flagged' | 'Planned';
export type PaymentStatus = 'Cleared' | 'Processing' | 'Pending' | 'Flagged';
export type MilestoneStatus = 'Completed' | 'In Progress' | 'Pending';
export type ComplaintStatus = 'Submitted' | 'Under Review' | 'Investigating' | 'Resolved' | 'Rejected';
export type IssueType = 'Financial Irregularity' | 'Poor Material Quality' | 'Unexplained Delay' | 'Project Abandoned' | 'Other';
export type ProjectCategory = 'Infrastructure' | 'Education' | 'Healthcare' | 'Water Supply' | 'Rural Development';

export interface Payment {
  id: string;
  recipient: string;
  role: string;
  amount: number; // in rupees
  date: string;
  status: PaymentStatus;
  transactionId: string;
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  description: string;
  status: MilestoneStatus;
  progress: number;
  evidence?: string;
  verified: boolean;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Photo' | 'Document' | 'Receipt' | 'Audit';
  uploadDate: string;
  location: string;
  uploadedBy: string;
  verified: boolean;
  url?: string;
}

export interface BlockchainRecord {
  recordId: string;
  transactionHash: string;
  timestamp: string;
  verified: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  district: string;
  state: string;
  location: { lat: number; lng: number; village?: string };
  department: string;
  category: ProjectCategory;
  budget: number;
  fundsReleased: number;
  spent: number;
  remaining: number;
  status: ProjectStatus;
  progress: number;
  financialProgress: number;
  startDate: string;
  estimatedCompletion: string;
  contractor: string;
  milestones: Milestone[];
  payments: Payment[];
  documents: EvidenceItem[];
  evidence: EvidenceItem[];
  blockchainRecord: BlockchainRecord;
  expenditureBreakdown: { name: string; value: number }[];
}

export interface Complaint {
  id: string;
  projectId: string;
  projectName: string;
  issueType: IssueType;
  location: string;
  description: string;
  evidence?: string;
  status: ComplaintStatus;
  createdAt: string;
  trackingId: string;
}

export interface District {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export interface Anomaly {
  id: string;
  type: 'mismatch' | 'delay' | 'overrun' | 'unverified_payment';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
}

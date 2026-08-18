import { supabase } from './supabaseClient';
import { projects as localProjects, getProjectById as localGetProjectById, searchProjects as localSearchProjects } from '@/data/projects';
import { complaints as localComplaints } from '@/data/complaints';
import type { Project, Payment, Milestone, EvidenceItem, Complaint, BlockchainRecord } from '@/data/types';

// ============ Mappers (DB row → App type) ============

interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  district: string;
  state: string;
  department: string;
  category: string;
  contractor: string | null;
  lat: number;
  lng: number;
  village: string | null;
  budget: number;
  funds_released: number;
  spent: number;
  remaining: number;
  status: string;
  progress: number;
  financial_progress: number;
  start_date: string | null;
  estimated_completion: string | null;
  blockchain_record_id: string | null;
  blockchain_tx_hash: string | null;
  blockchain_timestamp: string | null;
  blockchain_verified: boolean;
  expenditure_breakdown: { name: string; value: number }[];
  created_at: string;
  updated_at: string;
}

interface MilestoneRow {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  date: string | null;
  status: string;
  progress: number;
  evidence: string | null;
  verified: boolean;
}

interface PaymentRow {
  id: string;
  project_id: string;
  recipient: string;
  role: string;
  amount: number;
  date: string | null;
  status: string;
  transaction_id: string;
}

interface EvidenceRow {
  id: string;
  project_id: string;
  title: string;
  type: string;
  upload_date: string | null;
  location: string | null;
  uploaded_by: string | null;
  verified: boolean;
}

interface ComplaintRow {
  id: string;
  project_id: string | null;
  project_name: string | null;
  issue_type: string;
  location: string;
  description: string;
  evidence: string | null;
  status: string;
  tracking_id: string;
  user_id: string;
  created_at: string;
}

function mapProject(
  p: ProjectRow,
  milestones: MilestoneRow[],
  payments: PaymentRow[],
  evidence: EvidenceRow[],
): Project {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    district: p.district,
    state: p.state,
    location: { lat: p.lat, lng: p.lng, village: p.village ?? undefined },
    department: p.department,
    category: p.category as Project['category'],
    budget: p.budget,
    fundsReleased: p.funds_released,
    spent: p.spent,
    remaining: p.remaining,
    status: p.status as Project['status'],
    progress: p.progress,
    financialProgress: p.financial_progress,
    startDate: p.start_date ?? '',
    estimatedCompletion: p.estimated_completion ?? '',
    contractor: p.contractor ?? '',
    milestones: milestones
      .filter((m) => m.project_id === p.id)
      .map((m) => ({
        id: m.id,
        name: m.name,
        date: m.date ?? '',
        description: m.description ?? '',
        status: m.status as Milestone['status'],
        progress: m.progress,
        evidence: m.evidence ?? undefined,
        verified: m.verified,
      })),
    payments: payments
      .filter((pay) => pay.project_id === p.id)
      .map((pay) => ({
        id: pay.id,
        recipient: pay.recipient,
        role: pay.role,
        amount: pay.amount,
        date: pay.date ?? '',
        status: pay.status as Payment['status'],
        transactionId: pay.transaction_id,
      })),
    documents: evidence
      .filter((e) => e.project_id === p.id && (e.type === 'Document' || e.type === 'Audit'))
      .map((e) => ({
        id: e.id,
        title: e.title,
        type: e.type as EvidenceItem['type'],
        uploadDate: e.upload_date ?? '',
        location: e.location ?? '',
        uploadedBy: e.uploaded_by ?? '',
        verified: e.verified,
      })),
    evidence: evidence
      .filter((e) => e.project_id === p.id && (e.type === 'Photo' || e.type === 'Receipt'))
      .map((e) => ({
        id: e.id,
        title: e.title,
        type: e.type as EvidenceItem['type'],
        uploadDate: e.upload_date ?? '',
        location: e.location ?? '',
        uploadedBy: e.uploaded_by ?? '',
        verified: e.verified,
      })),
    blockchainRecord: {
      recordId: p.blockchain_record_id ?? '',
      transactionHash: p.blockchain_tx_hash ?? '',
      timestamp: p.blockchain_timestamp ?? '',
      verified: p.blockchain_verified,
    } as BlockchainRecord,
    expenditureBreakdown: p.expenditure_breakdown ?? [],
  };
}

// ============ API ============

export async function fetchProjects(): Promise<Project[]> {
  try {
    const [projRes, mileRes, payRes, evRes] = await Promise.all([
      supabase.from('projects').select('*'),
      supabase.from('milestones').select('*'),
      supabase.from('payments').select('*'),
      supabase.from('evidence').select('*'),
    ]);

    if (projRes.error) throw projRes.error;
    if (mileRes.error) throw mileRes.error;
    if (payRes.error) throw payRes.error;
    if (evRes.error) throw evRes.error;

    const projects = projRes.data as unknown as ProjectRow[];
    if (projects.length === 0) return localProjects;

    const milestones = mileRes.data as unknown as MilestoneRow[];
    const payments = payRes.data as unknown as PaymentRow[];
    const evidence = evRes.data as unknown as EvidenceRow[];

    return projects.map((p) => mapProject(p, milestones, payments, evidence));
  } catch (err) {
    console.warn('Supabase fetch failed, using local data:', err);
    return localProjects;
  }
}

export async function fetchProjectById(id: string): Promise<Project | undefined> {
  try {
    const [projRes, mileRes, payRes, evRes] = await Promise.all([
      supabase.from('projects').select('*').eq('id', id).maybeSingle(),
      supabase.from('milestones').select('*').eq('project_id', id),
      supabase.from('payments').select('*').eq('project_id', id),
      supabase.from('evidence').select('*').eq('project_id', id),
    ]);

    if (projRes.error) throw projRes.error;
    if (!projRes.data) return localGetProjectById(id);

    const milestones = (mileRes.data ?? []) as unknown as MilestoneRow[];
    const payments = (payRes.data ?? []) as unknown as PaymentRow[];
    const evidence = (evRes.data ?? []) as unknown as EvidenceRow[];

    return mapProject(projRes.data as unknown as ProjectRow, milestones, payments, evidence);
  } catch (err) {
    console.warn('Supabase fetch failed, using local data:', err);
    return localGetProjectById(id);
  }
}

export async function searchProjectsApi(query: string): Promise<Project[]> {
  if (!query.trim()) return [];
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`name.ilike.%${query}%,id.ilike.%${query}%,district.ilike.%${query}%,department.ilike.%${query}%,contractor.ilike.%${query}%`);

    if (error) throw error;
    if (!data || data.length === 0) return localSearchProjects(query);

    const projects = data as unknown as ProjectRow[];
    const ids = projects.map((p) => p.id);

    const [mileRes, payRes, evRes] = await Promise.all([
      supabase.from('milestones').select('*').in('project_id', ids),
      supabase.from('payments').select('*').in('project_id', ids),
      supabase.from('evidence').select('*').in('project_id', ids),
    ]);

    const milestones = (mileRes.data ?? []) as unknown as MilestoneRow[];
    const payments = (payRes.data ?? []) as unknown as PaymentRow[];
    const evidence = (evRes.data ?? []) as unknown as EvidenceRow[];

    return projects.map((p) => mapProject(p, milestones, payments, evidence));
  } catch (err) {
    console.warn('Supabase search failed, using local data:', err);
    return localSearchProjects(query);
  }
}

export async function fetchComplaints(): Promise<Complaint[]> {
  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return localComplaints;

    return (data as unknown as ComplaintRow[]).map((c) => ({
      id: c.id,
      projectId: c.project_id ?? '',
      projectName: c.project_name ?? '',
      issueType: c.issue_type as Complaint['issueType'],
      location: c.location,
      description: c.description,
      evidence: c.evidence ?? undefined,
      status: c.status as Complaint['status'],
      createdAt: c.created_at,
      trackingId: c.tracking_id,
    }));
  } catch (err) {
    console.warn('Supabase complaints fetch failed, using local data:', err);
    return localComplaints;
  }
}

export async function insertComplaint(complaint: {
  projectId: string;
  projectName: string;
  issueType: string;
  location: string;
  description: string;
  evidence?: string;
  trackingId: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('complaints').insert({
      project_id: complaint.projectId,
      project_name: complaint.projectName,
      issue_type: complaint.issueType,
      location: complaint.location,
      description: complaint.description,
      evidence: complaint.evidence ?? null,
      tracking_id: complaint.trackingId,
      status: 'Submitted',
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function insertProject(project: {
  id: string;
  name: string;
  description: string;
  district: string;
  department: string;
  category: string;
  budget: number;
  contractor?: string;
  lat: number;
  lng: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('projects').insert({
      id: project.id,
      name: project.name,
      description: project.description,
      district: project.district,
      department: project.department,
      category: project.category,
      budget: project.budget,
      funds_released: 0,
      spent: 0,
      remaining: project.budget,
      status: 'Planned',
      progress: 0,
      financial_progress: 0,
      contractor: project.contractor ?? null,
      lat: project.lat,
      lng: project.lng,
      start_date: new Date().toISOString().slice(0, 10),
      estimated_completion: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
      blockchain_record_id: `REC-${Math.floor(Math.random() * 999)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      blockchain_tx_hash: `0x${Math.random().toString(16).slice(2, 18)}...`,
      blockchain_timestamp: new Date().toISOString(),
      blockchain_verified: true,
      expenditure_breakdown: [],
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function updateMilestone(
  milestoneId: string,
  updates: { progress?: number; status?: string; verified?: boolean },
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: Record<string, unknown> = {};
    if (updates.progress !== undefined) updateData.progress = updates.progress;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.verified !== undefined) updateData.verified = updates.verified;

    const { error } = await supabase.from('milestones').update(updateData).eq('id', milestoneId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export async function updatePaymentStatus(
  paymentId: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('payments').update({ status }).eq('id', paymentId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/*
# FundLedger — Core Schema

## Purpose
Government public-fund transparency platform. Project financial data is intentionally
public (any citizen can view it without signing in). Complaints are tied to the citizen
who filed them. Admin operations (adding projects, verifying milestones/payments) require
an authenticated admin session.

## New Tables

1. **projects** — Government projects with budget, spending, progress, location, status.
   - `id` text PRIMARY KEY (e.g. "PRJ-KRI-2024-892")
   - `name`, `description`, `district`, `state`, `department`, `category`, `contractor`
   - `lat`, `lng`, `village` — geographic location
   - `budget`, `funds_released`, `spent`, `remaining` — financial figures in paise/rupees
   - `status` — Completed | In Progress | Delayed | Flagged | Planned
   - `progress`, `financial_progress` — percentage values 0-100
   - `start_date`, `estimated_completion` — dates
   - `blockchain_record_id`, `blockchain_tx_hash`, `blockchain_timestamp`, `blockchain_verified`
   - `expenditure_breakdown` — JSONB array of {name, value}
   - `created_at`, `updated_at`

2. **milestones** — Project execution milestones.
   - `id` text PRIMARY KEY
   - `project_id` FK → projects(id) ON DELETE CASCADE
   - `name`, `description`, `date`
   - `status` — Completed | In Progress | Pending
   - `progress` — percentage 0-100
   - `evidence` — text (description of evidence)
   - `verified` — boolean
   - `created_at`

3. **payments** — Recipient/payment records.
   - `id` text PRIMARY KEY
   - `project_id` FK → projects(id) ON DELETE CASCADE
   - `recipient`, `role`, `amount`
   - `date`, `status` — Cleared | Processing | Pending | Flagged
   - `transaction_id`
   - `created_at`

4. **evidence** — Project evidence/documents (photos, receipts, audit docs).
   - `id` text PRIMARY KEY
   - `project_id` FK → projects(id) ON DELETE CASCADE
   - `title`, `type` — Photo | Document | Receipt | Audit
   - `upload_date`, `location`, `uploaded_by`
   - `verified` — boolean
   - `created_at`

5. **complaints** — Public feedback/complaints filed by citizens.
   - `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
   - `project_id` text FK → projects(id) — nullable (complaint may reference a project)
   - `project_name` — denormalized for display
   - `issue_type` — Financial Irregularity | Poor Material Quality | Unexplained Delay | Project Abandoned | Other
   - `location`, `description`, `evidence` — text
   - `status` — Submitted | Under Review | Investigating | Resolved | Rejected
   - `tracking_id` — unique generated ID like "FL-REP-XXXX"
   - `user_id` uuid NOT NULL DEFAULT auth.uid() — owner of the complaint
   - `created_at`

## Security (RLS)

- **projects, milestones, payments, evidence**: Public read (anon + authenticated).
  Write/update only for authenticated admins. For this prototype, any authenticated user
  can write (admin role enforcement is at the app layer).
- **complaints**: Public read (all complaints are visible — transparency). Authenticated
  users can insert their own. Owner can update/delete their own. `user_id` defaults to
  `auth.uid()`.

## Notes
1. Financial amounts stored as bigint (rupees) to avoid floating-point issues.
2. `expenditure_breakdown` is JSONB for flexibility.
3. Blockchain fields are simulated — architecture supports real integration later.
4. Complaints are publicly readable (government transparency) but only the owner can
   modify or delete their own complaint.
*/

-- ============ PROJECTS ============
CREATE TABLE IF NOT EXISTS projects (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  district text NOT NULL,
  state text NOT NULL DEFAULT 'Tamil Nadu',
  department text NOT NULL,
  category text NOT NULL,
  contractor text,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  village text,
  budget bigint NOT NULL DEFAULT 0,
  funds_released bigint NOT NULL DEFAULT 0,
  spent bigint NOT NULL DEFAULT 0,
  remaining bigint NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Planned',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  financial_progress integer NOT NULL DEFAULT 0 CHECK (financial_progress >= 0 AND financial_progress <= 100),
  start_date date,
  estimated_completion date,
  blockchain_record_id text,
  blockchain_tx_hash text,
  blockchain_timestamp timestamptz,
  blockchain_verified boolean DEFAULT true,
  expenditure_breakdown jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- ============ MILESTONES ============
CREATE TABLE IF NOT EXISTS milestones (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  date date,
  status text NOT NULL DEFAULT 'Pending',
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  evidence text,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_milestones" ON milestones;
CREATE POLICY "public_read_milestones" ON milestones FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_milestones" ON milestones;
CREATE POLICY "auth_insert_milestones" ON milestones FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_milestones" ON milestones;
CREATE POLICY "auth_update_milestones" ON milestones FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_milestones" ON milestones;
CREATE POLICY "auth_delete_milestones" ON milestones FOR DELETE
  TO authenticated USING (true);

-- ============ PAYMENTS ============
CREATE TABLE IF NOT EXISTS payments (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  recipient text NOT NULL,
  role text NOT NULL,
  amount bigint NOT NULL DEFAULT 0,
  date date,
  status text NOT NULL DEFAULT 'Pending',
  transaction_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_project_id ON payments(project_id);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_payments" ON payments;
CREATE POLICY "public_read_payments" ON payments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_payments" ON payments;
CREATE POLICY "auth_insert_payments" ON payments FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_payments" ON payments;
CREATE POLICY "auth_update_payments" ON payments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_payments" ON payments;
CREATE POLICY "auth_delete_payments" ON payments FOR DELETE
  TO authenticated USING (true);

-- ============ EVIDENCE ============
CREATE TABLE IF NOT EXISTS evidence (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'Document',
  upload_date date,
  location text,
  uploaded_by text,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_evidence_project_id ON evidence(project_id);

ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_evidence" ON evidence;
CREATE POLICY "public_read_evidence" ON evidence FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_evidence" ON evidence;
CREATE POLICY "auth_insert_evidence" ON evidence FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_evidence" ON evidence;
CREATE POLICY "auth_update_evidence" ON evidence FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_evidence" ON evidence;
CREATE POLICY "auth_delete_evidence" ON evidence FOR DELETE
  TO authenticated USING (true);

-- ============ COMPLAINTS ============
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id text REFERENCES projects(id) ON DELETE SET NULL,
  project_name text,
  issue_type text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  evidence text,
  status text NOT NULL DEFAULT 'Submitted',
  tracking_id text UNIQUE NOT NULL,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_tracking_id ON complaints(tracking_id);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Public can read all complaints (transparency)
DROP POLICY IF EXISTS "public_read_complaints" ON complaints;
CREATE POLICY "public_read_complaints" ON complaints FOR SELECT
  TO anon, authenticated USING (true);

-- Authenticated users can insert their own complaints (user_id defaults to auth.uid())
DROP POLICY IF EXISTS "insert_own_complaints" ON complaints;
CREATE POLICY "insert_own_complaints" ON complaints FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Owner can update their own complaints
DROP POLICY IF EXISTS "update_own_complaints" ON complaints;
CREATE POLICY "update_own_complaints" ON complaints FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Owner can delete their own complaints
DROP POLICY IF EXISTS "delete_own_complaints" ON complaints;
CREATE POLICY "delete_own_complaints" ON complaints FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============ UPDATED_AT TRIGGER ============
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

import type { Project, Anomaly } from '@/data/types';

/**
 * Rule-based anomaly detection.
 * Structured so a future AI anomaly detection model/API can replace these rules.
 */
export function detectAnomalies(project: Project): Anomaly[] {
  const anomalies: Anomaly[] = [];

  // 1. Financial vs physical progress mismatch (>20% gap)
  if (project.financialProgress - project.progress > 20) {
    anomalies.push({
      id: `an-mismatch-${project.id}`,
      type: 'mismatch',
      title: 'Potential Data Mismatch Detected',
      description: `Financial records show ${project.financialProgress}% spent, while physical completion is only ${project.progress}%. This gap may indicate misreported progress or fund diversion.`,
      severity: project.financialProgress - project.progress > 35 ? 'high' : 'medium',
    });
  }

  // 2. Budget overrun
  if (project.spent > project.budget) {
    const overrun = project.spent - project.budget;
    anomalies.push({
      id: `an-overrun-${project.id}`,
      type: 'overrun',
      title: 'Budget Overrun Detected',
      description: `Total spending (₹${(overrun / 100000).toFixed(1)} Lakh over budget) has exceeded the approved budget without formal revision approval.`,
      severity: 'high',
    });
  }

  // 3. Project delay (past estimated completion, not completed)
  if (project.status !== 'Completed' && new Date(project.estimatedCompletion) < new Date()) {
    const daysLate = Math.floor((Date.now() - new Date(project.estimatedCompletion).getTime()) / 86400000);
    anomalies.push({
      id: `an-delay-${project.id}`,
      type: 'delay',
      title: 'Project Delay Detected',
      description: `Estimated completion was ${new Date(project.estimatedCompletion).toLocaleDateString('en-IN')}. Project is ${daysLate} days past deadline.`,
      severity: daysLate > 30 ? 'high' : 'medium',
    });
  }

  // 4. Large payment without verified milestone
  const largeUnverified = project.payments.find(
    (p) => p.amount > project.budget * 0.2 && !project.milestones.some((m) => m.verified && m.progress >= 50)
  );
  if (largeUnverified) {
    anomalies.push({
      id: `an-unverified-${project.id}`,
      type: 'unverified_payment',
      title: 'Payment Verification Required',
      description: `A large payment of ₹${(largeUnverified.amount / 100000).toFixed(1)} Lakh was made to ${largeUnverified.recipient} without a verified milestone.`,
      severity: 'medium',
    });
  }

  return anomalies;
}

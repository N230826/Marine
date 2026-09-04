import { cn } from '@/utils/cn';
import type { RiskLevel } from '@/data/mockData';

export function riskColor(risk: RiskLevel): string {
  switch (risk) {
    case 'High': return 'text-risk-high';
    case 'Medium': return 'text-risk-medium';
    case 'Low': return 'text-risk-low';
    case 'Under Review': return 'text-cyan-glow';
    default: return 'text-seafoam';
  }
}

export function riskBg(risk: RiskLevel): string {
  switch (risk) {
    case 'High': return 'bg-risk-high/15 border-risk-high/40 text-risk-high';
    case 'Medium': return 'bg-risk-medium/15 border-risk-medium/40 text-risk-medium';
    case 'Low': return 'bg-risk-low/15 border-risk-low/40 text-risk-low';
    case 'Under Review': return 'bg-cyan-glow/15 border-cyan-glow/40 text-cyan-glow';
    default: return 'bg-ocean-800/40 border-ocean-700/40 text-seafoam';
  }
}

export function RiskBadge({ risk, className }: { risk: RiskLevel; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold', riskBg(risk), className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', risk === 'High' ? 'bg-risk-high' : risk === 'Medium' ? 'bg-risk-medium' : risk === 'Low' ? 'bg-risk-low' : 'bg-cyan-glow')} />
      {risk.toUpperCase()}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Active': 'bg-risk-high/15 text-risk-high border-risk-high/30',
    'Verified': 'bg-aqua-glow/15 text-aqua-glow border-aqua-glow/30',
    'Under Review': 'bg-cyan-glow/15 text-cyan-glow border-cyan-glow/30',
    'Resolved': 'bg-ocean-700/40 text-seafoam/70 border-ocean-700/40',
  };
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', map[status] ?? map['Resolved'])}>
      {status}
    </span>
  );
}

import {
  ScanLine, Trash2, Fish, AlertTriangle, Gauge, MapPin,
  TrendingUp, ArrowUpRight, Activity, Radar, Layers, ShieldCheck, type LucideIcon,
} from 'lucide-react';
import { stats, historyRecords, mapMarkers } from '@/data/mockData';
import { RiskBadge, StatusBadge } from '@/components/Badges';
import { cn } from '@/utils/cn';
import type { PageId } from '@/components/Sidebar';

interface DashboardProps {
  onNavigate: (id: PageId) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const cards: { icon: LucideIcon; label: string; value: string; suffix?: string; trend?: string; color: string }[] = [
    { icon: ScanLine, label: 'Sonar Images Analyzed', value: stats.sonarImagesAnalyzed.toLocaleString(), trend: '+12 today', color: 'text-cyan-glow' },
    { icon: Trash2, label: 'Total Debris Detected', value: String(stats.totalDebrisDetected), trend: '+3 today', color: 'text-aqua-glow' },
    { icon: Fish, label: 'Ghost Nets Detected', value: String(stats.ghostNetsDetected), trend: '+1 today', color: 'text-risk-high' },
    { icon: AlertTriangle, label: 'High Priority Alerts', value: String(stats.highPriorityAlerts), trend: '2 unresolved', color: 'text-risk-medium' },
    { icon: Gauge, label: 'Average AI Confidence', value: stats.averageConfidence.toFixed(1), suffix: '%', trend: '+0.3%', color: 'text-cyan-glow' },
    { icon: MapPin, label: 'Ocean Area Surveyed', value: String(stats.areaSurveyed), suffix: ' km²', trend: '+8 km²', color: 'text-aqua-glow' },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-glow/20 bg-gradient-to-r from-ocean-800/60 to-ocean-950/60 p-6 shadow-glow">
        <div className="pointer-events-none absolute inset-0 scan-grid opacity-30" />
        <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Marine Command Center</h2>
            <p className="mt-1 text-sm text-seafoam/60">Real-time AI monitoring of underwater debris and ghost nets.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-aqua-glow/30 bg-aqua-glow/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-aqua-glow shadow-glow-aqua" />
            <span className="text-sm font-semibold text-aqua-glow">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c, i) => (
          <div
            key={c.label}
            className="group glass rounded-2xl p-5 transition hover:border-cyan-glow/40 hover:shadow-glow animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-800/60', c.color)}>
                <c.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-seafoam/20 transition group-hover:text-cyan-glow" />
            </div>
            <div className={cn('font-display text-2xl font-bold', c.color)}>
              {c.value}<span className="text-lg">{c.suffix}</span>
            </div>
            <div className="mt-1 text-xs text-seafoam/50">{c.label}</div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-aqua-glow">
              <TrendingUp className="h-3 w-3" /> {c.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent detections */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-seafoam">Recent Detections</h3>
            <button onClick={() => onNavigate('history')} className="text-xs font-semibold text-cyan-glow transition hover:text-aqua-glow">View All →</button>
          </div>
          <div className="space-y-2">
            {historyRecords.slice(0, 6).map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition hover:border-cyan-glow/20 hover:bg-ocean-800/30">
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                  r.risk === 'High' ? 'bg-risk-high/15 text-risk-high' : r.risk === 'Medium' ? 'bg-risk-medium/15 text-risk-medium' : 'bg-aqua-glow/15 text-aqua-glow')}>
                  {r.object.includes('Net') || r.object.includes('Gear') ? <Fish className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-seafoam">{r.object}</span>
                    <span className="text-xs text-seafoam/30">{r.id}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-seafoam/40">
                    <MapPin className="h-3 w-3" /> {r.lat}, {r.lng}
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-bold text-cyan-glow">{r.confidence}%</div>
                  <div className="text-[10px] text-seafoam/40">confidence</div>
                </div>
                <RiskBadge risk={r.risk} />
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column: pipeline + alerts */}
        <div className="space-y-6">
          {/* AI Pipeline status */}
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-seafoam">AI Pipeline</h3>
            <div className="space-y-3">
              {[
                { icon: Radar, name: 'YOLO Detection', status: 'Active', color: 'text-cyan-glow' },
                { icon: Layers, name: 'U-Net Segmentation', status: 'Active', color: 'text-aqua-glow' },
                { icon: ShieldCheck, name: 'Faster R-CNN', status: 'Standby', color: 'text-seafoam/40' },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3 rounded-xl bg-ocean-800/30 p-3">
                  <p.icon className={cn('h-5 w-5', p.color)} />
                  <span className="flex-1 text-sm font-medium text-seafoam">{p.name}</span>
                  <span className={cn('flex items-center gap-1.5 text-xs font-semibold',
                    p.status === 'Active' ? 'text-aqua-glow' : 'text-seafoam/40')}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', p.status === 'Active' ? 'bg-aqua-glow animate-pulse' : 'bg-seafoam/20')} />
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('models')} className="mt-4 w-full rounded-xl bg-cyan-glow/10 py-2.5 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20">
              View AI Architecture →
            </button>
          </div>

          {/* Quick actions */}
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-seafoam">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction icon={ScanLine} label="Analyze Sonar" onClick={() => onNavigate('sonar')} />
              <QuickAction icon={MapPin} label="View Map" onClick={() => onNavigate('map')} />
              <QuickAction icon={Activity} label="Live Detection" onClick={() => onNavigate('live')} />
              <QuickAction icon={AlertTriangle} label="Reports" onClick={() => onNavigate('reports')} />
            </div>
          </div>
        </div>
      </div>

      {/* Map preview strip */}
      <div className="glass rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-seafoam">Detection Locations</h3>
          <button onClick={() => onNavigate('map')} className="text-xs font-semibold text-cyan-glow transition hover:text-aqua-glow">Open Full Map →</button>
        </div>
        <div className="relative h-48 overflow-hidden rounded-xl bg-ocean-950 scan-grid">
          {mapMarkers.map((m) => (
            <div key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
              <span className={cn('block h-3 w-3 rounded-full',
                m.risk === 'High' ? 'bg-risk-high shadow-glow-red' : m.risk === 'Medium' ? 'bg-risk-medium' : 'bg-aqua-glow shadow-glow-aqua')} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-800/30 p-4 transition hover:border-cyan-glow/40 hover:bg-ocean-800/50 hover:shadow-glow">
      <Icon className="h-5 w-5 text-cyan-glow" />
      <span className="text-xs font-medium text-seafoam">{label}</span>
    </button>
  );
}

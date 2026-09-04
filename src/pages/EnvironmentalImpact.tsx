import { Fish, Waves, Ship, Recycle, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export function EnvironmentalImpact() {
  const impacts = [
    { icon: Fish, title: 'Marine Life Entanglement', desc: 'Ghost nets can trap fish, turtles, and marine mammals — causing injury, suffocation, and death.', color: 'text-risk-high', bg: 'from-risk-high/15 to-transparent' },
    { icon: Waves, title: 'Coral Reef Damage', desc: 'Abandoned fishing equipment can drag across and damage fragile coral ecosystems.', color: 'text-cyan-glow', bg: 'from-cyan-glow/15 to-transparent' },
    { icon: Ship, title: 'Navigation Hazards', desc: 'Large submerged debris can damage ships, propellers, and underwater equipment.', color: 'text-risk-medium', bg: 'from-risk-medium/15 to-transparent' },
    { icon: Recycle, title: 'Ocean Pollution', desc: 'Plastic and artificial waste can remain in the ocean for decades, breaking into microplastics.', color: 'text-aqua-glow', bg: 'from-aqua-glow/15 to-transparent' },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Environmental Impact</h2>
        <p className="mt-1 text-sm text-seafoam/60">Why marine debris detection matters for ocean health.</p>
      </div>

      {/* Risk score */}
      <div className="mb-8 relative overflow-hidden rounded-2xl border border-risk-high/30 bg-gradient-to-br from-risk-high/15 to-ocean-950/60 p-8 shadow-glow-red">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-risk-high/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-risk-high">
              <AlertTriangle className="h-4 w-4" /> Estimated Environmental Risk Score
            </div>
            <div className="mt-2 font-display text-6xl font-bold text-risk-high text-glow">8.7<span className="text-2xl text-seafoam/40">/10</span></div>
            <p className="mt-2 text-sm text-seafoam/60">Based on cumulative debris volume, ghost net density, and wildlife exposure in the survey zone.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <RiskMetric label="Ghost Net Density" value="High" color="text-risk-high" pct={90} />
            <RiskMetric label="Plastic Concentration" value="Medium" color="text-risk-medium" pct={65} />
            <RiskMetric label="Coral Proximity" value="High" color="text-risk-high" pct={85} />
            <RiskMetric label="Wildlife Traffic" value="High" color="text-risk-high" pct={80} />
          </div>
        </div>
      </div>

      {/* Impact cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {impacts.map((imp) => (
          <div key={imp.title} className={cn('group relative overflow-hidden rounded-2xl border border-cyan-glow/15 bg-gradient-to-br p-6 transition hover:border-cyan-glow/30 hover:shadow-glow', imp.bg)}>
            <div className="flex items-start gap-4">
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ocean-900/50', imp.color)}>
                <imp.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-seafoam">{imp.title}</h3>
                <p className="mt-2 text-sm text-seafoam/60">{imp.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatBox value="37" label="Debris items detected" sub="across survey zone" />
        <StatBox value="12" label="Ghost nets identified" sub="high entanglement risk" />
        <StatBox value="128 km²" label="Ocean area surveyed" sub="by AI pipeline" />
      </div>

      {/* Call to action */}
      <div className="mt-8 rounded-2xl border border-cyan-glow/20 bg-ocean-800/30 p-6 text-center">
        <TrendingUp className="mx-auto mb-3 h-8 w-8 text-aqua-glow" />
        <h3 className="font-display text-lg font-bold text-seafoam">Every Detection Enables a Cleanup</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-seafoam/60">
          By automating debris detection with AI, AquaNex AI reduces inspection time from weeks to minutes — helping cleanup teams act faster and protect marine ecosystems before damage spreads.
        </p>
      </div>
    </div>
  );
}

function RiskMetric({ label, value, color, pct }: { label: string; value: string; color: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-40 text-xs text-seafoam/60">{label}</span>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ocean-950">
        <div className={cn('h-full rounded-full', color === 'text-risk-high' ? 'bg-risk-high' : 'bg-risk-medium')} style={{ width: `${pct}%` }} />
      </div>
      <span className={cn('text-xs font-semibold', color)}>{value}</span>
    </div>
  );
}

function StatBox({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="font-display text-3xl font-bold text-cyan-glow text-glow">{value}</div>
      <div className="mt-1 text-sm font-medium text-seafoam">{label}</div>
      <div className="text-xs text-seafoam/40">{sub}</div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  Waves, ArrowRight, Cpu, ScanLine, Radar, MapPin, Trash2, Fish, Anchor,
  Ship, AlertTriangle, ChevronRight, Activity, Globe2, Layers, ShieldCheck,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface LandingProps {
  onLaunch: () => void;
}

export function Landing({ onLaunch }: LandingProps) {
  return (
    <div className="min-h-screen bg-ocean-radial">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 scan-grid grid-fade opacity-40" />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow to-aqua-glow shadow-glow">
            <Waves className="h-5 w-5 text-ocean-900" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-lg font-bold tracking-wide text-seafoam">AquaNex AI</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-glow">Marine Intelligence</div>
          </div>
        </div>
        <div className="hidden items-center gap-7 text-sm text-seafoam/60 md:flex">
          <a href="#problem" className="transition hover:text-cyan-glow">Problem</a>
          <a href="#solution" className="transition hover:text-cyan-glow">Solution</a>
          <a href="#workflow" className="transition hover:text-cyan-glow">Workflow</a>
          <a href="#models" className="transition hover:text-cyan-glow">AI Models</a>
        </div>
        <button onClick={onLaunch} className="rounded-xl bg-gradient-to-r from-cyan-glow to-aqua-glow px-5 py-2.5 text-sm font-bold text-ocean-900 shadow-glow transition hover:shadow-glow-lg hover:brightness-110">
          Launch Dashboard
        </button>
      </nav>

      <Hero onLaunch={onLaunch} />
      <ProblemSection />
      <SolutionSection />
      <WorkflowSection />
      <ModelsSection />
      <CTASection onLaunch={onLaunch} />
      <Footer />
    </div>
  );
}

/* ── HERO ────────────────────────────────────────────────────────────── */

function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="relative z-10 px-6 pb-20 pt-10 lg:px-12 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-1.5 text-xs font-semibold text-cyan-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-glow" />
            SMART INDIA HACKATHON 2026
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-seafoam text-glow sm:text-5xl lg:text-6xl">
            AI-Powered<br />
            <span className="bg-gradient-to-r from-cyan-glow to-aqua-glow bg-clip-text text-transparent">Underwater Debris</span><br />
            Detection
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-seafoam/70">
            Transforming Side-Scan Sonar imagery into actionable intelligence for cleaner and safer oceans. Automatically detect ghost nets, marine debris, and underwater hazards with deep learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={onLaunch} className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-aqua-glow px-6 py-3.5 text-sm font-bold text-ocean-900 shadow-glow transition hover:shadow-glow-lg hover:brightness-110">
              Launch AI Dashboard
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a href="#problem" className="flex items-center gap-2 rounded-xl border border-cyan-glow/25 bg-ocean-800/30 px-6 py-3.5 text-sm font-bold text-seafoam backdrop-blur transition hover:border-cyan-glow/50 hover:bg-ocean-800/50">
              Explore Technology
            </a>
          </div>

          {/* Mini stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { v: '1,248', l: 'Sonar Images' },
              { v: '94.6%', l: 'AI Confidence' },
              { v: '128 km²', l: 'Area Surveyed' },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-cyan-glow">{s.v}</div>
                <div className="text-xs text-seafoam/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: animated sonar illustration */}
        <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <SonarHeroIllustration />
        </div>
      </div>
    </section>
  );
}

function SonarHeroIllustration() {
  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-glow/20" />
      <div className="absolute inset-8 rounded-full border border-cyan-glow/15" />
      <div className="absolute inset-16 rounded-full border border-cyan-glow/10" />

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full border-2 border-cyan-glow/40 animate-pulse-ring" />
        <div className="absolute h-32 w-32 rounded-full border-2 border-cyan-glow/40 animate-pulse-ring" style={{ animationDelay: '1s' }} />
        <div className="absolute h-32 w-32 rounded-full border-2 border-cyan-glow/40 animate-pulse-ring" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sonar sweep */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full animate-sonar-sweep">
          <div className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom bg-gradient-to-t from-transparent via-cyan-glow to-transparent" style={{ boxShadow: '0 0 20px rgba(0,194,209,0.5)' }} />
        </div>
      </div>

      {/* Center AUV */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-700 to-ocean-900 border border-cyan-glow/30 shadow-glow-lg animate-float">
            <Ship className="h-7 w-7 text-cyan-glow" />
          </div>
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aqua-glow shadow-glow-aqua" />
        </div>
      </div>

      {/* Detection boxes floating around */}
      <DetectionBox pos="top-[18%] left-[22%]" label="GHOST NET" conf="96%" />
      <DetectionBox pos="bottom-[26%] right-[18%]" label="PIPE" conf="91%" />
      <DetectionBox pos="bottom-[14%] left-[28%]" label="ANOMALY" conf="84%" />

      {/* Floating labels */}
      <div className="absolute top-[8%] right-[12%] flex items-center gap-1.5 rounded-lg bg-ocean-900/80 px-2 py-1 text-[10px] text-aqua-glow backdrop-blur animate-float" style={{ animationDelay: '0.5s' }}>
        <Fish className="h-3 w-3" /> Marine Safe Zone
      </div>
      <div className="absolute bottom-[8%] right-[24%] flex items-center gap-1.5 rounded-lg bg-ocean-900/80 px-2 py-1 text-[10px] text-risk-medium backdrop-blur animate-float" style={{ animationDelay: '1.2s' }}>
        <AlertTriangle className="h-3 w-3" /> Debris Cluster
      </div>
    </div>
  );
}

function DetectionBox({ pos, label, conf }: { pos: string; label: string; conf: string }) {
  return (
    <div className={cn('absolute', pos)}>
      <div className="relative rounded-lg border-2 border-risk-high/70 bg-risk-high/5 px-2 py-1 shadow-glow-red">
        <div className="text-[9px] font-bold text-risk-high">{label}</div>
        <div className="text-[8px] text-risk-high/80">{conf}</div>
        <span className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-risk-high" />
        <span className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-risk-high" />
        <span className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-risk-high" />
        <span className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-risk-high" />
      </div>
    </div>
  );
}

/* ── PROBLEM ─────────────────────────────────────────────────────────── */

function ProblemSection() {
  const stats = [
    { icon: ScanLine, v: '1000s km', l: 'of sonar data collected per survey', c: 'text-cyan-glow' },
    { icon: Activity, v: 'Slow', l: 'manual inspection of every image', c: 'text-risk-medium' },
    { icon: AlertTriangle, v: 'High Risk', l: 'of missed debris and ghost nets', c: 'text-risk-high' },
    { icon: Cpu, v: '10×', l: 'faster detection with AI automation', c: 'text-aqua-glow' },
  ];
  return (
    <section id="problem" className="relative z-10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="THE CHALLENGE"
          title="The Hidden Threat Beneath Our Oceans"
          subtitle="Ghost nets and marine debris continue to damage marine ecosystems, trap wildlife, destroy coral reefs, and create hazards for vessels."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="group glass rounded-2xl p-6 transition hover:border-cyan-glow/40 hover:shadow-glow">
              <div className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-800/60', s.c)}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className={cn('font-display text-2xl font-bold', s.c)}>{s.v}</div>
              <p className="mt-1 text-sm text-seafoam/60">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SOLUTION ────────────────────────────────────────────────────────── */

function SolutionSection() {
  const steps = [
    { icon: ScanLine, t: 'Side-Scan Sonar', d: 'Acoustic imagery of the seabed' },
    { icon: Cpu, t: 'AI Processing', d: 'Preprocessing & noise reduction' },
    { icon: Radar, t: 'YOLO Detection', d: 'Fast object detection & bounding' },
    { icon: Layers, t: 'U-Net Segmentation', d: 'Pixel-level boundary mapping' },
    { icon: MapPin, t: 'Geolocation', d: 'GPS tagging of every detection' },
    { icon: ShieldCheck, t: 'Cleanup Action', d: 'Actionable reports for teams' },
  ];
  return (
    <section id="solution" className="relative z-10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="THE SOLUTION"
          title="From Sound Waves to Actionable Intelligence"
          subtitle="A complete AI pipeline that turns raw sonar data into geotagged, risk-scored cleanup reports."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="glass rounded-2xl p-5 text-center transition hover:border-cyan-glow/40 hover:shadow-glow">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-aqua-glow/10 text-cyan-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold text-seafoam">{s.t}</div>
                <p className="mt-1 text-xs text-seafoam/50">{s.d}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-cyan-glow/40 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WORKFLOW ────────────────────────────────────────────────────────── */

function WorkflowSection() {
  const steps = [
    'Upload Side-Scan Sonar Image',
    'Preprocess — speckle noise reduction & enhancement',
    'YOLO AI Detection — identify debris & anomalies',
    'U-Net Segmentation — exact pixel-level masks',
    'Confidence & Risk Analysis — score every detection',
    'Geotagging — latitude, longitude, timestamp',
    'Generate Alert — high-risk hazard notifications',
    'Download Report — CSV, JSON, PDF',
  ];
  return (
    <section id="workflow" className="relative z-10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          tag="COMPLETE WORKFLOW"
          title="End-to-End Detection Pipeline"
          subtitle="Every step from sonar upload to actionable cleanup report."
        />
        <div className="mt-12 space-y-0">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 font-display text-sm font-bold text-cyan-glow shadow-glow">
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="h-12 w-px bg-gradient-to-b from-cyan-glow/40 to-transparent" />}
              </div>
              <div className="pb-4 pt-1.5">
                <p className={cn('text-base font-medium', i === steps.length - 1 ? 'text-aqua-glow' : 'text-seafoam/80')}>{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MODELS PREVIEW ──────────────────────────────────────────────────── */

function ModelsSection() {
  const models = [
    { name: 'YOLO', icon: Radar, t: 'Fast object detection', d: 'Real-time bounding box + class + confidence' },
    { name: 'U-Net', icon: Layers, t: 'Pixel-level segmentation', d: 'Precise object boundary mapping' },
    { name: 'Faster R-CNN', icon: ShieldCheck, t: 'High-accuracy verification', d: 'Detailed detection verification layer' },
  ];
  return (
    <section id="models" className="relative z-10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading tag="AI ARCHITECTURE" title="A Modular AI Pipeline" subtitle="Three specialized models working in sequence for speed, precision, and accuracy." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <div key={m.name} className="group relative overflow-hidden rounded-2xl border border-cyan-glow/15 bg-ocean-800/30 p-6 transition hover:border-cyan-glow/40 hover:shadow-glow">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-glow/10 blur-2xl transition group-hover:bg-cyan-glow/20" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-aqua-glow/10 text-cyan-glow">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-seafoam">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-cyan-glow">{m.t}</p>
                <p className="mt-3 text-sm text-seafoam/60">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────── */

function CTASection({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="relative z-10 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-cyan-glow/20 bg-gradient-to-br from-ocean-800/60 to-ocean-950/60 p-12 text-center shadow-glow-lg">
        <div className="pointer-events-none absolute inset-0 scan-grid opacity-30" />
        <div className="relative">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow to-aqua-glow shadow-glow-lg">
            <Waves className="h-8 w-8 text-ocean-900" strokeWidth={2.5} />
          </div>
          <h2 className="font-display text-3xl font-bold text-seafoam text-glow lg:text-4xl">Ready to Explore the Depths?</h2>
          <p className="mx-auto mt-4 max-w-xl text-seafoam/70">
            Step into the AquaNex AI command center and experience the full marine debris detection pipeline.
          </p>
          <button onClick={onLaunch} className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-aqua-glow px-8 py-4 text-base font-bold text-ocean-900 shadow-glow transition hover:shadow-glow-lg hover:brightness-110">
            Enter AI Dashboard
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-glow/10 px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-seafoam/40 md:flex-row">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4 text-cyan-glow" />
          <span className="font-display font-bold text-seafoam/70">AquaNex AI</span>
          <span>· Marine Debris Detection</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Smart India Hackathon 2026</span>
          <span className="flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> Prototype</span>
        </div>
      </div>
    </footer>
  );
}

/* ── SHARED ──────────────────────────────────────────────────────────── */

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-glow">{tag}</div>
      <h2 className="font-display text-3xl font-bold text-seafoam lg:text-4xl">{title}</h2>
      <p className="mt-4 text-seafoam/60">{subtitle}</p>
    </div>
  );
}

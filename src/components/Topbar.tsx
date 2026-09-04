import { Bell, Search, ChevronDown, Waves } from '@/utils/icons';
import { lazyIcon } from '@/utils/icons';
import { navItems, type PageId } from './Sidebar';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface TopbarProps {
  current: PageId;
  onNavigate: (id: PageId) => void;
  onHome: () => void;
}

export function Topbar({ current, onNavigate, onHome }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const currentLabel = navItems.find((n) => n.id === current)?.label ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-cyan-glow/10 bg-ocean-900/70 px-4 backdrop-blur-xl lg:px-8">
      {/* Mobile logo */}
      <button onClick={onHome} className="flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-aqua-glow">
          <Waves className="h-4 w-4 text-ocean-900" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-bold text-seafoam">AquaNex</span>
      </button>

      <div className="hidden lg:block">
        <h1 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-cyan-glow">{currentLabel}</h1>
      </div>

      {/* Search */}
      <div className="ml-auto hidden items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-950/50 px-3 py-2 md:flex">
        <Search className="h-4 w-4 text-seafoam/40" />
        <input
          placeholder="Search detections, locations…"
          className="w-44 bg-transparent text-sm text-seafoam placeholder:text-seafoam/30 focus:outline-none lg:w-56"
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-glow/15 bg-ocean-950/50 text-seafoam/70 transition hover:border-cyan-glow/40 hover:text-cyan-glow"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-risk-high text-[9px] font-bold text-white shadow-glow-red">8</span>
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-12 w-80 rounded-2xl border border-cyan-glow/20 bg-ocean-900/95 p-3 shadow-glow-lg backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-seafoam">Alerts</span>
              <span className="text-xs text-cyan-glow">8 new</span>
            </div>
            {[
              { t: 'Ghost Net Detected', d: 'DET-2026-001 · 96% confidence', r: 'High' as const },
              { t: 'Tire Detected', d: 'DET-004 · 93% confidence', r: 'High' as const },
              { t: 'Ghost Net Detected', d: 'DET-008 · 94% confidence', r: 'High' as const },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-ocean-800/40">
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.r === 'High' ? 'bg-risk-high shadow-glow-red' : 'bg-risk-medium')} />
                <div>
                  <div className="text-sm font-medium text-seafoam">{n.t}</div>
                  <div className="text-xs text-seafoam/50">{n.d}</div>
                </div>
              </div>
            ))}
            <button onClick={() => { setNotifOpen(false); onNavigate('live'); }} className="mt-2 w-full rounded-xl bg-cyan-glow/10 py-2 text-xs font-semibold text-cyan-glow transition hover:bg-cyan-glow/20">
              View All Alerts
            </button>
          </div>
        )}
      </div>

      {/* Profile */}
      <button className="flex items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-950/50 p-1 pr-2 transition hover:border-cyan-glow/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ocean-700 to-cyan-glow text-xs font-bold text-ocean-900">AO</div>
        <span className="hidden text-sm font-medium text-seafoam sm:block">Adm. Ora</span>
        <ChevronDown className="hidden h-3.5 w-3.5 text-seafoam/40 sm:block" />
      </button>

      {/* Mobile nav dropdown */}
      <div className="ml-auto flex items-center gap-1 lg:hidden">
        <MobileNav current={current} onNavigate={onNavigate} />
      </div>
    </header>
  );
}

function MobileNav({ current, onNavigate }: { current: PageId; onNavigate: (id: PageId) => void }) {
  const [open, setOpen] = useState(false);
  const CurrentIcon = lazyIcon(navItems.find((n) => n.id === current)?.icon ?? 'LayoutDashboard');
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-950/50 px-3 py-2 text-sm text-seafoam">
        <CurrentIcon className="h-4 w-4 text-cyan-glow" />
        <span className="font-medium">{navItems.find((n) => n.id === current)?.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-seafoam/40" />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-52 rounded-2xl border border-cyan-glow/20 bg-ocean-900/95 p-2 shadow-glow-lg backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = lazyIcon(item.icon);
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setOpen(false); }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
                  current === item.id ? 'bg-cyan-glow/10 text-cyan-glow' : 'text-seafoam/70 hover:bg-ocean-800/40'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

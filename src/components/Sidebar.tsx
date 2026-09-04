import { Waves } from 'lucide-react';
import { cn } from '@/utils/cn';

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'sonar'
  | 'live'
  | 'map'
  | 'history'
  | 'reports'
  | 'models'
  | 'impact'
  | 'settings';

export const navItems: { id: PageId; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'sonar', label: 'Sonar Analysis', icon: 'ScanLine' },
  { id: 'live', label: 'Live Detection', icon: 'Radar' },
  { id: 'map', label: 'Map', icon: 'Map' },
  { id: 'history', label: 'Detection History', icon: 'History' },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
  { id: 'models', label: 'AI Models', icon: 'Cpu' },
  { id: 'impact', label: 'Impact', icon: 'Leaf' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

interface SidebarProps {
  current: PageId;
  onNavigate: (id: PageId) => void;
  onHome: () => void;
}

export function Sidebar({ current, onNavigate, onHome }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-cyan-glow/10 bg-ocean-950/80 backdrop-blur-xl lg:flex">
      <button onClick={onHome} className="flex items-center gap-3 px-6 py-5 transition hover:opacity-80">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow to-aqua-glow shadow-glow">
          <Waves className="h-5 w-5 text-ocean-900" strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <div className="font-display text-lg font-bold tracking-wide text-seafoam">AquaNex</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-glow">AI</div>
        </div>
      </button>

      <nav className="mt-2 flex-1 space-y-1 px-3 hide-scrollbar overflow-y-auto">
        {navItems.map((item) => {
          const Icon = lazyIcon(item.icon);
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                active ? 'bg-cyan-glow/10 text-cyan-glow shadow-glow' : 'text-seafoam/60 hover:bg-ocean-800/40 hover:text-seafoam'
              )}
            >
              {active && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cyan-glow shadow-glow" />}
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4">
        <div className="glass rounded-xl p-3 text-xs">
          <div className="flex items-center gap-2 text-aqua-glow">
            <span className="h-2 w-2 animate-pulse rounded-full bg-aqua-glow shadow-glow-aqua" />
            <span className="font-semibold">System Online</span>
          </div>
          <p className="mt-1 text-seafoam/50">AI Pipeline Active · v2.6.0</p>
        </div>
      </div>
    </aside>
  );
}

import { lazyIcon } from '@/utils/icons';

import {
  LayoutDashboard, ScanLine, Radar, Map, History, FileText, Cpu, Leaf, Settings,
  Bell, Search, ChevronDown, Waves, type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  LayoutDashboard, ScanLine, Radar, Map, History, FileText, Cpu, Leaf, Settings,
};

export function lazyIcon(name: string): LucideIcon {
  return map[name] ?? LayoutDashboard;
}

export { Bell, Search, ChevronDown, Waves };

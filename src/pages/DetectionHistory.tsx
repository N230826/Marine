import { useState, useMemo } from 'react';
import { Search, Filter, Fish, Trash2, AlertTriangle, Anchor, MapPin } from 'lucide-react';
import { historyRecords } from '@/data/mockData';
import { RiskBadge, StatusBadge } from '@/components/Badges';
import { cn } from '@/utils/cn';

export function DetectionHistory() {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [objectFilter, setObjectFilter] = useState('All');
  const [confFilter, setConfFilter] = useState('All');

  const objects = useMemo(() => ['All', ...Array.from(new Set(historyRecords.map((r) => r.object)))], []);
  const risks = ['All', 'High', 'Medium', 'Low'];
  const confs = ['All', '90%+', '80%+', 'All'];

  const filtered = historyRecords.filter((r) => {
    const s = search.toLowerCase();
    const matchSearch = !s || r.object.toLowerCase().includes(s) || r.id.toLowerCase().includes(s) || `${r.lat}`.includes(s);
    const matchRisk = riskFilter === 'All' || r.risk === riskFilter;
    const matchObj = objectFilter === 'All' || r.object === objectFilter;
    const matchConf = confFilter === 'All' || (confFilter === '90%+' && r.confidence >= 90) || (confFilter === '80%+' && r.confidence >= 80);
    return matchSearch && matchRisk && matchObj && matchConf;
  });

  const objIcon = (obj: string) => {
    if (obj.includes('Net') || obj.includes('Gear')) return Fish;
    if (obj.includes('Anomaly')) return AlertTriangle;
    if (obj.includes('Shipwreck')) return Anchor;
    return Trash2;
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Detection History</h2>
        <p className="mt-1 text-sm text-seafoam/60">Complete log of all AI detections with filtering and search.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 glass rounded-2xl p-4">
        <div className="grid gap-3 md:grid-cols-4">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-950/50 px-3 py-2.5">
            <Search className="h-4 w-4 text-seafoam/40" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ID, object, coords…" className="w-full bg-transparent text-sm text-seafoam placeholder:text-seafoam/30 focus:outline-none" />
          </div>
          {/* Risk filter */}
          <SelectFilter icon={Filter} value={riskFilter} onChange={setRiskFilter} options={risks} />
          {/* Object filter */}
          <SelectFilter icon={Filter} value={objectFilter} onChange={setObjectFilter} options={objects} />
          {/* Confidence filter */}
          <SelectFilter icon={Filter} value={confFilter} onChange={setConfFilter} options={confs} />
        </div>
        <div className="mt-3 text-xs text-seafoam/40">
          Showing {filtered.length} of {historyRecords.length} detections
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyan-glow/15 bg-ocean-800/30 text-left text-xs uppercase tracking-wider text-cyan-glow">
                <th className="px-4 py-3 font-semibold">Detection ID</th>
                <th className="px-4 py-3 font-semibold">Object Type</th>
                <th className="px-4 py-3 font-semibold">Confidence</th>
                <th className="px-4 py-3 font-semibold">Risk</th>
                <th className="px-4 py-3 font-semibold">Latitude</th>
                <th className="px-4 py-3 font-semibold">Longitude</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const Icon = objIcon(r.object);
                return (
                  <tr key={r.id} className={cn('border-b border-cyan-glow/5 transition hover:bg-ocean-800/30', i % 2 === 1 && 'bg-ocean-950/20')}>
                    <td className="px-4 py-3 font-mono text-xs text-cyan-glow">{r.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-seafoam/40" />
                        <span className="font-medium text-seafoam">{r.object}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-ocean-950">
                          <div className={cn('h-full rounded-full', r.confidence >= 90 ? 'bg-aqua-glow' : 'bg-cyan-glow')} style={{ width: `${r.confidence}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-seafoam">{r.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><RiskBadge risk={r.risk} /></td>
                    <td className="px-4 py-3 text-xs text-seafoam/60">{r.lat}</td>
                    <td className="px-4 py-3 text-xs text-seafoam/60">{r.lng}</td>
                    <td className="px-4 py-3 text-xs text-seafoam/60">{r.date}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-seafoam/40">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-cyan-glow/30" />
                  No detections match your filters.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({ icon: Icon, value, onChange, options }: {
  icon: typeof Filter; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-cyan-glow/15 bg-ocean-950/50 px-3 py-2.5">
      <Icon className="h-4 w-4 text-seafoam/40" />
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent text-sm text-seafoam focus:outline-none">
        {options.map((o) => <option key={o} value={o} className="bg-ocean-900">{o}</option>)}
      </select>
    </div>
  );
}

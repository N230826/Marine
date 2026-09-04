import { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Satellite, Waves, Layers, Flame, X, Crosshair } from 'lucide-react';
import { mapMarkers } from '@/data/mockData';
import { RiskBadge } from '@/components/Badges';
import { cn } from '@/utils/cn';

type LayerMode = 'satellite' | 'sonar' | 'detection' | 'heatmap';

export function MapPage() {
  const [selected, setSelected] = useState<typeof mapMarkers[0] | null>(null);
  const [zoom, setZoom] = useState(1);
  const [layer, setLayer] = useState<LayerMode>('sonar');

  const layers: { id: LayerMode; label: string; icon: typeof Satellite }[] = [
    { id: 'satellite', label: 'Satellite', icon: Satellite },
    { id: 'sonar', label: 'Sonar Layer', icon: Waves },
    { id: 'detection', label: 'Detection', icon: Crosshair },
    { id: 'heatmap', label: 'Heatmap', icon: Flame },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Ocean Detection Map</h2>
        <p className="mt-1 text-sm text-seafoam/60">Geotagged marine debris locations across the survey area.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-cyan-glow/20 bg-ocean-950 shadow-glow">
            {/* Background depends on layer */}
            <div className="absolute inset-0 scan-grid" style={{ opacity: layer === 'satellite' ? 0.15 : 0.3 }} />
            {layer === 'satellite' && (
              <div className="absolute inset-0 bg-gradient-to-b from-ocean-700/30 via-ocean-800/50 to-ocean-950" />
            )}
            {layer === 'sonar' && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-ocean-800/40 via-ocean-900/60 to-ocean-950" />
                <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
                  {[15, 30, 45, 60, 75, 90].map((y) => (
                    <path key={y} d={`M 0 ${y}% Q 25% ${y - 4}% 50% ${y}% T 100% ${y}%`} fill="none" stroke="rgba(0,194,209,0.3)" strokeWidth="1" />
                  ))}
                </svg>
              </div>
            )}
            {layer === 'heatmap' && (
              <div className="absolute inset-0">
                {mapMarkers.map((m) => (
                  <div key={m.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
                    <div className={cn('h-20 w-20 rounded-full blur-xl opacity-40',
                      m.risk === 'High' ? 'bg-risk-high' : m.risk === 'Medium' ? 'bg-risk-medium' : 'bg-aqua-glow')} />
                  </div>
                ))}
              </div>
            )}

            {/* Depth contour lines */}
            <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
              <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(0,194,209,0.2)" strokeWidth="1" />
              <circle cx="50%" cy="50%" r="20%" fill="none" stroke="rgba(0,194,209,0.15)" strokeWidth="1" />
              <circle cx="50%" cy="50%" r="10%" fill="none" stroke="rgba(0,194,209,0.1)" strokeWidth="1" />
            </svg>

            {/* Markers */}
            {layer !== 'heatmap' && mapMarkers.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${m.x * zoom}%`, top: `${m.y * zoom}%`, transform: `translate(-50%, -50%) scale(${zoom})` }}
              >
                <span className={cn('relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-ocean-900 shadow-glow transition group-hover:scale-125',
                  m.risk === 'High' ? 'bg-risk-high shadow-glow-red' : m.risk === 'Medium' ? 'bg-risk-medium' : 'bg-aqua-glow shadow-glow-aqua')}>
                  {m.risk === 'High' && <span className="absolute inset-0 animate-ping rounded-full bg-risk-high/60" />}
                </span>
                {selected?.id === m.id && (
                  <span className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ocean-900/95 px-2 py-1 text-[10px] font-bold text-seafoam shadow-glow-lg">
                    {m.type}
                  </span>
                )}
              </button>
            ))}

            {/* HUD */}
            <div className="absolute left-4 top-4 rounded-lg bg-ocean-950/70 px-3 py-1.5 text-xs text-cyan-glow backdrop-blur">
              Bay of Bengal Survey Zone · 15.62°N, 80.23°E
            </div>
            <div className="absolute right-4 top-4 rounded-lg bg-ocean-950/70 px-3 py-1.5 text-xs text-aqua-glow backdrop-blur">
              {mapMarkers.length} detections
            </div>

            {/* Compass */}
            <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-glow/30 bg-ocean-950/70 backdrop-blur">
              <span className="text-[10px] font-bold text-risk-high">N</span>
            </div>

            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1">
              <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-glow/20 bg-ocean-950/70 text-cyan-glow backdrop-blur transition hover:bg-ocean-800">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-glow/20 bg-ocean-950/70 text-cyan-glow backdrop-blur transition hover:bg-ocean-800">
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>

            {/* Scale bar */}
            <div className="absolute bottom-4 left-20 flex items-center gap-2 text-[10px] text-seafoam/50">
              <div className="h-0.5 w-12 bg-cyan-glow/40" /> 500m
            </div>
          </div>

          {/* Layer controls */}
          <div className="mt-4 flex flex-wrap gap-2">
            {layers.map((l) => (
              <button
                key={l.id}
                onClick={() => setLayer(l.id)}
                className={cn('flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition',
                  layer === l.id ? 'border-cyan-glow bg-cyan-glow/15 text-cyan-glow shadow-glow' : 'border-cyan-glow/15 bg-ocean-800/30 text-seafoam/60 hover:border-cyan-glow/30')}
              >
                <l.icon className="h-4 w-4" /> {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar: selected marker or list */}
        <div className="space-y-4">
          {selected ? (
            <div className="glass rounded-2xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-seafoam">Marker Details</h3>
                <button onClick={() => setSelected(null)} className="text-seafoam/30 transition hover:text-cyan-glow"><X className="h-4 w-4" /></button>
              </div>
              <div className="rounded-xl bg-ocean-800/30 p-3">
                <div className="font-display text-lg font-bold text-cyan-glow">{selected.type}</div>
                <div className="text-xs text-seafoam/40">{selected.id}</div>
              </div>
              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-seafoam/50">Confidence</span><span className="font-semibold text-cyan-glow">{selected.confidence}%</span></div>
                <div className="flex justify-between"><span className="text-seafoam/50">Risk Level</span><RiskBadge risk={selected.risk} /></div>
                <div className="flex justify-between"><span className="text-seafoam/50">Latitude</span><span className="font-semibold text-seafoam">{selected.lat}° N</span></div>
                <div className="flex justify-between"><span className="text-seafoam/50">Longitude</span><span className="font-semibold text-seafoam">{selected.lng}° E</span></div>
                <div className="flex justify-between"><span className="text-seafoam/50">Detection Time</span><span className="text-xs text-seafoam/70">{selected.time}</span></div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-5 text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-cyan-glow/40" />
              <p className="text-sm text-seafoam/50">Click a marker to view detection details.</p>
            </div>
          )}

          {/* Legend */}
          <div className="glass rounded-2xl p-5">
            <h4 className="mb-3 text-sm font-bold text-seafoam">Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-risk-high shadow-glow-red" /> <span className="text-seafoam/70">High Priority</span></div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-risk-medium" /> <span className="text-seafoam/70">Medium Priority</span></div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-aqua-glow shadow-glow-aqua" /> <span className="text-seafoam/70">Low Priority</span></div>
            </div>
          </div>

          {/* Marker list */}
          <div className="glass rounded-2xl p-5">
            <h4 className="mb-3 text-sm font-bold text-seafoam">All Detections</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto hide-scrollbar">
              {mapMarkers.map((m) => (
                <button key={m.id} onClick={() => setSelected(m)} className={cn('flex w-full items-center gap-2 rounded-lg p-2 text-left text-xs transition',
                  selected?.id === m.id ? 'bg-cyan-glow/10' : 'hover:bg-ocean-800/30')}>
                  <span className={cn('h-2 w-2 rounded-full', m.risk === 'High' ? 'bg-risk-high' : m.risk === 'Medium' ? 'bg-risk-medium' : 'bg-aqua-glow')} />
                  <span className="flex-1 font-medium text-seafoam">{m.type}</span>
                  <span className="text-seafoam/40">{m.confidence}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

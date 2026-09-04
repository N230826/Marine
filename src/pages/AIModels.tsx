import { Radar, Layers, ShieldCheck, ScanLine, Cpu, MapPin, FileText, AlertTriangle, ChevronDown, Gauge, type LucideIcon } from 'lucide-react';
import { aiModels } from '@/data/mockData';
import { cn } from '@/utils/cn';

export function AIModels() {
  const modelIcons: Record<string, LucideIcon> = { YOLO: Radar, 'U-Net': Layers, 'Faster R-CNN': ShieldCheck };

  const pipeline = [
    { icon: ScanLine, label: 'Sonar Image', desc: 'Raw acoustic input' },
    { icon: Cpu, label: 'Image Preprocessing', desc: 'Noise reduction & enhancement' },
    { icon: Radar, label: 'YOLO Detection', desc: 'Fast object detection' },
    { icon: Layers, label: 'U-Net Segmentation', desc: 'Pixel-level boundaries' },
    { icon: ShieldCheck, label: 'Faster R-CNN Verification', desc: 'Optional high-accuracy pass' },
    { icon: Gauge, label: 'Confidence Scoring', desc: 'Risk & priority assessment' },
    { icon: MapPin, label: 'Geolocation', desc: 'GPS tagging & timestamp' },
    { icon: FileText, label: 'Report + Alert', desc: 'Downloadable output' },
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">AI Model Architecture</h2>
        <p className="mt-1 text-sm text-seafoam/60">A modular deep learning pipeline for sonar-based marine debris detection.</p>
      </div>

      {/* Model cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {aiModels.map((m) => {
          const Icon = modelIcons[m.name] ?? Cpu;
          const colorClass = m.name === 'YOLO' ? 'from-cyan-glow/20 to-cyan-glow/5 text-cyan-glow border-cyan-glow/30'
            : m.name === 'U-Net' ? 'from-aqua-glow/20 to-aqua-glow/5 text-aqua-glow border-aqua-glow/30'
            : 'from-ocean-600/30 to-ocean-700/10 text-ocean-600 border-ocean-600/30';
          return (
            <div key={m.name} className={cn('group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition hover:shadow-glow', colorClass)}>
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-current opacity-10 blur-2xl" />
              <div className="relative">
                <div className={cn('mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-900/50')}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-seafoam">{m.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-80">{m.purpose}</p>
                <p className="mt-3 text-sm text-seafoam/60">{m.description}</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-seafoam/40">Strength</span>
                    <span className="font-semibold text-seafoam/80">{m.strength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-seafoam/40">Output</span>
                    <span className="font-semibold text-seafoam/80">{m.output}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture pipeline */}
      <div className="glass rounded-2xl p-6">
        <h3 className="mb-2 font-display text-lg font-bold text-seafoam">Processing Architecture</h3>
        <p className="mb-6 text-sm text-seafoam/50">The complete flow from raw sonar image to actionable report.</p>

        <div className="space-y-0">
          {pipeline.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl border',
                  i === 4 ? 'border-dashed border-ocean-600/40 bg-ocean-600/10 text-ocean-600' : 'border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow')}>
                  <step.icon className="h-5 w-5" />
                </div>
                {i < pipeline.length - 1 && (
                  <div className="flex flex-col items-center">
                    <ChevronDown className="h-4 w-4 text-cyan-glow/40" />
                    <div className="h-4 w-px bg-gradient-to-b from-cyan-glow/30 to-transparent" />
                  </div>
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-seafoam">{step.label}</span>
                  {i === 4 && <span className="rounded-full bg-ocean-600/20 px-2 py-0.5 text-[10px] font-semibold text-ocean-600">OPTIONAL</span>}
                </div>
                <p className="text-xs text-seafoam/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration note */}
      <div className="mt-6 rounded-2xl border border-aqua-glow/20 bg-aqua-glow/5 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-aqua-glow" />
          <div>
            <h4 className="text-sm font-bold text-aqua-glow">Ready for Real Model Integration</h4>
            <p className="mt-1 text-xs text-seafoam/60">
              The frontend architecture uses API placeholders for <code className="text-cyan-glow">/detect-yolo</code>, <code className="text-cyan-glow">/segment-unet</code>, and <code className="text-cyan-glow">/verify-detection</code>.
              Replace the simulated responses with live model endpoints to switch from demo to production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

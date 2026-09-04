import { useEffect, useRef, useState } from 'react';
import {
  Upload, ScanLine, CheckCircle2, Loader2, X, MapPin, FileText, ShieldCheck,
  Fish, Trash2, Layers, Gauge, AlertTriangle, Download, Crosshair, Waves,
} from 'lucide-react';
import { detections, processingSteps, noiseFilters, type DetectionBox } from '@/data/mockData';
import { RiskBadge, riskColor } from '@/components/Badges';
import { CircularProgress } from '@/components/CircularProgress';
import { cn } from '@/utils/cn';
import { downloadCSV, downloadJSON, generatePDFReport } from '@/data/api';
import { historyRecords } from '@/data/mockData';
import type { PageId } from '@/components/Sidebar';

interface SonarAnalysisProps {
  onNavigate: (id: PageId) => void;
}

type Phase = 'idle' | 'processing' | 'results';

export function SonarAnalysis({ onNavigate }: SonarAnalysisProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDet, setSelectedDet] = useState<DetectionBox | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase !== 'processing') return;
    if (currentStep >= processingSteps.length) {
      const t = setTimeout(() => { setPhase('results'); setSelectedDet(detections[0]); }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [phase, currentStep]);

  function startAnalysis() {
    setPhase('processing');
    setCurrentStep(0);
    setSelectedDet(null);
  }

  function reset() {
    setPhase('idle');
    setCurrentStep(0);
    setSelectedDet(null);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) startAnalysis();
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Live Sonar Analysis</h2>
        <p className="mt-1 text-sm text-seafoam/60">Upload a Side-Scan Sonar image and run the full AI detection pipeline.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT: Upload / Processing / Results */}
        <div className="lg:col-span-2 space-y-6">
          {phase === 'idle' && (
            <UploadZone dragOver={dragOver} setDragOver={setDragOver} fileInput={fileInput} onFile={handleFile} onDemo={startAnalysis} />
          )}

          {phase === 'processing' && (
            <ProcessingPanel currentStep={currentStep} />
          )}

          {phase === 'results' && (
            <>
              <SonarViewer detections={detections} selected={selectedDet} onSelect={setSelectedDet} />
              <YoloVsUnetSection />
              <ConfidencePanel />
            </>
          )}
        </div>

        {/* RIGHT: Details / Alert */}
        <div className="space-y-6">
          {phase === 'results' && selectedDet && (
            <DetailsPanel det={selectedDet} onNavigate={onNavigate} onReset={reset} />
          )}
          {phase === 'results' && (
            <AlertPanel det={detections[0]} onNavigate={onNavigate} />
          )}
          {phase === 'idle' && <IdleGuide />}
          {phase === 'processing' && <ProcessingGuide currentStep={currentStep} />}
        </div>
      </div>
    </div>
  );
}

/* ── UPLOAD ──────────────────────────────────────────────────────────── */

function UploadZone({ dragOver, setDragOver, fileInput, onFile, onDemo }: {
  dragOver: boolean; setDragOver: (v: boolean) => void;
  fileInput: React.RefObject<HTMLInputElement>;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDemo: () => void;
}) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) onDemo(); }}
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center transition',
        dragOver ? 'border-cyan-glow bg-cyan-glow/5 shadow-glow' : 'border-cyan-glow/25 bg-ocean-800/20'
      )}
    >
      <div className="pointer-events-none absolute inset-0 scan-grid opacity-20" />
      <div className="relative">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow/20 to-aqua-glow/10 shadow-glow">
          <Upload className="h-9 w-9 text-cyan-glow" />
        </div>
        <h3 className="font-display text-xl font-bold text-seafoam">Upload Side-Scan Sonar Image</h3>
        <p className="mt-2 text-sm text-seafoam/50">Drag and drop your sonar image here, or click to browse</p>
        <div className="mt-2 text-xs text-seafoam/30">Supported formats: JPG, PNG, TIFF</div>

        <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.tiff" className="hidden" onChange={onFile} />

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={() => fileInput.current?.click()} className="rounded-xl bg-gradient-to-r from-cyan-glow to-aqua-glow px-6 py-3 text-sm font-bold text-ocean-900 shadow-glow transition hover:shadow-glow-lg hover:brightness-110">
            Upload Image
          </button>
          <button onClick={onDemo} className="rounded-xl border border-cyan-glow/25 bg-ocean-800/40 px-6 py-3 text-sm font-bold text-seafoam transition hover:border-cyan-glow/50 hover:bg-ocean-800/60">
            Use Demo Sonar Image
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── PROCESSING ──────────────────────────────────────────────────────── */

function ProcessingPanel({ currentStep }: { currentStep: number }) {
  const progress = Math.min((currentStep / processingSteps.length) * 100, 100);
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-glow/15">
          <Loader2 className="h-5 w-5 animate-spin text-cyan-glow" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-seafoam">AI Processing Pipeline</h3>
          <p className="text-xs text-seafoam/50">Analyzing sonar data with deep learning models</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-cyan-glow font-semibold">{progress.toFixed(0)}% Complete</span>
          <span className="text-seafoam/40">{currentStep}/{processingSteps.length} steps</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ocean-950">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-aqua-glow shadow-glow transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {processingSteps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step} className={cn(
              'flex items-center gap-3 rounded-xl border p-3 transition-all',
              done ? 'border-aqua-glow/30 bg-aqua-glow/5' : active ? 'border-cyan-glow/40 bg-cyan-glow/10 shadow-glow' : 'border-transparent bg-ocean-800/20'
            )}>
              <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                done ? 'bg-aqua-glow/20 text-aqua-glow' : active ? 'bg-cyan-glow/20 text-cyan-glow' : 'bg-ocean-700/40 text-seafoam/30')}>
                {done ? <CheckCircle2 className="h-4.5 w-4.5" /> : active ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className={cn('text-sm font-medium', done ? 'text-aqua-glow' : active ? 'text-cyan-glow' : 'text-seafoam/40')}>
                {step}
              </span>
              {active && <span className="ml-auto flex gap-1">
                <span className="h-1 w-1 animate-pulse rounded-full bg-cyan-glow" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-cyan-glow" style={{ animationDelay: '0.2s' }} />
                <span className="h-1 w-1 animate-pulse rounded-full bg-cyan-glow" style={{ animationDelay: '0.4s' }} />
              </span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── SONAR VIEWER ────────────────────────────────────────────────────── */

function SonarViewer({ detections, selected, onSelect }: {
  detections: DetectionBox[]; selected: DetectionBox | null; onSelect: (d: DetectionBox) => void;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScanLine className="h-5 w-5 text-cyan-glow" />
          <h3 className="font-display text-lg font-bold text-seafoam">Sonar Detection View</h3>
        </div>
        <span className="rounded-lg bg-aqua-glow/10 px-3 py-1 text-xs font-semibold text-aqua-glow">{detections.length} detections</span>
      </div>

      {/* Simulated sonar image with overlays */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-cyan-glow/20 bg-ocean-950 scan-grid">
        {/* Sonar waterfall texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-800/40 via-ocean-900/60 to-ocean-950" />
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(0,194,209,0.15), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(22,224,189,0.1), transparent 50%)' }} />
        {/* Simulated seabed ripples */}
        <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
          {[20, 35, 50, 65, 80].map((y) => (
            <path key={y} d={`M 0 ${y}% Q 25% ${y - 3}% 50% ${y}% T 100% ${y}%`} fill="none" stroke="rgba(0,194,209,0.3)" strokeWidth="1" />
          ))}
        </svg>
        {/* Scan line animation */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent shadow-glow animate-scan-line" />

        {/* Bounding boxes */}
        {detections.map((d) => {
          const active = selected?.id === d.id;
          const borderColor = d.risk === 'High' ? 'border-risk-high' : d.risk === 'Medium' ? 'border-risk-medium' : 'border-cyan-glow';
          return (
            <button
              key={d.id}
              onClick={() => onSelect(d)}
              className={cn('absolute rounded-lg border-2 transition-all', borderColor, active ? 'shadow-glow-lg z-10' : 'opacity-80 hover:opacity-100 hover:shadow-glow')}
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.width}%`, height: `${d.height}%` }}
            >
              {/* Corner markers */}
              <span className={cn('absolute -top-0.5 -left-0.5 h-2.5 w-2.5 border-t-2 border-l-2', borderColor)} />
              <span className={cn('absolute -top-0.5 -right-0.5 h-2.5 w-2.5 border-t-2 border-r-2', borderColor)} />
              <span className={cn('absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 border-b-2 border-l-2', borderColor)} />
              <span className={cn('absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 border-b-2 border-r-2', borderColor)} />
              {/* Label */}
              <span className={cn('absolute -top-6 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-bold text-white',
                d.risk === 'High' ? 'bg-risk-high' : d.risk === 'Medium' ? 'bg-risk-medium' : 'bg-cyan-glow')}>
                {d.label} {d.confidence}%
              </span>
            </button>
          );
        })}

        {/* HUD overlay */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-ocean-950/70 px-2.5 py-1 text-[10px] text-cyan-glow backdrop-blur">
          <Crosshair className="h-3 w-3" /> SONAR-IMG-001 · 15.6234°N, 80.2312°E
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-ocean-950/70 px-2.5 py-1 text-[10px] text-aqua-glow backdrop-blur">
          <Waves className="h-3 w-3" /> 900 kHz · Range 75m
        </div>
      </div>

      {/* Detection legend */}
      <div className="mt-4 flex flex-wrap gap-3">
        {detections.map((d) => (
          <button key={d.id} onClick={() => onSelect(d)} className={cn(
            'flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition',
            selected?.id === d.id ? 'border-cyan-glow bg-cyan-glow/10' : 'border-cyan-glow/15 bg-ocean-800/30 hover:border-cyan-glow/30'
          )}>
            <span className={cn('h-2 w-2 rounded-full', d.risk === 'High' ? 'bg-risk-high' : d.risk === 'Medium' ? 'bg-risk-medium' : 'bg-cyan-glow')} />
            <span className="font-semibold text-seafoam">{d.label}</span>
            <span className="text-seafoam/40">{d.confidence}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── YOLO vs U-NET ───────────────────────────────────────────────────── */

function YoloVsUnetSection() {
  const [slider, setSlider] = useState(50);
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-1 font-display text-lg font-bold text-seafoam">YOLO Detection vs U-Net Segmentation</h3>
      <p className="mb-5 text-sm text-seafoam/50">Drag the slider to compare object detection with pixel-level segmentation.</p>

      <div className="grid gap-4 md:grid-cols-2 mb-5">
        <div className="rounded-xl border border-cyan-glow/20 bg-ocean-950 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyan-glow"><Layers className="h-4 w-4" /> YOLO Detection</div>
          <p className="text-xs text-seafoam/50">Identifies <strong className="text-seafoam/80">WHAT</strong> the object is and <strong className="text-seafoam/80">WHERE</strong> it is located.</p>
        </div>
        <div className="rounded-xl border border-aqua-glow/20 bg-ocean-950 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-aqua-glow"><Crosshair className="h-4 w-4" /> U-Net Segmentation</div>
          <p className="text-xs text-seafoam/50">Identifies the <strong className="text-seafoam/80">EXACT PIXELS</strong> and <strong className="text-seafoam/80">BOUNDARIES</strong> of the object.</p>
        </div>
      </div>

      {/* Slider comparison */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-cyan-glow/20 bg-ocean-950 scan-grid">
        {/* After (segmentation mask) - full */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-800/40 to-ocean-950" />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id="maskGrad" cx="40%" cy="45%" r="35%">
              <stop offset="0%" stopColor="rgba(22,224,189,0.5)" />
              <stop offset="70%" stopColor="rgba(22,224,189,0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="40%" cy="45%" rx="22%" ry="18%" fill="url(#maskGrad)" />
          <ellipse cx="40%" cy="45%" rx="22%" ry="18%" fill="none" stroke="rgba(22,224,189,0.6)" strokeWidth="2" strokeDasharray="4 4" />
          <ellipse cx="70%" cy="65%" rx="12%" ry="8%" fill="rgba(0,194,209,0.3)" />
          <ellipse cx="70%" cy="65%" rx="12%" ry="8%" fill="none" stroke="rgba(0,194,209,0.5)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div className="absolute bottom-3 right-3 rounded-lg bg-ocean-950/70 px-2 py-1 text-[10px] font-semibold text-aqua-glow backdrop-blur">After AI Segmentation</div>

        {/* Before (original with YOLO boxes) - clipped by slider */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-800/40 via-ocean-900/60 to-ocean-950" />
          <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
            {[20, 35, 50, 65, 80].map((y) => (
              <path key={y} d={`M 0 ${y}% Q 25% ${y - 3}% 50% ${y}% T 100% ${y}%`} fill="none" stroke="rgba(0,194,209,0.3)" strokeWidth="1" />
            ))}
          </svg>
          {/* YOLO box */}
          <div className="absolute border-2 border-risk-high rounded-lg" style={{ left: '18%', top: '28%', width: '38%', height: '30%' }}>
            <span className="absolute -top-5 left-0 rounded bg-risk-high px-1.5 py-0.5 text-[10px] font-bold text-white">GHOST NET 96%</span>
          </div>
          <div className="absolute border-2 border-risk-medium rounded-lg" style={{ left: '58%', top: '52%', width: '26%', height: '14%' }}>
            <span className="absolute -top-5 left-0 rounded bg-risk-medium px-1.5 py-0.5 text-[10px] font-bold text-white">PIPE 91%</span>
          </div>
          <div className="absolute bottom-3 left-3 rounded-lg bg-ocean-950/70 px-2 py-1 text-[10px] font-semibold text-cyan-glow backdrop-blur">Before AI · YOLO Bounding Boxes</div>
        </div>

        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-cyan-glow shadow-glow" style={{ left: `${slider}%` }}>
          <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan-glow bg-ocean-900 shadow-glow-lg">
            <span className="text-xs font-bold text-cyan-glow">⇔</span>
          </div>
        </div>
      </div>

      <input type="range" min={0} max={100} value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="mt-4 w-full accent-cyan-glow" />
      <div className="flex justify-between text-xs text-seafoam/40">
        <span>Before AI</span>
        <span className="text-cyan-glow">← Drag →</span>
        <span>After AI Segmentation</span>
      </div>
    </div>
  );
}

/* ── CONFIDENCE PANEL ────────────────────────────────────────────────── */

function ConfidencePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Confidence circular */}
      <div className="glass rounded-2xl p-6 text-center">
        <h4 className="mb-4 text-sm font-bold text-seafoam">Detection Confidence</h4>
        <CircularProgress value={96} label="96%" sublabel="Confidence" />
        <p className="mt-3 text-xs text-seafoam/50">YOLO + U-Net consensus</p>
      </div>

      {/* Noise reduction */}
      <div className="glass rounded-2xl p-6">
        <h4 className="mb-4 text-sm font-bold text-seafoam">Noise Reduction</h4>
        <div className="space-y-2.5">
          {noiseFilters.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-aqua-glow" />
              <span className="text-seafoam/70">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* False positive filtering */}
      <div className="glass rounded-2xl p-6">
        <h4 className="mb-4 text-sm font-bold text-seafoam">False Positive Filtering</h4>
        <div className="rounded-xl border border-risk-medium/30 bg-risk-medium/5 p-3">
          <div className="text-xs text-seafoam/50">Potential Detection:</div>
          <div className="text-sm font-semibold text-risk-medium">Rock Formation</div>
        </div>
        <div className="mt-3 rounded-xl border border-aqua-glow/30 bg-aqua-glow/5 p-3">
          <div className="text-xs text-seafoam/50">AI Decision:</div>
          <div className="flex items-center gap-2 text-sm font-semibold text-aqua-glow">
            <X className="h-4 w-4" /> Rejected
          </div>
        </div>
        <p className="mt-3 text-xs text-seafoam/50">
          <strong className="text-seafoam/70">Reason:</strong> Natural seabed pattern detected. Texture and shadow consistent with geological formation, not man-made debris.
        </p>
      </div>
    </div>
  );
}

/* ── DETAILS PANEL ───────────────────────────────────────────────────── */

function DetailsPanel({ det, onNavigate, onReset }: { det: DetectionBox; onNavigate: (id: PageId) => void; onReset: () => void }) {
  const icon = det.objectClass.includes('Net') ? Fish : det.objectClass.includes('Anomaly') ? AlertTriangle : Trash2;
  const Icon = icon;
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-seafoam">Detection Details</h3>
        <button onClick={onReset} className="text-xs text-seafoam/40 transition hover:text-cyan-glow">New Scan</button>
      </div>

      {/* Header */}
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-ocean-800/30 p-4">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', det.risk === 'High' ? 'bg-risk-high/15 text-risk-high' : det.risk === 'Medium' ? 'bg-risk-medium/15 text-risk-medium' : 'bg-cyan-glow/15 text-cyan-glow')}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-base font-bold text-seafoam">{det.objectClass}</div>
          <div className="text-xs text-seafoam/40">{det.id}</div>
        </div>
        <RiskBadge risk={det.risk} />
      </div>

      {/* Fields */}
      <div className="space-y-3">
        <Field icon={Gauge} label="AI Confidence" value={`${det.confidence}%`} highlight="text-cyan-glow" />
        <Field icon={AlertTriangle} label="Risk Level" value={det.risk} highlight={riskColor(det.risk)} />
        <Field icon={Layers} label="Estimated Width" value={det.estimatedWidth} />
        <Field icon={Layers} label="Estimated Length" value={det.estimatedLength} />
        <Field icon={MapPin} label="Latitude" value={det.lat} />
        <Field icon={MapPin} label="Longitude" value={det.lng} />
        <Field icon={ScanLine} label="Timestamp" value={det.timestamp} />
        <Field icon={ShieldCheck} label="AI Models Used" value={det.modelsUsed} />
      </div>

      {/* Environmental risk */}
      <div className="mt-4 rounded-xl border border-risk-high/20 bg-risk-high/5 p-3">
        <div className="text-xs font-semibold text-risk-high">Environmental Risk</div>
        <p className="mt-1 text-xs text-seafoam/60">{det.environmentalRisk}</p>
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-2">
        <button onClick={() => onNavigate('map')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-glow/10 py-2.5 text-sm font-semibold text-cyan-glow transition hover:bg-cyan-glow/20">
          <MapPin className="h-4 w-4" /> View on Map
        </button>
        <button onClick={() => onNavigate('reports')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-aqua-glow/10 py-2.5 text-sm font-semibold text-aqua-glow transition hover:bg-aqua-glow/20">
          <FileText className="h-4 w-4" /> Generate Report
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-glow/20 py-2.5 text-sm font-semibold text-seafoam transition hover:border-cyan-glow/40">
          <ShieldCheck className="h-4 w-4" /> Mark for Verification
        </button>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, highlight }: { icon: typeof MapPin; label: string; value: string; highlight?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-xs text-seafoam/50"><Icon className="h-3.5 w-3.5" /> {label}</span>
      <span className={cn('text-sm font-semibold', highlight ?? 'text-seafoam')}>{value}</span>
    </div>
  );
}

/* ── ALERT PANEL ─────────────────────────────────────────────────────── */

function AlertPanel({ det, onNavigate }: { det: DetectionBox; onNavigate: (id: PageId) => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-risk-high/30 bg-gradient-to-br from-risk-high/15 to-ocean-950/60 p-6 shadow-glow-red">
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-risk-high/20 blur-2xl" />
      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-risk-high/20 text-risk-high animate-glow-pulse">
            <AlertTriangle className="h-4.5 w-4.5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-risk-high">High Priority Detection</span>
        </div>
        <h4 className="font-display text-lg font-bold text-seafoam">{det.objectClass} Detected</h4>
        <div className="mt-2 text-sm text-cyan-glow">Confidence: {det.confidence}%</div>
        <div className="mt-3 space-y-1 text-xs text-seafoam/60">
          <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {det.lat} · {det.lng}</div>
          <div className="flex items-center gap-1.5"><AlertTriangle className="h-3 w-3" /> Risk: <span className="text-risk-high">HIGH</span></div>
        </div>
        <p className="mt-3 text-xs text-seafoam/50">
          <strong className="text-seafoam/70">Recommended:</strong> {det.recommendedAction}
        </p>
        <div className="mt-4 space-y-2">
          <button onClick={() => onNavigate('map')} className="w-full rounded-lg bg-risk-high/20 py-2 text-xs font-semibold text-risk-high transition hover:bg-risk-high/30">View Location</button>
          <button className="w-full rounded-lg border border-cyan-glow/20 py-2 text-xs font-semibold text-seafoam transition hover:border-cyan-glow/40">Assign Cleanup Team</button>
          <button className="w-full rounded-lg border border-aqua-glow/20 py-2 text-xs font-semibold text-aqua-glow transition hover:border-aqua-glow/40">Mark as Resolved</button>
        </div>
      </div>
    </div>
  );
}

/* ── IDLE / PROCESSING GUIDES ────────────────────────────────────────── */

function IdleGuide() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-3 font-display text-lg font-bold text-seafoam">How It Works</h3>
      <div className="space-y-3 text-sm text-seafoam/60">
        <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 text-xs font-bold text-cyan-glow">1</span>Upload a Side-Scan Sonar image or use the demo.</div>
        <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 text-xs font-bold text-cyan-glow">2</span>AI preprocesses — speckle noise reduction & enhancement.</div>
        <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 text-xs font-bold text-cyan-glow">3</span>YOLO detects debris with bounding boxes & confidence.</div>
        <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 text-xs font-bold text-cyan-glow">4</span>U-Net segments exact object boundaries.</div>
        <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-glow/15 text-xs font-bold text-cyan-glow">5</span>Get geotagged, risk-scored results & alerts.</div>
      </div>
      <div className="mt-5 rounded-xl border border-cyan-glow/15 bg-ocean-800/30 p-3 text-xs text-seafoam/50">
        <strong className="text-cyan-glow">Tip:</strong> Click "Use Demo Sonar Image" to see the full pipeline with realistic sample data.
      </div>
    </div>
  );
}

function ProcessingGuide({ currentStep }: { currentStep: number }) {
  const tips = [
    'Loading raw acoustic sonar data from the image file…',
    'Applying adaptive speckle noise filters to the sonar return…',
    'Enhancing contrast and normalizing resolution for AI input…',
    'Running YOLO neural network to detect man-made objects…',
    'Running U-Net to segment exact debris boundaries pixel-by-pixel…',
    'Calculating confidence scores and cross-referencing model agreement…',
    'Extracting GPS coordinates and timestamp metadata…',
  ];
  const tip = tips[Math.min(currentStep, tips.length - 1)];
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-3 font-display text-lg font-bold text-seafoam">Pipeline Status</h3>
      <div className="rounded-xl border border-cyan-glow/15 bg-ocean-800/30 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-glow">
          <Loader2 className="h-4 w-4 animate-spin" /> Step {currentStep + 1} of {processingSteps.length}
        </div>
        <p className="mt-2 text-xs text-seafoam/60">{tip}</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[{ l: 'YOLO', s: currentStep >= 4 }, { l: 'U-Net', s: currentStep >= 5 }, { l: 'Geo', s: currentStep >= 7 }].map((m) => (
          <div key={m.l} className={cn('rounded-lg p-2 text-center text-xs font-semibold', m.s ? 'bg-aqua-glow/15 text-aqua-glow' : 'bg-ocean-800/30 text-seafoam/30')}>
            {m.l}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Cpu, Radar, Layers, ShieldCheck, Bell, Globe, Database, Save, Volume2, Eye } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Settings() {
  const [confThreshold, setConfThreshold] = useState(75);
  const [autoAlert, setAutoAlert] = useState(true);
  const [soundAlert, setSoundAlert] = useState(false);
  const [heatmap, setHeatmap] = useState(true);
  const [satelliteDefault, setSatelliteDefault] = useState(false);
  const [fasterRcnn, setFasterRcnn] = useState(false);

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Settings</h2>
        <p className="mt-1 text-sm text-seafoam/60">Configure AI detection parameters and system preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Configuration */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-cyan-glow" />
            <h3 className="font-display text-lg font-bold text-seafoam">AI Configuration</h3>
          </div>

          {/* Confidence threshold */}
          <div className="mb-5">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-seafoam/70">Detection Confidence Threshold</span>
              <span className="font-bold text-cyan-glow">{confThreshold}%</span>
            </div>
            <input type="range" min={50} max={99} value={confThreshold} onChange={(e) => setConfThreshold(Number(e.target.value))} className="w-full accent-cyan-glow" />
            <div className="flex justify-between text-xs text-seafoam/30"><span>50%</span><span>99%</span></div>
            <p className="mt-1 text-xs text-seafoam/40">Detections below this confidence are filtered out.</p>
          </div>

          {/* Model toggles */}
          <div className="space-y-3">
            <Toggle icon={Radar} label="YOLO Detection" desc="Primary fast object detection" enabled={true} onChange={() => {}} locked />
            <Toggle icon={Layers} label="U-Net Segmentation" desc="Pixel-level boundary mapping" enabled={true} onChange={() => {}} locked />
            <Toggle icon={ShieldCheck} label="Faster R-CNN Verification" desc="Optional high-accuracy layer" enabled={fasterRcnn} onChange={setFasterRcnn} />
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-risk-medium" />
            <h3 className="font-display text-lg font-bold text-seafoam">Alerts & Notifications</h3>
          </div>
          <div className="space-y-3">
            <Toggle icon={Bell} label="Auto-Generate High Priority Alerts" desc="Notify on High risk detections" enabled={autoAlert} onChange={setAutoAlert} />
            <Toggle icon={Volume2} label="Sound Alerts" desc="Play audio on new high-risk detection" enabled={soundAlert} onChange={setSoundAlert} />
          </div>

          <div className="mt-5 rounded-xl border border-risk-high/20 bg-risk-high/5 p-4">
            <div className="text-sm font-semibold text-risk-high">Alert Channels</div>
            <div className="mt-2 space-y-2 text-xs text-seafoam/50">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-aqua-glow" /> In-app notifications — Active</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-seafoam/20" /> Email alerts — Not configured</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-seafoam/20" /> SMS / API webhook — Not configured</div>
            </div>
          </div>
        </div>

        {/* Map & Display */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-cyan-glow" />
            <h3 className="font-display text-lg font-bold text-seafoam">Map & Display</h3>
          </div>
          <div className="space-y-3">
            <Toggle icon={Eye} label="Heatmap Overlay" desc="Show debris density heatmap" enabled={heatmap} onChange={setHeatmap} />
            <Toggle icon={Globe} label="Satellite Mode (Default)" desc="Use satellite view on map load" enabled={satelliteDefault} onChange={setSatelliteDefault} />
          </div>
        </div>

        {/* Data & API */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-aqua-glow" />
            <h3 className="font-display text-lg font-bold text-seafoam">Data & API</h3>
          </div>
          <div className="space-y-3 text-sm">
            <ApiRow method="POST" endpoint="/upload-sonar" status="Simulated" />
            <ApiRow method="POST" endpoint="/detect-yolo" status="Simulated" />
            <ApiRow method="POST" endpoint="/segment-unet" status="Simulated" />
            <ApiRow method="POST" endpoint="/verify-detection" status="Simulated" />
            <ApiRow method="GET" endpoint="/detections" status="Simulated" />
            <ApiRow method="GET" endpoint="/reports" status="Simulated" />
          </div>
          <p className="mt-4 text-xs text-seafoam/40">API endpoints are simulated with realistic sample data. Ready for backend integration.</p>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-aqua-glow px-6 py-3 text-sm font-bold text-ocean-900 shadow-glow transition hover:shadow-glow-lg hover:brightness-110">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}

function Toggle({ icon: Icon, label, desc, enabled, onChange, locked }: {
  icon: typeof Bell; label: string; desc: string; enabled: boolean; onChange: (v: boolean) => void; locked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-ocean-800/30 p-3">
      <div className="flex items-center gap-3">
        <Icon className={cn('h-5 w-5', enabled ? 'text-cyan-glow' : 'text-seafoam/30')} />
        <div>
          <div className="text-sm font-medium text-seafoam">{label}</div>
          <div className="text-xs text-seafoam/40">{desc}</div>
        </div>
      </div>
      <button
        onClick={() => !locked && onChange(!enabled)}
        disabled={locked}
        className={cn('relative h-6 w-11 rounded-full transition', enabled ? 'bg-cyan-glow/40' : 'bg-ocean-700/50', locked && 'opacity-60')}
      >
        <span className={cn('absolute top-0.5 h-5 w-5 rounded-full transition-all', enabled ? 'left-[22px] bg-cyan-glow shadow-glow' : 'left-0.5 bg-seafoam/40')} />
      </button>
    </div>
  );
}

function ApiRow({ method, endpoint, status }: { method: string; endpoint: string; status: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-ocean-800/30 px-3 py-2">
      <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-bold',
        method === 'POST' ? 'bg-risk-medium/20 text-risk-medium' : 'bg-aqua-glow/20 text-aqua-glow')}>{method}</span>
      <code className="flex-1 text-xs text-cyan-glow">{endpoint}</code>
      <span className="text-[10px] font-semibold text-seafoam/40">{status}</span>
    </div>
  );
}

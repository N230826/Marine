import { FileText, Download, FileJson, FileSpreadsheet, FileBarChart, Fish, Trash2, AlertTriangle, MapPin } from 'lucide-react';
import { historyRecords } from '@/data/mockData';
import { RiskBadge, StatusBadge } from '@/components/Badges';
import { downloadCSV, downloadJSON, generatePDFReport } from '@/data/api';
import { cn } from '@/utils/cn';

export function Reports() {
  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-seafoam text-glow">Report Generation</h2>
        <p className="mt-1 text-sm text-seafoam/60">Generate and download structured anomaly reports from AI detection data.</p>
      </div>

      {/* Download buttons */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <DownloadCard
          icon={FileSpreadsheet}
          title="CSV Report"
          desc="Comma-separated values for spreadsheet import"
          color="text-aqua-glow"
          onClick={() => downloadCSV(historyRecords)}
        />
        <DownloadCard
          icon={FileJson}
          title="JSON Report"
          desc="Structured data for API integration"
          color="text-cyan-glow"
          onClick={() => downloadJSON(historyRecords)}
        />
        <DownloadCard
          icon={FileBarChart}
          title="PDF Summary"
          desc="Printable formatted report for presentations"
          color="text-risk-medium"
          onClick={() => generatePDFReport(historyRecords)}
        />
      </div>

      {/* Sample report preview */}
      <div className="glass rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-glow" />
            <h3 className="font-display text-lg font-bold text-seafoam">Anomaly Report Preview</h3>
          </div>
          <span className="text-xs text-seafoam/40">{historyRecords.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-cyan-glow/15 text-left text-cyan-glow">
                {['Detection ID', 'Object', 'Confidence', 'Risk', 'Coordinates', 'Size', 'Models', 'Environmental Impact', 'Recommended Action'].map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyRecords.slice(0, 6).map((r) => {
                const Icon = r.object.includes('Net') || r.object.includes('Gear') ? Fish : r.object.includes('Anomaly') ? AlertTriangle : Trash2;
                return (
                  <tr key={r.id} className="border-b border-cyan-glow/5 transition hover:bg-ocean-800/20">
                    <td className="px-3 py-2.5 font-mono text-cyan-glow">{r.id}</td>
                    <td className="px-3 py-2.5"><div className="flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-seafoam/40" /> <span className="text-seafoam">{r.object}</span></div></td>
                    <td className="px-3 py-2.5 font-semibold text-cyan-glow">{r.confidence}%</td>
                    <td className="px-3 py-2.5"><RiskBadge risk={r.risk} /></td>
                    <td className="px-3 py-2.5 text-seafoam/60">{r.lat}, {r.lng}</td>
                    <td className="px-3 py-2.5 text-seafoam/60">{r.width} × {r.length}</td>
                    <td className="px-3 py-2.5 text-seafoam/60">{r.models}</td>
                    <td className="px-3 py-2.5 text-seafoam/50 max-w-[180px] truncate">{r.environmentalImpact}</td>
                    <td className="px-3 py-2.5 text-seafoam/50 max-w-[160px] truncate">{r.recommendedAction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-seafoam/40">
          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Generated: {new Date().toLocaleString()}</span>
          <span className="flex items-center gap-2">
            <StatusBadge status="Active" /> {historyRecords.filter(r => r.status === 'Active').length} active
          </span>
        </div>
      </div>

      {/* Report fields reference */}
      <div className="mt-6 glass rounded-2xl p-6">
        <h3 className="mb-4 font-display text-lg font-bold text-seafoam">Report Fields Included</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Detection ID', 'Object Type', 'AI Confidence', 'Risk Level',
            'Bounding Box Dimensions', 'Estimated Physical Size',
            'Latitude', 'Longitude', 'Timestamp',
            'AI Models Used', 'Environmental Impact', 'Recommended Action',
          ].map((f) => (
            <div key={f} className={cn('flex items-center gap-2 rounded-lg bg-ocean-800/30 px-3 py-2 text-xs text-seafoam/70')}>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" /> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloadCard({ icon: Icon, title, desc, color, onClick }: {
  icon: typeof Download; title: string; desc: string; color: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="group glass rounded-2xl p-5 text-left transition hover:border-cyan-glow/40 hover:shadow-glow">
      <div className="mb-3 flex items-center justify-between">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-800/60', color)}>
          <Icon className="h-5 w-5" />
        </div>
        <Download className="h-5 w-5 text-seafoam/20 transition group-hover:text-cyan-glow group-hover:translate-y-0.5" />
      </div>
      <h4 className="font-display text-base font-bold text-seafoam">{title}</h4>
      <p className="mt-1 text-xs text-seafoam/50">{desc}</p>
    </button>
  );
}

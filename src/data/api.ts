import { detections, historyRecords, type DetectionBox, type DetectionRecord } from './mockData';

// Simulated API layer — ready for real backend integration.
// Replace the simulated returns with fetch() calls to the endpoints noted below.

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// POST /upload-sonar
export async function uploadSonar(file: File): Promise<{ imageId: string; filename: string }> {
  await delay(600);
  return { imageId: `IMG-${Date.now()}`, filename: file.name };
}

// POST /detect-yolo + /segment-unet + /verify-detection
export async function runDetectionPipeline(imageId: string): Promise<DetectionBox[]> {
  await delay(400);
  void imageId;
  return detections;
}

// GET /detections
export async function getDetections(): Promise<DetectionRecord[]> {
  await delay(200);
  return historyRecords;
}

// GET /reports — helpers for download generation
export function downloadCSV(records: DetectionRecord[]): void {
  const headers = ['Detection ID', 'Object Type', 'AI Confidence', 'Risk Level', 'Latitude', 'Longitude', 'Date', 'Status', 'Width', 'Length', 'Models', 'Environmental Impact', 'Recommended Action'];
  const rows = records.map((r) => [r.id, r.object, `${r.confidence}%`, r.risk, r.lat, r.lng, r.date, r.status, r.width, r.length, r.models, `"${r.environmentalImpact}"`, `"${r.recommendedAction}"`]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  triggerDownload(csv, 'aquanex-detection-report.csv', 'text/csv');
}

export function downloadJSON(records: DetectionRecord[]): void {
  const json = JSON.stringify({ generatedAt: new Date().toISOString(), totalRecords: records.length, detections: records }, null, 2);
  triggerDownload(json, 'aquanex-detection-report.json', 'application/json');
}

export function generatePDFReport(records: DetectionRecord[]): void {
  // PDF simulation — opens a printable HTML window the browser can save as PDF.
  const html = buildReportHTML(records);
  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 400);
  }
}

function buildReportHTML(records: DetectionRecord[]): string {
  const rows = records.map((r) => `
    <tr>
      <td>${r.id}</td><td>${r.object}</td><td>${r.confidence}%</td><td>${r.risk}</td>
      <td>${r.lat}</td><td>${r.lng}</td><td>${r.date}</td><td>${r.status}</td>
      <td>${r.width} × ${r.length}</td><td>${r.models}</td>
    </tr>`).join('');
  return `<!doctype html><html><head><title>AquaNex AI — Detection Report</title>
  <style>
    body{font-family:Inter,Arial,sans-serif;background:#061A2D;color:#F5FAFF;padding:40px;margin:0}
    h1{color:#00C2D1;font-family:Arial,sans-serif}
    .sub{color:#16E0BD;margin-bottom:24px}
    table{width:100%;border-collapse:collapse;font-size:13px}
    th{background:#0B3D5C;color:#00C2D1;padding:10px;text-align:left}
    td{padding:8px 10px;border-bottom:1px solid rgba(0,194,209,0.2)}
    .meta{color:#88a;font-size:12px;margin-top:30px}
  </style></head><body>
    <h1>AquaNex AI — Marine Debris Detection Report</h1>
    <div class="sub">AI-Powered Marine Debris & Ghost Net Detection • Side-Scan Sonar</div>
    <p>Generated: ${new Date().toLocaleString()} | Total Detections: ${records.length}</p>
    <table><thead><tr>
      <th>ID</th><th>Object</th><th>Confidence</th><th>Risk</th><th>Lat</th><th>Lng</th><th>Date</th><th>Status</th><th>Size</th><th>Models</th>
    </tr></thead><tbody>${rows}</tbody></table>
    <p class="meta">AquaNex AI — Smart India Hackathon Prototype. Report generated from simulated detection data.</p>
  </body></html>`;
}

function triggerDownload(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type RiskLevel = 'High' | 'Medium' | 'Low' | 'Under Review';
export type DetectionStatus = 'Active' | 'Verified' | 'Under Review' | 'Resolved';

export interface DetectionBox {
  id: string;
  label: string;
  // percentage-based position within the sonar viewer
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  risk: RiskLevel;
  objectClass: string;
  estimatedWidth: string;
  estimatedLength: string;
  lat: string;
  lng: string;
  timestamp: string;
  modelsUsed: string;
  environmentalRisk: string;
  recommendedAction: string;
  description: string;
}

export interface DetectionRecord {
  id: string;
  object: string;
  confidence: number;
  risk: RiskLevel;
  lat: number;
  lng: number;
  date: string;
  status: DetectionStatus;
  width: string;
  length: string;
  models: string;
  environmentalImpact: string;
  recommendedAction: string;
}

export const stats = {
  sonarImagesAnalyzed: 1248,
  totalDebrisDetected: 37,
  ghostNetsDetected: 12,
  highPriorityAlerts: 8,
  averageConfidence: 94.6,
  areaSurveyed: 128,
};

export const detections: DetectionBox[] = [
  {
    id: 'DET-2026-001',
    label: 'GHOST NET',
    objectClass: 'Ghost Net',
    x: 18, y: 28, width: 38, height: 30,
    confidence: 96,
    risk: 'High',
    estimatedWidth: '8.4 meters',
    estimatedLength: '15.2 meters',
    lat: '15.6234° N',
    lng: '80.2312° E',
    timestamp: 'September 2026',
    modelsUsed: 'YOLO + U-Net',
    environmentalRisk: 'High — Possible threat to marine wildlife.',
    recommendedAction: 'Deploy an inspection AUV or marine cleanup team.',
    description: 'Entangled fishing net spanning a large seabed area. Mesh structure consistent with abandoned gillnet. High entanglement risk for marine fauna.',
  },
  {
    id: 'DET-2026-002',
    label: 'UNDERWATER PIPE',
    objectClass: 'Underwater Pipe',
    x: 58, y: 52, width: 26, height: 14,
    confidence: 91,
    risk: 'Medium',
    estimatedWidth: '1.2 meters',
    estimatedLength: '22.0 meters',
    lat: '15.6251° N',
    lng: '80.2298° E',
    timestamp: 'September 2026',
    modelsUsed: 'YOLO + U-Net',
    environmentalRisk: 'Medium — Possible pollutant leakage source.',
    recommendedAction: 'Inspect for structural integrity and corrosion.',
    description: 'Cylindrical metallic object with strong acoustic shadow. Consistent with disused drainage or industrial pipe. Moderate contamination risk.',
  },
  {
    id: 'DET-2026-003',
    label: 'UNKNOWN ANOMALY',
    objectClass: 'Unknown Anomaly',
    x: 42, y: 72, width: 18, height: 16,
    confidence: 84,
    risk: 'Under Review',
    estimatedWidth: '3.1 meters',
    estimatedLength: '4.7 meters',
    lat: '15.6212° N',
    lng: '80.2341° E',
    timestamp: 'September 2026',
    modelsUsed: 'YOLO + U-Net + Faster R-CNN',
    environmentalRisk: 'Under Review — Pending verification.',
    recommendedAction: 'Run Faster R-CNN verification pass and field survey.',
    description: 'Irregular man-made structure with high acoustic reflectivity. Pattern does not match known debris classes. Requires high-accuracy verification.',
  },
];

export const historyRecords: DetectionRecord[] = [
  { id: 'DET-001', object: 'Ghost Net', confidence: 96, risk: 'High', lat: 15.6234, lng: 80.2312, date: 'Today', status: 'Active', width: '8.4m', length: '15.2m', models: 'YOLO + U-Net', environmentalImpact: 'High risk of marine life entanglement.', recommendedAction: 'Deploy inspection AUV or cleanup team.' },
  { id: 'DET-002', object: 'Underwater Pipe', confidence: 91, risk: 'Medium', lat: 15.6251, lng: 80.2298, date: 'Yesterday', status: 'Verified', width: '1.2m', length: '22.0m', models: 'YOLO + U-Net', environmentalImpact: 'Possible pollutant leakage source.', recommendedAction: 'Inspect structural integrity.' },
  { id: 'DET-003', object: 'Unknown Anomaly', confidence: 84, risk: 'Medium', lat: 15.6212, lng: 80.2341, date: 'Yesterday', status: 'Under Review', width: '3.1m', length: '4.7m', models: 'YOLO + U-Net + Faster R-CNN', environmentalImpact: 'Pending verification.', recommendedAction: 'Run Faster R-CNN verification.' },
  { id: 'DET-004', object: 'Tire', confidence: 93, risk: 'High', lat: 15.6248, lng: 80.2320, date: '2 Days Ago', status: 'Active', width: '0.8m', length: '0.8m', models: 'YOLO + U-Net', environmentalImpact: 'Slow-release microplastic source.', recommendedAction: 'Recover and dispose safely.' },
  { id: 'DET-005', object: 'Barrel', confidence: 88, risk: 'Medium', lat: 15.6302, lng: 80.2288, date: '2 Days Ago', status: 'Verified', width: '0.6m', length: '1.1m', models: 'YOLO + U-Net', environmentalImpact: 'Possible chemical container.', recommendedAction: 'Hazardous material inspection.' },
  { id: 'DET-006', object: 'Plastic Waste', confidence: 79, risk: 'Low', lat: 15.6175, lng: 80.2399, date: '3 Days Ago', status: 'Resolved', width: '0.4m', length: '0.9m', models: 'YOLO', environmentalImpact: 'Low-level pollution source.', recommendedAction: 'Routine cleanup sweep.' },
  { id: 'DET-007', object: 'Shipwreck Fragment', confidence: 86, risk: 'Medium', lat: 15.6410, lng: 80.2155, date: '4 Days Ago', status: 'Verified', width: '4.2m', length: '6.8m', models: 'YOLO + U-Net + Faster R-CNN', environmentalImpact: 'Navigation hazard.', recommendedAction: 'Chart and report to maritime authority.' },
  { id: 'DET-008', object: 'Ghost Net', confidence: 94, risk: 'High', lat: 15.6158, lng: 80.2417, date: '5 Days Ago', status: 'Active', width: '6.1m', length: '11.3m', models: 'YOLO + U-Net', environmentalImpact: 'High risk of marine life entanglement.', recommendedAction: 'Deploy cleanup team.' },
  { id: 'DET-009', object: 'Metal Debris', confidence: 81, risk: 'Low', lat: 15.6089, lng: 80.2450, date: '6 Days Ago', status: 'Resolved', width: '0.5m', length: '0.7m', models: 'YOLO', environmentalImpact: 'Minor pollution source.', recommendedAction: 'Recovered.' },
  { id: 'DET-010', object: 'Abandoned Gear', confidence: 89, risk: 'Medium', lat: 15.6333, lng: 80.2221, date: '1 Week Ago', status: 'Under Review', width: '2.3m', length: '5.4m', models: 'YOLO + U-Net', environmentalImpact: 'Entanglement risk for benthic species.', recommendedAction: 'Schedule recovery dive.' },
];

export interface MapMarker {
  id: string;
  type: string;
  confidence: number;
  risk: RiskLevel;
  lat: number;
  lng: number;
  time: string;
  x: number;
  y: number;
}

export const mapMarkers: MapMarker[] = [
  { id: 'DET-001', type: 'Ghost Net', confidence: 96, risk: 'High', lat: 15.6234, lng: 80.2312, time: 'Sep 3, 2026 14:22', x: 45, y: 38 },
  { id: 'DET-002', type: 'Underwater Pipe', confidence: 91, risk: 'Medium', lat: 15.6251, lng: 80.2298, time: 'Sep 3, 2026 14:18', x: 62, y: 52 },
  { id: 'DET-003', type: 'Unknown Anomaly', confidence: 84, risk: 'Medium', lat: 15.6212, lng: 80.2341, time: 'Sep 2, 2026 11:05', x: 30, y: 70 },
  { id: 'DET-004', type: 'Tire', confidence: 93, risk: 'High', lat: 15.6248, lng: 80.2320, time: 'Sep 2, 2026 09:41', x: 52, y: 44 },
  { id: 'DET-005', type: 'Barrel', confidence: 88, risk: 'Medium', lat: 15.6302, lng: 80.2288, time: 'Sep 1, 2026 16:30', x: 75, y: 30 },
  { id: 'DET-006', type: 'Plastic Waste', confidence: 79, risk: 'Low', lat: 15.6175, lng: 80.2399, time: 'Aug 31, 2026 10:12', x: 20, y: 60 },
  { id: 'DET-007', type: 'Shipwreck Fragment', confidence: 86, risk: 'Medium', lat: 15.6410, lng: 80.2155, time: 'Aug 30, 2026 13:55', x: 85, y: 75 },
  { id: 'DET-008', type: 'Ghost Net', confidence: 94, risk: 'High', lat: 15.6158, lng: 80.2417, time: 'Aug 29, 2026 08:20', x: 15, y: 25 },
];

export const aiModels = [
  {
    name: 'YOLO',
    purpose: 'Fast object detection',
    strength: 'Real-time detection',
    output: 'Bounding Box + Class + Confidence',
    description: 'You Only Look Once — single-pass neural network that detects objects and draws bounding boxes in real time across large sonar swaths.',
    color: 'cyan',
    icon: 'ScanLine',
  },
  {
    name: 'U-Net',
    purpose: 'Pixel-level segmentation',
    strength: 'Precise object boundaries',
    output: 'Segmentation Mask',
    description: 'Encoder-decoder architecture that segments exact object boundaries pixel-by-pixel, separating debris from natural seabed features.',
    color: 'aqua',
    icon: 'Layers',
  },
  {
    name: 'Faster R-CNN',
    purpose: 'High-accuracy verification',
    strength: 'Detailed object detection',
    output: 'Verified Detection',
    description: 'Region-based CNN with a proposal network for high-accuracy verification of ambiguous detections and low-confidence anomalies.',
    color: 'blue',
    icon: 'ShieldCheck',
  },
];

export const processingSteps = [
  'Loading Sonar Data',
  'Reducing Speckle Noise',
  'Enhancing Acoustic Image',
  'YOLO Object Detection',
  'U-Net Segmentation',
  'Confidence Analysis',
  'Geolocation Processing',
];

export const noiseFilters = [
  'Speckle Noise Filtered',
  'Acoustic Shadows Analyzed',
  'Natural Rock Formation Rejected',
  'Sand Ripples Ignored',
  'Image Resolution Normalized',
];

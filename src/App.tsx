import { useState } from 'react';
import { Sidebar, type PageId } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Landing } from '@/pages/Landing';
import { Dashboard } from '@/pages/Dashboard';
import { SonarAnalysis } from '@/pages/SonarAnalysis';
import { MapPage } from '@/pages/MapPage';
import { DetectionHistory } from '@/pages/DetectionHistory';
import { Reports } from '@/pages/Reports';
import { AIModels } from '@/pages/AIModels';
import { EnvironmentalImpact } from '@/pages/EnvironmentalImpact';
import { Settings } from '@/pages/Settings';

function App() {
  const [page, setPage] = useState<PageId>('landing');

  function navigate(id: PageId) { setPage(id); window.scrollTo(0, 0); }
  function goHome() { setPage('landing'); window.scrollTo(0, 0); }

  if (page === 'landing') {
    return <Landing onLaunch={() => navigate('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-ocean-radial">
      <div className="pointer-events-none fixed inset-0 scan-grid grid-fade opacity-20" />
      <Sidebar current={page} onNavigate={navigate} onHome={goHome} />
      <div className="lg:pl-64">
        <Topbar current={page} onNavigate={navigate} onHome={goHome} />
        <main className="relative z-10">
          {page === 'dashboard' && <Dashboard onNavigate={navigate} />}
          {page === 'sonar' && <SonarAnalysis onNavigate={navigate} />}
          {page === 'live' && <SonarAnalysis onNavigate={navigate} />}
          {page === 'map' && <MapPage />}
          {page === 'history' && <DetectionHistory />}
          {page === 'reports' && <Reports />}
          {page === 'models' && <AIModels />}
          {page === 'impact' && <EnvironmentalImpact />}
          {page === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;

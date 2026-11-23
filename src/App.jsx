import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import PracticeHub from './pages/PracticeHub';
import PracticeArena from './pages/PracticeArena';
import MockTestsHub from './pages/MockTestsHub';
import DatabaseShardsOverview from './pages/DatabaseShardsOverview';
import ToolsPage from './pages/ToolsPage';
import PricingPage from './pages/PricingPage';
import PredictionsPage from './pages/PredictionsPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Main Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Practice Hub & Dynamic Practice Arena for All 20+ Task Types */}
          <Route path="practice" element={<PracticeHub />} />
          <Route path="practice/:taskId" element={<PracticeArena />} />

          {/* Mock Tests Hub */}
          <Route path="mock-tests" element={<MockTestsHub />} />

          {/* Predictions High Frequency Bank */}
          <Route path="predictions" element={<PredictionsPage />} />

          {/* Study Tools (Templates, Vocab, Continuous MP3) */}
          <Route path="tools" element={<ToolsPage />} />
          <Route path="tools/:tab" element={<ToolsPage />} />

          {/* Hostinger 10x Sharded Database Architecture Overview */}
          <Route path="db-shards" element={<DatabaseShardsOverview />} />

          {/* VIP Pricing */}
          <Route path="pricing" element={<PricingPage />} />

          {/* Profile & Target Score Settings */}
          <Route path="profile" element={<ProfilePage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

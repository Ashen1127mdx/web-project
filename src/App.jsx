import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import GravityAnalysis from './pages/GravityAnalysis';
import Landing from './pages/Landing';
import './index.css';

function DashboardLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/gravity-analysis" element={<GravityAnalysis />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

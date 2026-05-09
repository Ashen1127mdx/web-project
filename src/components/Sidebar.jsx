import { NavLink } from 'react-router-dom';
import KnightLogo from './KnightLogo';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const TxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const GravityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="sidebar-logo" style={{ textDecoration: 'none' }}>
        <KnightLogo />
        <div className="logo-text">
          <span className="logo-name">KNIGHTVISION</span>
          <span className="logo-tagline">Analyze Spending. Predict Smarter.</span>
        </div>
      </NavLink>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HomeIcon /> Overview
        </NavLink>
        <NavLink to="/dashboard/transactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <TxIcon /> Transactions
        </NavLink>
        <NavLink to="/dashboard/gravity-analysis" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <GravityIcon /> Gravity Analysis
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">🛡️</div>
        <h4>Smarter Today,<br/>Stronger Tomorrow.</h4>
        <p>Our algorithms analyze your financial gravity so you can make better decisions.</p>
      </div>
    </aside>
  );
}

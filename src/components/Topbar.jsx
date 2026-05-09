import { useState } from 'react';

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}>
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);

export default function Topbar({ title, subtitle }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1>✦ {title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-right">
        <button className="date-btn">Custom Range <CalIcon/></button>
        <button className="date-btn"><CalIcon/> Apr 1, 2025</button>
        <span style={{color:'var(--text-muted)', fontSize:13}}>→</span>
        <button className="date-btn">Apr 30, 2025 <CalIcon/></button>
        <button className="icon-btn"><FilterIcon /></button>
      </div>
    </div>
  );
}

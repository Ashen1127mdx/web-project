import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Topbar from '../components/Topbar';

// ── Sample data ──────────────────────────────────────────────────────────────
const cashFlowData = [
  { date: 'Apr 1', income: 28000, expenses: 8000 },
  { date: 'Apr 4', income: 35000, expenses: 12000 },
  { date: 'Apr 7', income: 42000, expenses: 15000 },
  { date: 'Apr 10', income: 60000, expenses: 20000 },
  { date: 'Apr 13', income: 85420, expenses: 32645 },
  { date: 'Apr 16', income: 88000, expenses: 35000 },
  { date: 'Apr 19', income: 95000, expenses: 40000 },
  { date: 'Apr 22', income: 100000, expenses: 44000 },
  { date: 'Apr 25', income: 110000, expenses: 50000 },
  { date: 'Apr 28', income: 118000, expenses: 55000 },
  { date: 'Apr 30', income: 124850, expenses: 45860 },
];

const monthlyData = [
  { month: 'Nov', income: 62000, expenses: 28000, savings: 34000 },
  { month: 'Dec', income: 70000, expenses: 35000, savings: 35000 },
  { month: 'Jan', income: 78000, expenses: 32000, savings: 46000 },
  { month: 'Feb', income: 95000, expenses: 38000, savings: 57000 },
  { month: 'Mar', income: 108000, expenses: 42000, savings: 66000 },
  { month: 'Apr', income: 124850, expenses: 45860, savings: 78989 },
];

const fmt = (v) => `₹${(v / 1000).toFixed(0)}K`;
const fmtFull = (v) => `₹ ${v.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CashTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const income = payload.find(p => p.dataKey === 'income')?.value || 0;
  const expenses = payload.find(p => p.dataKey === 'expenses')?.value || 0;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-date">{label}</div>
      <div className="tooltip-row"><span className="tooltip-dot" style={{ background: '#10b981' }} />Income &nbsp; ₹{income.toLocaleString('en-IN')}</div>
      <div className="tooltip-row"><span className="tooltip-dot" style={{ background: '#ef4444' }} />Expenses &nbsp; ₹{expenses.toLocaleString('en-IN')}</div>
      <div className="tooltip-row" style={{ color: '#a78bfa', marginTop: 4 }}>Net Cash Flow &nbsp; ₹{(income - expenses).toLocaleString('en-IN')}</div>
    </div>
  );
};

const BarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-date">{label} 2025</div>
      {payload.map(p => (
        <div className="tooltip-row" key={p.dataKey}>
          <span className="tooltip-dot" style={{ background: p.color }} />
          ₹{p.value.toLocaleString('en-IN')}
        </div>
      ))}
    </div>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color, bg }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value" style={{ color }}>{fmtFull(value)}</div>
          <div className="stat-period">This Period</div>
        </div>
        <div className="stat-icon" style={{ background: bg }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

// ── Overview Page ─────────────────────────────────────────────────────────────
export default function Overview() {
  const [cashPeriod, setCashPeriod] = useState('Monthly');

  return (
    <>
      <Topbar title="Overview" subtitle="Understand your cash flow and spending behavior like never before." />
      <div className="page-content">

        {/* Stats */}
        <div className="stats-grid">
          <StatCard icon="📈" label="Total Income" value={124850.50} color="#10b981" bg="rgba(16,185,129,0.15)" />
          <StatCard icon="💸" label="Total Spend" value={45860.75} color="#ef4444" bg="rgba(239,68,68,0.15)" />
          <StatCard icon="🏦" label="Total Balance" value={78989.75} color="#3b82f6" bg="rgba(59,130,246,0.15)" />
          <StatCard icon="🔮" label="Net Cash Flow" value={78989.75} color="#8b5cf6" bg="rgba(139,92,246,0.15)" />
        </div>

        {/* Cash Flow Chart */}
        <div className="charts-row">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Cash Flow Overview</div>
                <div className="chart-subtitle">Income vs Expenses</div>
                <div className="chart-legend" style={{ marginTop: 6 }}>
                  <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} />Income</div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} />Expenses</div>
                </div>
              </div>
              <div className="chart-controls">
                <select className="select-btn" value={cashPeriod} onChange={e => setCashPeriod(e.target.value)}>
                  <option>Monthly</option><option>Weekly</option><option>Daily</option>
                </select>
                <button className="icon-btn">📊</button>
                <button className="icon-btn">⋯</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={cashFlowData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CashTooltip />} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fill="url(#gIncome)" dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#gExpenses)" dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div className="about-card-header" style={{ marginBottom: 10 }}>
              <span>🛡️</span> <span style={{ fontSize: 13, fontWeight: 700 }}>About This Chart</span>
            </div>
            <div className="about-card" style={{ flex: 1 }}>
              <p>
                This graph shows your money movement over time.<br /><br />
                The <span style={{ color: '#10b981' }}>green line</span> represents your income and the <span style={{ color: '#ef4444' }}>red line</span> represents your expenses.<br /><br />
                The gap between them is your net cash flow.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar charts */}
        <div className="bottom-charts">
          {/* Income */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title"><span style={{ color: '#10b981' }}>Income</span> <span style={{ color: '#10b981', fontWeight: 400, fontSize: 13 }}>(Monthly)</span></div>
                <div className="chart-subtitle">Track your monthly earnings</div>
              </div>
              <select className="select-btn"><option>Monthly</option></select>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTip />} />
                <Bar dataKey="income" fill="url(#gIncomeBar)" radius={[4,4,0,0]}>
                  <defs>
                    <linearGradient id="gIncomeBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#064e3b"/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expenses */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title"><span style={{ color: '#ef4444' }}>Expenses</span> <span style={{ color: '#ef4444', fontWeight: 400, fontSize: 13 }}>(Monthly)</span></div>
                <div className="chart-subtitle">Track your monthly spending</div>
              </div>
              <select className="select-btn"><option>Monthly</option></select>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTip />} />
                <Bar dataKey="expenses" fill="url(#gExpBar)" radius={[4,4,0,0]}>
                  <defs>
                    <linearGradient id="gExpBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#7f1d1d"/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title"><span style={{ color: '#3b82f6' }}>Savings</span> <span style={{ color: '#3b82f6', fontWeight: 400, fontSize: 13 }}>(Monthly)</span></div>
                <div className="chart-subtitle">Track your monthly savings</div>
              </div>
              <select className="select-btn"><option>Monthly</option></select>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<BarTip />} />
                <Bar dataKey="savings" fill="url(#gSavBar)" radius={[4,4,0,0]}>
                  <defs>
                    <linearGradient id="gSavBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#1e3a8a"/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

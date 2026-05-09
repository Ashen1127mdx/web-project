import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ label, color }) {
  const colors = {
    Attention: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444' },
    Good:      { bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
    Warning:   { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
  };
  const c = colors[label] || colors.Attention;
  return (
    <span style={{
      padding: '2px 10px',
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 700,
      background: c.bg,
      color: c.text,
      letterSpacing: 0.3,
    }}>{label}</span>
  );
}

// ── Shimmer loading lines ─────────────────────────────────────────────────────
function Shimmer() {
  return (
    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[80, 100, 60].map((w, i) => (
        <div key={i} style={{
          height: 8,
          width: `${w}%`,
          borderRadius: 4,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)',
          backgroundSize: '200% 100%',
          animation: `shimmer 1.6s infinite ${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

// ── Analysis Card ─────────────────────────────────────────────────────────────
function AnalysisCard({ icon, iconBg, title, badge, subtitle, analysis, metricIcon, metricLabel, metricValue, metricColor, loaded }) {
  return (
    <div className="gravity-card">
      <div className="gravity-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
              <Badge label={badge} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</div>
          </div>
        </div>
      </div>

      <div style={{ margin: '12px 0 4px', fontSize: 11, fontWeight: 700, color: '#a78bfa', letterSpacing: 0.5 }}>
        AI Analysis
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{analysis}</p>

      {!loaded ? <Shimmer /> : (
        <div style={{ height: 34 }} />
      )}

      <div className="gravity-card-footer">
        <span style={{ fontSize: 18 }}>{metricIcon}</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{metricLabel}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: metricColor }}>{metricValue}</span>
      </div>
    </div>
  );
}

// ── Analyze Item ──────────────────────────────────────────────────────────────
function AnalyzeItem({ icon, title, desc, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Brain SVG animation ───────────────────────────────────────────────────────
function BrainAnimation() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: 16 }}>
        {/* Brain outline */}
        <ellipse cx="60" cy="50" rx="38" ry="32" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="0 60 50" to="360 60 50" dur="20s" repeatCount="indefinite"/>
        </ellipse>
        <path d="M35 50 Q38 38 50 36 Q52 28 60 28 Q68 28 70 36 Q82 38 85 50 Q82 62 70 64 Q68 72 60 72 Q52 72 50 64 Q38 62 35 50Z"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M60 28 L60 72M35 50 L85 50M42 36 L78 64M42 64 L78 36"
          stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.4"/>
        {/* Nodes */}
        {[
          [60, 28], [85, 50], [60, 72], [35, 50],
          [76, 36], [76, 64], [44, 64], [44, 36],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#8b5cf6" opacity="0.9">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values="3;4.5;3" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite"/>
          </circle>
        ))}
        {/* Center glow */}
        <circle cx="60" cy="50" r="8" fill="url(#brainGrad)" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        {/* Connection lines animated */}
        <line x1="60" y1="28" x2="85" y2="50" stroke="#a78bfa" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" repeatCount="indefinite"/>
        </line>
        <line x1="85" y1="50" x2="60" y2="72" stroke="#a78bfa" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        </line>
        <line x1="60" y1="72" x2="35" y2="50" stroke="#a78bfa" strokeWidth="1" opacity="0.5">
          <animate attributeName="opacity" values="0;0.7;0" dur="3s" repeatCount="indefinite" begin="1s"/>
        </line>
        {/* Floating dots */}
        {[[20, 20], [100, 15], [15, 80], [105, 85], [110, 40]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill="#7c3aed" opacity="0.5">
            <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}/>
          </circle>
        ))}
        <defs>
          <radialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd"/><stop offset="100%" stopColor="#7c3aed"/>
          </radialGradient>
        </defs>
      </svg>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
        AI is analyzing your financial behavior...
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        You'll get personalized insights and recommendations here based on your data.
      </div>
    </div>
  );
}

// ── CARDS DATA ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    icon: '⚠️',
    iconBg: 'rgba(239,68,68,0.15)',
    title: 'Frictionless Warning',
    badge: 'Attention',
    subtitle: 'Spending that feels easy but hurts long-term.',
    analysis: 'Our algorithm has detected multiple low-friction spending patterns that may be impacting your finances without you realizing.',
    metricIcon: '📈',
    metricLabel: 'Risk Score',
    metricValue: 'High',
    metricColor: '#ef4444',
  },
  {
    icon: '🛒',
    iconBg: 'rgba(16,185,129,0.15)',
    title: 'Cashback Illusion Check',
    badge: 'Good',
    subtitle: 'Are rewards really rewarding you?',
    analysis: 'While cashback and rewards look great, our analysis shows the hidden costs behind your reward chasing behavior.',
    metricIcon: '✅',
    metricLabel: 'Net Benefit',
    metricValue: '+₹2,340.50',
    metricColor: '#10b981',
  },
  {
    icon: '💳',
    iconBg: 'rgba(245,158,11,0.15)',
    title: 'The Minimum Payment Trap',
    badge: 'Warning',
    subtitle: 'Small payments today, big debt tomorrow.',
    analysis: 'Paying only the minimum can keep you in debt for years. Here\'s how much it\'s actually costing you.',
    metricIcon: '⏱️',
    metricLabel: 'Debt Drag',
    metricValue: '₹18,540.75',
    metricColor: '#f59e0b',
  },
  {
    icon: '🚀',
    iconBg: 'rgba(59,130,246,0.15)',
    title: 'Runway Forecast',
    badge: 'Good',
    subtitle: 'How long can your money run with your habits?',
    analysis: 'Based on your income and spending patterns, here\'s your financial runway and future outlook.',
    metricIcon: '📅',
    metricLabel: 'Financial Runway',
    metricValue: '5.7 Months',
    metricColor: '#3b82f6',
  },
];

const ANALYZE_ITEMS = [
  { icon: '📊', title: 'Spending Patterns', desc: 'Identify unnecessary and impulsive spending.', color: 'rgba(139,92,246,0.2)' },
  { icon: '💰', title: 'Saving Behavior', desc: 'Evaluate your saving consistency and growth.', color: 'rgba(16,185,129,0.2)' },
  { icon: '⚡', title: 'Debt Impact', desc: 'Analyze how debt affects your future.', color: 'rgba(245,158,11,0.2)' },
  { icon: '📅', title: 'Cash Flow Efficiency', desc: 'Measure how well you manage your cash flow.', color: 'rgba(59,130,246,0.2)' },
  { icon: '🌱', title: 'Financial Sustainability', desc: 'Forecast your long-term financial health.', color: 'rgba(239,68,68,0.2)' },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function GravityAnalysis() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .gravity-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .gravity-card:hover {
          border-color: var(--border-active);
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.35);
        }
        .gravity-card-header { margin-bottom: 4px; }
        .gravity-card-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .gravity-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }
        .gravity-insights {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 22px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 28px;
        }
        .gravity-insights-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
        }
        .gravity-insights-header h3 { font-size: 16px; font-weight: 700; }
        .gravity-insights-header p { font-size: 11px; color: var(--text-muted); }
        .gravity-insights-body {
          border: 1px dashed rgba(139,92,246,0.25);
          border-radius: 10px;
          background: rgba(124,58,237,0.04);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gravity-what-title {
          font-size: 14px;
          font-weight: 700;
          color: #a78bfa;
          margin-bottom: 16px;
        }
        .gravity-what-list { display: flex; flex-direction: column; gap: 14px; }
      `}</style>

      <Topbar
        title="Gravity Analysis"
        subtitle="AI-powered analysis of your financial behavior and hidden leaks."
      />

      <div className="page-content">
        {/* 4 Analysis Cards */}
        <div className="gravity-grid">
          {CARDS.map((card, i) => (
            <AnalysisCard key={i} {...card} loaded={loaded} />
          ))}
        </div>

        {/* Overall Insights */}
        <div className="gravity-insights">
          <div>
            <div className="gravity-insights-header">
              <span style={{ fontSize: 20 }}>💡</span>
              <div>
                <h3>Overall Insights &amp; Recommendations</h3>
                <p>Personalized insights generated by our advanced algorithms.</p>
              </div>
            </div>
            <div className="gravity-insights-body">
              <BrainAnimation />
            </div>
          </div>

          <div>
            <div className="gravity-what-title">What We Analyze</div>
            <div className="gravity-what-list">
              {ANALYZE_ITEMS.map((item, i) => (
                <AnalyzeItem key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

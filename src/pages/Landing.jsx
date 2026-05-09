import { useState, useEffect, useRef } from 'react';
import '../landing.css';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import KnightLogo from '../components/KnightLogo';

/* ── animated counter hook ───────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

/* ── intersection observer hook ─────────────────────── */
function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

/* ── Floating particle ───────────────────────────────── */
function Particle({ style }) {
  return <div className="lp-particle" style={style} />;
}

/* ── Navbar ──────────────────────────────────────────── */
function Navbar({ onLogin, onRegister }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
      <div className="lp-nav-inner">
        <div className="lp-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <KnightLogo />
          <div className="logo-text">
            <span className="logo-name">KNIGHTVISION</span>
            <span className="logo-tagline">Analyze Spending. Predict Smarter.</span>
          </div>
        </div>
        <div className="lp-nav-links">
          <button onClick={() => scroll('features')}>Features</button>
          <button onClick={() => scroll('how')}>How It Works</button>
          <button onClick={() => scroll('stats')}>Insights</button>
          <button onClick={() => scroll('trust')}>Why Us</button>
        </div>
        <div className="lp-nav-actions">
          <button className="lp-btn-ghost" onClick={onLogin} id="nav-login-btn">Log In</button>
          <button className="lp-btn-primary" onClick={onRegister} id="nav-register-btn">Get Started Free</button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────── */
function Hero({ onRegister }) {
  const navigate = useNavigate();
  return (
    <section className="lp-hero">
      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          opacity: 0.15 + Math.random() * 0.25,
          animationDuration: `${6 + Math.random() * 10}s`,
          animationDelay: `${Math.random() * 5}s`,
        }} />
      ))}

      {/* Orbs */}
      <div className="lp-orb lp-orb-1" />
      <div className="lp-orb lp-orb-2" />
      <div className="lp-orb lp-orb-3" />

      <div className="lp-hero-content">
        <div className="lp-hero-badge">
          <span className="lp-pulse-dot" /> AI-Powered Financial Intelligence
        </div>
        <h1 className="lp-hero-h1">
          Master Your <span className="lp-gradient-text">Financial Future</span><br />
          With Precision &amp; Power
        </h1>
        <p className="lp-hero-sub">
          KnightVision decodes your spending DNA, predicts financial risk, and transforms raw
          transaction data into strategic wealth intelligence — in real time.
        </p>
        <div className="lp-hero-cta">
          <button className="lp-btn-hero" onClick={onRegister} id="hero-cta-btn">
            Start Free Analysis
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="lp-btn-outline" onClick={() => navigate('/dashboard')} id="hero-demo-btn">
            View Live Demo
          </button>
        </div>
        <div className="lp-hero-trust">
          <span>🔒 Bank-level encryption</span>
          <span>⚡ Real-time analytics</span>
          <span>🤖 AI-driven insights</span>
        </div>
      </div>

      {/* Dashboard preview mockup */}
      <div className="lp-hero-mockup">
        <div className="lp-mockup-window">
          <div className="lp-mockup-bar">
            <span /><span /><span />
            <div className="lp-mockup-url">knightvision.app/dashboard</div>
          </div>
          <div className="lp-mockup-body">
            {/* Mini stat cards */}
            <div className="lp-mock-stats">
              {[
                { l: 'Total Income', v: '₹1,24,850', c: '#10b981' },
                { l: 'Total Spend', v: '₹45,860', c: '#ef4444' },
                { l: 'Net Balance', v: '₹78,989', c: '#8b5cf6' },
              ].map((s, i) => (
                <div className="lp-mock-stat" key={i}>
                  <div style={{ fontSize: 9, color: '#64748b' }}>{s.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div className="lp-mock-chart">
              <svg width="100%" height="80" viewBox="0 0 300 80">
                <defs>
                  <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 70 C30 60 60 40 90 30 C120 20 150 15 180 12 C210 9 240 8 300 5" stroke="#10b981" strokeWidth="2" fill="none"/>
                <path d="M0 70 C30 60 60 40 90 30 C120 20 150 15 180 12 C210 9 240 8 300 5 L300 80 L0 80Z" fill="url(#mg1)"/>
                <path d="M0 75 C30 72 60 65 90 60 C120 55 150 52 180 50 C210 48 240 55 300 60" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
                <path d="M0 75 C30 72 60 65 90 60 C120 55 150 52 180 50 C210 48 240 55 300 60 L300 80 L0 80Z" fill="url(#mg2)"/>
              </svg>
            </div>
            {/* Gravity analysis mini */}
            <div className="lp-mock-gravity">
              <div style={{ fontSize: 9, color: '#a78bfa', fontWeight: 700, marginBottom: 6 }}>⚡ GRAVITY ANALYSIS</div>
              <div className="lp-mock-grav-row">
                <span style={{ fontSize: 9, color: '#ef4444' }}>⚠ Frictionless Warning</span>
                <span style={{ fontSize: 9, color: '#ef4444', fontWeight: 700 }}>HIGH</span>
              </div>
              <div className="lp-mock-grav-row">
                <span style={{ fontSize: 9, color: '#10b981' }}>✓ Cashback Check</span>
                <span style={{ fontSize: 9, color: '#10b981', fontWeight: 700 }}>GOOD</span>
              </div>
            </div>
          </div>
        </div>
        {/* Floating badges */}
        <div className="lp-float-badge lp-fb-1">
          <span>📈</span> +23.4% Income Growth
        </div>
        <div className="lp-float-badge lp-fb-2">
          <span>🤖</span> AI Analysis Ready
        </div>
        <div className="lp-float-badge lp-fb-3">
          <span>🔒</span> Secured
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────── */
function Stats() {
  const ref = useRef();
  const vis = useVisible(ref);
  const u = useCounter(50000, 2000, vis);
  const t = useCounter(12, 1500, vis);
  const a = useCounter(98, 1800, vis);
  const s = useCounter(4200, 2200, vis);

  return (
    <section className="lp-stats" id="stats" ref={ref}>
      <div className="lp-stats-inner">
        {[
          { val: `${u.toLocaleString()}+`, label: 'Active Users', icon: '👥' },
          { val: `₹${t}Cr+`, label: 'Transactions Analyzed', icon: '💰' },
          { val: `${a}%`, label: 'Accuracy Rate', icon: '🎯' },
          { val: `${s}+`, label: 'Insights Generated', icon: '⚡' },
        ].map((s, i) => (
          <div className="lp-stat-item" key={i}>
            <div className="lp-stat-icon">{s.icon}</div>
            <div className="lp-stat-val">{s.val}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: '📊',
      color: 'rgba(139,92,246,0.15)',
      border: 'rgba(139,92,246,0.3)',
      title: 'Real-Time Overview',
      desc: 'Dynamic dashboards with live cash flow charts, income vs expense tracking, and net balance forecasting updated instantly.',
      tags: ['Live Charts', 'Cash Flow', 'Net Balance'],
    },
    {
      icon: '💳',
      color: 'rgba(59,130,246,0.15)',
      border: 'rgba(59,130,246,0.3)',
      title: 'Smart Transactions',
      desc: 'Import CSV bank statements or manually add transactions. Auto-categorized with intelligent pattern recognition.',
      tags: ['CSV Import', 'Auto-Categorize', 'Manual Entry'],
    },
    {
      icon: '🧠',
      color: 'rgba(16,185,129,0.15)',
      border: 'rgba(16,185,129,0.3)',
      title: 'Gravity Analysis™',
      desc: 'Our proprietary AI engine detects Frictionless Warning, Cashback Illusion, Minimum Payment Traps, and Runway Forecasts.',
      tags: ['AI Engine', 'Risk Scoring', 'Runway Forecast'],
    },
    {
      icon: '🚀',
      color: 'rgba(245,158,11,0.15)',
      border: 'rgba(245,158,11,0.3)',
      title: 'Predictive Insights',
      desc: 'Forward-looking financial modeling tells you exactly how long your money lasts based on real spending behavior.',
      tags: ['Forecasting', 'Behavior AI', 'Future Planning'],
    },
    {
      icon: '🛡️',
      color: 'rgba(239,68,68,0.15)',
      border: 'rgba(239,68,68,0.3)',
      title: 'Bank-Grade Security',
      desc: 'AES-256 encryption, zero data sharing, fully private. Your financial data never leaves your control.',
      tags: ['AES-256', 'Zero Share', 'Private'],
    },
    {
      icon: '📱',
      color: 'rgba(236,72,153,0.15)',
      border: 'rgba(236,72,153,0.3)',
      title: 'Universal Access',
      desc: 'Responsive across all devices. Track your finances from desktop, tablet, or mobile — anytime, anywhere.',
      tags: ['Responsive', 'Cross-Platform', 'Always On'],
    },
  ];

  return (
    <section className="lp-section" id="features">
      <div className="lp-section-label">✦ CORE CAPABILITIES</div>
      <h2 className="lp-section-h2">Everything You Need to <span className="lp-gradient-text">Win Financially</span></h2>
      <p className="lp-section-sub">Six powerful modules engineered for total financial mastery.</p>
      <div className="lp-features-grid">
        {features.map((f, i) => (
          <div className="lp-feature-card" key={i} style={{ '--card-border': f.border }}>
            <div className="lp-feature-icon" style={{ background: f.color }}>
              <span>{f.icon}</span>
            </div>
            <h3 className="lp-feature-title">{f.title}</h3>
            <p className="lp-feature-desc">{f.desc}</p>
            <div className="lp-feature-tags">
              {f.tags.map(t => <span className="lp-tag" key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How It Works ────────────────────────────────────── */
function HowItWorks({ onRegister }) {
  const steps = [
    { n: '01', icon: '✍️', title: 'Create Your Account', desc: 'Sign up in 30 seconds. No credit card required. Just your name, email, and a secure password.' },
    { n: '02', icon: '📁', title: 'Import Your Data', desc: 'Upload your bank CSV statement or add transactions manually. We support all major Indian banks.' },
    { n: '03', icon: '🧠', title: 'AI Analyzes Instantly', desc: 'Our Gravity Analysis engine scans your patterns and surfaces hidden financial risks and opportunities.' },
    { n: '04', icon: '💡', title: 'Act on Insights', desc: 'Get personalized recommendations. Track progress. Build wealth systematically with data-backed decisions.' },
  ];
  return (
    <section className="lp-section lp-section--dark" id="how">
      <div className="lp-section-label">✦ THE PROCESS</div>
      <h2 className="lp-section-h2">From Data to <span className="lp-gradient-text">Wealth Intelligence</span></h2>
      <p className="lp-section-sub">Four steps to transform how you understand money.</p>
      <div className="lp-steps">
        {steps.map((s, i) => (
          <div className="lp-step" key={i}>
            <div className="lp-step-num">{s.n}</div>
            <div className="lp-step-icon">{s.icon}</div>
            <h3 className="lp-step-title">{s.title}</h3>
            <p className="lp-step-desc">{s.desc}</p>
            {i < steps.length - 1 && <div className="lp-step-connector" />}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button className="lp-btn-hero" onClick={onRegister} id="how-cta-btn">
          Begin Your Journey
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
}

/* ── Trust Section ───────────────────────────────────── */
function Trust() {
  const items = [
    { icon: '🔒', title: 'Military-Grade Encryption', desc: 'AES-256 encryption protects every byte of your financial data.' },
    { icon: '🚫', title: 'Zero Data Selling', desc: 'We never sell, share, or monetize your personal data. Period.' },
    { icon: '⚡', title: 'Real-Time Processing', desc: 'Sub-second analytics engine processes thousands of transactions instantly.' },
    { icon: '🎯', title: '98% Accuracy', desc: 'Our AI models are trained on millions of financial data points for precision.' },
    { icon: '🌐', title: 'Always Available', desc: '99.9% uptime SLA. Your financial command center never sleeps.' },
    { icon: '🤝', title: 'Built for India', desc: 'Optimized for INR, UPI, Indian banks, and Indian spending patterns.' },
  ];
  return (
    <section className="lp-section" id="trust">
      <div className="lp-section-label">✦ WHY KNIGHTVISION</div>
      <h2 className="lp-section-h2">Trusted by Professionals &amp; <span className="lp-gradient-text">Students Alike</span></h2>
      <p className="lp-section-sub">Built with the same standards as enterprise financial software.</p>
      <div className="lp-trust-grid">
        {items.map((it, i) => (
          <div className="lp-trust-card" key={i}>
            <div className="lp-trust-icon">{it.icon}</div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Banner ──────────────────────────────────────── */
function CTABanner({ onRegister }) {
  return (
    <section className="lp-cta-banner">
      <div className="lp-cta-orb-1" />
      <div className="lp-cta-orb-2" />
      <div className="lp-section-label" style={{ color: '#c4b5fd' }}>✦ GET STARTED TODAY</div>
      <h2 className="lp-cta-h2">Your Financial Future Starts<br /><span className="lp-gradient-text">Right Now</span></h2>
      <p className="lp-cta-sub">Join thousands of users who have already transformed their financial lives with KnightVision.</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
        <button className="lp-btn-hero" onClick={onRegister} id="cta-register-btn">
          Create Free Account
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div className="lp-cta-trust">
        <span>✓ Free forever plan</span>
        <span>✓ No credit card</span>
        <span>✓ Setup in 60 seconds</span>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <KnightLogo />
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: 1.5 }}>KNIGHTVISION</span>
          </div>
          <p>Analyze Spending. Predict Smarter.<br />Your financial command center.</p>
        </div>
        <div className="lp-footer-links">
          <h5>Product</h5>
          <a href="#">Overview</a><a href="#">Transactions</a><a href="#">Gravity Analysis</a><a href="#">API</a>
        </div>
        <div className="lp-footer-links">
          <h5>Company</h5>
          <a href="#">About</a><a href="#">Blog</a><a href="#">Careers</a><a href="#">Press</a>
        </div>
        <div className="lp-footer-links">
          <h5>Legal</h5>
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Security</a><a href="#">GDPR</a>
        </div>
      </div>
      <div className="lp-footer-bottom">
        <span>© 2025 KnightVision. All rights reserved.</span>
        <span>Made with ♟️ for financial excellence</span>
      </div>
    </footer>
  );
}

/* ── MAIN EXPORT ─────────────────────────────────────── */
export default function Landing() {
  const [modal, setModal] = useState(null); // 'login' | 'register' | null

  return (
    <div className="lp-root">
      <Navbar onLogin={() => setModal('login')} onRegister={() => setModal('register')} />
      <Hero onRegister={() => setModal('register')} />
      <Stats />
      <Features />
      <HowItWorks onRegister={() => setModal('register')} />
      <Trust />
      <CTABanner onRegister={() => setModal('register')} />
      <Footer />
      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSwitch={(m) => setModal(m)}
        />
      )}
    </div>
  );
}

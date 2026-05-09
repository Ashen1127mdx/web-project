import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EyeIcon = ({ open }) => open ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 18, height: 18 }}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function PasswordStrength({ password }) {
  const getStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const s = getStrength(password);
  const labels = ['', 'Weak', 'Fair', 'Strong', 'Excellent'];
  const colors = ['', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];
  if (!password) return null;
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= s ? colors[s] : 'rgba(255,255,255,0.08)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <span style={{ fontSize: 10, color: colors[s], fontWeight: 600 }}>{labels[s]}</span>
    </div>
  );
}

function InputField({ label, id, type = 'text', placeholder, value, onChange, showToggle, show, onToggle, error }) {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <input
          id={id}
          type={showToggle ? (show ? 'text' : 'password') : type}
          className={`auth-input ${error ? 'auth-input--err' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        {showToggle && (
          <button type="button" className="auth-eye" onClick={onToggle} tabIndex={-1}>
            <EyeIcon open={show} />
          </button>
        )}
      </div>
      {error && <span className="auth-err-msg">{error}</span>}
    </div>
  );
}

/* ── Register Form ───────────────────────────────────── */
function RegisterForm({ onClose, onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.username.trim()) e.username = 'Username is required';
    else if (form.username.length < 3) e.username = 'Min 3 characters';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    setTimeout(() => { onClose(); navigate('/dashboard'); }, 1800);
  };

  if (done) return (
    <div className="auth-success">
      <div className="auth-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ width: 40, height: 40 }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3>Account Created!</h3>
      <p>Welcome to KnightVision, {form.fullName.split(' ')[0]}. Redirecting to your dashboard…</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <div className="auth-form-grid-2">
        <InputField label="Full Name" id="reg-name" placeholder="John Doe"
          value={form.fullName} onChange={set('fullName')} error={errors.fullName} />
        <InputField label="Username" id="reg-username" placeholder="@johndoe"
          value={form.username} onChange={set('username')} error={errors.username} />
      </div>
      <InputField label="Email Address" id="reg-email" type="email" placeholder="john@example.com"
        value={form.email} onChange={set('email')} error={errors.email} />
      <InputField label="Password" id="reg-password" placeholder="Create a strong password"
        value={form.password} onChange={set('password')} error={errors.password}
        showToggle show={show} onToggle={() => setShow(s => !s)} />
      <PasswordStrength password={form.password} />

      <div className="auth-perks">
        {['Free to start, no credit card', 'Bank-grade data encryption', 'Instant AI analysis'].map(p => (
          <div className="auth-perk" key={p}><CheckIcon /><span>{p}</span></div>
        ))}
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading} id="reg-submit-btn">
        {loading ? <span className="auth-spinner" /> : 'Create My Account'}
      </button>
      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" className="auth-link" onClick={() => onSwitch('login')}>Sign in</button>
      </p>
    </form>
  );
}

/* ── Login Form ──────────────────────────────────────── */
function LoginForm({ onClose, onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
    setTimeout(() => { onClose(); navigate('/dashboard'); }, 1800);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForgotSent(true);
  };

  if (done) return (
    <div className="auth-success">
      <div className="auth-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ width: 40, height: 40 }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3>Welcome Back!</h3>
      <p>Signed in successfully. Taking you to your dashboard…</p>
    </div>
  );

  if (forgot) return (
    <div className="auth-form">
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔑</div>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>Reset Password</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
          Enter your registered email and we'll send a reset link.
        </p>
      </div>
      {forgotSent ? (
        <div className="auth-success" style={{ padding: 0, background: 'none' }}>
          <div className="auth-success-icon" style={{ width: 48, height: 48, marginBottom: 12 }}>✉️</div>
          <h3 style={{ fontSize: 15 }}>Check Your Inbox</h3>
          <p>We've sent a password reset link to <strong>{forgotEmail}</strong></p>
          <button className="auth-link" style={{ marginTop: 14 }} onClick={() => { setForgot(false); setForgotSent(false); }}>Back to Sign In</button>
        </div>
      ) : (
        <form onSubmit={handleForgot} noValidate>
          <InputField label="Email Address" id="forgot-email" type="email" placeholder="your@email.com"
            value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
          <button type="submit" className="auth-submit-btn" style={{ marginTop: 16 }} disabled={loading || !forgotEmail}>
            {loading ? <span className="auth-spinner" /> : 'Send Reset Link'}
          </button>
          <p className="auth-switch" style={{ marginTop: 14 }}>
            <button type="button" className="auth-link" onClick={() => setForgot(false)}>← Back to Sign In</button>
          </p>
        </form>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      <InputField label="Username" id="login-username" placeholder="Enter your username"
        value={form.username} onChange={set('username')} error={errors.username} />
      <InputField label="Password" id="login-password" placeholder="Enter your password"
        value={form.password} onChange={set('password')} error={errors.password}
        showToggle show={show} onToggle={() => setShow(s => !s)} />
      <div style={{ textAlign: 'right', marginTop: -4, marginBottom: 8 }}>
        <button type="button" className="auth-link auth-forgot-link" onClick={() => setForgot(true)} id="forgot-btn">
          Forgot Password?
        </button>
      </div>
      <div className="auth-perks">
        {['Encrypted session', 'Real-time dashboard', 'AI insights ready'].map(p => (
          <div className="auth-perk" key={p}><CheckIcon /><span>{p}</span></div>
        ))}
      </div>
      <button type="submit" className="auth-submit-btn" disabled={loading} id="login-submit-btn">
        {loading ? <span className="auth-spinner" /> : 'Sign In to Dashboard'}
      </button>
      <p className="auth-switch">
        Don't have an account?{' '}
        <button type="button" className="auth-link" onClick={() => onSwitch('register')}>Create one free</button>
      </p>
    </form>
  );
}

/* ── Modal Shell ─────────────────────────────────────── */
export default function AuthModal({ mode, onClose, onSwitch }) {
  const isRegister = mode === 'register';

  return (
    <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`auth-modal ${isRegister ? 'auth-modal--register' : ''}`}>
        {/* Decorative orbs */}
        <div className="auth-orb-1" />
        <div className="auth-orb-2" />

        {/* Header */}
        <div className="auth-header">
          <div className="auth-header-left">
            <div className="auth-modal-icon">{isRegister ? '🚀' : '🔐'}</div>
            <div>
              <h2 className="auth-title">{isRegister ? 'Create Your Account' : 'Welcome Back'}</h2>
              <p className="auth-subtitle">
                {isRegister
                  ? 'Join thousands mastering their finances'
                  : 'Sign in to your KnightVision dashboard'}
              </p>
            </div>
          </div>
          <button className="auth-close" onClick={onClose} id="auth-close-btn" aria-label="Close"><CloseIcon /></button>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => onSwitch('login')} id="tab-login">
            Sign In
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`}
            onClick={() => onSwitch('register')} id="tab-register">
            Register
          </button>
        </div>

        {/* Body */}
        <div className="auth-body">
          {isRegister
            ? <RegisterForm onClose={onClose} onSwitch={onSwitch} />
            : <LoginForm onClose={onClose} onSwitch={onSwitch} />}
        </div>
      </div>
    </div>
  );
}

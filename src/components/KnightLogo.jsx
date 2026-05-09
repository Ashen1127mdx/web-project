import { useState, useEffect } from 'react';

export default function KnightLogo() {
  const [hopping, setHopping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHopping(true);
      setTimeout(() => setHopping(false), 700);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="knight-logo">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`knight-glow ${hopping ? 'knight-animate' : ''}`}
      >
        {/* Crown */}
        <path d="M20 14 L24 8 L28 13 L32 6 L36 13 L40 8 L44 14 Z"
          fill="#f59e0b" stroke="#fbbf24" strokeWidth="0.5"/>
        {/* Head shape */}
        <ellipse cx="32" cy="22" rx="11" ry="9" fill="#8b5cf6"/>
        {/* Snout */}
        <path d="M28 26 Q24 28 22 32 Q20 36 22 38 L30 38 Q32 36 32 32 Z"
          fill="#7c3aed"/>
        {/* Eye */}
        <circle cx="26" cy="20" r="2.5" fill="#0a0a14"/>
        <circle cx="25.2" cy="19.4" r="0.9" fill="#fff"/>
        {/* Nose */}
        <path d="M22 31 Q23 30 25 31" stroke="#a78bfa" strokeWidth="1" strokeLinecap="round"/>
        {/* Mane */}
        <path d="M38 16 Q44 14 46 20 Q48 26 46 32 Q44 38 40 40 L38 40 Q42 34 41 26 Q40 20 38 16 Z"
          fill="#6d28d9"/>
        {/* Neck / body */}
        <path d="M22 38 Q20 42 20 46 L44 46 Q44 42 42 38 L30 38 Z"
          fill="#7c3aed"/>
        {/* Base */}
        <rect x="16" y="46" width="32" height="6" rx="3" fill="#6d28d9"/>
        {/* Shield accent */}
        <path d="M30 22 L32 18 L34 22 L32 25 Z" fill="#a78bfa" opacity="0.6"/>
        {/* Glow circles */}
        <circle cx="32" cy="32" r="30" fill="url(#knightGlow)" opacity="0.15"/>
        <defs>
          <radialGradient id="knightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

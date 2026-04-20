import React from 'react';

interface PulseCardProps {
  children: React.ReactNode;
  isLive?: boolean;
  className?: string;
  delay?: number;
}

export default function PulseCard({ children, isLive = false, className = '', delay = 0 }: PulseCardProps) {
  const delayClass = delay > 0 ? `animate-fade-in-delay-${delay}` : 'animate-fade-in';
  const liveClass = isLive ? 'glass-card-live' : '';

  return (
    <div
      className={`glass-card ${liveClass} ${delayClass} ${className}`}
      style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '1rem',
      }}
    >
      {isLive && (
        <div style={{ marginBottom: '0.75rem' }}>
          <span className="live-badge">
            <span className="live-dot" />
            LIVE
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function Button({ children, variant = 'primary', onClick, fullWidth = false }: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    padding: '0.875rem 1.75rem',
    border: 'none',
    borderRadius: '9999px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    fontFamily: 'inherit',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--gradient-hero)',
      backgroundSize: '200% 200%',
      color: '#060a14',
      boxShadow: '0 4px 16px rgba(0, 210, 255, 0.25)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.06)',
      color: 'var(--color-on-surface)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid rgba(151, 169, 255, 0.2)',
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 210, 255, 0.35)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 210, 255, 0.25)';
        } else if (variant === 'secondary') {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        }
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; }}
    >
      {children}
    </button>
  );
}

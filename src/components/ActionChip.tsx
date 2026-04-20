'use client';

import React from 'react';

interface ActionChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ActionChip({ label, selected = false, onClick }: ActionChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected
          ? 'var(--gradient-neon)'
          : 'rgba(255, 255, 255, 0.04)',
        color: selected ? '#060a14' : 'var(--color-on-surface-variant)',
        padding: '0.5rem 1.25rem',
        border: selected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '9999px',
        cursor: 'pointer',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap' as const,
        flexShrink: 0,
        fontFamily: 'inherit',
        boxShadow: selected ? '0 2px 12px rgba(200, 255, 0, 0.25)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
    >
      {label}
    </button>
  );
}

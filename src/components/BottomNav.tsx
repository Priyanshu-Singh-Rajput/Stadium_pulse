'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Hub', icon: '◉' },
    { href: '/map', label: 'Map', icon: '◎' },
    { href: '/eats', label: 'Eats', icon: '◈' },
    { href: '/wallet', label: 'Pass', icon: '▣' },
  ];

  return (
    <nav
      className="glass-nav"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0.75rem 0.5rem',
        zIndex: 100,
      }}
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              textDecoration: 'none',
              color: isActive ? 'var(--color-tertiary)' : 'var(--color-on-surface-variant)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease, transform 0.2s ease',
              position: 'relative',
            }}
          >
            <span style={{
              fontSize: '1.2rem',
              filter: isActive ? 'drop-shadow(0 0 6px var(--color-tertiary))' : 'none',
              transition: 'filter 0.2s ease',
            }}>
              {link.icon}
            </span>
            {link.label}
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: '-0.5rem',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-tertiary)',
                boxShadow: '0 0 8px var(--color-tertiary)',
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

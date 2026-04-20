import React from 'react';
import BottomNav from '../../components/BottomNav';
import PulseCard from '../../components/PulseCard';
import Button from '../../components/Button';

export default function WalletPage() {
  return (
    <div style={{ padding: '2rem 1rem 6rem 1rem', maxWidth: '480px', margin: '0 auto' }}>
      {/* Header */}
      <header className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
        <p className="label-sm" style={{ marginBottom: '0.5rem' }}>⬡ ANTIGRAVITY</p>
        <h1 className="headline display-lg text-gradient">EVENT<br />PASS</h1>
        <p className="body-sm" style={{ marginTop: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          Your tickets, passes & access
        </p>
      </header>

      {/* Ticket Card */}
      <div className="animate-fade-in-delay-1">
        <PulseCard isLive={true} className="premium-card">
          <div style={{ 
            textAlign: 'center', 
            padding: '0.5rem 0',
            backgroundImage: 'linear-gradient(rgba(6, 10, 20, 0.8), rgba(6, 10, 20, 0.8)), url(/pass_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px',
            margin: '-0.5rem -0.5rem 0 -0.5rem',
            paddingTop: '1.5rem',
            paddingBottom: '1rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p className="label-sm" style={{ color: 'var(--color-tertiary)', marginBottom: '0.75rem' }}>ACTIVE TICKET</p>
            <h2 className="headline" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Titans vs Hurricanes</h2>
            <p className="body-sm" style={{ fontSize: '0.75rem', marginBottom: '1.5rem' }}>Today • 7:30 PM IST • Main Stadium</p>
          </div>

          <div style={{ padding: '0 0.5rem' }}>
            <div className="section-divider" style={{ margin: '1rem 0' }} />

            {/* Ticket Details */}
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1.5rem 0' }}>
              <div className="stat-block">
                <p className="stat-value text-gradient-neon">A</p>
                <p className="stat-label">GATE</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="stat-block">
                <p className="stat-value text-gradient-neon">104</p>
                <p className="stat-label">SECTION</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="stat-block">
                <p className="stat-value text-gradient-neon">12F</p>
                <p className="stat-label">SEAT</p>
              </div>
            </div>

            <div className="section-divider" />

            {/* QR Code */}
            <div style={{ margin: '1.5rem 0' }}>
              <div className="qr-container">
                <div style={{ textAlign: 'center', color: '#000', zIndex: 1 }}>
                  <span style={{ fontSize: '2rem', display: 'block' }}>⬡</span>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                    QR CODE
                  </p>
                </div>
              </div>
            </div>

            <p className="label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>Scan at the gate for entry</p>
          </div>
        </PulseCard>
      </div>

      {/* Quick Stats */}
      <div className="animate-fade-in-delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="icon-circle icon-circle-primary" style={{ margin: '0 auto 0.5rem auto' }}>🎫</div>
          <p className="label-sm">Past Events</p>
          <p className="headline" style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>12</p>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="icon-circle icon-circle-tertiary" style={{ margin: '0 auto 0.5rem auto' }}>⭐</div>
          <p className="label-sm">Loyalty Pts</p>
          <p className="headline text-gradient-neon" style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>2,480</p>
        </div>
      </div>

      {/* CTA */}
      <div className="animate-fade-in-delay-3">
        <Button fullWidth={true}>Add to Digital Wallet</Button>
      </div>

      <BottomNav />
    </div>
  );
}

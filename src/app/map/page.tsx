import React from 'react';
import BottomNav from '../../components/BottomNav';
import ActionChip from '../../components/ActionChip';
import PulseCard from '../../components/PulseCard';
import { APIService } from '../../lib/api';

export const dynamic = 'force-dynamic';

const pinClassMap: Record<string, string> = {
  GATE: 'map-pin-gate',
  RESTROOM: 'map-pin-restroom',
  FOOD: 'map-pin-food',
  MERCH: 'map-pin-merch',
};

const typeIcons: Record<string, string> = {
  GATE: '🚪',
  RESTROOM: '🚻',
  FOOD: '🍕',
  MERCH: '🛍️',
  SEATING: '💺',
};

export default async function MapPage() {
  let locations: any[] = [];
  try {
    locations = await APIService.getMapLocations();
  } catch {
    locations = [
      { id: 'l1', name: 'Gate A', type: 'GATE', coordinates: { x: 15, y: 25 } },
      { id: 'l2', name: 'Restroom Block 2', type: 'RESTROOM', coordinates: { x: 55, y: 45 } },
      { id: 'l3', name: 'Food Court North', type: 'FOOD', coordinates: { x: 75, y: 30 } },
      { id: 'l4', name: 'Merch Store', type: 'MERCH', coordinates: { x: 40, y: 70 } },
    ];
  }

  return (
    <div style={{ padding: '2rem 1rem 6rem 1rem', maxWidth: '480px', margin: '0 auto' }}>
      {/* Header */}
      <header className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
        <p className="label-sm" style={{ marginBottom: '0.5rem' }}>⬡ STADIUM PULSE</p>
        <h1 className="headline display-lg text-gradient">VENUE<br />MAP</h1>
        <p className="body-sm" style={{ marginTop: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          Navigate the arena in real-time
        </p>
      </header>

      {/* Filter Chips */}
      <div className="no-scrollbar animate-fade-in-delay-1" style={{ display: 'flex', overflowX: 'auto', marginBottom: '1.5rem', gap: '0.5rem', paddingBottom: '0.5rem' }}>
        <ActionChip label="ALL" selected={true} />
        <ActionChip label="GATES" />
        <ActionChip label="FOOD" />
        <ActionChip label="RESTROOMS" />
        <ActionChip label="MERCH" />
      </div>

      {/* Interactive Map */}
      <div className="map-container animate-fade-in-delay-2" style={{ marginBottom: '1.5rem' }}>
        <div className="map-grid" />

        {/* Center label */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem', opacity: 0.3 }}>🏟️</span>
          <p className="label-sm" style={{ opacity: 0.4 }}>Interactive Map</p>
        </div>

        {/* Pins */}
        {locations.map((loc) => (
          <div
            key={loc.id}
            className={`map-pin ${pinClassMap[loc.type] || 'map-pin-gate'}`}
            style={{
              left: `${loc.coordinates.x}%`,
              top: `${loc.coordinates.y}%`,
            }}
            title={loc.name}
          />
        ))}
      </div>

      <div className="section-divider" />

      {/* Location List */}
      <section className="animate-fade-in-delay-3">
        <h3 className="headline text-gradient" style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Nearby Locations</h3>
        {locations.map((loc) => (
          <PulseCard key={loc.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div className="icon-circle icon-circle-secondary">
                  {typeIcons[loc.type] || '📍'}
                </div>
                <div>
                  <h4 className="headline" style={{ fontSize: '1rem', marginBottom: '0.15rem' }}>{loc.name}</h4>
                  <p className="label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{loc.type}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="headline glow-text" style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                  {Math.floor(Math.random() * 5 + 1)}
                </p>
                <p className="label-sm">MIN</p>
              </div>
            </div>
          </PulseCard>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}

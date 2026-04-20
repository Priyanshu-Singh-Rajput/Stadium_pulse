import React from 'react';
import PulseCard from '../components/PulseCard';
import ActionChip from '../components/ActionChip';
import BottomNav from '../components/BottomNav';
import { APIService } from '../lib/api';

export default async function HubPage() {
  let matchData: any;
  let highlights: any[] = [];
  try {
    matchData = await APIService.getLiveMatch();
    highlights = await APIService.getMatchHighlights();
  } catch {
    matchData = {
      status: 'LIVE',
      team1: { shortName: 'TITANS', isBatting: true, score: '184/3', overs: '18.4', runRate: '9.86' },
      team2: { shortName: 'HURRICANES' },
    };
    highlights = [
      { id: '1', type: 'MILESTONE', title: 'Century for K. Rahul!', description: 'He reaches the milestone in just 54 balls.', timestamp: '10 mins ago' },
      { id: '2', type: 'WICKET', title: 'WICKET: G. Maxwell c Zampa b Starc', description: 'Starc breaks the dangerous partnership.', overs: '16.5', timestamp: '15 mins ago' },
      { id: '3', type: 'UPDATE', title: 'End of Powerplay', description: 'Titans are 58/1 after the first 6 overs.', timestamp: '1 hour ago' },
    ];
  }

  const typeColors: Record<string, string> = {
    WICKET: 'var(--color-error)',
    MILESTONE: 'var(--color-tertiary)',
    BOUNDARY: 'var(--color-secondary)',
    UPDATE: 'var(--color-primary)',
  };

  const typeIcons: Record<string, string> = {
    WICKET: '⚡',
    MILESTONE: '🏆',
    BOUNDARY: '💥',
    UPDATE: '📢',
  };

  return (
    <div style={{ padding: '2rem 1rem 6rem 1rem', maxWidth: '480px', margin: '0 auto' }}>
      {/* Header */}
      <header className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
        <p className="label-sm" style={{ marginBottom: '0.5rem', color: 'var(--color-on-surface-variant)' }}>⬡ ANTIGRAVITY</p>
        <h1 className="headline display-lg text-gradient">STADIUM<br />PULSE</h1>
        <p className="body-sm" style={{ marginTop: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          Live Event Hub — Real-time Updates
        </p>
      </header>

      {/* Featured Camera */}
      <div className="animate-fade-in-delay-1">
        <div 
          className="placeholder-img" 
          style={{ 
            width: '100%', 
            height: '180px', 
            marginBottom: '1.5rem', 
            position: 'relative',
            backgroundImage: 'url(/hub_live.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ 
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            zIndex: 1 
          }}>
            <span className="live-badge" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
              <span className="live-dot" />
              NORTH STAND — CAM 04
            </span>
          </div>
        </div>
      </div>

      {/* Match Score — Team 1 */}
      <div className="animate-fade-in-delay-2">
        <PulseCard isLive={matchData.status === 'LIVE'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="headline" style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{matchData.team1.shortName}</h2>
              <p className="label-sm glow-text-green" style={{ color: 'var(--color-tertiary)' }}>
                {matchData.team1.isBatting ? '● BATTING' : '● BOWLING'}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 className="headline display-md" style={{ color: 'var(--color-on-surface)' }}>{matchData.team1.score}</h2>
              <p className="label-sm">{matchData.team1.overs} OV • RR {matchData.team1.runRate}</p>
            </div>
          </div>
        </PulseCard>
      </div>

      {/* Match Score — Team 2 */}
      <div className="animate-fade-in-delay-3">
        <PulseCard delay={0}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="headline" style={{ fontSize: '1.4rem', color: 'var(--color-on-surface-variant)' }}>{matchData.team2.shortName}</h2>
              <p className="label-sm">YET TO BAT</p>
            </div>
            <div className="icon-circle icon-circle-secondary">🏏</div>
          </div>
        </PulseCard>
      </div>

      {/* Quick Actions */}
      <div className="no-scrollbar animate-fade-in-delay-3" style={{ display: 'flex', overflowX: 'auto', marginBottom: '1.5rem', gap: '0.5rem', paddingBottom: '0.5rem' }}>
        <ActionChip label="LIVE REPLAYS" selected={true} />
        <ActionChip label="FAN ZONE" />
        <ActionChip label="ANALYTICS" />
        <ActionChip label="STATS" />
      </div>

      <div className="section-divider" />

      {/* Highlights Timeline */}
      <section className="animate-fade-in-delay-4">
        <h3 className="headline text-gradient" style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Match Timeline</h3>
        {highlights.map((h, i) => (
          <div
            key={h.id}
            className="glass-card"
            style={{
              marginBottom: '0.75rem',
              padding: '1rem 1.25rem',
              borderLeft: `3px solid ${typeColors[h.type] || 'var(--color-primary)'}`,
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}
          >
            <div className="icon-circle" style={{ background: `${typeColors[h.type]}15`, fontSize: '1.2rem', flexShrink: 0 }}>
              {typeIcons[h.type] || '📌'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <p className="label-sm" style={{ color: typeColors[h.type] }}>
                  {h.type}{h.overs ? ` • ${h.overs} OV` : ''}
                </p>
                <p className="label-sm">{h.timestamp}</p>
              </div>
              <h4 className="headline" style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{h.title}</h4>
              <p className="body-sm" style={{ fontSize: '0.8rem' }}>{h.description}</p>
            </div>
          </div>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}

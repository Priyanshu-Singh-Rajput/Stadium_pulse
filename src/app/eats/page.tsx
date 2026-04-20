import React from 'react';
import BottomNav from '../../components/BottomNav';
import ActionChip from '../../components/ActionChip';
import PulseCard from '../../components/PulseCard';
import Button from '../../components/Button';
import { APIService } from '../../lib/api';

export const dynamic = 'force-dynamic';

const foodEmojis: Record<string, string> = {
  'HOT FOOD': '🌭',
  'SNACKS': '🍿',
  'DRINKS': '🥤',
  'DESSERTS': '🍦',
};

const foodImages: Record<string, string> = {
  'Stadium Hotdog': '/food_hotdog.png',
  'Nachos Grande': '/food_nachos.png',
  'Craft Lemonade': '/food_lemonade.png',
  'Churros Deluxe': '/food_churros.png',
};

export default async function EatsPage() {
  let foodItems: any[] = [];
  try {
    foodItems = await APIService.getFoodItems();
  } catch {
    foodItems = [
      { id: 'f1', name: 'Stadium Hotdog', description: 'Classic hotdog with mustard and ketchup.', price: 6.50, category: 'HOT FOOD' },
      { id: 'f2', name: 'Nachos Grande', description: 'Loaded nachos with jalapenos and cheese.', price: 8.00, category: 'SNACKS' },
      { id: 'f3', name: 'Craft Lemonade', description: 'Freshly squeezed with a hint of mint.', price: 5.00, category: 'DRINKS' },
      { id: 'f4', name: 'Churros Deluxe', description: 'Warm churros with chocolate dipping sauce.', price: 7.50, category: 'DESSERTS' },
    ];
  }

  return (
    <div style={{ padding: '2rem 1rem 6rem 1rem', maxWidth: '480px', margin: '0 auto' }}>
      {/* Header */}
      <header className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
        <p className="label-sm" style={{ marginBottom: '0.5rem' }}>⬡ STADIUM PULSE</p>
        <h1 className="headline display-lg text-gradient">STADIUM<br />EATS</h1>
        <p className="body-sm" style={{ marginTop: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          Order food straight to your seat
        </p>
      </header>

      {/* Promo Banner */}
      <div className="animate-fade-in-delay-1">
        <div 
          className="placeholder-img" 
          style={{ 
            width: '100%', 
            height: '140px', 
            marginBottom: '1.5rem',
            backgroundImage: 'url(/eats_promo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ zIndex: 1, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <span className="label-sm" style={{ color: 'var(--color-tertiary)' }}>LIMITED OFFER</span>
            <p className="headline" style={{ fontSize: '0.9rem' }}>Combo Deals — Save 20% on all Match Day snacks</p>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="no-scrollbar animate-fade-in-delay-2" style={{ display: 'flex', overflowX: 'auto', marginBottom: '1.5rem', gap: '0.5rem', paddingBottom: '0.5rem' }}>
        <ActionChip label="ALL" selected={true} />
        <ActionChip label="HOT FOOD" />
        <ActionChip label="SNACKS" />
        <ActionChip label="DRINKS" />
        <ActionChip label="DESSERTS" />
      </div>

      <div className="section-divider" />

      {/* Food Items */}
      <section className="animate-fade-in-delay-3">
        {foodItems.map((item, i) => (
          <PulseCard key={item.id}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Food image */}
              <div 
                className="food-img"
                style={{
                  backgroundImage: `url(${foodImages[item.name] || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {!foodImages[item.name] && <span style={{ zIndex: 1 }}>{foodEmojis[item.category] || '🍽️'}</span>}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="label-sm" style={{ color: 'var(--color-tertiary)', marginBottom: '0.2rem' }}>{item.category}</p>
                <h3 className="headline" style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.name}</h3>
                <p className="body-sm" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="headline glow-text" style={{ color: 'var(--color-secondary)', fontSize: '1.1rem' }}>
                    ${item.price.toFixed(2)}
                  </h4>
                  <Button variant="secondary">Add +</Button>
                </div>
              </div>
            </div>
          </PulseCard>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}

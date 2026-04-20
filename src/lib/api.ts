import { Event, TimelineEvent, FoodItem, MapLocation } from '../types';

export const APIService = {
  // Hub
  getLiveMatch: async (): Promise<Event> => {
    const res = await fetch('/api/match/live', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch live match');
    return res.json();
  },

  getMatchHighlights: async (): Promise<TimelineEvent[]> => {
    const res = await fetch('/api/match/highlights', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch highlights');
    return res.json();
  },

  // Food
  getFoodItems: async (): Promise<FoodItem[]> => {
    const res = await fetch('/api/food', { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch food items');
    return res.json();
  },

  // Map
  getMapLocations: async (): Promise<MapLocation[]> => {
    const res = await fetch('/api/map/locations', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch map locations');
    return res.json();
  }
};

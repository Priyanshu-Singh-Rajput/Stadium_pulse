export interface Event {
  id: string;
  name: string;
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED';
  team1: Team;
  team2: Team;
  currentInnings?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  score?: string;
  overs?: string;
  runRate?: string;
  isBatting?: boolean;
}

export interface TimelineEvent {
  id: string;
  type: 'WICKET' | 'BOUNDARY' | 'MILESTONE' | 'UPDATE';
  title: string;
  description: string;
  overs?: string;
  timestamp: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'GATE' | 'FOOD' | 'RESTROOM' | 'MERCH' | 'SEATING';
  coordinates: { x: number; y: number };
}

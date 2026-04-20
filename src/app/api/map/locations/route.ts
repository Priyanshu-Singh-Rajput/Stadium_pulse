import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { MapLocation } from '@/types';

export const revalidate = 3600; // Map locations change rarely, cache for 1 hour

export async function GET() {
  try {
    const locationsRef = db.collection('mapLocations');
    const snapshot = await locationsRef.get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MapLocation));
    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching map locations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

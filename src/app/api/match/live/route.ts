import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase-admin';
import { Event } from '../../../types';

export const revalidate = 0; // Disable static caching for live data

export async function GET() {
  try {
    const eventsRef = db.collection('events');
    const snapshot = await eventsRef.where('status', '==', 'LIVE').limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'No live match found' }, { status: 404 });
    }

    const matchData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Event;
    return NextResponse.json(matchData);
  } catch (error) {
    console.error('Error fetching live match:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase-admin';
import { TimelineEvent } from '../../../types';

export const revalidate = 0; // Disable static caching for live data

export async function GET() {
  try {
    const highlightsRef = db.collection('timeline');
    // Order by timestamp desc, assuming we'll store a 'createdAt' or use the timestamp string for sorting
    const snapshot = await highlightsRef.get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const highlights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TimelineEvent));
    return NextResponse.json(highlights);
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

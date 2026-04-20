import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { FoodItem } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const foodRef = db.collection('food');
    const snapshot = await foodRef.get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const foodItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FoodItem));
    return NextResponse.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

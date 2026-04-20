// Run: node scripts/seed-firestore.js
// Usage: node scripts/seed-firestore.js [path-to-service-account-key.json]
// If no path is given, it defaults to the GOOGLE_APPLICATION_CREDENTIALS env var.

const admin = require('firebase-admin');
const path = require('path');

// Get the key file path from CLI arg or env var
const keyPath = process.argv[2] || process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!keyPath) {
  console.error('❌ Please provide the path to your Firebase service account key.');
  console.error('   Usage: node scripts/seed-firestore.js ./path/to/key.json');
  process.exit(1);
}

const serviceAccount = require(path.resolve(keyPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const db = admin.firestore();

// Mock data
const mockMatchData = {
  name: 'Titans vs Hurricanes',
  status: 'LIVE',
  team1: {
    id: 't1',
    name: 'Titans',
    shortName: 'TITANS',
    score: '184/3',
    overs: '18.4',
    runRate: '9.86',
    isBatting: true
  },
  team2: {
    id: 't2',
    name: 'Hurricanes',
    shortName: 'HURRICANES',
    isBatting: false
  }
};

const mockTimelineEvents = [
  { type: 'MILESTONE', title: 'Century for K. Rahul!', description: 'He reaches the milestone in just 54 balls. A masterclass in T20 batting.', timestamp: '10 mins ago' },
  { type: 'WICKET', title: 'WICKET: G. Maxwell c Zampa b Starc', description: 'Starc breaks the dangerous partnership. Maxwell holes out to long-off.', overs: '16.5', timestamp: '15 mins ago' },
  { type: 'UPDATE', title: 'End of Powerplay', description: 'Titans are 58/1 after the first 6. A flying start despite the early loss of Rohit.', timestamp: '1 hour ago' }
];

const mockFoodItems = [
  { name: 'Stadium Hotdog', description: 'Classic hotdog with mustard and ketchup.', price: 6.50, category: 'HOT FOOD' },
  { name: 'Nachos Grande', description: 'Loaded nachos with jalapenos and cheese.', price: 8.00, category: 'SNACKS' },
  { name: 'Craft Lemonade', description: 'Freshly squeezed with a hint of mint.', price: 5.00, category: 'DRINKS' },
  { name: 'Churros Deluxe', description: 'Warm churros with chocolate dipping sauce.', price: 7.50, category: 'DESSERTS' },
];

const mockMapLocations = [
  { name: 'Gate A', type: 'GATE', coordinates: { x: 15, y: 25 } },
  { name: 'Restroom Block 2', type: 'RESTROOM', coordinates: { x: 55, y: 45 } },
  { name: 'Food Court North', type: 'FOOD', coordinates: { x: 75, y: 30 } },
  { name: 'Merch Store', type: 'MERCH', coordinates: { x: 40, y: 70 } },
];

async function seed() {
  console.log('Seeding Events...');
  await db.collection('events').doc('match_123').set(mockMatchData);
  
  console.log('Seeding Timeline...');
  for (const [i, event] of mockTimelineEvents.entries()) {
    await db.collection('timeline').doc(`event_${i}`).set(event);
  }

  console.log('Seeding Food...');
  for (const [i, item] of mockFoodItems.entries()) {
    await db.collection('food').doc(`food_${i}`).set(item);
  }

  console.log('Seeding Map Locations...');
  for (const [i, loc] of mockMapLocations.entries()) {
    await db.collection('mapLocations').doc(`loc_${i}`).set(loc);
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});

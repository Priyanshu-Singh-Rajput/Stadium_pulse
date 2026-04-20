# ANTIGRAVITY — Stadium Pulse

A high-performance, real-time stadium experience platform built with **Next.js**, **Firebase/Firestore** (GCP), and deployed on **Google Cloud Run**.

## Features

- **Live Match Hub** — Real-time scores, timeline, and highlights
- **Stadium Eats** — Order food to your seat with category filtering
- **Venue Map** — Interactive map with animated location pins
- **Event Pass** — Digital ticket with QR code and loyalty points

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (React 19), Pure CSS Animations |
| Backend | Next.js API Routes (Route Handlers) |
| Database | Google Cloud Firestore (via `firebase-admin`) |
| Deployment | Google Cloud Run (Docker) |
| Design | Glassmorphism, CSS Keyframes, Gradient Typography |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Firestore Database** (Build → Firestore → Create database).
3. Go to **Project Settings → Service Accounts → Generate new private key**.
4. Set the path to your key in `.env.local`:

```bash
# In .env.local
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/key.json
```

### 3. Seed the database

```bash
# This will use the path in your .env.local or GOOGLE_APPLICATION_CREDENTIALS
npm run seed
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Cloud Run

### Build the Docker image

```bash
docker build -t antigravity .
```

### Push to Google Container Registry

```bash
# Tag
docker tag antigravity gcr.io/YOUR_PROJECT_ID/antigravity

# Push
docker push gcr.io/YOUR_PROJECT_ID/antigravity
```

### Deploy to Cloud Run

```bash
gcloud run deploy antigravity \
  --image gcr.io/YOUR_PROJECT_ID/antigravity \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

> [!NOTE]
> On Cloud Run, the app will automatically use the default service account. Ensure the service account has the **Cloud Datastore User** role to access Firestore.

## Project Structure

```
src/
├── app/
│   ├── api/             # Backend API routes (Firestore)
│   │   ├── food/
│   │   ├── map/locations/
│   │   └── match/live|highlights/
│   ├── eats/            # Food ordering page
│   ├── map/             # Venue map page
│   ├── wallet/          # Digital ticket page
│   ├── globals.css      # Design system & animations
│   ├── layout.tsx       # Root layout (fonts)
│   └── page.tsx         # Live match hub
├── components/          # Reusable UI components
│   ├── ActionChip.tsx
│   ├── BottomNav.tsx
│   ├── Button.tsx
│   └── PulseCard.tsx
├── lib/
│   ├── api.ts           # Frontend API client
│   └── firebase-admin.ts # Firebase Admin SDK init
└── types/
    └── index.ts         # TypeScript interfaces
scripts/
└── seed-firestore.js    # Database seeder
Dockerfile               # Cloud Run container
```

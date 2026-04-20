import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

if (!admin.apps.length) {
  try {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (keyPath && fs.existsSync(path.resolve(keyPath))) {
      // Local dev: read the service account key from a file
      const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(keyPath), 'utf-8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });
    } else {
      // Cloud Run: uses the default service account automatically
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = admin.firestore();

export { db, admin };

import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Handle the case where the private key might be escaped in the env var
            privateKey: privateKey?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = admin.firestore();

export { db };

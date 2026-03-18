import { NextResponse } from 'next/server';
import admin from '@/lib/firebase';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const db = admin.firestore();

        // Insert into Firestore
        await db.collection('Feedback').add({
            name,
            email,
            message,
            createdAt: admin.firestore.Timestamp.now()
        });

        return NextResponse.json(
            { success: true, message: 'Feedback submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Feedback API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

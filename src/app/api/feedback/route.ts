import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Insert into Firestore
        await db.collection('Feedback').add({
            name,
            email,
            message,
            createdAt: Timestamp.now()
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

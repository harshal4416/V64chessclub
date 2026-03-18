import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const db = await getDb();

        // Insert into DB
        const result = await db.run(
            'INSERT INTO Feedback (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        if (result.changes === 1) {
            return NextResponse.json(
                { success: true, message: 'Feedback submitted successfully' },
                { status: 200 }
            );
        } else {
            throw new Error('Failed to insert record');
        }
    } catch (error) {
        console.error('Feedback API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

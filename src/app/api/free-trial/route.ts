import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { fullName, email, phone, country } = await request.json();

        if (!fullName || !email || !phone || !country) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Server-side validation for exactly 10 digits
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            return NextResponse.json(
                { error: 'Phone number must be exactly 10 digits' },
                { status: 400 }
            );
        }

        const db = await getDb();

        // Insert into DB
        const result = await db.run(
            'INSERT INTO FreeTrial (fullName, email, phone, country) VALUES (?, ?, ?, ?)',
            [fullName, email, phoneDigits, country]
        );

        if (result.changes === 1) {
            return NextResponse.json(
                { success: true, message: 'Free trial application submitted successfully' },
                { status: 200 }
            );
        } else {
            throw new Error('Failed to insert record');
        }
    } catch (error) {
        console.error('Free Trial API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

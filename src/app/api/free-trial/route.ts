import { NextResponse } from 'next/server';
import admin from '@/lib/firebase';

export async function POST(req: Request) {
    try {
        const { fullName, email, phone, country } = await req.json();

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

        const db = admin.firestore();

        // Insert into Firestore
        await db.collection('FreeTrial').add({
            fullName,
            email,
            phone: phoneDigits,
            country,
            status: 'Pending',
            createdAt: admin.firestore.Timestamp.now()
        });

        return NextResponse.json(
            { success: true, message: 'Free trial application submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Free Trial API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import admin from '@/lib/firebase';

export async function GET() {
    try {
        const db = admin.firestore();
        // Fetch all records, newest first
        const trialsSnapshot = await db.collection('FreeTrial').orderBy('createdAt', 'desc').get();
        const feedbacksSnapshot = await db.collection('Feedback').orderBy('createdAt', 'desc').get();
        const admissionsSnapshot = await db.collection('Admissions').orderBy('createdAt', 'desc').get();

        const trials = trialsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
        }));

        const feedbacks = feedbacksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
        }));

        const admissions = admissionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
        }));

        return NextResponse.json({ trials, feedbacks, admissions }, { status: 200 });
    } catch (error) {
        console.error('Admin Fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');

        if (!type || !id) {
            return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
        }

        const db = admin.firestore();
        let collectionName = '';
        if (type === 'trial') collectionName = 'FreeTrial';
        else if (type === 'feedback') collectionName = 'Feedback';
        else if (type === 'admission') collectionName = 'Admissions';
        else return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

        await db.collection(collectionName).doc(id).delete();

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Admin Delete error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, type, status } = await req.json();

        if (!id || !type || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = admin.firestore();
        let collectionName = '';
        if (type === 'trial') collectionName = 'FreeTrial';
        else if (type === 'admission') collectionName = 'Admissions';
        else return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Record not found' }, { status: 404 });
        }

        const data = doc.data();
        await docRef.update({ status });

        // Try to send email status update
        const { sendStatusEmail } = await import('@/lib/email');
        try {
            if (data?.email && data?.fullName) {
                await sendStatusEmail(data.email, data.fullName, status);
            }
        } catch (emailError) {
            console.error('Failed to send status email:', emailError);
        }

        return NextResponse.json({ success: true, status }, { status: 200 });

    } catch (error) {
        console.error('Admin Patch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

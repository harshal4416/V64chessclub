import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
    try {
        const db = await getDb();

        // Fetch all records, newest first
        const trials = await db.all('SELECT * FROM FreeTrial ORDER BY createdAt DESC');
        const feedbacks = await db.all('SELECT * FROM Feedback ORDER BY createdAt DESC');
        const admissions = await db.all('SELECT * FROM Admissions ORDER BY createdAt DESC');

        return NextResponse.json({ trials, feedbacks, admissions }, { status: 200 });
    } catch (error) {
        console.error('Admin Fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const id = searchParams.get('id');

        if (!type || !id) {
            return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
        }

        const db = await getDb();
        let result;

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        if (type === 'trial') {
            result = await db.run('DELETE FROM FreeTrial WHERE id = ?', numericId);
        } else if (type === 'feedback') {
            result = await db.run('DELETE FROM Feedback WHERE id = ?', numericId);
        } else if (type === 'admission') {
            result = await db.run('DELETE FROM Admissions WHERE id = ?', numericId);
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        if (result.changes === 1) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Record not found' }, { status: 404 });
        }

    } catch (error) {
        console.error('Admin Delete error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, type, status } = await request.json();

        if (!id || !type || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = await getDb();
        let record;
        let updateQuery;

        if (type === 'trial') {
            record = await db.get('SELECT fullName, email FROM FreeTrial WHERE id = ?', id);
            updateQuery = 'UPDATE FreeTrial SET status = ? WHERE id = ?';
        } else if (type === 'admission') {
            record = await db.get('SELECT fullName, email FROM Admissions WHERE id = ?', id);
            updateQuery = 'UPDATE Admissions SET status = ? WHERE id = ?';
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        if (!record) {
            return NextResponse.json({ error: 'Record not found' }, { status: 404 });
        }

        const result = await db.run(updateQuery, status, id);

        if (result.changes === 1) {
            const { sendStatusEmail } = await import('@/lib/email');

            try {
                await sendStatusEmail(record.email, record.fullName, status);
            } catch (emailError) {
                console.error('Failed to send status email:', emailError);
            }

            return NextResponse.json({ success: true, status }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
        }

    } catch (error) {
        console.error('Admin Patch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

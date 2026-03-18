import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { Timestamp } from 'firebase-admin/firestore';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const country = formData.get('country') as string;
        const paymentScreenshot = formData.get('paymentScreenshot') as File;

        if (!fullName || !email || !phone || !country || !paymentScreenshot) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Save file to public/uploads/admissions
        const bytes = await paymentScreenshot.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'admissions');
        await mkdir(uploadDir, { recursive: true });

        const filename = `${uuidv4()}-${paymentScreenshot.name.replace(/\s+/g, '_')}`;
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const relativePath = `/uploads/admissions/${filename}`;

        // Insert into Firestore
        await db.collection('Admissions').add({
            fullName,
            email,
            phone,
            country,
            paymentScreenshot: relativePath,
            status: 'Pending',
            createdAt: Timestamp.now()
        });

        return NextResponse.json({ success: true, message: 'Admission application submitted successfully' }, { status: 201 });
    } catch (error) {
        console.error('Admission submission error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

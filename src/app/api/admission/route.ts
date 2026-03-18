import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
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

        const db = await getDb();
        await db.run(
            'INSERT INTO Admissions (fullName, email, phone, country, paymentScreenshot) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, phone, country, relativePath]
        );

        return NextResponse.json({ success: true, message: 'Admission application submitted successfully' }, { status: 201 });
    } catch (error) {
        console.error('Admission submission error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

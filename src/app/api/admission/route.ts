import { NextResponse } from "next/server";
import admin from "@/lib/firebase";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const country = formData.get("country") as string;
        const proofUrl = formData.get("proofUrl") as string;

        if (!fullName || !email || !phone || !country || !proofUrl) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const db = admin.firestore();

        await db.collection("admissions").add({
            fullName,
            email,
            phone,
            country,
            proofUrl,
            status: "Pending",
            createdAt: admin.firestore.Timestamp.now(),
        });

        return NextResponse.json(
            { success: true, message: "Admission submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Admission API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

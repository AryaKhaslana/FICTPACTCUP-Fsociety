import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Sesuaiin path prisma lu
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { submissionId, rejectMessage } = body;

        // 1. Bongkar brankas UMKM yang nge-Revisi
        const cookieStore = await cookies();
        const token = cookieStore.get('fictpact_token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const currentUserId = decoded.id; // ID Boss UMKM

        // 2. JALAN NINJA RELATIONAL DEWA: Nge-Revisi & Catet Alasannya!
        const result = await prisma.$transaction(async (tx) => {
            // A. Ambil data submission + detail quest-nya
            const submission = await tx.submission.findUnique({
                where: { id: parseInt(submissionId) },
                include: { quest: true }
            });

            if (!submission || submission.quest.creatorId !== currentUserId) {
                throw new Error("Lu bukan Boss yang bikin misi ini woy!");
            }

            // B. UPDATE STATUS: Submission jadi REJECTED & Quest balik ke MEDAN PERANG
            // (Asumsi di schema Prisma, Submission lu ada field rejectMessage)
            await tx.submission.update({ 
                where: { id: submission.id }, 
                data: { status: 'REJECTED' } // (RE rejected gausah fileUrl=null biar pahlawan liat kesalahannya)
                // data: { status: 'REJECTED', rejectMessage: rejectMessage } // Uncomment kalo schema lu udah ada rejectMessage
            });
            await tx.quest.update({ where: { id: submission.questId }, data: { status: 'IN_PROGRESS' } });

            return submission;
        });

        return NextResponse.json({ success: true, message: "Misi di-Revisi dan balik ke Medan Perang!", data: result });
    } catch(error: any) {
        console.error("Gagal nge-revisi misi broskie:", error);
        return NextResponse.json({ success: false, message: error.message || "server meledak" });
    }
}
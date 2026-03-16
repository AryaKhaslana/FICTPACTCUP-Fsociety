import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia_dong');

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const tokenDariCookie = cookieStore.get('fictpact_token')?.value;

        if (!tokenDariCookie) {
            return NextResponse.json({ success: false, message: "akses ditolak! gak ada cookie"}, { status: 401 });
        }

        let payload;
        try {
            const verified = await jwtVerify(tokenDariCookie, secret);
            payload = verified.payload;
        } catch (error) {
            return NextResponse.json({ success: false, message: "token basi" }, { status: 401 })
        }

        const body = await request.json();
        const { submissionId } = body;

        if (!submissionId) {
            return NextResponse.json({ success: false, message: "ID tugasnya manaa woy"})
        }

        const submission = await prisma.submission.findUnique({
            where: { id: Number(submissionId) }, // <--- TAMBAHIN INI!
            include: { quest: true }
        })

        if (!submission) {
            return NextResponse.json({ success: false, message: " Tugas kaga ketemu"}, { status: 404 });
        }
        if (submission.status === 'APPROVED') {
            return NextResponse.json({ success: false, message: "Buset, ini tugas udah di acc"}, { status: 400 });
        }

        await prisma.submission.update({
            where: { id: Number(submissionId) }, // <--- TAMBAHIN INI JUGA!
            data: { status: 'APPROVED'}
        });

        let progress = await prisma.studentProgress.findFirst({
            where: {
                userId: submission.studentId,
                skillId: submission.quest.categoryId
            }
        });

        if (progress) {
            // 🔥 LOGIKA NAIK LEVEL KALAU PROGRESS UDAH ADA 🔥
            const totalXpBaru = progress.currentXp + submission.quest.rewardXp;
            const levelBaru = Math.floor(totalXpBaru / 1000) + 1; // Rumus Sakti Naik Level

            await prisma.studentProgress.update({
                where: { id: progress.id },
                data: { 
                    currentXp: totalXpBaru,
                    level: levelBaru 
                }
            });
        } else {
        
            const totalXpBaru = submission.quest.rewardXp;
            const levelBaru = Math.floor(totalXpBaru / 1000) + 1;
            await prisma.studentProgress.create({
                data: {
                    userId: submission.studentId,
                    skillId: submission.quest.categoryId,
                    currentXp: totalXpBaru,
                    level: levelBaru
                }
            });
        }

        return NextResponse.json({
            success: true, 
            message: `Mantap! Tugas di acc, user dapat tambahan ${submission.quest.rewardXp} XP!`,
        }, { status: 200 });
    } catch (error) {
        console.error("waduh bro error:", error);
        return NextResponse.json({ success: false, message: " server mbledos"}, { status: 500 });
    }
}
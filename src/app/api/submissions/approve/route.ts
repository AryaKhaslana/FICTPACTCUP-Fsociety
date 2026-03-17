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
        // 🔥 JURUS SAKTI: TANGKEP SEMUA VARIABEL DARI FRONTEND 🔥
        const { submissionId, feedback, rating } = body;

        if (!submissionId) {
            return NextResponse.json({ success: false, message: "ID tugasnya manaa woy"})
        }

        const submission = await prisma.submission.findUnique({
            where: { id: Number(submissionId) },
            include: { quest: true }
        })

        if (!submission) {
            return NextResponse.json({ success: false, message: " Tugas kaga ketemu"}, { status: 404 });
        }
        if (submission.status === 'APPROVED') {
            return NextResponse.json({ success: false, message: "Buset, ini tugas udah di acc"}, { status: 400 });
        }

        // 🔥 SEKARANG VS CODE GAK BAKAL NGAMUK LAGI 🔥
        await prisma.submission.update({
            where: { id: Number(submissionId) }, 
            data: { 
                status: 'APPROVED',
                umkmReview: feedback || '',    
                rating: Number(rating) || 5
            }
        });

        let progress = await prisma.studentProgress.findFirst({
            where: {
                userId: submission.studentId,
                skillId: submission.quest.categoryId
            }
        });

        if (progress) {
            const totalXpBaru = progress.currentXp + submission.quest.rewardXp;
            const levelBaru = Math.floor(totalXpBaru / 1000) + 1;

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
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia_dong');

export async function PUT(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "akses ditolak!"}, { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        let payload;
        try {
            const verified = await jwtVerify(token, secret);
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
            where: {id: submissionId},
            include: { quest: true }
        })

        if (!submission) {
            return NextResponse.json({ success: false, message: " Tugas kaga ketemu"}, { status: 404 });
        }
        if (submission.status === 'APPROVED') {
            return NextResponse.json({ success: false, message: "Buset, ini tugas udah di acc"}, { status: 400 });
        }

        await prisma.submission.update({
            where: {id: submissionId},
            data: { status: 'APPROVED'}
        });

        let progress = await prisma.studentProgress.findFirst({
            where: {
                userId: submission.studentId,
                skillId: submission.quest.categoryId
            }
        });

        if (progress) {
            await prisma.studentProgress.update({
                where: { id: progress.id },
                data: { currentXp: progress.currentXp + submission.quest.rewardXp }
            });
        } else {
            await prisma.studentProgress.create({
                data: {
                    userId: submission.studentId,
                    skillId: submission.quest.categoryId,
                    currentXp: submission.quest.rewardXp,
                    level: 1
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
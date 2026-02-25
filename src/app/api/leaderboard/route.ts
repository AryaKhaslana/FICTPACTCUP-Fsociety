import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const leaderboardData = await prisma.studentProgress.findMany({
            take: 10,
            orderBy: {
                currentXp: 'desc',
            },

            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true,
                    },
                },
                skill: {
                    select: {
                        name: true,
                        iconUrl: true
                    }
                }
            },
        });

        return NextResponse.json({
            success: true,
            message: "data leaderboard berhasil ditarik",
            data: leaderboardData,
        }, { status: 200 });
    } catch (error) {
        console.error(" data nya rusak nih, ada error di lb", error);
        return NextResponse.json ({
            success: false,
            message: "server lagi ngambek woeee",
        }, { status: 500 }) 
    }
}
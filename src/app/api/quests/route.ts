import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const quests = await prisma.quest.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    }
                },
                category: true,
            }
        });

        return NextResponse.json({ success: true, data: quests });
    } catch(error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "server lu meledak bro"})
    }
   
}
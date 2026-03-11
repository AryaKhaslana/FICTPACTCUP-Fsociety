import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // Jangan lupa import jwt bro

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

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. BONGKAR BRANKAS JWT BUAT DAPET ID UMKM YANG LAGI LOGIN
        const cookieStore = await cookies();
        const token = cookieStore.get('fictpact_token')?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "Login dulu bos UMKM!" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        const currentUserId = decoded.id;

        // 2. JALAN NINJA CATEGORY ID (Ngarubah Teks UI jadi Angka DB)
        // Karena di UI lu ngirim string ("Desain / UI UX"), tapi DB butuh angka (categoryId)
        // Asumsi ID kategori di database lu: 1=Desain, 2=Video, 3=WebDev
        let mappedCategoryId = 1; 
        if (body.kategori === 'Video Editing') mappedCategoryId = 3;
        if (body.kategori === 'Web Dev') mappedCategoryId = 2;

        // 3. TANCAPIN KE DATABASE SESUAI SCHEMA LU!
        const newQuest = await prisma.quest.create({
            data: {
                title: body.title,
                description: body.description,
                rewardXp: parseInt(body.xp), // Sesuai schema: rewardXp
                status: 'OPEN',              // Misi baru statusnya OPEN
                creatorId: currentUserId,    // Diambil dari JWT
                categoryId: mappedCategoryId // Hasil konversi dari teks ke angka
                
                // Rank & Deadline kita skip masukin DB karena kolomnya belum lu bikin wkwk
            }
        });

        return NextResponse.json({ success: true, data: newQuest });
    } catch(error) {
        console.error("Error pas create Quest:", error);
        return NextResponse.json({ success: false, message: "server lu meledak bro pas naruh bounty" }, { status: 500 });
    }
}
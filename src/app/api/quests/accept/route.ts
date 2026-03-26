import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// 🔥 IMPORT BUAT BACA TOKEN JWT 🔥
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request) {
  try {
    // 1. BACA SIAPA YANG LAGI LOGIN DARI TOKEN
    const cookieStore = await cookies();
    const token = cookieStore.get('fictpact_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Login dulu broskie!" }, { status: 401 });
    }

    // Ekstrak ID dari token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const currentUserId = Number(payload.id); // INI DIA ID ASLI SI USER!

    // 2. LANJUT LOGIKA AMBIL QUEST
    const body = await request.json();
    const { questId } = body;

    if (!questId) {
      return NextResponse.json({ success: false, message: "ID Quest-nya mana woy!" }, { status: 400 });
    }

    // 3. MASUKIN DATA PAKE ID USER YANG ASLI
    const newSubmission = await prisma.submission.create({
      data: {
        questId: Number(questId),
        studentId: currentUserId, // 🔥 UDAH GAK HARDCODE 2 LAGI YAK! AMAN!
        status: 'PENDING', 
        fileUrl: '', 
      }
    });

    // 4. UBAH STATUS MISI JADI IN_PROGRESS
    await prisma.quest.update({
      where: { id: Number(questId) },
      data: { 
        status: 'IN_PROGRESS' 
      }
    });

    return NextResponse.json({
      success: true,
      message: "Misi berhasil diamankan!",
      data: newSubmission
    }, { status: 201 });

  } catch (error) {
    console.error("ALASAN MELEDAK:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Server meledak pas ngambil misi!" 
    }, { status: 500 });
  }
}
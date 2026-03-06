import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Panggil Prisma jalur sakti anti nyasar
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request) {
  try {
    const body = await request.json();
    const { questId } = body;

    if (!questId) {
      return NextResponse.json({ success: false, message: "ID Quest-nya mana woy!" }, { status: 400 });
    }

    // BIKIN DATA BARU DI DATABASE 🚀
    // Kita buatin tiket submission buat si Naruto
    const newSubmission = await prisma.submission.create({
      data: {
        questId: Number(questId),
        studentId: 3, // ⚠️ Masih pakai ID Naruto (3) buat ngetes
        status: 'PENDING', // Statusnya masih dikerjain
        fileUrl: '', // Kosongin dulu karena belum dikumpulin link tugasnya
      }
    });

    return NextResponse.json({
      success: true,
      message: "Misi berhasil diamankan!",
      data: newSubmission
    }, { status: 201 });

  } catch (error) {
    console.error("ALASAN MELEDAK:", error);
    return NextResponse.json({ success: false, message: "Server meledak pas ngambil misi!" }, { status: 500 });
  }
}
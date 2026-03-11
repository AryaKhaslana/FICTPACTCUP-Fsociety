import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
    const newSubmission = await prisma.submission.create({
      data: {
        questId: Number(questId),
        // 🔥 GANTI JADI 2 BROS! Karena di DB lu siswa (Gojouuuuu) itu ID-nya 2!
        studentId: 2, 
        status: 'PENDING', 
        fileUrl: '', 
      }
    });

    await prisma.quest.update({
      where: { id: Number(questId) },
      data: { 
        status: 'IN_PROGRESS' // Ubah jadi IN_PROGRESS biar pindah kolom!
      }
    });

    return NextResponse.json({
      success: true,
      message: "Misi berhasil diamankan!",
      data: newSubmission
    }, { status: 201 });

  } catch (error) {
    console.error("ALASAN MELEDAK:", error);
    // 🔥 BIAR ERROR ASLINYA MUNCUL DI POP-UP ALERT LU, BUKAN TEKS DEFAULT!
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Server meledak pas ngambil misi!" 
    }, { status: 500 });
  }
}
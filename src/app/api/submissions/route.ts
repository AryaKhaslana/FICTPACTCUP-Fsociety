import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// JURUS SAKTI: Panggil Prisma langsung di sini, ga perlu pusing mikirin folder lib!
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileUrl, submissionId, pesanUMKM } = body;

    // Cek kalau input kosong
    if (!fileUrl || !submissionId) {
      return NextResponse.json({ success: false, message: "Link tugas atau ID kosong woy!" }, { status: 400 });
    }

    // UPDATE DATABASE (Ubah status jadi APPROVED sesuai database lu)
    const updatedSubmission = await prisma.submission.update({
      where: {
        id: Number(submissionId)
      },
      data: {
        fileUrl: fileUrl,
        status: 'APPROVED', 
        feedback: pesanUMKM
      }
    });

    return NextResponse.json({
      success: true,
      message: "Tugas berhasil dikumpul bro, mantap!",
      data: updatedSubmission
    }, { status: 200 });

  } catch (error) {
    console.error("ALASAN SERVER MELEDAK:", error);
    return NextResponse.json({ success: false, message: "Server meledak pas ngumpulin tugas!" }, { status: 500 });
  }
}
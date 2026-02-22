import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileUrl, questId, studentId } = body;

    if (!fileUrl || !questId || !studentId) {
      return NextResponse.json({ success: false, message: "Link tugas, ID Misi, sama ID Lu mana woy!" }, { status: 400 });
    }

    // 3. Masukin tugas ke Database
    const newSubmission = await prisma.submission.create({
      data: {
        fileUrl: fileUrl,
        questId: questId, 
        studentId: studentId, 
        status: 'PENDING' 
      }
    });

    // 4. Kasih laporan sukses
    return NextResponse.json({
      success: true,
      message: "tugas berhasil bro, tinggal nunggu acc nih",
      data: newSubmission
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server meledak pas ngumpulin tugas!" }, { status: 500 });
  }
}
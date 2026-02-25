import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia_dong');

export async function POST(request) {
  try {

   const tokenCookie = request.cookies.get('fictpact_token');
   let token = tokenCookie?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "Akses Ditolak! Mana KTP lu woy!" }, { status: 401 });
    }

    let payload;
    try {
      const verified = await jwtVerify(token, secret);
      payload = verified.payload;
    } catch (error) {
      return NextResponse.json({ success: false, message: "KTP lu palsu atau udah basi Bro!" }, { status: 401 });
    }

    const studentIdDariToken = payload.id;

    const body = await request.json();
    const { fileUrl, questId } = body;

    if (!fileUrl || !questId) {
      return NextResponse.json({ success: false, message: "Link tugas, ID Misi, sama ID Lu mana woy!" }, { status: 400 });
    }

    // 3. Masukin tugas ke Database
    const newSubmission = await prisma.submission.create({
      data: {
        fileUrl: fileUrl,
        questId: questId, 
        studentId: studentIdDariToken, 
        status: 'PENDING' 
      }
    });

    // 4. Kasih laporan sukses
    return NextResponse.json({
      success: true,
      message: "tugas berhasil bro, tinggal nunggu acc nih",
      data: newSubmission
    }, { status: 201 });

  } catch (error) {
    console.error("waduh error woy, error pas ngumpulin tugas", error);
    return NextResponse.json({ success: false, message: "Server meledak pas ngumpulin tugas!" }, { status: 500 });
  }
}
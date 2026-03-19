import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // 👈 SESUAIKAN PATH PRISMA LU YAK!
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET(request) {
  try {
    // 1. Cek Token Satpam
    const cookieStore = await cookies();
    const token = cookieStore.get('fictpact_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Belum login bos!" }, { status: 401 });
    }

    // 2. Bongkar Brankas Token (Cari tau siapa Siswa yang lagi login)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const currentUserId = Number(payload.id);

    // 🔥 3. JALUR HACKER: Tarik data riwayat Misi (Submissions) si Siswa
    const submissions = await prisma.submission.findMany({
      where: { studentId: currentUserId },
      include: {
        quest: {
          include: { creator: true } // Biar kita dapet nama UMKM-nya juga!
        }
      },
      orderBy: { updatedAt: 'desc' }, // Urutin dari yang paling baru di-update
      take: 10 // Ambil 10 terbaru aja biar gak lemot
    });

    // 🔥 4. SULAP DATA MISI JADI FORMAT NOTIFIKASI ESTETIK LU!
    const notifications = submissions.map((sub) => {
      let type, text, highlight, isRedText;

      const namaUMKM = sub.quest?.creator?.username || "Bos UMKM";
      const xpReward = sub.quest?.xpReward || sub.quest?.rewardXp || 0;

      // LOGIKA BUNGLON NYALA DI BACKEND!
      if (sub.status === 'APPROVED') {
        type = 'success';
        text = `${namaUMKM} menyetujui hasil kerjamu di misi "${sub.quest.title}"!`;
        highlight = `+${xpReward} XP`;
        isRedText = false;
      } else if (sub.status === 'REJECTED') {
        type = 'warning';
        text = `Hasil kerjamu di misi "${sub.quest.title}" butuh revisi. Jangan menyerah Kapten!`;
        highlight = '';
        isRedText = true;
      } else {
        // Kalau statusnya masih PENDING
        type = 'quest';
        text = `Misi "${sub.quest.title}" sedang menunggu review dari ${namaUMKM}.`;
        highlight = '';
        isRedText = false;
      }

      // Format tanggal biar estetik (Contoh: "20 Mar, 05:30")
      const timeFormatted = new Date(sub.updatedAt).toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
      });

      return {
        id: sub.id,
        type: type,
        text: text,
        highlight: highlight,
        time: timeFormatted,
        unread: true, // Default titik merah nyala semua
        isRedText: isRedText,
        isDimmed: false
      };
    });

    // 5. Kirim data yang udah disulap ke Frontend!
    return NextResponse.json({ success: true, data: notifications });

  } catch (error) {
    console.error("Error fetch notif:", error);
    return NextResponse.json({ success: false, message: "Server Notif meledak broskie!" }, { status: 500 });
  }
}
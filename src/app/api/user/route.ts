import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 
import prisma from '../../../lib/prisma'; // Pastikan path ini bener ya broskie!
import bcrypt from 'bcryptjs';

// Fungsi helper buat ngubah JWT_SECRET jadi format yang dibaca sama 'jose'
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET belum diset di file .env lu broskie!');
  }
  return new TextEncoder().encode(secret);
};

// 🔥 FUNGSI GET 🔥
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Belum login broskie!' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.id) },
      // 🔥 TAMBAHIN coverUrl: true DI SINI BIAR PAS BUKA SETTING, BANNER LAMA NONGOL 🔥
      select: { username: true, bio: true, avatarUrl: true, email: true, coverUrl: true } 
    });
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.json({ success: false, message: 'Token tidak valid atau expired' }, { status: 401 });
  }
}

// 🔥 FUNGSI PUT 🔥
export async function PUT(req: Request) { 
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Belum login broskie!' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    
    const body = await req.json();
    // 🔥 TANGKEP coverUrl DARI FORM SETTING 🔥
    const { username, bio, avatarUrl, coverUrl, newPassword } = body;

    // 🔥 TAMBAHIN coverUrl?: string DI DALAM TIPE DATANYA 🔥
    let updateData: {
      username?: string;
      bio?: string;
      avatarUrl?: string;
      coverUrl?: string; 
      password?: string;
    } = {};
    
    if (username !== undefined) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    // 🔥 MASUKIN DATA coverUrl KE PAYLOAD YANG MAU DI-SAVE KE DATABASE 🔥
    if (coverUrl !== undefined) updateData.coverUrl = coverUrl;

    if (newPassword && newPassword.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(payload.id) },
      data: updateData
    });

    return NextResponse.json({ success: true, message: 'Siuuu! Profil & Banner berhasil diupdate!' });
  } catch (error) {
    console.error("Gagal update DB:", error);
    return NextResponse.json({ success: false, message: 'Gagal update ke Database!' }, { status: 500 });
  }
} 
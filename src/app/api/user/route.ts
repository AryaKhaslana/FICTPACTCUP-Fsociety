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

// 🔥 FUNGSI GET (TETEP SAMA) 🔥
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
      select: { username: true, bio: true, avatarUrl: true, email: true } 
    });
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.json({ success: false, message: 'Token tidak valid atau expired' }, { status: 401 });
  }
}

// 🔥 FUNGSI PUT (UDAH DIKEBALIN DARI ERROR TYPESCRIPT) 🔥
export async function PUT(req: Request) { // 👈 Kasih tau req itu tipenya Request
  const cookieStore = await cookies();
  const token = cookieStore.get('fictpact_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Belum login broskie!' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    
    const body = await req.json();
    const { username, bio, avatarUrl, newPassword } = body;

    // 🔥 INI OBATNYA BROSKIE! Kita deklarasiin tipe datanya 🔥
    let updateData: {
      username?: string;
      bio?: string;
      avatarUrl?: string;
      password?: string;
    } = {};
    
    // Sekarang TypeScript gak bakal marah lagi!
    if (username !== undefined) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    if (newPassword && newPassword.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(payload.id) },
      data: updateData
    });

    return NextResponse.json({ success: true, message: 'Siuuu! Profil berhasil diupdate!' });
  } catch (error) {
    console.error("Gagal update DB:", error);
    return NextResponse.json({ success: false, message: 'Gagal update ke Database!' }, { status: 500 });
  }
}
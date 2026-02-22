import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose'; // <--- Mesin pencetak KTP

const prisma = new PrismaClient();
// Ambil stempel rahasia dari .env
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia_dong');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email sama Password diisi dulu ya" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return NextResponse.json({ success: false, message: "Email lu kaga kedaftar woy, daftar dulu sana" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ success: false, message: "Password lu salah broo Coba inget-inget lagi!" }, { status: 401 });
    }

    const token = await new SignJWT({ 
      id: user.id, 
      username: user.username, 
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d') 
      .sign(secret);

    // Bikin surat balasan sukses
    const response = NextResponse.json({ 
      success: true, 
      message: "Login sukses, nikmati ktp mu",
      user: { id: user.id, username: user.username, role: user.role }
    });

    response.cookies.set({
      name: 'fictpact_token',
      value: token,
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server meledak pas ngecek login!" }, { status: 500 });
  }
}
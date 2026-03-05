import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role, nama, namaBisnis, kategoriBisnis, lokasi } = body;

        const finalUsername = role === 'UMKM' ? namaBisnis : nama;
        const finalRole = role === 'SISWA' ? 'STUDENT' : 'UMKM';

        if (!finalUsername || !email || !password) {
            return NextResponse.json({ success: false, message: "data lu kurang lengkap bos"}, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, message: "email udah kepake, pakai email yang lain"}, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: finalUsername,
                email: email,
                password: hashedPassword,
                role: finalRole,
                ...(finalRole === 'UMKM' && {
                    kategoriBisnis: kategoriBisnis,
                    lokasi: lokasi
                })
            }
        });

        return NextResponse.json({
            success: true,
            message: "akun sudah dibuat masbro",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch(error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "server meledak hehehee"}, { status: 500 });
    }
}
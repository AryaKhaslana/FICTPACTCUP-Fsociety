import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        
        if (!email || !password ) {
            return NextResponse.json({ success: false, message: "email sama password diisi dulu woy"}, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: {email: email}
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "email lu kaga kedaftar"}, { status: 404 })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ success: false, message: "password lu salah woy, coba diinget inget lagi!"}, { status: 401})
        }

        return NextResponse.json({
            success: true,
            message: "Login sukses, selamat datang",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch(error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "server meledak ini woy"})
    }
}
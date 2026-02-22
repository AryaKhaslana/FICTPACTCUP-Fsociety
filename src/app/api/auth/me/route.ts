import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'rahasia_dong');

export async function GET(request: NextRequest) {
  try {
    let token = request.cookies.get('fictpact_token')?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; 
      }
    }

    if (!token) {
      return NextResponse.json({ success: false, message: "Hayo lu siapa? ktpmu mana, login dulu bos" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      success: true,
      message: "ktp valid, hayukk lewatt bro",
      user: payload
    });

  } catch (error) {
    console.error("KTP Palsu/Expired!");
    return NextResponse.json({ success: false, message: "KTP Palsu atau udah kadaluarsa woy" }, { status: 401 });
  }
}
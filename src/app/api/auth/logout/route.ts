import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Bikin surat balasan
    const response = NextResponse.json({ 
      success: true, 
      message: "Berhasil log out, sampai jumpa lagi pahlawan!" 
    });

    // Bakar KTP-nya (Set cookie jadi kosong dan langsung expired)
    response.cookies.set({
      name: 'fictpact_token',
      value: '',
      expires: new Date(0), // Set waktu ke masa lalu biar otomatis kehapus
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal logout!" }, { status: 500 });
  }
}
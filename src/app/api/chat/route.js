import Pusher from "pusher";
import { NextResponse } from "next/server";

// 1. Kita bangunin mesin Pusher pake kunci dari .env tadi
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export async function POST(req) {
  try {
    // 2. Tangkep pesan yang diketik sama user
    const { text, sender } = await req.json();

    // 3. Suruh Pusher teriak ke channel "chat-room"
    await pusher.trigger("chat-room", "new-message", {
      id: Date.now(),
      text: text,
      sender: sender,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    return NextResponse.json({ success: true, message: "Pesan terkirim secepat kilat! ⚡" });
  } catch (error) {
    console.error("Waduh, Pushernya ngambek:", error);
    return NextResponse.json({ success: false, error: "Gagal ngirim pesan" }, { status: 500 });
  }
}
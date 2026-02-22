# 🚀 XPLocalist (Backend Service)
**Empowering Local UMKM Through Gamified Quests & Sustainable Innovation**

XPLocalist adalah platform *Learning Management System* (LMS) berbasis gamifikasi yang menghubungkan siswa dengan UMKM lokal untuk menyelesaikan misi (Quest) dunia nyata.

Repository ini berisi *source code* untuk **Backend API**, sistem otentikasi, dan manajemen *database*.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Database ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens) via `jose`
- **Security:** bcryptjs (Password Hashing)

## 🔐 Core API Routes (Ready to Use)
Berikut adalah daftar API yang sudah berjalan dengan sistem keamanan JWT (Bearer Token):

* **Auth & Security:**
  * `POST /api/auth/register` : Mendaftarkan user baru (Siswa / UMKM).
  * `POST /api/auth/login` : Autentikasi user dan *generate* JWT Token.
  * `GET /api/auth/me` : Verifikasi JWT Token via *Cookies* atau *Bearer Header*.
* **Quest & Submissions:**
  * `POST /api/submissions` : Mengirimkan URL tugas dari siswa ke UMKM.

## 🚀 How to Run (Untuk Tim Frontend)
1. Clone repo ini: `git clone https://github.com/AryaKhaslana/FICTPACTCUP-Fsociety.git`
2. Masuk ke folder project: `cd education-web`
3. Install dependencies: `npm install`
4. Copy file `.env.example` menjadi `.env` dan isi `JWT_SECRET` serta `DATABASE_URL`.
5. Sinkronisasi Database: `npx prisma db push`
6. Jalankan server: `npm run dev`

---
*Built with passion and lots of caffeine by Fsociety Team (Arya, Fatih, Naraya, Nawfal).*
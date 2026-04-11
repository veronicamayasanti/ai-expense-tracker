# 💰 AI Expense Tracker

Aplikasi pencatat pengeluaran pribadi modern yang didukung oleh AI untuk menerjemahkan bahasa alami menjadi entri pengeluaran yang terstruktur. Kini dilengkapi dengan sistem keamanan JWT dan validasi data yang lebih ketat.

![AI Expense Tracker](https://img.shields.io/badge/Status-Active-success) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green) ![React](https://img.shields.io/badge/React-Frontend-blue) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT4o-orange)

## 🛠️ Teknologi yang Digunakan

### Backend (API & AI Processing)
- **Node.js & Express**: Framework backend utama.
- **Prisma ORM**: Interaksi database MySQL yang type-safe.
- **JWT (JSON Web Token)**: Sistem autentikasi berbasis token untuk keamanan sesi.
- **Bcrypt.js**: Pengamanan password dengan hashing satu arah.
- **OpenAI (GPT-4o)**: NLP Engine untuk mengekstrak data transaksi dari teks natural.

### Frontend (User Interface)
- **React.js (Vite)**: Library UI yang cepat dan reaktif.
- **UserContext API**: Manajemen state autentikasi global.
- **Axios**: Komunikasi data dengan backend melalui interceptor token.
- **Tailwind CSS & Framer Motion**: Antarmuka premium dengan animasi halus.

---

## ⚡ Cara Menjalankan Aplikasi

### 1. Persyaratan Sistem
- Node.js (v18+)
- MySQL Server
- OpenAI API Key

### 2. Setup Backend
1. Masuk ke folder `server/`: `cd server`
2. Instal dependensi: `npm install`
3. Salin `.env.example` menjadi `.env` dan isi variabelnya:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/expense_tracker"
   OPENAI_API_KEY="sk-..."
   JWT_SECRET="masukkan_random_string_panjang_disini"
   JWT_EXPIRES_IN="7d"
   ```
4. Push skema ke database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
5. Jalankan server: `node app.js`

### 3. Setup Frontend
1. Masuk ke folder `client/`: `cd client`
2. Instal dependensi: `npm install`
3. Jalankan development server: `npm run dev`

---

## 🛡️ Fitur Keamanan & Kualitas
- **JWT Authentication**: Setiap request dilindungi oleh Bearer token verification.
- **Data Sanitization**: Backend secara otomatis menghapus password hash dari semua response JSON.
- **AI Loop Guard**: Mencegah loop berulang pada AI tool-calling untuk menghemat kuota token.
- **Standardized Response**: Struktur error dan sukses yang konsisten di seluruh API.

---

## ⚙️ Struktur Proyek
- `/server/middleware/auth.middleware.js` - Verifikasi JWT.
- `/server/controllers/` - Logika Auth, Chat, dan Transaksi.
- `/server/services/aiService.js` - Integrasi OpenAI & Tool Definition.
- `/client/src/store/UserContext.jsx` - Pengaturan session user di frontend.
- `/client/src/services/apiInstance.js` - Interceptor Authorization header.

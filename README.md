# 💰 AI Expense Tracker

Aplikasi pencatat pengeluaran pribadi modern yang didukung oleh AI untuk menerjemahkan bahasa alami (natural language) menjadi entri pengeluaran yang terstruktur.

![AI Expense Tracker](https://img.shields.io/badge/Status-Active-success) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green) ![React](https://img.shields.io/badge/React-Frontend-blue) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT4o-orange)

## 🛠️ Teknologi yang Digunakan

### Backend (API & AI Processing)
- **Node.js**: Sebagai runtime backend utama.
- **Express**: Framework untuk membangun REST API.
- **Prisma ORM**: Menangani interaksi dengan database dan skema generasi.
- **MySQL**: Database relasional untuk menyimpan data pengeluaran.
- **OpenAI (GPT-4o)**: Memproses input teks (misalnya "makan siang 35rb") untuk secara otomatis mengenali *intent* (tujuan) dan mengekstrak data nominal serta kategori.

### Frontend (User Interface)
- **React.js**: Library utama untuk membangun antarmuka pengguna yang interaktif.
- **Vite**: Build tool yang sangat cepat untuk frontend React.
- **Tailwind CSS**: Untuk styling yang modern dan responsif.
- **Lucide React**: Untuk menyematkan ikon-ikon yang elegan.

---

## ⚡ Cara Menjalankan Aplikasi (Quick Start)

### 1. Persyaratan Sistem (Prerequisites)
- [Node.js](https://nodejs.org/) (minimal versi 18+)
- Server MySQL (bisa berjalan secara lokal via XAMPP/Docker atau hosted)
- Akun OpenAI untuk mendapatkan `OPENAI_API_KEY`

### 2. Setup Lingkungan & Database (Backend)

1. Buka terminal dan masuk ke folder `server/`:
   ```bash
   cd server
   ```
2. Instal semua dependensi backend:
   ```bash
   npm install
   ```
3. Buat file `.env` di folder `server/` (jika belum ada) dan sesuaikan kredensial Anda:
   ```env
   # Contoh konfigurasi .env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
   OPENAI_API_KEY="sk-YOUR_KEY_HERE"
   ```
4. Lakukan sinkronisasi skema Prisma ke database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

### 3. Setup Frontend

1. Buka terminal baru dan masuk ke folder `client/`:
   ```bash
   cd client
   ```
2. Instal semua dependensi frontend:
   ```bash
   npm install
   ```

### 4. Menjalankan Aplikasi

Aplikasi berjalan pada dua layanan terpisah (Backend dan Frontend).

**Langkah 1: Jalankan Backend Server**  
Buka terminal di folder `server/` dan jalankan:
```bash
node app.js
```
*Backend akan berjalan di: http://localhost:3000*

**Langkah 2: Jalankan Frontend Server**  
Buka terminal baru di folder `client/` dan jalankan:
```bash
npm run dev
```
*Frontend akan berjalan dan bisa diakses via browser lokal (biasanya di http://localhost:5173)*

---

## 📝 Contoh Prompt / Frasa yang Didukung

Cukup ketikkan secara natural seperti Anda sedang berbicara/chatting:

**Mencatat Pengeluaran:**
- *"Beli bakso 25rb"*
- *"Parkir motor 2k tadi siang"*
- *"Belanja bulanan di minimarket habis 550.000"*

**Mengecek Ringkasan:**
- *"Berapa total pengeluaran saya hari ini?"*
- *"Tampilkan total pengeluaran selama minggu ini"*
- *"Hapus pengeluaran terakhir saya"* (jika didukung)

---

## ⚙️ Struktur Proyek

- `/server/app.js` - Titik masuk (entry point) server backend Express.
- `/server/routes/` - Pengaturan routing API.
- `/server/controllers/` - Logika penanganan request/response API.
- `/server/services/` - Layanan logika bisnis (AI & Database).
- `/server/models/` - Abstraksi query database (Prisma).
- `/server/config/` - Konfigurasi environment.
- `/client/` - Seluruh kode sistem Frontend React.js yang dibangun dengan Vite.

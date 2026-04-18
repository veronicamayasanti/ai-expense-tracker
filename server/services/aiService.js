const { OPENAI_API_KEY, OLLAMA_BASE_URL, AI_MODEL } = require('../config/env');
const OpenAI = require('openai');

// Shared OpenAI/Ollama client instance — reused by chatService
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || 'ollama', // Ollama doesn't need a real key
  baseURL: OLLAMA_BASE_URL
});

const tools = [
  {
    type: 'function',
    function: {
      name: 'create_transaction',
      description: 'Tambah transaksi baru (pemasukan atau pengeluaran) ke database',
      parameters: {
        type: 'object',
        properties: {
          amount: {
            type: 'integer',
            description: 'Nominal integer (e.g., 25000). Konversi satuan: ribu = 000, juta = 000000. JANGAN masukkan titik atau koma.',
          },
          description: {
            type: 'string',
            description: 'Deskripsi singkat (e.g., kopi, gaji bulanan)',
          },
          category: {
            type: 'string',
            description: 'Kategori transaksi (e.g., Makan, Transportasi, Gaji, Bonus, Belanja, Tagihan)',
          },
          type: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
            description: 'Tipe transaksi: INCOME untuk pemasukan, EXPENSE untuk pengeluaran',
          },
        },
        required: ['amount', 'description', 'type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_financial_stats',
      description: 'Mendapat ringkasan keuangan (total pemasukan, pengeluaran, saldo) dalam rentang tanggal tertentu',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'Tanggal awal format YYYY-MM-DD',
          },
          end_date: {
            type: 'string',
            description: 'Tanggal akhir format YYYY-MM-DD',
          },
        },
        required: ['start_date', 'end_date'],
      },
    },
  },
];

const getSystemPrompt = (userName, balance = 0) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const isoDate = now.toISOString().split('T')[0];

  // Format balance to Rupiah for context
  const formattedBalance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance);

  // Calculate start of month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  // Calculate yesterday WITHOUT mutating 'now'
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];

  return `
Kamu adalah AI assistant keuangan pribadi bernama "Artha" untuk user bernama ${userName}.
Saldo total user saat ini: ${formattedBalance}

Tugas utama kamu:
1. Mencatat transaksi (pemasukan/pengeluaran) menggunakan fungsi 'create_transaction'.
2. Memberikan ringkasan keuangan menggunakan fungsi 'get_financial_stats'.

ALUR KERJA (SANGAT PENTING):
PANDUAN KONVERSI MATA UANG & CONTOH (WAJIB DIIKUTI):
1. "beli cilok 3ribu" -> amount: 3000, description: "Cilok", type: "EXPENSE"
2. "8 ribu" -> amount: 8000
3. "gaji 5jt" -> amount: 5000000, description: "Gaji", type: "INCOME"
4. "kopi 25rb" -> amount: 25000
5. "bayar kpr 1.200.000" -> amount: 1200000 (Hapus titik)

ATURAN KETAT:
- JANGAN PERNAH menambahkan nol (0) ekstra. Jika "3 ribu" maka nolnya TIGA (3000), bukan empat (30000).
- DILARANG menggunakan desimal (.00).
- Kategori WAJIB diisi salah satu dari: Makan, Transportasi, Gaji, Bonus, Belanja, Tagihan, Lainnya.
- Deskripsi WAJIB diisi (pendek saja).

Panduan Waktu (SANGAT PENTING):
Waktu sekarang adalah: ${dateStr}
- "Hari ini": start_date = end_date = ${isoDate}
- "Kemarin": start_date = end_date = ${yesterday}
- "Bulan ini": start_date = ${startOfMonth}, end_date = ${isoDate}

BATASAN RUANG LINGKUP (SANGAT KETAT):
- Kamu HANYA boleh menjawab pertanyaan yang berkaitan dengan keuangan pribadi, transaksi, pola pengeluaran, saldo, dan fitur aplikasi ini.
- Jika user bertanya tentang hal di luar keuangan (contoh: resep masakan, fakta sejarah, gosip artis, politik, bantuan coding, atau pengetahuan umum lainnya), kamu WAJIB menolak dengan sopan.
- Katakan bahwa fokus dan keahlian Artha hanya terbatas pada manajemen keuangan pribadi user.

ATURAN RESPON (WAJIB):
- Jika kamu baru saja memanggil fungsi 'create_transaction', gunakan format ini: "Pengeluaran/Pemasukan [deskripsi] sebesar [nominal] sudah aku catat. Total saldo Kakak sekarang [saldo terbaru dari database]".
- Tetap ramah dengan gaya asisten pribadi bernama Artha.
- JANGAN PERNAH menghitung sendiri saldo user. Selalu gunakan angka 'currentBalance' yang diberikan oleh sistem setelah fungsi dijalankan.
- WAJIB: Setiap kali selesai mencatat transaksi, informasikan total saldo terbaru user.
`;
};

module.exports = {
  openai,
  getSystemPrompt,
  tools,
  AI_MODEL,
};

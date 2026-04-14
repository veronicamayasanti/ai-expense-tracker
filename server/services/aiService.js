const { OPENAI_API_KEY } = require('../config/env');
const OpenAI = require('openai');

// Shared OpenAI client instance — reused by chatService
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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
            description: 'Nominal dalam Rupiah (e.g., 25000)',
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
1. Mencatat transaksi (pemasukan/pengeluaran).
2. Memberikan ringkasan keuangan (stats).

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
- Jawablah SEPERLUNYA saja. Sangat ringkas dan fokus pada data.
- Tetap ramah dengan gaya asisten pribadi.
- Jangan mengulang-ulang informasi yang sudah jelas.
- WAJIB: Setiap kali selesai mencatat transaksi (pemasukan atau pengeluaran), informasikan total saldo terbaru user.
- Gunakan format yang enak dibaca untuk saldo, contoh: "Total saldo Kakak sekarang jadi Rp1.250.000 (Sisa saldo: Rp...)".
`;
};

module.exports = {
  openai,
  getSystemPrompt,
  tools,
};

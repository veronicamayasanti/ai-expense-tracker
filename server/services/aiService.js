const { OPENAI_API_KEY } = require('../config/env');
const OpenAI = require('openai');
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

const getSystemPrompt = (userName) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const isoDate = now.toISOString().split('T')[0];
  
  // Calculate start of month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

  return `
Kamu adalah AI assistant keuangan pribadi bernama "Artha" untuk user bernama ${userName}.

Tugas utama kamu:
1. Mencatat transaksi (pemasukan/pengeluaran).
2. Memberikan ringkasan keuangan (stats).

Panduan Waktu (SANGAT PENTING):
Waktu sekarang adalah: ${dateStr}
- "Hari ini": start_date = end_date = ${isoDate}
- "Kemarin": start_date = end_date = ${new Date(now.setDate(now.getDate() - 1)).toISOString().split('T')[0]} (Resetting 'now' for next calc)
- "Bulan ini": start_date = ${startOfMonth}, end_date = ${isoDate}

ATURAN RESPON (WAJIB):
- Jawablah SEPERLUNYA saja. Sangat ringkas dan fokus pada data.
- Tetap ramah dengan gaya asisten pribadi.
- Jangan mengulang-ulang informasi yang sudah jelas.
`;
};

async function processUserInput(input, userProfile) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: getSystemPrompt(userProfile.name) },
      { role: 'user', content: input },
    ],
    tools: tools,
    tool_choice: 'auto',
  });

  return response.choices[0].message;
}

module.exports = {
  processUserInput,
  getSystemPrompt,
  tools,
};

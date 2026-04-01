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

const getSystemPrompt = (userName) => `
Kamu adalah AI assistant keuangan pribadi bernama "Maya" untuk user bernama ${userName}.

Tugas utama kamu adalah mencatat pemasukan dan pengeluaran ke database melalui function call.

Aturan Penting:
1. Identifikasi Tipe: 
   - "Gaji", "Bonus", "Transfer masuk", "Dapat uang" adalah INCOME.
   - "Beli", "Bayar", "Makan", "Kopi", "Parkir" adalah EXPENSE.
2. Nominal: Ubah kata seperti "20rb" jadi 20000, "1jt" jadi 1000000.
3. Kategori: Jika user tidak menyebutkan, berikan kategori yang paling relevan (misal: "kopi" -> "Makan & Minum").
4. Tanggal: Gunakan waktu sekarang sebagai referensi untuk "hari ini", "kemarin", dll.
5. Jawaban: Jika berhasil mencatat, berikan respon yang ramah dan konfirmasi detailnya.

Waktu sekarang: ${new Date().toISOString().split('T')[0]}
`;

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
};

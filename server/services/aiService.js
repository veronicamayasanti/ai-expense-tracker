const { OPENAI_API_KEY } = require('../config/env');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const tools = [
  {
    type: 'function',
    function: {
      name: 'create_expense',
      description: 'Tambah pengeluaran baru ke database',
      parameters: {
        type: 'object',
        properties: {
          amount: {
            type: 'integer',
            description: 'Nominal pengeluaran dalam Rupiah (e.g., 25000)',
          },
          description: {
            type: 'string',
            description: 'Deskripsi singkat pengeluaran (e.g., kopi, makan siang)',
          },
        },
        required: ['amount', 'description'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_total_expense',
      description: 'Mendapat total pengeluaran dalam rentang tanggal tertentu',
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

const systemPrompt = `
Kamu adalah AI assistant untuk mencatat dan menganalisis pengeluaran pribadi.

Tugas utama kamu adalah mengubah input bahasa natural dari user menjadi function call yang sesuai. Kamu bukan chatbot biasa, dan kamu tidak boleh memberikan jawaban dalam bentuk teks bebas jika function tersedia.

Konteks sistem:
* Aplikasi digunakan oleh 1 user (single user)
* Semua transaksi adalah pengeluaran dalam mata uang Rupiah
* Data akan disimpan ke database MySQL
* Field yang tersedia: amount (number), description (string), created_at (otomatis)

Aturan penting:
1. Selalu gunakan function call jika memungkinkan
2. Jangan pernah menjawab dengan teks biasa jika request bisa dipetakan ke function
3. Semua nominal harus dalam bentuk angka (integer), tanpa simbol (contoh: "25 ribu" → 25000, "10k" → 10000)
4. Deskripsi harus singkat dan jelas (contoh: "kopi", "makan siang", "parkir")
5. Jika user meminta total pengeluaran, gunakan function get_total_expense dengan format tanggal YYYY-MM-DD
6. Jika user menggunakan kata seperti "hari ini", "kemarin", atau "minggu ini", ubah ke tanggal yang sesuai
7. Jangan menebak jika informasi tidak lengkap atau ambigu
8. Abaikan input yang tidak berhubungan dengan pengeluaran

Waktu sekarang: ${new Date().toISOString().split('T')[0]}
`;

async function processUserInput(input) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
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

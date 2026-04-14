import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="bg-background text-on-surface font-arthaku-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden transition-colors duration-300">
      {/* TopNavBar */}
      <header className="w-full top-0 sticky z-50 bg-[#f8faf4] dark:bg-emerald-950/20 backdrop-blur-md">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img 
              alt="ArthaKu Logo" 
              className="w-auto h-36" 
              src="/arthaku.png" 
            />
            <span className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-50 font-arthaku-headline tracking-tight">ArthaKu</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-emerald-900 dark:text-emerald-50 border-b-2 border-yellow-600 pb-1 font-arthaku-headline font-bold tracking-tight transition-transform duration-200 hover:scale-105" href="#">Dasbor</a>
            <a className="text-emerald-800/70 dark:text-emerald-200/60 font-arthaku-headline font-bold tracking-tight hover:text-emerald-900 transition-transform duration-200 hover:scale-105" href="#">Laporan</a>
            <a className="text-emerald-800/70 dark:text-emerald-200/60 font-arthaku-headline font-bold tracking-tight hover:text-emerald-900 transition-transform duration-200 hover:scale-105" href="#">Sinkronisasi WhatsApp</a>
            <a className="text-emerald-800/70 dark:text-emerald-200/60 font-arthaku-headline font-bold tracking-tight hover:text-emerald-900 transition-transform duration-200 hover:scale-105" href="#">Harga</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-emerald-900 font-bold hover:scale-105 active:scale-95 transition-all">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg">Sign Up</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs font-bold uppercase tracking-wider">Arsip Kekayaan Berdaulat</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-arthaku-headline font-extrabold text-primary leading-tight tracking-tighter">
                Kelola Keuangan Anda via <span className="text-secondary">WhatsApp</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                ArthaKu mengubah aplikasi pesan favorit Anda menjadi pusat komando keuangan yang canggih. Lacak pengeluaran, lihat laporan, dan kelola kekayaan dengan perintah teks sederhana.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register" className="px-8 py-4 bg-primary text-on-primary rounded-xl text-lg font-bold hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                  Mulai Sekarang
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="px-8 py-4 bg-surface-container-high text-primary rounded-xl text-lg font-bold hover:scale-105 transition-all flex items-center gap-2">
                  Lihat Demo
                </button>
              </div>
              <div className="pt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img className="h-10 w-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7tkrH9mzhfLlZmY6eqyJzViMJ1tYj82IHWQmpDLgMcoHpCLlHMUy6xFEka11A0raBw26gYAMLbNfZ6CmLtFhdM8kbg31PK_692GCD3bG6hzirhoEVYFLFAHGTyXwybp1Ac7HmZMSNsY0WVVVaB-iIg5EOOFlqEnogljwK8TghB5Kl3I9cTRMCfoAdd9a3AUuNYN_AbMpDc3yly_Xn316Bxg6zdFRKsIlCQwO1hNDsE_tus1tKDjqSppdVjGah-TId3AMi0ZKf4Fe" alt="Trusted User" />
                  <img className="h-10 w-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAr_gmjXaonIVG1t5D8OAgORzJTijM-DWbgWB7FDyfnMQ5fcHyT2yBO2oLhfecswQV3s-uVV-hn6K1Gh-3N4pCJ2ZyXuh1GOqZrutj_BdkydZHfu8I0xdY9zfriyJ_Qxg9LEPFzs3_nSjlazQTgfUT0-c7zOaMNH9HqTutNVZY8oYAVq-6x4EGiLeYrK7g0TAXVyglwfYWeINho5wEQ_S3OmB3AUjUsSaCxKg2qQNxGtMZTN-MwUiKOQvmoA7jYL0r_JPRCUydy6A0" alt="Trusted User" />
                  <img className="h-10 w-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB6X92BPzSWEkJXDktrbmsml6Uk9Y3wJydcYFH-J39bz7jc60BQhnEEu_L0Y5uQdODBxZNYGeMnG5sWr1-gCcHaX8qmfWNA3Cug9ipXDZqpLy6jPXD-8NGyI54wFgkxDh0YUtCXb2A_c3tqG_FbgHwMtrASNwNfIbZmE2X30HCP6g-03WiI6LbCUaTF2QUfc5m_WD8PMJyJsyKSXFoOJe4gHSIzJ5bybye9oB7unjyHKNylHjrD97DMt079eFRKkfoqkn3I8WTNvf1" alt="Trusted User" />
                </div>
                <p className="text-sm font-medium text-on-surface-variant">
                  Dipercaya oleh <span className="text-primary font-bold">10.000+</span> pengguna setia
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-primary-container">
                <img 
                  alt="ArthaKu Mobile Interface" 
                  className="w-full h-auto" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmxF1g3uOwrAsKZ9YjlOLAuFCNBvOnmTamVTC4yh-qHLK4OPYno_uQQHGm9jVBqhNiuVOCwhRQ-fmyrcA9hASHRau2MWXrTyKkGrjfJdy7rdFB8k0JzSBBCRs4QRP-NX7Zw2jY6kL470Ubo8p88v-TKxL7IEsPyfr1ObrF-eW_1ayqJyvR14efNENigLhFVXaYteI59zMgI5cjHa3Po_m4dkUEHENlj8XvR_gEm2Rklp0MrIAnKzyULRvordyhKbaaYXHE28h5jItR" 
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl -z-0"></div>
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-arthaku-headline font-extrabold text-primary">Kemampuan Eksklusif</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Alat keuangan yang dirancang bagi mereka yang menghargai presisi, privasi, dan integrasi yang mudah.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: WhatsApp */}
              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-full border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-center shadow-sm">
                <div className="flex-1 space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">chat_bubble</span>
                  </div>
                  <h3 className="text-2xl font-arthaku-headline font-bold text-primary">Pelacakan Otomatis</h3>
                  <p className="text-on-surface-variant">Cukup kirim pesan "Makan siang 50rb" dan ArthaKu akan langsung mengategorikan serta mencatat transaksi Anda secara instan.</p>
                </div>
                <div className="flex-1">
                  <img 
                    alt="WhatsApp Integration" 
                    className="rounded-xl shadow-lg" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbezdS43ror5bWeMEeVaeOJoBrDR9UQF1FuF5RpOsWOjMJxvRYyWUtUl0Lr0aLm2Tu3BDOVAdqk7ny6YM1ye-L709hPaIKlxwAWYK-e42ev-TMxJ5wEMzwcPtda93vl9_0XrUut1pDHin2oXIISC4fPgxMDrGllPMrASbsl4O2C6Ey7TrF4Yso0WlngoRlHnlJWPVqc9TJSqiqCZNfUiRRAg0CchTpWO0uYTspsO4bGSkanViCQXhqo0CAkFUhyP7f11MxcwPvIX_y" 
                  />
                </div>
              </div>
              {/* Feature 2: Secure */}
              <div className="bg-primary p-8 rounded-full text-on-primary flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed text-3xl">shield_locked</span>
                  </div>
                  <h3 className="text-2xl font-arthaku-headline font-bold">Keamanan Standar Bank</h3>
                  <p className="text-primary-fixed/80">Data keuangan Anda dienkripsi dan bersifat pribadi. Kami tidak pernah menjual informasi Anda.</p>
                </div>
                <div className="pt-8">
                  <span className="text-5xl font-extrabold opacity-20">256-BIT</span>
                </div>
              </div>
              {/* Feature 3: Reports */}
              <div className="bg-secondary-container p-8 rounded-full text-on-secondary-container flex flex-col justify-between shadow-lg">
                <div className="space-y-4">
                  <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container text-3xl">analytics</span>
                  </div>
                  <h3 className="text-2xl font-arthaku-headline font-bold">Laporan Detail</h3>
                  <p className="text-on-secondary-container/80">Ringkasan mingguan dan bulanan dikirim langsung ke ponsel Anda. Pahami arus keuangan Anda.</p>
                </div>
                <div className="mt-8 h-32 bg-white/30 rounded-xl overflow-hidden flex items-end px-4 gap-2">
                  <div className="flex-1 bg-primary/40 h-[40%] rounded-t-sm"></div>
                  <div className="flex-1 bg-primary/40 h-[60%] rounded-t-sm"></div>
                  <div className="flex-1 bg-primary/40 h-[85%] rounded-t-sm"></div>
                  <div className="flex-1 bg-primary/40 h-[55%] rounded-t-sm"></div>
                  <div className="flex-1 bg-primary/40 h-[95%] rounded-t-sm"></div>
                </div>
              </div>
              {/* Feature 4: Sync */}
              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-full border border-outline-variant/10 flex flex-col md:flex-row-reverse gap-8 items-center shadow-sm">
                <div className="flex-1 space-y-4">
                  <div className="h-12 w-12 bg-tertiary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-3xl">sync</span>
                  </div>
                  <h3 className="text-2xl font-arthaku-headline font-bold text-primary">Sinkronisasi Multi-Perangkat</h3>
                  <p className="text-on-surface-variant">Kelola keuangan Anda dari ponsel, tablet, atau desktop. Arsip Anda selalu diperbarui secara real-time di semua platform.</p>
                </div>
                <div className="flex-1">
                  <img 
                    alt="Sync across devices" 
                    className="rounded-xl shadow-lg" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACFacBrvAmxWmOwTzmpbWRMmXRyn6F6oOkMVTjCBzVcnMl50MpsIQr-cZ_vMGSfCvBD2YD_egNKZ5Vm_kwF7qfPaan6OCeLDEh_lrBcJI4PkPqIadeI-VMRUdrFZ1dAYarzohieIZMSHDIXTEOhsdBD-_MOIDyzthWgbYQ1KIVC_jiRTQ3rHHceLcAXHTF_WePZ_xUMizkhIQOw7fm1tDBD8vRZNRq4JqRPefKXLv-w-Af6OjaXIt5n4RyIl6ZuvI1alMADd57RePo" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Preview Dashboard */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-4xl font-arthaku-headline font-extrabold text-primary tracking-tight">Potret Keuangan Anda, Tervisualisasi.</h2>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Berhenti menebak ke mana uang Anda pergi. Rangkaian pelaporan elegan kami memberikan gambaran tingkat editorial tentang kekayaan bersih, pendapatan, dan kebiasaan belanja Anda.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-medium">Perbandingan Pendapatan vs Pengeluaran</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-medium">Distribusi Kategori Pengeluaran</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-medium">Tolok Ukur Kekayaan yang Dapat Disesuaikan</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7 bg-surface-container-high rounded-[2rem] p-8 shadow-2xl relative">
                {/* Dashboard Mockup */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-outline uppercase tracking-widest">Saldo Tersedia</h4>
                      <p className="text-3xl font-arthaku-headline font-extrabold text-primary">Rp 42.950.000</p>
                    </div>
                    <div className="bg-secondary-container/20 px-3 py-1 rounded-full text-secondary font-bold text-sm">
                      +12,5% bulan ini
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-lg">
                      <p className="text-xs font-medium text-on-surface-variant mb-1">Total Pendapatan</p>
                      <p className="text-xl font-bold text-primary">Rp 8.200.000</p>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-lg">
                      <p className="text-xs font-medium text-on-surface-variant mb-1">Total Pengeluaran</p>
                      <p className="text-xl font-bold text-secondary">Rp 3.420.000</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-sm font-bold text-primary">Transaksi Terbaru</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">shopping_cart</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm">Belanja Organik</p>
                            <p className="text-xs text-on-surface-variant">Hari ini, 14:45</p>
                          </div>
                        </div>
                        <span className="font-bold text-on-surface">-Rp 124.500</span>
                      </div>
                      <div className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined">payments</span>
                          </div>
                          <div>
                            <p className="font-bold text-sm">Retainer Klien</p>
                            <p className="text-xs text-on-surface-variant">Kemarin</p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">+Rp 2.500.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/40 rounded-full blur-[100px]"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-arthaku-headline font-extrabold text-on-primary">Gabung ArthaKu Sekarang</h2>
              <p className="text-xl text-primary-fixed/70 max-w-2xl mx-auto leading-relaxed">
                Masuki era baru keuangan pribadi. Pengelolaan kekayaan kini hanya sejauh pesan WhatsApp.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                <Link to="/register" className="px-10 py-5 bg-secondary-container text-on-secondary-container rounded-xl text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
                  Daftar Sekarang
                </Link>
                <button className="px-10 py-5 border-2 border-primary-fixed/30 text-on-primary rounded-xl text-xl font-bold hover:bg-white/10 transition-all">
                  Hubungi Sales
                </button>
              </div>
              <p className="text-sm text-primary-fixed/40">Gratis selama 14 hari. Tanpa kartu kredit.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-auto bg-[#f8faf4] dark:bg-emerald-950">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto border-t border-emerald-100 dark:border-emerald-800/30 pt-12">
          <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
            <div className="flex items-center gap-2">
              <img 
                alt="ArthaKu Logo" 
                className="h-24 w-auto" 
                src="/arthaku.png" 
              />
              <span className="text-lg font-bold text-emerald-900 dark:text-emerald-50 font-arthaku-headline">ArthaKu</span>
            </div>
            <p className="text-emerald-800/60 dark:text-emerald-300/50 font-arthaku-body text-sm tracking-wide">© 2024 ArthaKu. Manajemen Kekayaan Berdaulat.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <Link to="/privacy" className="text-emerald-800/60 dark:text-emerald-300/50 font-arthaku-body text-sm tracking-wide hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors opacity-80 hover:opacity-100">Kebijakan Privasi</Link>
            <Link to="/terms" className="text-emerald-800/60 dark:text-emerald-300/50 font-arthaku-body text-sm tracking-wide hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors opacity-80 hover:opacity-100">Syarat dan Ketentuan</Link>
            <a href="#" className="text-emerald-800/60 dark:text-emerald-300/50 font-arthaku-body text-sm tracking-wide hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors opacity-80 hover:opacity-100">Hubungi Dukungan</a>
            <a href="#" className="text-emerald-800/60 dark:text-emerald-300/50 font-arthaku-body text-sm tracking-wide hover:text-emerald-900 dark:hover:text-emerald-50 transition-colors opacity-80 hover:opacity-100">Dokumentasi API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

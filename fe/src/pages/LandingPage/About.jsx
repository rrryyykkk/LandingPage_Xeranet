/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full bg-[#0d0d0d] text-white py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang Kami</h2>
        <p className="text-gray-400 text-base md:text-lg mb-10">
          Kami adalah tim profesional yang terdiri dari pengembang, desainer,
          dan ahli keamanan yang terampil, berdedikasi untuk menciptakan solusi
          teknologi mutakhir untuk bisnis Anda. Dengan pengalaman bertahun-tahun
          di industri ini, kami berkomitmen untuk memberikan layanan berkualitas
          tinggi yang disesuaikan dengan kebutuhan spesifik klien kami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Visi</h3>
            <p className="text-gray-300 text-sm">
              adalah menjadi mitra terpercaya bagi bisnis yang ingin berkembang
              dengan teknologi yang lebih canggih dan aman. Dengan fokus pada
              kepuasan klien, kami selalu berusaha untuk memberikan hasil yang
              lebih dari sekadar ekspektasi, memastikan bahwa setiap solusi yang
              kami buat memberikan dampak positif yang nyata.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Misi</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-3">
              <li>
                Memberikan solusi teknologi terbaik yang inovatif, aman, dan
                terjangkau untuk mengoptimalkan potensi bisnis klien.
              </li>
              <li>
                Mengembangkan solusi yang relevan untuk kebutuhan saat ini dan
                siap menghadapi tantangan masa depan.
              </li>
              <li>
                Membangun hubungan jangka panjang berbasis kolaborasi,
                transparansi, dan kepercayaan.
              </li>
              <li>
                Menjadikan teknologi sebagai pendorong utama kemajuan bisnis dan
                menciptakan nilai tambah bagi setiap organisasi.
              </li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Nilai Kami</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>
                Integritas — Menjunjung tinggi kejujuran, tanggung jawab, dan
                transparansi dalam setiap tindakan.
              </li>
              <li>
                Inovasi — Terus berinovasi untuk menghadirkan solusi teknologi
                yang relevan dan berdampak.
              </li>
              <li>
                Komitmen — Fokus pada hasil terbaik dan kepuasan klien sebagai
                prioritas utama.
              </li>
              <li>
                Kolaborasi — Bekerja bersama secara sinergis, baik dengan tim
                internal maupun klien.
              </li>
              <li>
                Keamanan — Menyediakan solusi yang aman, terpercaya, dan sesuai
                standar industri.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

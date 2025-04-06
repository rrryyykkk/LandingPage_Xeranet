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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
        <p className="text-gray-400 text-base md:text-lg mb-10">
          Kami adalah tim kreatif yang berfokus pada pengembangan solusi digital
          yang efektif dan berkelanjutan. Visi kami adalah menjembatani
          teknologi dengan kebutuhan masyarakat melalui pendekatan inovatif dan
          humanis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Visi</h3>
            <p className="text-gray-300 text-sm">
              Menjadi penyedia solusi digital yang terpercaya dan berdampak di
              Indonesia dan dunia.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Misi</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Mengembangkan produk digital yang relevan & adaptif</li>
              <li>Memberikan layanan yang mengutamakan kepuasan pengguna</li>
              <li>Mendorong kolaborasi & inovasi dalam setiap proyek</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#222] shadow-md">
            <h3 className="text-xl font-semibold mb-2">Nilai Kami</h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
              <li>Integritas & Tanggung Jawab</li>
              <li>Kolaborasi & Inovasi</li>
              <li>Komitmen terhadap kualitas</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

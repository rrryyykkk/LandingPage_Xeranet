/* eslint-disable no-unused-vars */
import { FaTools, FaShieldAlt, FaClock, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import web from "/1.png";
import cyber from "/3.png";
import net from "/4.png";

const services = [
  {
    title: "Software Development",
    description:
      "Kami menyediakan solusi software berbasis web dan mobile yang disesuaikan dengan kebutuhan bisnis Anda. Fokus kami adalah performa, kemudahan penggunaan, dan kesesuaian dengan tujuan bisnis.",
    icon: <FaTools className="text-blue-400 text-lg" />,
    img: web,
    packages: [
      {
        name: "🔹 Paket Basic – Prototype & MVP",
        price: "Rp 5.000.000 – 10.000.000",
        features: [
          "Pengembangan prototipe aplikasi atau MVP",
          "Fitur dasar (UI/UX sederhana, login, dashboard dasar)",
          "1 platform (web atau mobile)",
          "Dokumentasi kode dasar",
          "1 bulan maintenance & bug fixing",
        ],
      },
      {
        name: "🔷 Paket Standard – Custom Application Development",
        price: "Rp 15.000.000 – 30.000.000",
        features: [
          "Pengembangan aplikasi custom sesuai kebutuhan",
          "Fitur utama lengkap: database, integrasi API, manajemen pengguna",
          "Desain UI/UX kustom",
          "1 platform (web, Android/iOS, atau desktop)",
          "Pengujian aplikasi",
          "Dokumentasi lengkap",
          "2 bulan maintenance & bug fixing",
        ],
      },
      {
        name: "🔶 Paket Pro – Enterprise-Grade Custom Solution",
        price: "Rp 50.000.000 – 100.000.000+",
        features: [
          "Pengembangan aplikasi enterprise kompleks",
          "Fitur lanjutan: real-time, multi-platform, integrasi API",
          "Desain UI/UX premium dan responsif",
          "Dukungan lebih dari 1 platform (web, mobile, desktop)",
          "Pengujian QA, load testing, penetration testing",
          "6 bulan maintenance & perbaikan bug",
          "Pelatihan sistem (onsite/online)",
          "Pemeliharaan & pembaruan fitur (opsional)",
        ],
      },
    ],
  },
  {
    title: "Cyber Security",
    description:
      "Lindungi bisnis Anda dari ancaman digital dengan layanan audit, monitoring, dan pengamanan data serta infrastruktur IT. Kami hadir untuk mencegah, mendeteksi, dan menghadapi serangan siber.",
    icon: <FaShieldAlt className="text-blue-400 text-lg" />,
    img: cyber,
    packages: [
      {
        name: "🔹 Paket Basic – Website Security Testing",
        price: "Rp 5.000.000 – 7.500.000",
        features: [
          "Pengujian keamanan untuk 1 website (hingga 10 halaman)",
          "Identifikasi kerentanan: SQLi, XSS, CSRF",
          "Analisis dan laporan kerentanan",
          "Rekomendasi perbaikan",
          "Durasi 1 minggu",
          "Laporan detil & langkah mitigasi",
        ],
      },
      {
        name: "🔷 Paket Standard – Web & Network Security Testing",
        price: "Rp 10.000.000 – 15.000.000",
        features: [
          "Pengujian untuk 1 website + 1 server internal",
          "Penetration testing untuk website dan server (port scanning, service detection)",
          "Cakupan: SQL Injection, Cross-site Scripting (XSS), CSRF, brute force attacks, open ports",
          "Pengujian terhadap misconfigurations dan vulnerabilities di sistem web dan jaringan",
          "Laporan dengan rekomendasi keamanan dan patching",
          "Durasi 2 minggu",
          "Dukungan tindak lanjut 1 bulan",
        ],
      },
      {
        name: "🔶 Paket Pro – Enterprise Penetration Testing",
        price: "Rp 20.000.000 – 50.000.000+",
        features: [
          "Pengujian menyeluruh pada web + jaringan internal + aplikasi mobile",
          "Cakupan luas: web application testing, network penetration testing, Wi-Fi testing, mobile app security, social engineering",
          "Simulasi serangan lanjutan: MITM, phishing",
          "Tes pada multiple servers, firewalls, dan API",
          "Pengujian terhadap keamanan aplikasi web, server, API, perangkat IoT, dan perangkat mobile",
          "Diskusi hasil pengujian dengan tim teknis klien (onsite atau remote)",
          "Laporan lengkap & prioritas risiko",
          "Durasi 4–6 minggu",
          "Diskusi hasil + dukungan 3 bulan",
        ],
      },
    ],
  },
  {
    title: "Networking ",
    description:
      "Kami membantu merancang, membangun, dan mengoptimalkan infrastruktur jaringan yang cepat, aman, dan stabil untuk mendukung komunikasi dan operasional bisnis Anda.",
    icon: <FaClock className="text-blue-400 text-lg" />,
    img: net,
    packages: [{ name: "Coming Soon", price: "", features: [] }],
  },
];

const ServicePage = () => {
  return (
    <section
      id="services"
      className="w-full bg-gradient-to-b from-black via-[#0f0f0f] to-black text-white py-20 px-4 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4">Layanan Kami</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Di{" "}
            <span className="text-blue-400 font-semibold">
              Xeranet Solutions Technology
            </span>
            , kami hadir dengan berbagai solusi teknologi untuk skala startup
            hingga enterprise.
          </p>
        </motion.div>

        <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#2a2a2a] rounded-2xl p-5 shadow-lg hover:shadow-blue-600/10 transition-all items-center "
            >
              <div className="relative mb-4  ">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-28 w-full object-contain mx-auto brightness-90"
                />
                <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2  flex justify-center items-center">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm mb-5 ">
                {service.description}
              </p>

              <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {service.packages.map((pkg, pkgIndex) => {
                  const key = `${index}-${pkgIndex}`;

                  return (
                    <div
                      key={pkgIndex}
                      className="rounded-lg border border-[#2b2b2b] bg-[#141414] p-6 hover:border-blue-500 transition duration-300"
                    >
                      <div className="flex flex-col gap-4 cursor-pointer">
                        <span className="self-start px-2 py-1 text-xs font-semibold bg-yellow-500 text-black rounded">
                          Most Popular
                        </span>

                        <h2 className="text-2xl font-bold text-white">
                          {pkg.name}
                        </h2>

                        <ul className="text-sm text-gray-300 space-y-1">
                          {pkg.features.map((feature, i) => (
                            <li key={i}>• {feature}</li>
                          ))}
                        </ul>

                        <div className="mt-4 text-blue-400 font-bold text-lg">
                          {pkg.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;

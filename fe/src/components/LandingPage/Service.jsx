/* eslint-disable no-unused-vars */
import { useState } from "react";
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
  },
  {
    title: "Cyber Security",
    description:
      "Lindungi bisnis Anda dari ancaman digital dengan layanan audit, monitoring, dan pengamanan data serta infrastruktur IT. Kami hadir untuk mencegah, mendeteksi, dan menghadapi serangan siber.",
    icon: <FaShieldAlt className="text-blue-400 text-lg" />,
    img: cyber,
  },
  {
    title: "Networking",
    description:
      "Kami membantu merancang, membangun, dan mengoptimalkan infrastruktur jaringan yang cepat, aman, dan stabil untuk mendukung komunikasi dan operasional bisnis Anda.",
    icon: <FaClock className="text-blue-400 text-lg" />,
    img: net,
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="w-fill bg-gradient-to-b from-black via-[#0f0f0f] to-black text-white py-20 px-4"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#2a2a2a] rounded-2xl p-5 shadow-lg hover:shadow-blue-600/10 transition-all transform hover:scale-105"
            >
              <a
                href="/service"
                className="cursor-pointer hover:shadow-lg hover:scale-200"
              >
                <div className="relative mb-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="h-28 w-full object-contain mx-auto brightness-90"
                  />
                  <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5">
                  {service.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

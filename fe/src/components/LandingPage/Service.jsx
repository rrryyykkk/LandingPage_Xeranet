/* eslint-disable no-unused-vars */
import { FaTools, FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import web from "/1.png";
import phone from "/2.png";
import cyber from "/3.png";
import net from "/4.png";

const Services = () => {
  const services = [
    {
      title: "Software Development)",
      description:
        "Kami menyediakan solusi pengembangan perangkat lunak yang disesuaikan dengan kebutuhan spesifik bisnis Anda. Tim kami terdiri dari pengembang berpengalaman yang ahli dalam berbagai platform dan teknologi, dari aplikasi web hingga perangkat lunak mobile. Kami bekerja dengan pendekatan yang mengutamakan kualitas, memastikan bahwa perangkat lunak yang kami buat memiliki kinerja optimal, mudah digunakan, dan sesuai dengan tujuan bisnis Anda.",
      icon: <FaTools className="text-blue-400 text-lg" />,
      img: web,
      features: [
        "Custom CMS solutions",
        "E-commerce platforms",
        "SEO optimization",
        "Performance tuning",
      ],
    },
    {
      title: "Cyber Security",
      description:
        "Kami menyediakan solusi pengembangan perangkat lunak yang disesuaikan dengan kebutuhan spesifik bisnis Anda. Tim kami terdiri dari pengembang berpengalaman yang ahli dalam berbagai platform dan teknologi, dari aplikasi web hingga perangkat lunak mobile. Kami bekerja dengan pendekatan yang mengutamakan kualitas, memastikan bahwa perangkat lunak yang kami buat memiliki kinerja optimal, mudah digunakan, dan sesuai dengan tujuan bisnis Anda.",
      icon: <FaShieldAlt className="text-blue-400 text-lg" />,
      img: cyber,
      features: [
        "Vulnerability assessment",
        "Penetration testing",
        "Security monitoring",
        "Incident response",
      ],
    },
    {
      title: "Networking",
      description:
        "Layanan jaringan kami dirancang untuk memastikan bahwa sistem komunikasi dan infrastruktur jaringan bisnis Anda berfungsi secara efisien dan aman. Kami menyediakan solusi jaringan yang mencakup desain, instalasi, pemeliharaan, dan optimasi infrastruktur jaringan. Dengan teknologi terkini, kami membantu menghubungkan sistem dan perangkat Anda dengan lancar, menjaga kecepatan, stabilitas, dan keamanan jaringan yang dapat diandalkan untuk mendukung operasional bisnis Anda.",
      icon: <FaClock className="text-blue-400 text-lg" />,
      img: net,
      features: [
        "Network design & implementation",
        "Cloud networking",
        "VPN solutions",
        "Performance optimization",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="w-full cursor-pointeru bg-black text-white py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Layanan Kami</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Di Xeranet Solutions Technology, kami menawarkan berbagai layanan
            teknologi yang dirancang untuk memenuhi kebutuhan bisnis Anda.
            Dengan pengalaman dan keahlian kami, kami memastikan setiap solusi
            yang kami tawarkan tidak hanya efektif, tetapi juga aman dan
            berkelanjutan. Berikut adalah layanan yang kami sediakan:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#121212] border border-[#222] rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative flex justify-center items-center h-40 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="max-h-28 object-contain brightness-90 transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center shadow-md">
                  {service.icon}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1 text-sm text-gray-300">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

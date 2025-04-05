import { FaTools, FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import web from "/1.png";
import phone from "/2.png";
import cyber from "/3.png";
import net from "/4.png";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Professional website development with modern technologies and responsive design.",
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
      title: "Mobile Development",
      description: "Cross-platform mobile applications for iOS and Android.",
      icon: <FaStar className="text-blue-400 text-lg" />,
      img: phone,
      features: [
        "React Native development",
        "Native iOS/Android apps",
        "Push notifications",
        "Offline capabilities",
      ],
    },
    {
      title: "Cyber Security",
      description:
        "Comprehensive security solutions to protect your digital assets.",
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
      description: "Enterprise networking solutions for optimal connectivity.",
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
    <section id="services" className="w-full bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Premium digital solutions tailored for your business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

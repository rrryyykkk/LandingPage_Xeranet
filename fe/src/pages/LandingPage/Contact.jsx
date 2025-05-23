import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! ✨");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Hubungi Kami</h2>
          <p className="text-gray-400 text-base md:text-lg">
            Punya pertanyaan atau sekadar ingin menyapa? Kami selalu siap untuk
            berbicara.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#121212]/60 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg border border-[#2a2a2a] w-full transition-all duration-300 hover:shadow-2xl"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us what’s on your mind..."
                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl"
            >
              🚀 Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

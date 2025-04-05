import { useState } from "react";

// logo
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
    <section id="contact" className="w-full bg-black text-white py-20 px-4 ">
      <div className="max-w-5xl mx-auto flex flex-col ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Get in Touch</h2>
          <p className="text-gray-400 text-base md:text-lg">
            Have a question or just want to say hello? We're always ready to
            talk.
          </p>
        </div>

        <div className="flex flex-col gap-8 ">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-[#121212]/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-[#2a2a2a] transition-all duration-300 hover:shadow-2xl"
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
              className="w-120  bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl"
            >
              🚀 Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="flex-1 bg-[#121212]/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-[#2a2a2a] h-fit w-fit">
            <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <span>
                    <FaFacebook />
                  </span>{" "}
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <span>
                    {" "}
                    <FaTwitter />
                  </span>{" "}
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-pink-400 transition"
                >
                  <span>
                    <FaInstagram />
                  </span>{" "}
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-blue-500 transition"
                >
                  <span>
                    <FaLinkedin />
                  </span>{" "}
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

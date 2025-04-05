/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const posts = [
  {
    id: 1,
    title: "Meningkatkan Bisnis Online dengan Strategi Digital Marketing",
    description:
      "Pelajari cara efektif menggunakan digital marketing untuk mengembangkan bisnis online Anda di era modern.",
    date: "5 April 2025",
    image: "https://picsum.photos/id/1015/600/400",
    content:
      "Di era digital seperti sekarang, pemasaran online menjadi kunci penting bagi pertumbuhan bisnis. Dengan memahami audiens, menggunakan media sosial secara tepat, dan memanfaatkan SEO serta email marketing, bisnis dapat menjangkau lebih banyak pelanggan. Fokuslah pada pembuatan konten berkualitas dan penggunaan data analitik untuk evaluasi.",
  },
  {
    id: 2,
    title: "5 Tools Gratis untuk Desain Grafis Profesional",
    description:
      "Rekomendasi tools gratis untuk desain yang powerful dan cocok untuk pemula hingga profesional.",
    date: "2 April 2025",
    image: "https://picsum.photos/id/1011/600/400",
    content:
      "Desain yang menarik tidak harus mahal. Gunakan tools seperti Canva, Figma, Photopea, Vectr, dan GIMP untuk membuat desain grafis profesional secara gratis. Tools ini memiliki fitur yang mudah dipahami bahkan untuk pemula.",
  },
  {
    id: 3,
    title: "Tips Produktivitas untuk Developer di Tahun 2025",
    description:
      "Simak kebiasaan kecil yang bisa bantu kamu jadi developer yang lebih fokus dan produktif.",
    date: "28 Maret 2025",
    image: "https://picsum.photos/id/1025/600/400",
    content:
      "Produktivitas seorang developer dipengaruhi banyak hal: lingkungan kerja, tools yang digunakan, dan manajemen waktu. Gunakan teknik Pomodoro, hindari multitasking, dan buat to-do list harian. Gunakan alat seperti VS Code extensions dan task manager seperti Notion atau Trello.",
  },
];

const Blog = () => {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Blog & Artikel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-center mb-12 max-w-xl mx-auto"
        >
          Temukan berbagai artikel seputar teknologi, bisnis, desain, dan
          produktivitas untuk menginspirasi perjalanan digitalmu.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-64">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-400 text-sm">
                    {post.description.slice(0, 100)}...
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

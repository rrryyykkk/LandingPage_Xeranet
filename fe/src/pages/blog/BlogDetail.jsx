/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from "../../data/postData";

const BlogDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));
  console.log("post:", post);

  if (!post) {
    return (
      <div className="text-center text-white py-20 bg-black min-h-screen">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-xl font-semibold">Artikel tidak ditemukan.</p>
        <Link to="/blog" className="text-blue-400 underline mt-4 inline-block">
          ← Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0f0f0f] text-white min-h-screen px-6 py-16"
    >
      <div className="max-w-3xl mx-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{post.date}</p>
        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
          {post.content}
        </p>
        <Link
          to="/blog"
          className="inline-block mt-8 text-blue-400 hover:underline"
        >
          ← Kembali ke Blog
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogDetail;

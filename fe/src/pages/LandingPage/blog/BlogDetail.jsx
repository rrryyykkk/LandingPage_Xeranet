/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../app/data/blogSlice";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const { id } = useParams();

  // Dapatkan state dari location
  const location = useLocation();
  const blogDetailFromState = location.state?.blog; // Mendapatkan blog yang dikirim dari Blog

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Jika blog tidak ada di state, cari di blogs array
  const blogDetail = blogDetailFromState || blogs.find((p) => p._id === id);

  if (isLoading) {
    return (
      <div className="text-center text-white py-20 bg-black min-h-screen">
        <p className="text-xl font-semibold">Memuat artikel...</p>
      </div>
    );
  }

  if (!blogDetail) {
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
      style={{ fontFamily: "Roboto" }}
    >
      <div className="max-w-3xl mx-auto">
        <img
          src={blogDetail.blogImage}
          alt={blogDetail.title}
          className="w-full rounded-xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2">{blogDetail.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{blogDetail.createdAt}</p>
        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
          {blogDetail.content}
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

/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../app/data/blogSlice.js";

const Blog = () => {
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  return (
    <section
      className="min-h-screen bg-[#0f0f0f] text-white py-16 px-6 "
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
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
          {blogs
            .filter((post) => post.status === "publish")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={post.blogImage}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6 flex flex-col justify-between h-64">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {post.createdAt}
                    </p>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-400 text-sm">
                      {post.content.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/blog/${post._id}`}
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

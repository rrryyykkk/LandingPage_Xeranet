/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { createBlog, updateBlog } from "../../../services/blogService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaRegTimesCircle } from "react-icons/fa";

const BlogForm = ({ open, onClose, blog, setToast }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        status: blog.status,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        status: "draft",
      });
    }
  }, [blog]);

  const mutation = useMutation({
    mutationFn: (data) => (blog ? updateBlog(blog.id, data) : createBlog(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
      setToast &&
        setToast({
          type: "success",
          message: blog
            ? "Blog berhasil diupdate!"
            : "Blog berhasil ditambahkan!",
        });
    },
    onError: () => {
      setToast &&
        setToast({
          type: "error",
          message: blog ? "Gagal mengupdate blog." : "Gagal menambahkan blog.",
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="modal-box max-w-3xl w-full"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">
              {blog ? "Edit Blog" : "Tambah Blog Baru"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-lg"
            >
              <FaRegTimesCircle />
            </button>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Judul</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan judul blog"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Konten</span>
            </label>
            <textarea
              placeholder="Tulis konten blog di sini"
              className="textarea textarea-bordered w-full min-h-[120px]"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="modal-action justify-between">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Menyimpan..." : blog ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
};

export default BlogForm;

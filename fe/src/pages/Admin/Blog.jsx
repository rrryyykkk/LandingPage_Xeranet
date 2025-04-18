import { useEffect, useState } from "react";
import BlogForm from "../../components/Admin/common/BlogForm";
import Toast from "../../components/Admin/common/Toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExistingBlog,
  fetchBlogs,
  updateExistingBlog,
} from "../../app/data/blogSlice";

const Blog = () => {
  const [openForm, setOpenForm] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [toast, setToast] = useState(null);
  const { blogs, isLoading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  console.log("blog", blogs);

  const handleEdit = (blogs) => {
    setSelectedBlog(blogs);
    setOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus blog ini?"
    );
    if (confirmDelete) {
      try {
        await dispatch(deleteExistingBlog(id)).unwrap();
        setToast({ type: "success", message: "Blog berhasil dihapus" });
        dispatch(fetchBlogs());
      } catch (error) {
        setToast({
          type: "error",
          message: "Gagal menghapus blog",
          error: error.message,
        });
      }
    }
  };

  const handleEditStatus = async (blog) => {
    const newStatus =
      selectedBlog.status === "published" ? "draft" : "published";
    try {
      await dispatch(
        updateExistingBlog({
          id: blog._id,
          FormData: { ...blog, status: newStatus },
        })
      )
        .unwrap()
        .setToast({ type: "success", message: "Blog berhasil diupdate!" });
    } catch (error) {
      setToast({
        type: "error",
        message: "Gagal mengupdate blog",
        error: error.message,
      });
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Blog</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          Tambah Blog
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={handleEditStatus}>
                    <span
                      className={`badge ${
                        blog.status === "published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="btn btn-xs btn-outline btn-info"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        blog={selectedBlog}
        setToast={setToast}
      />
    </div>
  );
};

export default Blog;

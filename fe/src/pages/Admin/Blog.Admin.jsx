import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, deleteBlog } from "../../services/blogService";
import BlogForm from "../../components/Admin/common/BlogForm";
import Toast from "../../components/Admin/common/Toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const Blog = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [toast, setToast] = useState(null);
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setToast({ type: "success", message: "Blog berhasil dihapus!" });
    },
    onError: () => {
      setToast({ type: "error", message: "Gagal menghapus blog." });
    },
  });

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus blog ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola Blog</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedBlog(null);
            setOpenForm(true);
          }}
        >
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
                <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      blog.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {blog.status}
                  </span>
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
                      onClick={() => handleDelete(blog.id)}
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

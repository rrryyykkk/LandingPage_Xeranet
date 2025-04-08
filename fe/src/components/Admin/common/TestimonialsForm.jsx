import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTestimonial, updateTestimonial } from "../../../services/api";

const TestimonialForm = ({ open, onClose, testimonial }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    content: "",
    rating: 5,
    avatar: null,
  });
  const [preview, setPreview] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        position: testimonial.position,
        content: testimonial.content,
        rating: testimonial.rating,
        avatar: null,
      });
      setPreview(testimonial.avatar);
    }
  }, [testimonial]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: (data) =>
      testimonial
        ? updateTestimonial(testimonial.id, data)
        : createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });
    mutation.mutate(formDataToSend);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {testimonial ? "Edit Testimonial" : "Tambah Testimonial Baru"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">📷</span>
              )}
            </div>
            <label className="btn btn-outline btn-sm">
              Upload Foto
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Nama"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Posisi"
            className="input input-bordered w-full"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Testimonial"
            className="textarea textarea-bordered w-full"
            rows={4}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          ></textarea>
          <div>
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((val) => (
                <input
                  key={val}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-yellow-400"
                  checked={formData.rating === val}
                  onChange={() => setFormData({ ...formData, rating: val })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Batal
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
          >
            {testimonial ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;

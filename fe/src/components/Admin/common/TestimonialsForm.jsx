import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTestimonial,
  editTestimonial,
} from "../../../app/data/testimoniSlice";

const FormTestimonials = ({ open, onClose, testimonial, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    author: "",
    position: "",
    content: "",
    rating: 5,
    avatar: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        author: testimonial.author || "",
        position: testimonial.position || "",
        content: testimonial.content || "",
        rating: testimonial.rating || 5,
        avatar: null,
      });
      setPreview(testimonial.testimoniImage || null);
    }
  }, [testimonial]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("author", formData.author);
    dataToSend.append("position", formData.position);
    dataToSend.append("content", formData.content);
    dataToSend.append("rating", formData.rating);
    if (formData.avatar) {
      dataToSend.append("testimoniImage", formData.avatar);
    }

    try {
      if (testimonial) {
        await dispatch(
          editTestimonial({ id: testimonial._id, formData: dataToSend })
        ).unwrap();
      } else {
        await dispatch(addTestimonial(dataToSend)).unwrap();
      }

      if (onSuccess) onSuccess(); // 🚀 Trigger refresh from parent
      onClose();
    } catch (error) {
      console.error("Gagal submit testimonial:", error);
    }
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
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
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
              Upload Photo
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
            placeholder="Author"
            className="input input-bordered w-full"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Position"
            className="input input-bordered w-full"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
          <textarea
            placeholder="Testimonial Content"
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
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {testimonial ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTestimonials;

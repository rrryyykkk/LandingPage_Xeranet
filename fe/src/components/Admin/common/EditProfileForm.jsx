import { getMe, updateProfile } from "../../../app/users/authSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const EditProfileForm = ({ open, onClose, profile }) => {
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        userName: profile.userName || "",
        email: profile.email || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!open) {
      setForm({
        fullName: "",
        userName: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
      setImage(null);
      setMessage("");
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("userName", form.userName);
    formData.append("email", form.email);
    if (form.oldPassword && form.newPassword) {
      formData.append("oldPassword", form.oldPassword);
      formData.append("newPassword", form.newPassword);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      const updatedUser = await dispatch(getMe()).unwrap();
      if (updatedUser) {
        setMessage("Profil berhasil diperbarui");
        onClose();
      } else {
        setMessage("Gagal memperbarui profil, coba lagi.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-2">Edit Profil</h2>
        {message && <p className="text-sm text-center text-error">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Nama Lengkap"
          />
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />

          <hr className="my-2" />

          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Password Lama"
          />
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Password Baru"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

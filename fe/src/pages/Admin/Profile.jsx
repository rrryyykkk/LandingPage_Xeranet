/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EditProfileForm from "../../components/Admin/common/EditProfileForm";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const navigate = useNavigate();

  // Data user sementara (dummy)
  const user = {
    fullName: "John Doe",
    username: "johndoe",
    email: "oYt2q@example.com",
    imgProfile: "/avatar.png",
  };

  // Redirect ke login jika user tidak ada
  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  const handleEdit = () => {
    setSelectedProfile(user); // Set profile yang ingin diedit
    setIsOpen(true); // Buka form edit
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Profil Admin
      </h1>

      <div className="bg-base-100 p-6 shadow-xl rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user.imgProfile || "/default-avatar.png"}
                alt="Foto Profil"
              />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Profil
          </button>
        </div>
      </div>

      {/* Tampilkan form jika isOpen true */}
      {isOpen && (
        <EditProfileForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          profile={selectedProfile}
        />
      )}
    </motion.div>
  );
};

export default ProfilePage;

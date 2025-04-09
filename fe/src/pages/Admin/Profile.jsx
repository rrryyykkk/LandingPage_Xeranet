/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

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
            <p className="text-sm text-gray-500">@{user.userName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/admin/profile/edit")}
            className="btn btn-primary"
          >
            Edit Profil
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

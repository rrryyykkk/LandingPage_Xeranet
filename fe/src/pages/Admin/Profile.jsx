/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import EditProfileForm from "../../components/Admin/common/EditProfileForm";
import { getMe } from "../../app/users/authSlice";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil user dan loading dari Redux store
  const { user: reduxUser, loading: authLoading } = useSelector(
    (state) => state.auth
  );

  // Ambil user dari state <Link />, kalau ada
  const userFromState = location.state?.user;

  // Prioritaskan user dari state, kalau nggak ada pakai dari Redux
  const user = userFromState || reduxUser;

  useEffect(() => {
    if (!reduxUser) {
      dispatch(getMe());
    }
  }, [dispatch, reduxUser]);

  // Redirect ke login kalau sudah selesai loading, dan user tetap null
  useEffect(() => {
    if (!authLoading && !userFromState && !reduxUser) {
      navigate("/admin/login");
    }
  }, [userFromState, reduxUser, authLoading, navigate]);

  const handleEdit = () => {
    setSelectedProfile(user);
    setIsOpen(true);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          User tidak ditemukan.
        </p>
      </div>
    );
  }

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
                src={user?.imgProfile || "/default-avatar.png"}
                alt="Foto Profil"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">
              {user?.fullName || "Admin"}
            </h2>
            <p className="text-sm text-gray-500">
              @{user?.userName || "username"}
            </p>
            <p className="text-sm text-gray-500">
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Profil
          </button>
        </div>
      </div>

      {isOpen && user && (
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

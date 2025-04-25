/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getMe, login } from "../../app/users/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Admin/common/Toast";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await dispatch(login({ email, password })).unwrap();
      setToast({ type: "success", message: "Login berhasil" });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.log("Login Error:", error);
      setToast({ type: "error", message: error.message });
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Optional: bisa dikirim ke backend kalau perlu
      dispatch(getMe());
      setToast({ type: "success", message: "Login Google berhasil" });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error("Google Login Error:", error);
      setToast({ type: "error", message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          Login
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Masuk ke akun admin Anda
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="input input-bordered w-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-primary cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Ingat saya
            </label>
            <a href="#" className="link link-hover text-primary">
              Lupa Password?
            </a>
          </div>

          <button className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </motion.div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default LoginPage;

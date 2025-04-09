/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    console.log("Google login clicked (UX only)");
    // Nanti bisa kamu ganti dengan Firebase Auth Google login
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

        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="input input-bordered w-full"
              required
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
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-primary"
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

          <button className="btn btn-primary w-full mt-4">Masuk</button>
        </form>

        <div className="divider text-sm text-base-content/60">atau</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Login dengan Google
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;

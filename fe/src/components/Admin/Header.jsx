/* eslint-disable no-unused-vars */
import {
  FaBell,
  FaMoon,
  FaSun,
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAdminTheme } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ onSidebarToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggleTheme } = useAdminTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implementasi logout (hapus token, dsb)
    navigate("/admin/login");
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-base-100 border-b border-base-300"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex items-center justify-between">
        {/* Sidebar + Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="btn btn-sm btn-ghost text-xl"
          >
            <FaBars />
          </button>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-primary">
            Admin <span className="text-base-content">Xeranet</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-xl"
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setMenuOpen(false);
              }}
              className="btn btn-circle btn-ghost text-xl relative"
            >
              <FaBell />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-ping" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-base-100 border border-base-300 shadow-xl rounded-xl w-screen max-w-sm z-50"
                >
                  <div className="p-4 border-b border-base-300 font-semibold">
                    Notifications
                  </div>
                  <ul className="divide-y divide-base-200 max-h-60 overflow-y-auto">
                    {[
                      {
                        icon: <FaEnvelope />,
                        color: "text-info",
                        title: "New message received",
                        time: "5 minutes ago",
                      },
                      {
                        icon: <FaExclamationCircle />,
                        color: "text-warning",
                        title: "System alert",
                        time: "15 minutes ago",
                      },
                      {
                        icon: <FaCheckCircle />,
                        color: "text-success",
                        title: "Weekly report is ready",
                        time: "1 hour ago",
                      },
                    ].map((notif, i) => (
                      <li
                        key={i}
                        className="px-4 py-3 hover:bg-base-200 transition cursor-pointer flex gap-3 items-start"
                      >
                        <span className={`mt-1 ${notif.color}`}>
                          {notif.icon}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{notif.title}</p>
                          <p className="text-xs text-base-content/60">
                            {notif.time}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2 border-t border-base-300 text-sm text-center hover:bg-base-200 cursor-pointer font-medium">
                    See all notifications
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar + Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 btn btn-ghost px-2 py-1 rounded-full transition-all"
            >
              <img
                src="/logo_F/2.png"
                alt="avatar"
                className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              />
              <FaChevronDown className="text-xs" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-base-100 border border-base-300 shadow-md rounded-lg min-w-[10rem] w-screen max-w-xs py-2 z-50"
                >
                  <li>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 hover:bg-base-200"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-base-200 text-error"
                    >
                      Logout
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

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

const Header = ({ onSidebarToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-base-100 border-b border-base-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sidebar + Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="btn btn-sm btn-ghost text-xl"
          >
            <FaBars />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary">
            Admin <span className="text-base-content">Xeranet</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-xl transition-all"
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* Notification */}
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-base-100 border border-base-300 shadow-lg rounded-xl w-72 z-50"
                >
                  <div className="p-4 border-b border-base-300 font-semibold">
                    Notifications
                  </div>
                  <ul className="divide-y divide-base-200 max-h-60 overflow-y-auto">
                    <li className="px-4 py-3 hover:bg-base-200 transition cursor-pointer flex gap-3 items-start">
                      <span className="text-info mt-1">
                        <FaEnvelope />
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          New message received
                        </p>
                        <p className="text-xs text-base-content/60">
                          5 minutes ago
                        </p>
                      </div>
                    </li>
                    <li className="px-4 py-3 hover:bg-base-200 transition cursor-pointer flex gap-3 items-start">
                      <span className="text-warning mt-1">
                        <FaExclamationCircle />
                      </span>
                      <div>
                        <p className="text-sm font-medium">System alert</p>
                        <p className="text-xs text-base-content/60">
                          15 minutes ago
                        </p>
                      </div>
                    </li>
                    <li className="px-4 py-3 hover:bg-base-200 transition cursor-pointer flex gap-3 items-start">
                      <span className="text-success mt-1">
                        <FaCheckCircle />
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          Weekly report is ready
                        </p>
                        <p className="text-xs text-base-content/60">
                          1 hour ago
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="px-4 py-2 border-t border-base-300 text-sm text-center hover:bg-base-200 cursor-pointer font-medium">
                    See all notifications
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 btn btn-ghost px-2 py-1 rounded-full"
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
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-base-100 border border-base-300 shadow-md rounded-lg w-44 py-2 z-50"
                >
                  <li>
                    <a className="block px-4 py-2 hover:bg-base-200">Profile</a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 hover:bg-base-200">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 hover:bg-base-200 text-error">
                      Logout
                    </a>
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

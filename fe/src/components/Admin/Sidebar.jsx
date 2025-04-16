/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdArticle,
  MdStars,
  MdImage,
  MdBadge,
} from "react-icons/md";
import { FaTags } from "react-icons/fa";

const menuItems = [
  { text: "Dashboard", icon: <MdDashboard size={22} />, path: "/admin" },
  { text: "Blog", icon: <MdArticle size={22} />, path: "/admin/blog" },
  {
    text: "Testimonials",
    icon: <MdStars size={22} />,
    path: "/admin/testimonials",
  },
  { text: "Hero Background", icon: <MdImage size={22} />, path: "/admin/hero" },
  { text: "Iklan", icon: <FaTags size={22} />, path: "/admin/iklan" },
  {
    text: "Logo Partner",
    icon: <MdBadge size={22} />,
    path: "/admin/logo-partner",
  },
];

const Sidebar = ({ open }) => {
  return (
    <motion.aside
      animate={{
        width: open ? 240 : 72,
      }}
      transition={{ duration: 0.3 }}
      className="fixed md:relative top-0 left-0 h-full z-40 bg-base-200 border-r border-base-300 shadow-sm overflow-hidden"
    >
      {/* Brand / Title */}
      <div className="p-4 flex items-center justify-center md:justify-start gap-2 border-b border-base-300 font-bold text-lg text-primary">
        <span className="text-xl">⚙️</span>
        {open && (
          <span className="text-sm sm:text-lg tracking-tight">Admin Panel</span>
        )}
      </div>

      {/* Menu */}
      <ul className="menu space-y-1 mt-2">
        {menuItems.map((item) => (
          <li key={item.text} className="relative group">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-primary text-primary-content shadow-md"
                    : "hover:bg-base-300 text-base-content"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {open && (
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.text}
                </span>
              )}
            </NavLink>

            {/* Tooltip saat sidebar tertutup */}
            {!open && (
              <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-base-100 border border-base-300 text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                {item.text}
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;

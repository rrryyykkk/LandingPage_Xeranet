/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdArticle,
  MdGroups,
  MdStars,
  MdImage,
} from "react-icons/md";

const menuItems = [
  { text: "Dashboard", icon: <MdDashboard size={20} />, path: "/admin" },
  { text: "Blog", icon: <MdArticle size={20} />, path: "/admin/blog" },
  { text: "Users", icon: <MdGroups size={20} />, path: "/admin/users" },
  {
    text: "Testimonials",
    icon: <MdStars size={20} />,
    path: "/admin/testimonials",
  },
  { text: "Hero Background", icon: <MdImage size={20} />, path: "/admin/hero" },
];

const Sidebar = ({ open }) => {
  return (
    <motion.aside
      animate={{ width: open ? 240 : 64 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-base-200 shadow-md overflow-hidden sticky top-0 z-30"
    >
      <div className="p-4 border-b border-base-300 font-bold text-lg text-primary">
        {open ? "Admin Panel" : "A"}
      </div>
      <ul className="menu p-2 space-y-1">
        {menuItems.map((item) => (
          <li key={item.text}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300 text-base-content"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {open && (
                <span className="whitespace-nowrap overflow-hidden transition-all duration-200">
                  {item.text}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;

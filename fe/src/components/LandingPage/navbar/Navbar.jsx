/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavbarLink";

// logo

import { FaInstagramSquare } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") {
      setActivePage("home");
    } else if (path === "/about") {
      setActivePage("about");
    } else if (path === "/contact") {
      setActivePage("contact");
    } else if (path === "/blog") {
      setActivePage("blog");
    } else if (path === "/service") {
      setActivePage("service");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    document.documentElement.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 shadow-md" : "bg-transparent"
      } text-white`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center h-full">
          <img
            src="/logo_F/logo.png"
            alt="Logo"
            className={`h-10 max-w-[120px] object-contain transition-transform duration-300 ${
              isScrolled ? "scale-95" : "scale-100"
            }`}
          />
        </a>

        {/* Burger Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-10 gap-1 z-[1001] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-screen w-full max-w-sm bg-[#141414f9] flex flex-col items-center justify-between px-6 pt-24 pb-6 z-[998]"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              src="/logo_F/logo.png"
              alt="Logo"
              className="h-16 max-w-[200px] object-contain mb-10"
            />

            <div className="flex flex-col gap-4 items-center w-full text-lg">
              {["home", "services", "blog", "contact", "about"].map(
                (page, i) => (
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="w-full text-center"
                  >
                    <NavLink
                      href={
                        page === "services"
                          ? "/#services"
                          : `/${page === "home" ? "" : page}`
                      }
                      isActive={activePage === page}
                      onClick={() => closeMenu(page)}
                      mobile
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </NavLink>
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-6 mt-10 text-white text-2xl"
            >
              <a
                href="https://www.instagram.com/xeranet.id/?igsh=MTI4MjNzZjV2ZXYycQ%3D%3D#"
                aria-label="Instagram"
              >
                <FaInstagramSquare className="w-12 h-12" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[997]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

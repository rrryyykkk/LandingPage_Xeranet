/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavbarLink";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import RealTimeandIP from "../common/RealTimeandIP";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const pageMap = {
      "/": "home",
      "/about": "about",
      "/blog": "blog",
      "/service": "service",
    };
    setActivePage(pageMap[path] || "home");
  }, []);

  useEffect(() => {
    const overflow = isOpen ? "hidden" : "unset";
    document.body.style.overflow = overflow;
    document.documentElement.style.overflow = overflow;
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      } text-white`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center">
          <img
            src="/logo_F/logo.png"
            alt="Logo"
            className={`h-10 max-w-[150px] object-contain transition-transform duration-300 ${
              isScrolled ? "scale-95 drop-shadow-md" : "scale-100"
            }`}
          />
        </a>

        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-8 h-8 gap-1 z-[1001] cursor-pointer"
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-80 max-w-sm bg-[#141414e6] backdrop-blur-lg shadow-2xl flex flex-col items-start justify-between px-6 pt-24 pb-6 z-[998] "
          >
            <RealTimeandIP />

            <div className="flex font-serif  flex-col items-start text-sm mt-4 w-full">
              {["home", "blog", "about", "service"].map((page, i) => (
                <div key={page} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="w-fit"
                  >
                    <NavLink
                      href={`/${page === "home" ? "" : page}`}
                      isActive={activePage === page}
                      onClick={() => closeMenu(page)}
                      mobile
                      className="relative inline-block py-2 text-white hover:text-primary transition-all duration-300 group"
                    >
                      <span className="relative z-10 capitalize">{page}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                    </NavLink>
                  </motion.div>

                  {/* garis full width */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    className="origin-left transform h-[1px] bg-gray-600 opacity-40 w-full"
                  />
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-3 text-white mt-15 mb-15"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                src="/logo_F/logo.png"
                alt="Logo"
                className="h-10 max-w-[150px] object-contain"
              />
              <div className="flex flex-row gap-3">
                <a
                  href="https://www.instagram.com/xeranet.id/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-10 h-10 py-2 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" aria-label="Facebook">
                  <FaFacebookSquare className="w-10 h-10 py-2 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="#" aria-label="X">
                  <FaXTwitter className="w-10 h-10 py-2 hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[997]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

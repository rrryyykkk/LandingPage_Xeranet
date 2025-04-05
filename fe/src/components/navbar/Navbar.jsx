import { useState, useEffect } from "react";
import NavLink from "./NavbarLink";

// logo
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 shadow-md" : "bg-transparent"
      } text-white`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center h-full">
          <img
            src="/logo.png"
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

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-[#141414f9] flex flex-col items-center justify-between px-6 pt-24 pb-6 z-[998] transition-all duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo in Menu */}
        <img
          src="/logo.png"
          alt="Logo"
          className="h-16 max-w-[200px] object-contain mb-10 transition-opacity duration-500"
        />

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 items-center w-full text-lg transition-all duration-500 ease-in-out">
          <NavLink
            href="/"
            isActive={activePage === "home"}
            onClick={() => closeMenu("home")}
            mobile
            className={`transition-all duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0 delay-100"
                : "opacity-0 translate-x-5"
            }`}
          >
            Home
          </NavLink>
          <NavLink
            href="/"
            isActive={activePage === "services"}
            onClick={() => closeMenu("services")}
            mobile
            className={`transition-all duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0 delay-200"
                : "opacity-0 translate-x-5"
            }`}
          >
            Services
          </NavLink>
          <NavLink
            href="#blog"
            isActive={activePage === "blog"}
            onClick={() => closeMenu("blog")}
            mobile
            className={`transition-all duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0 delay-300"
                : "opacity-0 translate-x-5"
            }`}
          >
            Blog
          </NavLink>

          <NavLink
            href="/contact"
            isActive={activePage === "Contact"}
            onClick={() => closeMenu("Contact")}
            mobile
            className={`transition-all duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0 delay-300"
                : "opacity-0 translate-x-5"
            }`}
          >
            Contact
          </NavLink>
          <NavLink
            href="/About"
            isActive={activePage === "About"}
            onClick={() => closeMenu("About")}
            mobile
            className={`transition-all duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0 delay-300"
                : "opacity-0 translate-x-5"
            }`}
          >
            About
          </NavLink>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-10 text-white text-2xl transition-opacity duration-500 ease-in-out">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/xeranet.id/?igsh=MTI4MjNzZjV2ZXYycQ%3D%3D#"
            aria-label="Instagram"
          >
            <FaInstagramSquare />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[997] transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;

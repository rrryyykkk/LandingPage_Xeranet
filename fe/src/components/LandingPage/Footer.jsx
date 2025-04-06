/* eslint-disable no-unused-vars */
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-black text-white py-10"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo dan Sosial Media */}
        <div>
          <img src="/logo_F/logo.png" alt="Logo" className="w-32 mb-4" />
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/xeranet.id/?igsh=MTI4MjNzZjV2ZXYycQ%3D%3D#"
              className="text-gray-300 hover:text-white text-xl"
            >
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaYoutube />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Company</h5>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-red-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-red-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/testimoni" className="hover:text-red-400 transition">
                Testimoni
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Solutions</h5>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Fraud Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                DevSecOps
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Security Operations Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400 transition">
                Data Protection
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Services</h5>
          <ul className="space-y-2">
            <li>
              <a href="#service" className="hover:text-red-400 transition">
                Penetration Testing
              </a>
            </li>
            <li>
              <a href="#service" className="hover:text-red-400 transition">
                Security Compliance
              </a>
            </li>
            <li>
              <a href="#service" className="hover:text-red-400 transition">
                Threat Hunting
              </a>
            </li>
            <li>
              <a href="#service`" className="hover:text-red-400 transition">
                Digital Forensics
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Xeranet. All Rights Reserved.
      </div>
    </motion.footer>
  );
}

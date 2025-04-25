/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion dari framer-motion

const PopUpWa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Mengambil nomor WhatsApp dari environment variable
  const waNumber = import.meta.env.VITE_WaNumber;

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      {/* Tombol WhatsApp yang bergerak-gerak */}
      <motion.button
        onClick={openModal}
        className="fixed z-[9999] bottom-12 right-8 p-4 rounded-full cursor-pointer bg-green-500 text-white shadow-lg hover:bg-green-600 transition duration-300"
        animate={{
          y: [0, 25, 0], // Gerakkan tombol ke atas dan bawah
        }}
        transition={{
          duration: 2, // Durasi pergerakan
          repeat: Infinity, // Ulangi terus-menerus
          repeatType: "loop", // Jenis perulangan
          ease: "easeInOut", // Gerakan halus
        }}
      >
        <FaWhatsapp size={24} /> {/* Ikon telepon */}
      </motion.button>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="modal modal-open"
          initial={{ opacity: 0 }} // Mulai dengan opacity 0
          animate={{ opacity: 1 }} // Berubah menjadi opacity 1 (fade-in)
          exit={{ opacity: 0 }} // Keluar dengan fade-out
          transition={{ duration: 0.3 }} // Durasi animasi
        >
          <div className="modal-box ">
            <h2 className="text-2xl font-bold">Contact via WhatsApp</h2>
            <p className="py-4">
              Klik tombol di bawah untuk memulai percakapan di{" "}
              <span className="font-bold text-green-500">WhatsApp.</span>
            </p>
            <div className="modal-action">
              {/* Tombol untuk mengarahkan ke WhatsApp */}
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                Mulai Obrolan di WhatsApp
              </a>
              <motion.button
                onClick={closeModal}
                className="btn"
                whileHover={{ scale: 1.1 }} // Efek hover pada tombol close
                whileTap={{ scale: 0.9 }} // Efek tap pada tombol close
              >
                Tutup
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PopUpWa;

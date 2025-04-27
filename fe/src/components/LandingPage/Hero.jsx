/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../../app/data/heroSlice";

const Hero = () => {
  const { heroes } = useSelector((state) => state.hero);
  const dispatch = useDispatch();
  const [mediaSrc, setMediaSrc] = useState("/BG.mp4");
  const [isVideo, setIsVideo] = useState(true);

  // Mengambil nomor WhatsApp dari environment variable
  const waNumber = import.meta.env.VITE_WaNumber;

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  useEffect(() => {
    const activeHero = heroes.find((hero) => hero.isActive === true);

    if (activeHero?.heroImage) {
      const url = activeHero.heroImage;
      const extension = url.split(".").pop().toLowerCase();

      const videoFormats = ["mp4", "webm", "ogg"];
      const imageFormats = ["jpg", "jpeg", "png", "gif", "webp"];

      if (videoFormats.includes(extension)) {
        setMediaSrc(url);
        setIsVideo(true);
      } else if (imageFormats.includes(extension)) {
        setMediaSrc(url);
        setIsVideo(false);
      } else {
        setMediaSrc("/BG.mp4");
        setIsVideo(true);
      }
    } else {
      setMediaSrc("/BG.mp4");
      setIsVideo(true);
    }
  }, [heroes]);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={mediaSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaSrc}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-blue-500"
        >
          Your Trusted Digital
          <br /> Transformation <br /> Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-6"
        >
          Comprehensive Web & Mobile Development | Robust Cybersecurity
          Solutions | Enterprise Networking
        </motion.p>

        <div className="max-w-2xl text-base md:text-lg mb-8 text-gray-600">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We build innovative digital solutions that drive business growth
            while ensuring security.
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 cursor-pointer"
          >
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                "Get Free Consultation"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Free Consultation
            </a>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border border-white text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-300"
          >
            <a href="/service">Our Services</a>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../app/data/testimoniSlice";
import { motion } from "framer-motion";

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials = [], isLoading } = useSelector(
    (state) => state.testimonials || {}
  );

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  return (
    <section
      id="testimonials"
      className="w-full bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Apa Kata Klien Kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Beberapa ulasan dari orang-orang yang telah bekerja sama dengan
            kami.
          </motion.p>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading testimonial...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada testimonial.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.testimoniImage}
                    alt={t.author}
                    className="w-14 h-14 rounded-full object-cover border border-gray-600"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{t.author}</h4>
                    <p className="text-sm text-yellow-400">⭐ {t.rating}/5</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  “{t.content}”
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;

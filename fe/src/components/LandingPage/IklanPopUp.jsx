/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchIklan } from "../../app/data/iklanSlice";

const IklanPopUp = () => {
  const dispatch = useDispatch();
  const { iklan = [] } = useSelector((state) => state.iklan); // Get iklan data from Redux store

  const [isOpen, setIsOpen] = useState(false);

  // Fetch Iklan when the component mounts
  useEffect(() => {
    dispatch(fetchIklan());
  }, [dispatch]);

  // Set a timer to open the popup after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  // Find the first active Iklan (status: "aktif")
  const activePopUp = iklan.find((p) => p.isActive === true);

  const handleClose = () => setIsOpen(false);

  // If there's no active Iklan, do not render the popup
  if (!activePopUp || !activePopUp.iklanImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            className="relative rounded-xl overflow-hidden shadow-2xl w-[90%] max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute cursor-pointer top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 z-10"
            >
              <AiOutlineClose />
            </button>

            {/* Display Iklan image */}
            <img
              src={activePopUp.iklanImage}
              alt="popup-iklan"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IklanPopUp;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const logos = [
  "/logoPT/amazon.png",
  "/logoPT/google.png",
  "/logoPT/ibm.png",
  "/logoPT/apple.png",
  "/logoPT/pertamina.png",
  "/logoPT/sony.png",
  "/logoPT/meta.png",
  "/logoPT/mi.jpg",
  "/logoPT/microsoft.jpg",
  "/logoPT/philips.webp",
];

const LogoPartner = () => {
  return (
    <section className="py-12 bg-indigo-300">
      <h2 className="text-center text-2xl font-bold mb-6 text-black">
        Didukung Oleh
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        className="w-full max-w-6xl mx-auto"
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-16 object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default LogoPartner;

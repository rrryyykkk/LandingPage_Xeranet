import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const logos = ["/1.png", "/2.png", "/3.png", "/4.png"];

const LogoPartner = () => {
  return (
    <section className="py-12 bg-indigo-950">
      <h2 className="text-center text-2xl font-bold mb-6 text-white">
        Didukung Oleh
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
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

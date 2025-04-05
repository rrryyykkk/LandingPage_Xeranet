const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          preload="auto"
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/BG.mp4" type="video/mp4" />
          {/* Fallback Image */}
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-blue-500">
          Your Trusted Digital
          <br /> Transformation <br /> Partner
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-6">
          Comprehensive Web & Mobile Development | Robust Cybersecurity
          Solutions | Enterprise Networking
        </p>
        <div className="max-w-2xl text-base md:text-lg mb-8 text-gray-600">
          <p>
            We build innovative digital solutions that drive business growth
            while ensuring security.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 cursor-pointer">
            Get Free Consultation
          </button>
          <button className="border border-white text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-300">
            Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

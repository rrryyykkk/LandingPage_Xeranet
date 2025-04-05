const testimonials = [
  {
    name: "Sarah L.",
    role: "Freelancer",
    message:
      "The service was amazing! Fast response and very professional. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Mike D.",
    role: "Startup Founder",
    message:
      "I've collaborated with them multiple times, and they always deliver quality work.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Alicia T.",
    role: "Marketing Manager",
    message:
      "A game changer for our brand! Excellent communication and creativity.",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
];

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="w-full bg-gray-900 text-white py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Real feedback from people who’ve worked with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-6 rounded-xl shadow-md border border-gray-800 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-600"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                “{t.message}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

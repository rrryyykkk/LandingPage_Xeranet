const Hero2 = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12 bg-zinc-900">
      {/* Gambar Kiri */}
      <div className="flex justify-center">
        <img
          src="hero-2.png"
          alt="Hero Illustration"
          className="w-full max-w-md object-contain"
        />
      </div>

      {/* Konten Kanan */}
      <div className="flex flex-col justify-center text-gray-100 gap-10">
        {/* Cyber Security */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-indigo-500">Cyber Security</h1>
          {/* <h2 className="text-2xl font-semibold">+300 Juta</h2> */}
          <p className="text-md leading-relaxed">
            Lebih dari <span className="text-sky-500 font-bold">300</span> juta
            serangan siber terjadi di Indonesia pada tahun{" "}
            <span className="text-sky-500 font-bold">2023</span>. Jangan biarkan
            perusahaan Anda menjadi korban berikutnya.
            <br />
            Lindungi aset digital Anda dengan{" "}
            <strong>pengujian penetrasi (penetration testing)</strong>.
          </p>
        </div>

        {/* Software Development */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-indigo-500">
            Software Development
          </h1>
          {/* <h2 className="text-2xl font-semibold">95%</h2> */}
          <p className="text-md leading-relaxed">
            <span className="text-sky-500 font-bold">95%</span> startup gagal
            karena produk yang tidak sesuai kebutuhan pasar. Pastikan aplikasi
            Anda relevan dan siap digunakan sejak hari pertama.
          </p>
        </div>

        {/* Networking */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-indigo-500">Networking</h1>
          {/* <h2 className="text-2xl font-semibold">70%</h2> */}
          <p className="text-md leading-relaxed">
            <span className="text-sky-500 font-bold">70%</span> downtime
            disebabkan oleh infrastruktur yang tidak scalable. <br />
            Jangan tunggu hingga sistem Anda tumbang. <br />
            <span className="text-sky-400 font-bold">
              {" "}
              — optimalkan jaringan Anda sekarang. (Data 2023)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero2;

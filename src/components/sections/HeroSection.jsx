import React, { useState, useEffect } from "react";
import aspirasiIlustrasi from "../../assets/images/aspirasi_ilustrasi.png";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    aspirasi: "",
    penulis: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/aspirasi/aspirasimhs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gagal submit:", errorData);
        alert("Gagal mengirim aspirasi. Coba lagi.");
        return;
      }

      const result = await response.json();
      console.log("Aspirasi berhasil dikirim:", result);

      alert("Aspirasi berhasil dikirim!");
      setFormData({ aspirasi: "", penulis: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  const resetForm = () => {
    setFormData({ aspirasi: "", penulis: "" });
    setShowModal(false);
  };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 py-16 text-white"
      style={{
        backgroundImage: `url(${aspirasiIlustrasi})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>

      <div
        className="relative z-10 text-center max-w-4xl px-4"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-6 leading-snug">
          SUARAKAN ASPIRASIMU
          <br />
          UNTUK RPL YANG LEBIH BAIK
        </h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mt-2 px-6 py-3 rounded-md bg-gray-200 text-black font-medium hover:bg-[#10316B] hover:text-[#FFE867] transition-all duration-300 transform hover:scale-105"
        >
          Suarakan Aspirasimu
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Suarakan Aspirasimu
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-1">
                  Aspirasi
                </label>
                <textarea
                  name="aspirasi"
                  value={formData.aspirasi}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                  placeholder="Masukkan aspirasi..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-1">
                  Penulis{" "}
                  <span className="text-xs font-normal text-white/60">
                    (Opsional)
                  </span>
                </label>
                <input
                  type="text"
                  name="penulis"
                  value={formData.penulis}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                  placeholder="Nama penulis..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#FFE867] text-[#10316B] font-semibold rounded-lg hover:bg-[#e6d258] transition duration-300 shadow-md"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logohima from "../assets/images/logohima.png";
import Footer from "../components/layout/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email diperlukan";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Format email tidak valid";
    if (!formData.password) tempErrors.password = "Password diperlukan";
    else if (formData.password.length < 6)
      tempErrors.password = "Password minimal 6 karakter";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        // Deteksi khusus jika rate limit (HTTP 429)
        if (response.status === 429) {
          setErrors({
            general:
              data.message || "Terlalu banyak permintaan. Coba lagi nanti.",
          });
          return; // Stop di sini, jangan proses lebih lanjut
        }

        // Jika sukses login
        if (response.ok && data.status === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/aspirasi");
        } else {
          // Gagal login biasa
          setErrors({
            general:
              data.message || "Login gagal. Periksa email dan password Anda.",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          general: "Terjadi kesalahan koneksi. Silakan coba lagi.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#10316B] relative">
      {/* Decorative backgrounds */}
      <div className="absolute w-60 h-60 bg-[#ffe867]/20 rounded-full top-10 left-10 blur-2xl opacity-30 animate-pulse" />
      <div className="absolute w-80 h-80 bg-[#ffe867]/30 rounded-full bottom-10 right-10 blur-2xl opacity-20" />

      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 z-10">
        <div className="w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <img
              className="mx-auto h-16 w-auto"
              src={logohima}
              alt="Logo HIMA RPL"
            />
            <h2 className="mt-4 text-2xl font-bold text-white tracking-wide">
              Selamat Datang
            </h2>
            {/* <p className="text-sm text-gray-200 mt-1">
              Belum punya akun?{" "}
              <Link to="/register" className="text-[#FFE867] hover:underline">
                Daftar sekarang
              </Link>
            </p> */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-white mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border ${
                  errors.email ? "border-red-500" : "border-white/30"
                } focus:outline-none focus:ring-2 focus:ring-[#FFE867]`}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-white mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border ${
                  errors.password ? "border-red-500" : "border-white/30"
                } focus:outline-none focus:ring-2 focus:ring-[#FFE867]`}
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-white mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded text-[#10316B] focus:ring-[#FFE867]"
                />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="hover:underline text-[#FFE867]">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 font-semibold rounded-lg transition duration-300 shadow-md ${
                isLoading
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-[#FFE867] text-[#10316B] hover:bg-[#e6d258]"
              }`}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="z-10">
        <Footer withAnimation={false} />
      </footer>
    </div>
  );
};

export default Login;

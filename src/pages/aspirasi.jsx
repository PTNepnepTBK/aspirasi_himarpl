import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logohima from "../assets/images/logohima.png";
import backgroundRectangel from "../assets/images/rectangle498.png";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/NavbarAdmin";
import dummyIlustrasi from "../assets/images/ilustrasi_aspirasi2.png";

const Aspirasi = () => {
  const [aspirasi, setAspirasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    aspirasi: "",
    penulis: "",
    kategori: "prodi",
    status: "displayed",
  });

  const navigate = useNavigate();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(aspirasi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = aspirasi.slice(startIndex, endIndex);

  useEffect(() => {
    fetchAspirations();
  }, []);

  const fetchAspirations = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/aspirasi/aspirasimhs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        // Transform API data to match the original structure
        const transformedData = data.data.map((item) => ({
          id: item.id_aspirasi,
          ilustrasi: dummyIlustrasi,
          aspirasi: item.aspirasi,
          penulis: item.penulis || "Anonim",
          created_at: item.c_date
            ? new Date(item.c_date).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })
            : new Date().toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              }),
        }));

        setAspirasi(transformedData);
      } else {
        setError(data.error || "Gagal mengambil data aspirasi");
      }
    } catch (err) {
      console.error("Error fetching aspirations:", err);
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#10316B] relative">
        {/* Background image with transparency */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: `url(${backgroundRectangel})`,
          }}
        />

        {/* Decorative backgrounds */}
        <div className="absolute w-60 h-60 bg-[#ffe867]/20 rounded-full top-10 left-10 blur-2xl opacity-30 animate-pulse" />
        <div className="absolute w-80 h-80 bg-[#ffe867]/30 rounded-full bottom-10 right-10 blur-2xl opacity-20" />

        {/* Navbar */}
       <Navbar currentPage="data"/>

        <main className="flex-grow flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFE867] border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-lg">Memuat data aspirasi...</p>
          </div>
        </main>

        <footer className="z-10">
          <Footer withAnimation={false} />
        </footer>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#10316B] relative">
        {/* Background image with transparency */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: `url(${backgroundRectangel})`,
          }}
        />

        {/* Decorative backgrounds */}
        <div className="absolute w-60 h-60 bg-[#ffe867]/20 rounded-full top-10 left-10 blur-2xl opacity-30 animate-pulse" />
        <div className="absolute w-80 h-80 bg-[#ffe867]/30 rounded-full bottom-10 right-10 blur-2xl opacity-20" />

        {/* Navbar */}
        <Navbar currentPage="data"/>

        <main className="flex-grow flex items-center justify-center z-10 px-4">
          <div className="text-center max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-200 mb-6">{error}</p>
            <button
              onClick={fetchAspirations}
              className="bg-[#FFE867] text-[#10316B] px-6 py-2 rounded-lg font-semibold hover:bg-[#e6d258] transition duration-300"
            >
              Coba Lagi
            </button>
          </div>
        </main>

        <footer className="z-10">
          <Footer withAnimation={false} />
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#10316B] relative">
      {/* Background image with transparency */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url(${backgroundRectangel})`,
        }}
      />

      {/* Decorative backgrounds */}
      <div className="absolute w-60 h-60 bg-[#ffe867]/20 rounded-full top-10 left-10 blur-2xl opacity-30 animate-pulse" />
      <div className="absolute w-80 h-80 bg-[#ffe867]/30 rounded-full bottom-10 right-10 blur-2xl opacity-20" />

      {/* Navbar */}
      <Navbar currentPage="data"/>

      {/* Main content area */}
      <main className="flex-grow px-4 py-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              className="mx-auto h-16 w-auto mb-4"
              src={logohima}
              alt="Logo HIMA RPL"
            />
            <h1 className="text-3xl font-bold text-white mb-2">
              Manajemen Aspirasi
            </h1>
            <p className="text-gray-200">
              Kelola aspirasi mahasiswa dengan mudah
            </p>
          </div>

          {/* Table */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {aspirasi.length === 0 ? (
              <div className="text-center p-8">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Belum Ada Aspirasi
                </h3>
                <p className="text-gray-200">
                  Belum ada aspirasi yang terdaftar dalam sistem
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Aspirasi
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Penulis
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Tanggal & Waktu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-white/10 ${
                          index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-white font-medium max-w-xs truncate">
                            {item.aspirasi}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">{item.penulis}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white text-sm">
                            {item.created_at}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4 bg-black/10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded-lg transition duration-300 ${
                      currentPage === index + 1
                        ? "bg-[#FFE867] text-[#10316B] font-bold"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10">
        <Footer withAnimation={false} />
      </footer>
    </div>
  );
};

export default Aspirasi;

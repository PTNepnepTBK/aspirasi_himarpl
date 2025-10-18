import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import dummyIlustrasi from "../assets/images/ilustrasi_aspirasi2.png";

const API_URL = import.meta.env.VITE_API_URL ;

const AspirasiModal = ({
  show,
  onClose,
  fetchDisplayAspirasi,
  displayCurrentPage,
  searchTerm,
}) => {
  const [aspirasi, setAspirasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    aspirasi: "",
    penulis: "",
    kategori: "prodi",
    status: "displayed",
    id_aspirasi: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const itemsPerPage = 5;

  // Fetch aspirations for modal
  const fetchAspirations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${API_URL}/api/aspirasi/aspirasimhs`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        const transformedData = data.data.map((item) => ({
          id: item.id_aspirasi,
          ilustrasi: dummyIlustrasi,
          aspirasi: item.aspirasi,
          c_date: item.c_date.slice(0, 10),
          kategori: item.kategori,
          penulis: item.penulis || "Anonim",
        }));

        setAspirasi(transformedData);
        setTotalPages(Math.ceil(transformedData.length / itemsPerPage));
      } else {
        setError(data.error || "Gagal mengambil data aspirasi");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchAspirations();
      setCurrentPage(1);
      setFormData({
        aspirasi: "",
        penulis: "",
        kategori: "prodi",
        status: "displayed",
        id_aspirasi: null,
      });
      setSelectedImage(null);
      setImagePreview(null);
      setImageError("");
    }
    // eslint-disable-next-line
  }, [show]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = aspirasi.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddAspirasi = (aspirasi, penulis, id_aspirasi, kategori) => {
    const isValidCategory = kategori === "hima" || kategori === "prodi";
    setFormData({
      ...formData,
      aspirasi: aspirasi,
      penulis: penulis,
      id_aspirasi: id_aspirasi,
      kategori: isValidCategory ? kategori : "prodi",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        setImageError("Ukuran gambar maksimal 200KB.");
        setSelectedImage(null);
        setImagePreview(null);
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError("");
    }
  };

  const insertDisplayAspirasi = async (formDataToSubmit) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return null;
      }

      const response = await fetch(
        `${API_URL}/api/aspirasi/displayaspirasi`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return null;
      }

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw new Error(result.error || "Gagal menambahkan aspirasi");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_aspirasi) {
      alert("Silakan pilih aspirasi terlebih dahulu!");
      return;
    }

    setSubmitLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("id_aspirasi", formData.id_aspirasi.toString());
      formDataToSubmit.append("kategori", formData.kategori);
      formDataToSubmit.append("status", formData.status);

      if (selectedImage) {
        formDataToSubmit.append("ilustrasi", selectedImage);
      }

      const result = await insertDisplayAspirasi(formDataToSubmit);

      if (result) {
        alert("Aspirasi berhasil ditambahkan!");
        onClose();
        if (typeof fetchDisplayAspirasi === "function") {
          fetchDisplayAspirasi(displayCurrentPage, searchTerm);
        }
      }
    } catch (err) {
      alert("Gagal menambahkan aspirasi: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050] px-4 ">
      <div className="w-full max-w-6xl backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Tambah Aspirasi</h2>
        </div>

        {/* Table Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Pilih Aspirasi dari Data Mahasiswa
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFE867] border-t-transparent mx-auto mb-4"></div>
              <p className="text-white">Memuat data aspirasi...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={fetchAspirations}
                className="bg-[#FFE867] text-[#10316B] px-4 py-2 rounded-lg font-semibold hover:bg-[#e6d258] transition duration-300"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl overflow-hidden">
              {aspirasi.length === 0 ? (
                <div className="text-center p-6">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Belum Ada Aspirasi
                  </h3>
                  <p className="text-gray-200">
                    Belum ada aspirasi yang terdaftar dalam sistem
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-white">
                            Aspirasi
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-white">
                            Penulis
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-white">
                            Tanggal
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-white">
                            Kategori
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-white">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((item, index) => (
                          <tr
                            key={item.id}
                            className={`border-b border-white/10 ${
                              index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                            } ${
                              formData.id_aspirasi === item.id
                                ? "bg-[#FFE867]/20"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="text-white font-medium break-words">
                                {item.aspirasi}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-white">{item.penulis}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-white">{item.c_date}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-white">{item.kategori}</div>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() =>
                                  handleAddAspirasi(
                                    item.aspirasi,
                                    item.penulis,
                                    item.id,
                                    item.kategori
                                  )
                                }
                                className={`px-3 py-1 rounded-lg text-sm font-semibold transition duration-300 ${
                                  formData.id_aspirasi === item.id
                                    ? "bg-green-500 text-white"
                                    : "bg-[#FFE867] text-[#10316B] hover:bg-[#e6d258]"
                                }`}
                              >
                                {formData.id_aspirasi === item.id
                                  ? "Selected"
                                  : "Add"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 py-4 bg-black/10">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-1 rounded-lg transition duration-300 text-sm ${
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
                        className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="border-t border-white/20 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Form Aspirasi
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                Aspirasi
              </label>
              <textarea
                disabled
                name="aspirasi"
                value={formData.aspirasi}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                placeholder="Masukkan aspirasi..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                Penulis
              </label>
              <input
                disabled
                type="text"
                name="penulis"
                value={formData.penulis}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                placeholder="Nama penulis..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                Gambar Ilustrasi (Max 200KB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FFE867] file:text-[#10316B] hover:file:bg-[#e6d258]"
              />
              {imageError && (
                <p className="text-red-400 text-sm mt-2">{imageError}</p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-40 h-auto rounded-lg border border-white/30"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                Kategori
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                disabled={formData.id_aspirasi && aspirasi.find(item => item.id === formData.id_aspirasi)?.kategori && (aspirasi.find(item => item.id === formData.id_aspirasi)?.kategori === "hima" || aspirasi.find(item => item.id === formData.id_aspirasi)?.kategori === "prodi")}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="prodi" className="bg-[#10316B] text-white">
                  PRODI
                </option>
                <option value="hima" className="bg-[#10316B] text-white">
                  HIMA
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
              >
                <option value="displayed" className="bg-[#10316B] text-white">
                  DISPLAYED
                </option>
                <option value="hidden" className="bg-[#10316B] text-white">
                  HIDDEN
                </option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitLoading}
                className="flex-1 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitLoading || !formData.id_aspirasi}
                className="flex-1 py-2 bg-[#FFE867] text-[#10316B] font-semibold rounded-lg hover:bg-[#e6d258] transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {submitLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#10316B] border-t-transparent mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AspirasiModal;

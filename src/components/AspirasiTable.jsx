import React from "react";

const AspirasiTable = ({
  displayAspirasi,
  updateLoading,
  handleImageClick,
  toggleKategori,
  toggleStatus,
  displayCurrentPage,
  totalDisplayPages,
  handleDisplayPageChange,
  searchTerm,
  totalCount,
  displayLoading,
  displayError,
  fetchDisplayAspirasi,
  onDeleteClick
}) => {
  const getImageUrl = (imageName) => {
    return imageName
      ? `http://192.168.100.102:3000/assets/images/ilustrasi_aspirasi/${imageName}`
      : null;
  };

  return (
    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      {displayLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFE867] border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Memuat data...</p>
        </div>
      ) : displayError ? (
        <div className="text-center py-8">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <p className="text-red-300 mb-4">{displayError}</p>
          <button
            onClick={() => fetchDisplayAspirasi(displayCurrentPage, searchTerm)}
            className="bg-[#FFE867] text-[#10316B] px-4 py-2 rounded-lg font-semibold hover:bg-[#e6d258] transition duration-300"
          >
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Ilustrasi</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Aspirasi</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Penulis</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Added By</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {displayAspirasi.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-white py-6">
                    {searchTerm
                      ? "Tidak ada data yang cocok dengan pencarian."
                      : "Belum ada data aspirasi."}
                  </td>
                </tr>
              ) : (
                displayAspirasi.map((item, index) => (
                  <tr
                    key={item.id_dispirasi}
                    className={`border-b border-white/10 ${
                      index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                    }`}
                  >
                    <td className="px-6 py-4">
                      {item.ilustrasi ? (
                        <img
                          src={getImageUrl(item.ilustrasi)}
                          alt="Ilustrasi"
                          className="w-16 h-16 object-cover rounded-lg border border-white/30 cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200"
                          onClick={() => handleImageClick(item)}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                          title="Klik untuk mengubah gambar"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-200"
                          onClick={() => handleImageClick(item)}
                          title="Klik untuk menambah gambar"
                        >
                          <span className="text-white/50 text-xs">
                            + Add Image
                          </span>
                        </div>
                      )}
                      {updateLoading === item.id_dispirasi && (
                        <div className="mt-1 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium break-words">
                        {item.aspirasi}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">
                        {item.penulis || "Anonim"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleKategori(item)}
                        disabled={updateLoading === item.id_dispirasi}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                          item.kategori === "prodi"
                            ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                            : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                        } ${
                          updateLoading === item.id_dispirasi
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {updateLoading === item.id_dispirasi ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>...</span>
                          </div>
                        ) : (
                          item.kategori.toUpperCase()
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">
                        {item.added_by}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">
                        {new Date(item.last_updated).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(item)}
                        disabled={updateLoading === item.id_dispirasi}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                          item.status === "displayed"
                            ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                        } ${
                          updateLoading === item.id_dispirasi
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {updateLoading === item.id_dispirasi ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>...</span>
                          </div>
                        ) : (
                          item.status.toUpperCase()
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="bg-red-500/20 text-red-300 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition duration-300"
                          onClick={() => onDeleteClick(item)}
                          disabled={updateLoading === item.id_dispirasi}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination for Display Aspirasi */}
      {!searchTerm && totalDisplayPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4 bg-black/10">
          <button
            onClick={() => handleDisplayPageChange(displayCurrentPage - 1)}
            disabled={displayCurrentPage === 1}
            className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Previous
          </button>
          {/* Page numbers */}
          {(() => {
            const pages = [];
            const maxVisible = 5;
            let startPage = Math.max(1, displayCurrentPage - 2);
            let endPage = Math.min(
              totalDisplayPages,
              startPage + maxVisible - 1
            );

            if (endPage - startPage + 1 < maxVisible) {
              startPage = Math.max(1, endPage - maxVisible + 1);
            }

            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => handleDisplayPageChange(1)}
                  className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 text-sm"
                >
                  1
                </button>
              );
              if (startPage > 2) {
                pages.push(
                  <span
                    key="start-ellipsis"
                    className="px-2 text-white/50"
                  >
                    ...
                  </span>
                );
              }
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => handleDisplayPageChange(i)}
                  className={`px-3 py-1 rounded-lg transition duration-300 text-sm ${
                    displayCurrentPage === i
                      ? "bg-[#FFE867] text-[#10316B] font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {i}
                </button>
              );
            }

            if (endPage < totalDisplayPages) {
              if (endPage < totalDisplayPages - 1) {
                pages.push(
                  <span key="end-ellipsis" className="px-2 text-white/50">
                    ...
                  </span>
                );
              }
              pages.push(
                <button
                  key={totalDisplayPages}
                  onClick={() => handleDisplayPageChange(totalDisplayPages)}
                  className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 text-sm"
                >
                  {totalDisplayPages}
                </button>
              );
            }

            return pages;
          })()}
          <button
            onClick={() => handleDisplayPageChange(displayCurrentPage + 1)}
            disabled={displayCurrentPage === totalDisplayPages}
            className="px-3 py-1 rounded-lg bg-white/20 text-white hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AspirasiTable; 
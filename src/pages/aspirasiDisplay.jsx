import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logohima from "../assets/images/logohima.png";
import backgroundRectangel from "../assets/images/rectangle498.png";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/NavbarAdmin";
import AspirasiModal from "../components/AspirasiModal";
import dummyIlustrasi from "../assets/images/ilustrasi_aspirasi2.png";
import AspirasiTable from "../components/AspirasiTable";
import ImageUpdateModal from "../components/ImageUpdateModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";

const AspirasiCrud = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // State & function untuk data utama (bukan modal)
  const [displayAspirasi, setDisplayAspirasi] = useState([]);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [displayError, setDisplayError] = useState(null);
  const [displayCurrentPage, setDisplayCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalDisplayPages, setTotalDisplayPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(null); // untuk loading state saat update
  const [showImageUpdateModal, setShowImageUpdateModal] = useState(false);
  const [selectedItemForImageUpdate, setSelectedItemForImageUpdate] =
    useState(null);
  const [previewImage, setPreviewImage] = useState(null); // preview gambar baru
  const [pendingFile, setPendingFile] = useState(null); // file yang dipilih
  const [showImageUpdateConfirm, setShowImageUpdateConfirm] = useState(false); // konfirmasi update image
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const itemsPerPage = 5;

 const handleImageClick = (item) => {
  setSelectedItemForImageUpdate(item);
  setShowImageUpdateModal(true);
  setPreviewImage(null);
  setPendingFile(null);
};

// 3. Function untuk handle konfirmasi update image
const handleConfirmImageUpdate = () => {
  fileInputRef.current?.click();
  setShowImageUpdateModal(false);
};

// 4. Function untuk handle cancel update image
const handleCancelImageUpdate = () => {
  setShowImageUpdateModal(false);
  setSelectedItemForImageUpdate(null);
  setPreviewImage(null);
  setPendingFile(null);
};

// 5. Function untuk handle file change (sama seperti sebelumnya)
const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('File harus berupa gambar');
    return;
  }
  if (file.size > 200 * 1024) {
    alert('Ukuran file maksimal 200KB');
    return;
  }
  setPendingFile(file);
  setPreviewImage(URL.createObjectURL(file));
};

const handleUpdateImageClick = () => {
  setShowImageUpdateConfirm(true);
};

const handleConfirmUpdateImage = async () => {
  if (!pendingFile || !selectedItemForImageUpdate) return;
  setUpdateLoading(selectedItemForImageUpdate.id_dispirasi);
  setShowImageUpdateConfirm(false);
  setShowImageUpdateModal(false);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const formData = new FormData();
    formData.append('id_dispirasi', selectedItemForImageUpdate.id_dispirasi.toString());
    formData.append('action', 'update_image');
    formData.append('ilustrasi', pendingFile);
    const response = await fetch("http://localhost:3000/api/aspirasi/displayaspirasi", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
    const data = await response.json();
    if (response.ok) {
      await fetchDisplayAspirasi(displayCurrentPage, searchTerm);
      console.log("Update ilustrasi berhasil:", data.message);
    } else {
      console.error("Update ilustrasi gagal:", data.error);
      alert("Gagal mengupdate ilustrasi: " + data.error);
    }
  } catch (err) {
    console.error("Terjadi kesalahan saat update ilustrasi:", err);
    alert("Terjadi kesalahan saat mengupdate ilustrasi");
  } finally {
    setUpdateLoading(null);
    setSelectedItemForImageUpdate(null);
    setPreviewImage(null);
    setPendingFile(null);
  }
};

  // Fetch display aspirasi data
  const fetchDisplayAspirasi = async (page = 1, search = "") => {
    setDisplayLoading(true);
    setDisplayError(null);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      let url = "http://localhost:3000/api/aspirasi/displayaspirasi";

      if (search.trim()) {
        url += `?param=${encodeURIComponent(search)}`;
      } else {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage - 1;
        url += `?param=${startIndex},${endIndex}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setDisplayAspirasi(data.data || []);
        setTotalCount(data.count || 0);

        if (!search.trim()) {
          setTotalDisplayPages(Math.ceil((data.count || 0) / itemsPerPage));
        } else {
          setTotalDisplayPages(1);
        }
      } else {
        setDisplayError(data.error || "Gagal mengambil data display aspirasi");
      }
    } catch (err) {
      setDisplayError("Terjadi kesalahan koneksi");
    } finally {
      setDisplayLoading(false);
    }
  };

  // Function untuk update status atau kategori
  const updateAspirasiField = async (id_dispirasi, action, newValue) => {
    setUpdateLoading(id_dispirasi);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("id_dispirasi", id_dispirasi.toString());
      formData.append("action", action);
      formData.append(action, newValue);

      const response = await fetch(
        "http://localhost:3000/api/aspirasi/displayaspirasi",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        // Refresh data setelah update berhasil
        await fetchDisplayAspirasi(displayCurrentPage, searchTerm);

        // Show success message (optional)
        console.log("Update berhasil:", data.message);
      } else {
        console.error("Update gagal:", data.error);
        // You can add toast notification here
      }
    } catch (err) {
      console.error("Terjadi kesalahan saat update:", err);
      // You can add toast notification here
    } finally {
      setUpdateLoading(null);
    }
  };

  // Function untuk menampilkan dialog konfirmasi
  const showConfirmation = (action, item, newValue) => {
    const actionText = action === "status" ? "status" : "kategori";
    const currentValue = action === "status" ? item.status : item.kategori;

    setConfirmAction({
      id: item.id_dispirasi,
      action: action,
      newValue: newValue,
      message: `Apakah Anda yakin ingin mengubah ${actionText} dari "${currentValue}" menjadi "${newValue}"?`,
      item: item,
    });
    setShowConfirmDialog(true);
  };

  // Function untuk handle konfirmasi
  const handleConfirm = async () => {
    if (confirmAction) {
      await updateAspirasiField(
        confirmAction.id,
        confirmAction.action,
        confirmAction.newValue
      );
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  // Function untuk handle cancel konfirmasi
  const handleCancel = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  // Function untuk toggle status
  const toggleStatus = (item) => {
    const newStatus = item.status === "displayed" ? "hidden" : "displayed";
    showConfirmation("status", item, newStatus);
  };

  // Function untuk toggle kategori
  const toggleKategori = (item) => {
    const newKategori = item.kategori === "prodi" ? "hima" : "prodi";
    showConfirmation("kategori", item, newKategori);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setUpdateLoading(itemToDelete.id_dispirasi);
    setShowDeleteConfirm(false);
    try {
      const response = await fetch(`http://localhost:3000/api/aspirasi/displayaspirasi?id=${itemToDelete.id_dispirasi}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        await fetchDisplayAspirasi(displayCurrentPage, searchTerm);
        console.log('Berhasil dihapus:', result.message);
      } else {
        console.error('Error:', result.error);
        alert('Gagal menghapus data: ' + result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Terjadi kesalahan jaringan saat menghapus data');
    } finally {
      setUpdateLoading(null);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    fetchDisplayAspirasi(displayCurrentPage, searchTerm);
  }, [displayCurrentPage, searchTerm]);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleDisplayPageChange = (pageNumber) => {
    setDisplayCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayCurrentPage(1);
  };

  const getImageUrl = (imageName) => {
    return imageName
      ? `https://iieyqnbtsfzpvetpcyjp.supabase.co/storage/v1/object/public/ilust_aspirasi/${imageName}`
      : null;
  };

  const handleModalCloseAndRefresh = () => {
    setShowModal(false);
    fetchDisplayAspirasi(displayCurrentPage, searchTerm);
  };

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
      <Navbar currentPage="display" />

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

          {/* Search and Action Button */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari aspirasi..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
              />
            </div>
            <button
              onClick={handleModalOpen}
              className="bg-[#FFE867] text-[#10316B] px-6 py-2 rounded-lg font-semibold hover:bg-[#e6d258] transition duration-300 shadow-md"
            >
              + Tambah Aspirasi
            </button>
          </div>

          {/* Info total data */}
          {!searchTerm && totalCount > 0 && (
            <div className="mb-4 text-center">
              <p className="text-white/70 text-sm">
                Menampilkan {displayAspirasi.length} dari {totalCount} total
                aspirasi
                {totalDisplayPages > 1 &&
                  ` (Halaman ${displayCurrentPage} dari ${totalDisplayPages})`}
              </p>
            </div>
          )}

          {/* Table */}
          <AspirasiTable
            displayAspirasi={displayAspirasi}
            updateLoading={updateLoading}
            handleImageClick={handleImageClick}
            toggleKategori={toggleKategori}
            toggleStatus={toggleStatus}
            displayCurrentPage={displayCurrentPage}
            totalDisplayPages={totalDisplayPages}
            handleDisplayPageChange={handleDisplayPageChange}
            searchTerm={searchTerm}
            totalCount={totalCount}
            displayLoading={displayLoading}
            displayError={displayError}
            fetchDisplayAspirasi={fetchDisplayAspirasi}
            onDeleteClick={handleDeleteClick}
          />
          {/* Image Update Modal */}
          {showImageUpdateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
              <ImageUpdateModal
                show={showImageUpdateModal}
                onCancel={handleCancelImageUpdate}
                selectedItem={selectedItemForImageUpdate}
                getImageUrl={getImageUrl}
                previewImage={previewImage}
                onFileChange={handleFileChange}
                onUpdateClick={handleUpdateImageClick}
                isUpdateMode={!!previewImage}
              />
            </div>
          )}
          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
              <ConfirmationDialog
                show={showConfirmDialog}
                message={confirmAction?.message}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
              />
            </div>
          )}
          {/* Confirmation Dialog for Update Image */}
          {showImageUpdateConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
              <ConfirmationDialog
                show={showImageUpdateConfirm}
                message={"Apakah Anda yakin ingin mengupdate ilustrasi ini?"}
                onCancel={() => setShowImageUpdateConfirm(false)}
                onConfirm={handleConfirmUpdateImage}
              />
            </div>
          )}
          {/* Confirmation Dialog for Delete */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
              <DeleteConfirmationDialog
                show={showDeleteConfirm}
                message={
                  itemToDelete
                    ? `Apakah Anda yakin ingin menghapus aspirasi ini?\n\n\"${itemToDelete.aspirasi}\"`
                    : ""
                }
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
            </div>
          )}
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
              <AspirasiModal
                show={showModal}
                onClose={handleModalCloseAndRefresh}
                fetchDisplayAspirasi={fetchDisplayAspirasi}
                displayCurrentPage={displayCurrentPage}
                searchTerm={searchTerm}
              />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 relative">
        <Footer withAnimation={false} />
      </footer>
    </div>
  );
};

export default AspirasiCrud;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/NavbarAdmin";
import Footer from "../components/layout/Footer";
import backgroundRectangel from "../assets/images/rectangle498.png";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://192.168.100.102:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          setName(data.data.nama);
          setOriginalName(data.data.nama);
          setEmail(data.data.email);
        } else {
          setError("Failed to fetch profile");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateClick = () => {
    if (name !== originalName) {
      setShowConfirmModal(true);
    }
  };

  const confirmUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://192.168.100.102:3000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newName: name }),
      });

      const data = await response.json();
      if (data.success) {
        setOriginalName(name);
        setShowConfirmModal(false);
        setSuccessMessage("Nama berhasil diperbarui");
        setShowSuccessModal(true);
      } else {
        setErrorMessage(data.error || "Failed to update name");
        setShowErrorModal(true);
      }
    } catch (err) {
      setErrorMessage("Network error");
      setShowErrorModal(true);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPass !== passwordForm.confirm) {
      setErrorMessage("Password baru tidak cocok dengan konfirmasi");
      setShowErrorModal(true);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://192.168.100.102:3000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.current,
          newPassword: passwordForm.newPass,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShowPasswordModal(false);
        setPasswordForm({ current: "", newPass: "", confirm: "" });
        setSuccessMessage("Password berhasil diperbarui");
        setShowSuccessModal(true);
      } else {
        setErrorMessage(data.error || "Failed to update password");
        setShowErrorModal(true);
      }
    } catch (err) {
      setErrorMessage("Network error");
      setShowErrorModal(true);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-32">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#10316B] relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${backgroundRectangel})` }}
      />

      <Navbar currentPage="profile" />

      <main className="flex-grow z-10 px-4 py-8 mt-32">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-white text-2xl font-bold mb-6 text-center">
            Profil Pengguna
          </h1>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-1">
              Email
            </label>
            <p className="text-gray-200 bg-white/10 px-4 py-2 rounded-lg border border-white/20">
              {email}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-1">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleUpdateClick}
              disabled={name === originalName}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                name === originalName
                  ? "bg-white/20 text-white cursor-not-allowed"
                  : "bg-[#FFE867] text-[#10316B] hover:bg-[#e6d258]"
              }`}
            >
              Update Profile
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-lg font-semibold bg-white/20 text-white hover:bg-white/30 transition duration-300"
            >
              Ubah Password
            </button>
          </div>
        </div>
      </main>

      {/* Modal Konfirmasi Update Nama */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-[#FFE867] mb-4">
              Konfirmasi Perubahan Nama
            </h2>
            <p className="mb-6">
              Ubah nama dari{" "}
              <strong>{originalName}</strong> ke <strong>{name}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 rounded-lg bg-[#FFE867] text-[#10316B] font-semibold hover:bg-[#e6d258]"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ubah Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-[#FFE867] mb-4">
              Ubah Password
            </h2>
            <div className="space-y-4">
              <input
                type="password"
                autoComplete="new-password"
                name="current"
                placeholder="Password saat ini"
                value={passwordForm.current}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                type="password"
                name="newPass"
                autoComplete="new-password"
                placeholder="Password baru"
                value={passwordForm.newPass}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                type="password"
                name="confirm"
                autoComplete="new-password"
                placeholder="Konfirmasi password baru"
                value={passwordForm.confirm}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordUpdate}
                className="px-4 py-2 rounded-lg bg-[#FFE867] text-[#10316B] font-semibold hover:bg-[#e6d258]"
              >
                Simpan Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-white mb-6">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-green-500 mb-4">Berhasil</h2>
            <p className="text-white mb-6">{successMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer withAnimation={false} />
    </div>
  );
};

export default Profile;

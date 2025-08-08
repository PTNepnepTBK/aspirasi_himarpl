import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logohima from "../assets/images/logohima.png";
import backgroundRectangel from "../assets/images/rectangle498.png";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/NavbarAdmin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    email: "",
    nama: "",
    password: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");

  const navigate = useNavigate();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://192.168.100.102:3000/api/user/usermanagement",
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
        setUsers(data.data);
      } else {
        setError(data.error || "Gagal mengambil data user");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, email) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus user ${email}?`)) {
      return;
    }

    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://192.168.100.102:3000/api/user/usermanagement?id=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Remove user from local state
        setUsers(users.filter(user => user.id !== userId));
        alert("User berhasil dihapus");
      } else {
        alert(data.error || "Gagal menghapus user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Terjadi kesalahan saat menghapus user");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePromoteClick = (user) => {
    setSelectedUser(user);
    setConfirmationText("");
    setShowPromoteModal(true);
  };

  const expectedText = (email) => `SAYA YAKIN INGIN MENYERAHKAN ROLE SUPERADMIN KEPADA ${email}`;

  const handlePromoteSubmit = async () => {
    if (!selectedUser) return;

    setActionLoading(selectedUser.id);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://192.168.100.102:3000/api/user/usermanagement",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: selectedUser.id,
            action: "promote"
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert("User berhasil dipromote menjadi superadmin. Anda akan dilogout.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        alert(data.error || "Gagal mempromote user");
      }
    } catch (err) {
      console.error("Error promoting user:", err);
      alert("Terjadi kesalahan saat promote user");
    } finally {
      setActionLoading(null);
      setSelectedUser(null);
      setShowPromoteModal(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRoleBadge = (role) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    if (role === "admin") {
      return `${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`;
    } else {
      return `${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`;
    }
  };

  const handleAddInputChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
    setAddError("");
    setAddSuccess("");
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    setAddSuccess("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch(
        "http://192.168.100.102:3000/api/user/usermanagement",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: addForm.email,
            nama: addForm.nama,
            password: addForm.password,
            role: "admin",
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setAddSuccess("Admin berhasil ditambahkan");
        setAddForm({ email: "", nama: "", password: "" });
        setShowAddModal(false);
        fetchUsers();
      } else {
        setAddError(data.error || "Gagal menambah admin");
      }
    } catch (err) {
      setAddError("Terjadi kesalahan koneksi");
    } finally {
      setAddLoading(false);
    }
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
        <Navbar currentPage="admin"/>

        <main className="flex-grow flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFE867] border-t-transparent mx-auto mb-4"></div>
            <p className="text-white text-lg">Memuat data user...</p>
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
        <Navbar currentPage="admin"/>

        <main className="flex-grow flex items-center justify-center z-10 px-4">
          <div className="text-center max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-200 mb-6">{error}</p>
            <button
              onClick={fetchUsers}
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
      <Navbar currentPage="admin"/>

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
              Manajemen User
            </h1>
            <p className="text-gray-200">
              Kelola user dan role dengan mudah
            </p>
          </div>

          {/* Button Tambah Admin */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#FFE867] text-[#10316B] px-6 py-2 rounded-lg font-semibold hover:bg-[#e6d258] transition duration-300 shadow-md"
            >
              + Tambah Admin
            </button>
          </div>

          {/* Modal Tambah Admin */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
              <div className="w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Tambah Admin</h3>
                </div>
                <form onSubmit={handleAddAdmin} className="space-y-4" autoComplete="off">
                  <div>
                    <label className="block text-sm font-bold mb-1 text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={addForm.email}
                      onChange={handleAddInputChange}
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                      placeholder="Masukkan email admin..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 text-white">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={addForm.nama}
                      onChange={handleAddInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                      placeholder="Masukkan nama admin..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1 text-white">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={addForm.password}
                      onChange={handleAddInputChange}
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867]"
                      placeholder="Masukkan password..."
                    />
                  </div>
                  {addError && <p className="text-red-400 text-sm">{addError}</p>}
                  {addSuccess && <p className="text-green-400 text-sm">{addSuccess}</p>}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={addLoading}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#FFE867] text-[#10316B] font-semibold rounded-lg hover:bg-[#e6d258] transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={addLoading}
                    >
                      {addLoading ? "Menyimpan..." : "Simpan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Promote Modal */}
          {showPromoteModal && selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
              <div className="w-full max-w-md backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Konfirmasi Promote</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-white text-sm">
                    Untuk konfirmasi, ketik ulang teks berikut:
                  </p>
                  <p className="select-none text-yellow-400 font-medium text-sm bg-yellow-400/10 p-4 rounded-lg break-all whitespace-pre-wrap" 
                     style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}>
                    {expectedText(selectedUser.email)}
                  </p>
                  <div>
                    <textarea
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFE867] resize-none min-h-[80px]"
                      placeholder="Ketik teks konfirmasi di sini..."
                      style={{ 
                        height: 'auto',
                        minHeight: '80px',
                        overflowY: 'hidden'
                      }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPromoteModal(false);
                        setSelectedUser(null);
                        setConfirmationText("");
                      }}
                      className="flex-1 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handlePromoteSubmit}
                      disabled={confirmationText !== expectedText(selectedUser.email) || actionLoading === selectedUser.id}
                      className="flex-1 py-2 bg-[#FFE867] text-[#10316B] font-semibold rounded-lg hover:bg-[#e6d258] transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === selectedUser.id ? "Memproses..." : "Promote"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {users.length === 0 ? (
              <div className="text-center p-8">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Belum Ada User
                </h3>
                <p className="text-gray-200">
                  Belum ada user yang terdaftar dalam sistem
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Nama
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Role
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-white">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b border-white/10 ${
                          index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">
                            {user.nama || user.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getRoleBadge(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {user.role !== "superadmin" && (
                              <button
                                onClick={() => handlePromoteClick(user)}
                                disabled={actionLoading === user.id}
                                className="px-3 py-1 rounded-lg text-sm font-medium transition duration-300 bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === user.id ? "Loading..." : "Promote"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(user.id, user.email)}
                              disabled={actionLoading === user.id}
                              className="px-3 py-1 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === user.id ? "Loading..." : "Delete"}
                            </button>
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
      <footer>
        <Footer withAnimation={false} />
      </footer>
    </div>
  );
};

export default UserManagement;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logohima from "../../assets/images/logohima.png";

const NavbarAdmin = ({ currentPage }) => {
  const [expanded, setExpanded] = useState({});
  const [visible, setVisible] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isSuperAdmin = user.role === "superadmin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowNavbar(false), 300);
      } else {
        setShowNavbar(true);
        setVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lastScrollY]);

  const getLinkClass = (page) =>
    `hover:text-gray-600 transition-colors duration-300 ${
      currentPage === page ? "text-blue-600 font-semibold" : ""
    }`;

  return (
    <nav
      className={`fixed top-[5%] left-0 right-0 mx-auto w-[90%] md:w-[70%] bg-white border border-[#A7A7A7] rounded-3xl shadow-md px-6 py-3 z-50 transition-all duration-500 ease-in-out
      ${visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="w-20 h-8 md:w-24 md:h-10">
          <img
            src={logohima}
            alt="Logo HIMA"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-800">
          <a href="/aspirasi" className={getLinkClass("data")}>
            Data Aspirasi
          </a>
          <a href="/aspirasidisplay" className={getLinkClass("display")}>
            Display Aspirasi
          </a>
          {isSuperAdmin && (
            <a href="/usermanagement" className={getLinkClass("admin")}>
              Manajemen Admin
            </a>
          )}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`${getLinkClass("profile")} focus:outline-none`}
            >
              {user.nama || "User"}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() =>
              setExpanded((prev) => ({
                ...prev,
                mobileMenu: !prev.mobileMenu,
              }))
            }
            className="p-2 rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {expanded.mobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          expanded.mobileMenu ? "max-h-[400px] mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-3 pb-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          <a
            href="/aspirasi"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Data Aspirasi
          </a>
          <a
            href="/aspirasidisplay"
            className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Display Aspirasi
          </a>
          {isSuperAdmin && (
            <a
              href="/usermanagement"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Manajemen Admin
            </a>
          )}
          <div className="border-t border-gray-200 pt-2">
            <div className="px-4 py-2 text-sm text-gray-500 font-medium">
              {user.nama || "User"}
            </div>
            <div className="px-4 py-2 text-sm text-gray-500">{user.email}</div>
            <a
              href="/profile"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;

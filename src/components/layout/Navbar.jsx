import React, { useState, useEffect, useRef } from "react";
import logohima from "../../assets/images/logohima.png";

const Navbar = () => {
  const [expanded, setExpanded] = useState({});
  const [visible, setVisible] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timeoutRef = useRef(null);

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

  return (
    <nav
      className={`fixed top-[5%] left-0 right-0 mx-auto w-[90%] md:w-[70%] bg-white border border-[#A7A7A7] rounded-3xl shadow-md px-6 py-3 z-50 transition-all duration-500 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="w-24 h-10">
          <img
            src={logohima}
            alt="Logo HIMA"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-800">
          <a
            href="#suara"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Suarakan Aspirasimu
          </a>
          <a
            href="#hima"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Aspirasi Hima
          </a>
          <a
            href="#prodi"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Aspirasi Prodi
          </a>
          <a
            href="#tentang"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Tentang Kami
          </a>
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
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
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

      {/* Mobile Dropdown */}
      {expanded.mobileMenu && (
        <div className="md:hidden mt-3 space-y-2 font-medium text-gray-800">
          <a href="#suara" className="block hover:text-gray-600">
            Suarakan Aspirasimu
          </a>
          <a href="#hima" className="block hover:text-gray-600">
            Aspirasi Hima
          </a>
          <a href="#prodi" className="block hover:text-gray-600">
            Aspirasi Prodi
          </a>
          <a href="#tentang" className="block hover:text-gray-600">
            Tentang Kami
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
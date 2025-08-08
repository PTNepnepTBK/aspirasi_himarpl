import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import AjakanSection from "../components/sections/AjakanSection";
import AspirasiSection from "../components/sections/AspirasiSection";
import ParallaxSection from "../components/sections/ParallaxSection";
import TentangKamiSection from "../components/sections/TentangKamiSection";
import Footer from "../components/layout/Footer";
import { dummyData } from "../data/data";

export default function LandingPage() {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAspirations = async () => {
      try {
        const response = await fetch("http://192.168.100.102:3000/api/aspirasi/landingpg");
        const data = await response.json();
        if (data.success) {
          setAspirations(data.data);
        }
      } catch (error) {
        console.error("Error fetching aspirations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAspirations();
  }, []);

  const prodiAspirations = aspirations.filter(asp => asp.kategori === "prodi").map(asp => ({
    ...asp,
    author: asp.penulis || "Anonim",
    content: asp.aspirasi,
    image: asp.ilustrasi ? `http://192.168.100.102:3000/assets/images/ilustrasi_aspirasi/${asp.ilustrasi}` : null
  }));

  const himaAspirations = aspirations.filter(asp => asp.kategori === "hima").map(asp => ({
    ...asp,
    author: asp.penulis || "Anonim",
    content: asp.aspirasi,
    image: asp.ilustrasi ? `http://192.168.100.102:3000/assets/images/ilustrasi_aspirasi/${asp.ilustrasi}` : null
  }));

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <HeroSection />
      <AjakanSection />
      <AspirasiSection 
        title="Aspirasi Untuk Program Studi RPL" 
        data={prodiAspirations} 
        id="prodi"
        loading={loading} 
      />
      <AspirasiSection 
        title="Aspirasi untuk HimaRPL" 
        data={himaAspirations} 
        id="hima"
        loading={loading} 
      />
      <ParallaxSection />
      <TentangKamiSection />
      <Footer />
    </div>
  );
}

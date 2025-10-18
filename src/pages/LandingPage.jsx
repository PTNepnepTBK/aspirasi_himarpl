import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import AjakanSection from "../components/sections/AjakanSection";
import AspirasiSection from "../components/sections/AspirasiSection";
import ParallaxSection from "../components/sections/ParallaxSection";
import TentangKamiSection from "../components/sections/TentangKamiSection";
import Footer from "../components/layout/Footer";
import { dummyData } from "../data/data";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE = import.meta.env.VITE_SUPABASE_STORAGE;

export default function LandingPage() {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAspirations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/aspirasi/landingpg`);
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
    image: asp.ilustrasi ? `${STORAGE}${asp.ilustrasi}` : null
  }));

  const himaAspirations = aspirations.filter(asp => asp.kategori === "hima").map(asp => ({
    ...asp,
    author: asp.penulis || "Anonim",
    content: asp.aspirasi,
    image: asp.ilustrasi ? `${STORAGE}${asp.ilustrasi}` : null
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

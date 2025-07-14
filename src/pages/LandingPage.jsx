import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import AjakanSection from "../components/sections/AjakanSection";
import AspirasiSection from "../components/sections/AspirasiSection";
import ParallaxSection from "../components/sections/ParallaxSection";
import TentangKamiSection from "../components/sections/TentangKamiSection";
import Footer from "../components/layout/Footer";
import { dummyData } from "../data/data";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <HeroSection />
      <AjakanSection />
      <AspirasiSection title="Aspirasi Untuk Program Studi RPL" data={dummyData} id="prodi" />
      <AspirasiSection title="Aspirasi untuk HimaRPL" data={dummyData} id="hima" />
      <ParallaxSection />
      <TentangKamiSection />
      <Footer />
    </div>
  );
}

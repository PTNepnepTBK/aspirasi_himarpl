import React from "react";
import { AnimatedSection } from "../animations/AnimationComponents";
import aspirasiIlustrasi2 from "../../assets/images/ilustrasi_aspirasi2.png";
import ornaments1 from "../../assets/ornaments/Group 241.svg";
import ornaments2 from "../../assets/ornaments/Group 250.svg";
import ornaments3 from "../../assets/ornaments/Group 252.svg";
import ornaments4 from "../../assets/ornaments/Group 253.svg";

const AjakanSection = () => {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "#10316B" }}
    >
      {/* Background Ornaments */}
      <img
        src={ornaments1}
        alt="ornament"
        className="absolute top-0 left-0 w-24 opacity-20 pointer-events-none z-0"
      />
      <img
        src={ornaments2}
        alt="ornament"
        className="absolute bottom-0 right-10 w-32 opacity-20 pointer-events-none z-0"
      />
      <img
        src={ornaments3}
        alt="ornament"
        className="absolute top-1/2 left-[-40px] w-20 opacity-10 pointer-events-none z-0"
      />
      <img
        src={ornaments4}
        alt="ornament"
        className="absolute top-10 right-0 w-28 opacity-10 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeInLeft">
            <div className="flex justify-center items-center">
              <div className="bg-white w-[320px] h-[320px] p-4 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                <img
                  src={aspirasiIlustrasi2}
                  alt="Ilustrasi Aspirasi"
                  className="w-[95%] h-[95%] object-contain"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInRight" delay={0.2}>
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "#FFE867" }}
              >
                Suarakan Aspirasimu untuk RPL Lebih Baik!
              </h2>
              <p className="text-white mb-4">
                Aspirasi adalah jembatan antara harapan dan perubahan. Melalui
                wadah ini, kamu sebagai mahasiswa{" "}
                <span style={{ color: "#FFE867", fontWeight: "bold" }}>
                  Rekayasa Perangkat Lunak (RPL)
                </span>{" "}
                bisa menyampaikan saran, kritik, atau ide untuk kemajuan
                bersama.
              </p>
              <p className="text-white mb-4">
                <span style={{ color: "#FFE867", fontWeight: "bold" }}>
                  HIMA RPL
                </span>{" "}
                siap menampung dan menyalurkan setiap suara demi membentuk
                lingkungan yang lebih suportif, aktif, dan berkembang.
              </p>
              <p className="text-white">
                🎯{" "}
                <span className="italic">
                  Jangan ragu untuk bersuara. Karena perubahan besar dimulai
                  dari langkah kecil yang berani!
                </span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AjakanSection;
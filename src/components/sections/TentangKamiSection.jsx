import React from "react";
import { AnimatedSection } from "../animations/AnimationComponents";

const TentangKamiSection = () => {
  return (
    <AnimatedSection animation="fadeInUp">
      <section className="w-full py-16 px-6 text-center text-gray-800 bg-white" id="tentang">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Tentang Kami</h2>
          <p className="text-base leading-relaxed">
            <strong>Badan Diplomasi dan Aspirasi</strong> merupakan bagian
            dari HIMA RPL yang berfokus untuk menjadi jembatan komunikasi
            antara mahasiswa dengan pihak internal maupun eksternal program
            studi. Kami hadir sebagai wadah untuk menampung, mengelola, dan
            menyuarakan aspirasi, kritik, serta saran dari seluruh mahasiswa
            Rekayasa Perangkat Lunak.
          </p>
          <p className="text-base leading-relaxed mt-4">
            Melalui platform ini, kami berkomitmen menciptakan lingkungan yang
            inklusif, transparan, dan progresif demi mendukung pengembangan
            akademik dan non-akademik yang lebih baik. Setiap suara Anda
            sangat berarti — mari bersama membangun RPL yang lebih maju dan
            responsif.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default TentangKamiSection;
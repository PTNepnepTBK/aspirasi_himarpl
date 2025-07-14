import React from "react";
import { AnimatedSection } from "../animations/AnimationComponents";
import gedungbiru from "../../assets/images/gedungbiru_upi.jpg";

const ParallaxSection = () => {
  return (
    <AnimatedSection animation="fadeIn">
      <section
        className="relative w-full flex-grow bg-cover bg-center flex flex-col items-center justify-center px-6 py-48 text-white"
        style={{ backgroundImage: `url(${gedungbiru})` }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        ></div>
      </section>
    </AnimatedSection>
  );
};

export default ParallaxSection;
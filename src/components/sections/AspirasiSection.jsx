import React from "react";
import { AnimatedSection, StaggeredAnimation } from "../animations/AnimationComponents";
import AspirasiCard from "./AspirasiCard";

const AspirasiSection = ({ title, data, id }) => {
  return (
    <section className="py-16 bg-gray-100" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <StaggeredAnimation delay={0.2}>
            {data.map((item) => (
              <AspirasiCard
                key={item.id}
                id={item.id}
                content={item.content}
                author={item.author}
              />
            ))}
          </StaggeredAnimation>
        </div>

        <AnimatedSection animation="fadeIn" delay={0.8}>
          <div className="text-center mt-10">
            <span className="text-sm text-gray-600">
              Dibuat untuk mendukung komunikasi dua arah antara mahasiswa dan
              HIMA RPL.
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AspirasiSection;
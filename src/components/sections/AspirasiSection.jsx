import React from "react";
import { AnimatedSection, StaggeredAnimation } from "../animations/AnimationComponents";
import AspirasiCard from "./AspirasiCard";

const AspirasiSection = ({ title, data, id, loading }) => {
  if (loading) {
    return (
      <section id={id} className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {title}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

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
                image={item.image}
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
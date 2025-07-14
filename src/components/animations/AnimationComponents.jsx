import React, { useState, useEffect, useRef } from "react";

// Hook untuk animasi scroll
export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

// Komponen animasi wrapper
export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  animation = "fadeInUp",
}) => {
  const [ref, isVisible] = useScrollAnimation();

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, transform: "translateY(50px)" },
      animate: { opacity: 1, transform: "translateY(0px)" },
    },
    fadeInLeft: {
      initial: { opacity: 0, transform: "translateX(-50px)" },
      animate: { opacity: 1, transform: "translateX(0px)" },
    },
    fadeInRight: {
      initial: { opacity: 0, transform: "translateX(50px)" },
      animate: { opacity: 1, transform: "translateX(0px)" },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleIn: {
      initial: { opacity: 0, transform: "scale(0.8)" },
      animate: { opacity: 1, transform: "scale(1)" },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...selectedAnimation.initial,
        transition: `all 0.8s ease ${delay}s`,
        ...(isVisible ? selectedAnimation.animate : {}),
      }}
    >
      {children}
    </div>
  );
};

// Komponen untuk animasi stagger (berurutan)
export const StaggeredAnimation = ({ children, delay = 0.1 }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <AnimatedSection delay={index * delay} animation="fadeInUp">
          {child}
        </AnimatedSection>
      ))}
    </>
  );
};
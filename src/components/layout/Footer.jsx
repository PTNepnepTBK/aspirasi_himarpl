import React from "react";
import { AnimatedSection } from "../animations/AnimationComponents";
import logohima from "../../assets/images/logohima.png";

const Footer = ({ withAnimation = true }) => {
  const FooterContent = () => (
    <footer className="w-full bg-[#232323] lg:pb-5 pb-4 lg:pt-14 pt-5 lg:px-[72px] px-4 flex flex-col">
      <div className="flex flex-row items-center justify-between border-b border-[#B2B2B2] pb-5">
        <div className="flex flex-col items-start justify-between lg:h-[194px]">
          <img src={logohima} alt="HIMARPL" className="max-w-[200px]" />
          <div className="lg:w-[416px] w-[343px]">
            <p className="text-white lg:text-base/[24px] text-[12px]/[24px]">
              Himpunan Mahasiswa Rekayasa Perangkat Lunak Universitas
              Pendidikan Indonesia{" "}
            </p>
          </div>

          <div className="lg:hidden flex mt-9 flex-row gap-[64px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-4">
                {/* Social media links placeholder */}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                  <div className="relative group transition-all ">
                    <span className="h-[2px] inline-block bg-white absolute left-0 bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0">
                      &nbsp;
                    </span>
                    <a
                      href="mailto:himarpl@upi.edu"
                      className="text-white text-base/[24px] transition-colors duration-300 hover:text-[#FFE867]"
                    >
                      himarpl@upi.edu
                    </a>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="relative group transition-all ">
                    <span className="h-[2px] inline-block bg-white absolute left-0 bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0">
                      &nbsp;
                    </span>
                    <a
                      href="https://wa.me/6281312768360"
                      className="text-white text-base/[24px] transition-colors duration-300 hover:text-[#FFE867]"
                    >
                      +62 813-1276-8360
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex hidden flex-col gap-2">
            <div className="flex flex-row gap-4">
              <div className="relative group transition-all ">
                <span className="h-[2px] inline-block bg-white absolute left-0 bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0">
                  &nbsp;
                </span>
                <a
                  href="mailto:himarpl@upi.edu"
                  className="text-white text-base/[24px] transition-colors duration-300 hover:text-[#FFE867]"
                >
                  himarpl@upi.edu
                </a>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="relative group transition-all ">
                <span className="h-[2px] inline-block bg-white absolute left-0 bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-0">
                  &nbsp;
                </span>
                <a
                  href="https://wa.me/6281312768360"
                  className="text-white text-base/[24px] transition-colors duration-300 hover:text-[#FFE867]"
                >
                  +62 813-1276-8360
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex hidden flex-row gap-16">
          <div className="flex flex-row gap-4">
            {/* Social media links placeholder */}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-5">
        <p className="text-[#747474] lg:text-base/[24px] text-[10px]">
          &copy; Copyright 2025 HIMARPL all rights reserved.
        </p>
      </div>
    </footer>
  );

  return withAnimation ? (
    <AnimatedSection animation="fadeInUp">
      <FooterContent />
    </AnimatedSection>
  ) : (
    <FooterContent />
  );
};

export default Footer;
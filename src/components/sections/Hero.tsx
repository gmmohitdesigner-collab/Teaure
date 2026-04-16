"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import HeroImage from "@/assets/Hero 1.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

    // Image Mask Reveal from Bottom to Top
    tl.fromTo(".hero-image-wrapper", {
      clipPath: "inset(100% 0% 0% 0%)"
    }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.8,
      ease: "power4.inOut"
    }, 0)
    // Optional slight scale-down of the image inside during reveal
    .fromTo(".animated-image", {
      scale: 1.2
    }, {
      scale: 1,
      duration: 1.8,
      ease: "power4.inOut"
    }, 0);

    // Stagger text words (mask reveal from bottom to top)
    tl.fromTo(".hero-word", {
      y: "110%",
      opacity: 0
    }, {
      y: "0%",
      opacity: 1,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
    }, 0.6)
      .fromTo(".hero-description", {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      }, "-=0.8")
      .fromTo(".hero-button", {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      }, "-=1.0");

    // Parallax on scroll for Hero Image
    gsap.to(".animated-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: container });

  return (
    <section id="hero" ref={container} className="relative h-auto md:h-[914px] flex flex-col md:flex-row overflow-hidden bg-primary px-4 md:px-0">
      {/* Left Content (50%) aligned to Grid */}
      <div 
        className="flex-1 flex flex-col justify-center z-10 pt-32 md:pt-0"
        style={{ paddingLeft: "calc((100vw - 1312px) / 2)" }}
      >
        <div className="max-w-[750px] pl-4 md:pl-0">
          <h1 className="font-cormorant text-[56px] md:text-[96px] font-bold leading-[1.0] tracking-tight mb-12 flex flex-col">
            <span className="flex flex-wrap gap-x-4 mb-2">
              <span className="block overflow-hidden pb-2">
                <span className="hero-word block italic font-light">Pure</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-word block">leaves.</span>
              </span>
            </span>
            <span className="flex flex-wrap gap-x-4">
              <span className="block overflow-hidden pb-2">
                <span className="hero-word block">Honest</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-word block italic font-light">blends.</span>
              </span>
            </span>
          </h1>

          <p className="hero-description font-jakarta text-lg text-foreground/70 leading-relaxed mb-16 max-w-[420px]">
            At Teaure, we keep it simple—just whole, organic ingredients and 
            small-batch craftsmanship. No additives. No noise. Just tea as 
            it&apos;s meant to be.
          </p>

          <div className="hero-button">
            <button className="group flex items-center gap-4 border border-foreground/20 rounded-full px-12 py-4 hover:bg-foreground hover:text-background transition-all duration-500 font-jakarta text-sm font-bold tracking-[0.1em] uppercase">
              Shop Blend
              <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Image (W-720, H-914 Fixed on Desktop) */}
      <div className="md:flex-none md:w-[720px] relative h-[600px] md:h-[914px] overflow-hidden mt-12 md:mt-0 hero-image-wrapper">
        <Image
          src={HeroImage}
          alt="Teaure Hibiscus Blossom"
          fill
          className="animated-image object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Bottom Divider Line (W-1311, Weight-0.8, Centered at Bottom) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1311px] h-[0.8px] bg-foreground/20 z-10 hidden md:block" 
      />
    </section>
  );
}

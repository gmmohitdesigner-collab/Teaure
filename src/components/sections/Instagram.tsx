"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Assets
import CenterImage from "@/assets/instagram_woman.png";
import LeftImage from "@/assets/instagram_steam.png";
import RightImage from "@/assets/instagram_pour.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Instagram() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // 1. Text reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.fromTo(".insta-word", {
      y: "110%",
      opacity: 0,
    }, {
      y: "0%",
      opacity: 1,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out"
    });

    // Button reveal
    gsap.fromTo(".insta-btn", {
      y: 20,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 40%",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });

    // 2. Image Mask Reveals
    gsap.fromTo(".insta-mask", {
      clipPath: "inset(100% 0% 0% 0%)"
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      clipPath: "inset(0% 0% 0% 0%)",
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.inOut"
    });

    // 3. Anchor Layer (Main Image) - Parallax
    gsap.fromTo(".insta-main-parallax", 
      { yPercent: 0 },
      {
        yPercent: -15, 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        ease: "none"
      }
    );

    // 4. Fragment Layers Parallax
    gsap.fromTo(".insta-float-left", 
      { yPercent: 0 },
      {
        yPercent: -45, 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        ease: "none"
      }
    );

    gsap.fromTo(".insta-float-right", 
      { yPercent: 0 },
      {
        yPercent: -35, 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        ease: "none"
      }
    );

    // 5. Typographic Drift Parallax
    gsap.fromTo(".insta-on-parallax", 
      { yPercent: 0 },
      {
        yPercent: -15, 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        ease: "none"
      }
    );

    gsap.fromTo(".insta-brand-parallax", 
      { yPercent: 0 },
      {
        yPercent: -25, 
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        ease: "none"
      }
    );

    ScrollTrigger.refresh();

  }, { scope: container });

  return (
    <section id="connect" ref={container} className="bg-primary pt-32 pb-48 px-6 overflow-hidden">
      <div className="max-w-[1312px] mx-auto flex flex-col items-center">
        
        {/* Header Title */}
        <h2 className="font-cormorant text-[64px] md:text-[100px] leading-[0.8] uppercase tracking-wider mb-[-20px] md:mb-[-40px] z-20 flex flex-wrap gap-x-4">
          <span className="block overflow-hidden pb-4"><span className="insta-word block">CONNECT</span></span>
        </h2>

        {/* Image Grid */}
        <div className="relative w-full flex justify-center items-center py-16">
          <div className="relative w-[320px] md:w-[634px] aspect-square insta-main-parallax">
            
            {/* Left Image */}
            <div className="absolute right-[calc(100%+32px)] top-[-10%] w-[180px] md:w-[250px] aspect-square z-10 insta-float-left">
              <div className="relative w-full h-full shadow-2xl insta-mask" style={{ clipPath: "inset(100% 0 0 0)" }}>
                <Image src={LeftImage} alt="Tea Steam" fill className="object-cover scale-110" sizes="(max-width: 768px) 180px, 250px" />
              </div>
            </div>

            {/* WITH US Overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-full text-center flex justify-center gap-x-3">
              <span className="block overflow-hidden pb-2"><span className="insta-word block font-cormorant text-[40px] md:text-[64px] leading-none uppercase tracking-[0.15em] opacity-60">WITH</span></span>
              <span className="block overflow-hidden pb-2"><span className="insta-word block font-cormorant text-[40px] md:text-[64px] leading-none uppercase tracking-[0.15em] opacity-60">US</span></span>
            </div>
            
            {/* Center Image */}
            <div className="relative w-full h-full insta-mask" style={{ clipPath: "inset(100% 0 0 0)" }}>
              <Image src={CenterImage} alt="Woman drinking tea" fill className="object-cover scale-110" sizes="(max-width: 768px) 320px, 634px" />
            </div>

            {/* Right Image */}
            <div className="absolute left-[calc(100%+32px)] bottom-[-10%] w-[180px] md:w-[245px] aspect-square z-10 insta-float-right">
              <div className="relative w-full h-full shadow-2xl insta-mask" style={{ clipPath: "inset(100% 0 0 0)" }}>
                <Image src={RightImage} alt="Pouring Tea" fill className="object-cover scale-110" sizes="(max-width: 768px) 180px, 245px" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center mt-[-40px] md:mt-[-80px] z-20">
          <div className="insta-on-parallax flex flex-col items-center">
            <span className="block overflow-hidden pb-4">
              <p className="insta-word font-cormorant italic text-[32px] md:text-[56px] leading-none lowercase">
                on
              </p>
            </span>
          </div>
          <div className="insta-brand-parallax flex flex-col items-center">
            <span className="block overflow-hidden pb-4">
              <h2 className="insta-word font-cormorant italic text-[64px] md:text-[104px] leading-[0.8] mb-12">
                instagram
              </h2>
            </span>
          </div>

          <button className="insta-btn group flex items-center gap-4 px-10 py-4 rounded-full border border-foreground/30 hover:bg-foreground hover:text-primary transition-all duration-500">
            <span className="font-jakarta font-bold text-[12px] uppercase tracking-[0.2em]">
              INSTAGRAM
            </span>
            <div className="w-[26px] h-[26px] bg-foreground text-primary rounded-full flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-foreground">
              <InstagramIcon size={14} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

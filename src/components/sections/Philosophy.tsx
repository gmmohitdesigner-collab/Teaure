"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, ReactNode } from "react";
import LeafIcon from "@/assets/Leaf.svg";
import RitualIcon from "@/assets/Ritual.svg";
import PackagingIcon from "@/assets/Packaging.svg";
import DesignIcon from "@/assets/Design.svg";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string | ReactNode;
  alt: string;
  description: string;
  icon: any;
  offset: string;
}

const features: Feature[] = [
  {
    title: "Organically Sourced, Always",
    alt: "Organically Sourced, Always",
    description: "Only whole-leaf ingredients, hand-harvested from organic, biodiverse farms. No pesticides, no shortcuts—just the cleanest tea nature can offer.",
    icon: LeafIcon,
    offset: "md:mt-0"
  },
  {
    title: "Crafted for Ritual",
    alt: "Crafted for Ritual",
    description: "Blends designed not just for taste, but for presence. Every sip is a moment of pause—whether it's morning stillness or twilight wind-down.",
    icon: RitualIcon,
    offset: "md:mt-64"
  },
  {
    title: (
      <>
        Planet-Loving <br /> Packaging
      </>
    ),
    alt: "Planet-Loving Packaging",
    description: "From compostable tea bags to recyclable pouches, our packaging honors the earth as much as our blends do. Conscious design, without compromise.",
    icon: PackagingIcon,
    offset: "md:mt-16"
  },
  {
    title: "Transparent by Design",
    alt: "Transparent by Design",
    description: "You'll never wonder what's inside. Each pouch carries our full ingredient list and origin details—because integrity should be brewed into every batch.",
    icon: DesignIcon,
    offset: "md:mt-32"
  }
];

export default function Philosophy() {
  const container = useRef(null);

  useGSAP(() => {
    // 1. Text reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.fromTo(".phil-word", {
      y: "110%",
      opacity: 0,
    }, {
      y: "0%",
      opacity: 1,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out"
    });

    gsap.fromTo(".phil-desc", {
      y: 20,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });

    // 2. Card Elegant Reveals
    gsap.fromTo(".feature-card-mask", {
      opacity: 0,
      y: 50
    }, {
      scrollTrigger: {
        trigger: ".feature-cards-container",
        start: "top 75%",
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1.8,
      ease: "power2.out"
    });

    // 3. Independent Deep Parallax Scroll for Cards
    const parallaxSpeeds = [-10, -35, -20, -45]; // Different speeds for extreme depth
    gsap.utils.toArray(".feature-card-parallax").forEach((card: any, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        yPercent: parallaxSpeeds[i % parallaxSpeeds.length],
        ease: "none"
      });
    });

  }, { scope: container });

  return (
    <section id="philosophy" ref={container} className="pt-[160px] md:pt-[220px] pb-[160px] md:pb-[220px] px-8 md:px-0 bg-primary relative overflow-hidden">
      <div className="max-w-[1312px] mx-auto">
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-2 mb-32 md:mb-48">
          {/* Headline Block (Col 1-8) */}
          <div className="col-span-1 md:col-span-8 flex flex-col items-start overflow-hidden">
            {/* Row 1: SIP SLOW, */}
            <h2 className="font-cormorant text-[64px] md:text-[104px] leading-[0.85] tracking-tight font-bold uppercase flex flex-wrap gap-x-4 mb-2">
              <span className="block overflow-hidden pb-4"><span className="phil-word block">SIP</span></span>
              <span className="block overflow-hidden pb-4"><span className="phil-word block">SLOW,</span></span>
            </h2>
            {/* Row 2: LIVE DEEP. */}
            <h2 className="font-cormorant text-[64px] md:text-[104px] leading-[0.85] tracking-tight font-bold uppercase flex flex-wrap gap-x-4 mb-4">
              <span className="block overflow-hidden pb-4"><span className="phil-word block">LIVE</span></span>
              <span className="block overflow-hidden pb-4"><span className="phil-word block">DEEP.</span></span>
            </h2>
            
            {/* Row 3: Connector + Signature */}
            <div className="flex items-baseline gap-x-4 mt-4 translate-y-0">
              <p className="font-jakarta text-[16px] md:text-[24px] opacity-70 lowercase leading-none pb-2 flex flex-wrap gap-x-1.5">
                 <span className="block overflow-hidden"><span className="phil-word block">A</span></span>
                 <span className="block overflow-hidden"><span className="phil-word block">ritual</span></span>
                 <span className="block overflow-hidden"><span className="phil-word block">of</span></span>
                 <span className="block overflow-hidden"><span className="phil-word block">clarity,</span></span>
                 <span className="block overflow-hidden"><span className="phil-word block">crafted</span></span>
                 <span className="block overflow-hidden"><span className="phil-word block">by</span></span>
              </p>
              <div className="relative inline-block border-b-[2px] border-foreground/40 leading-none overflow-hidden pb-2 mb-2 ml-2">
                <span className="phil-word font-cormorant italic text-[72px] md:text-[120px] block leading-[0.8]">
                  Nature
                </span>
              </div>
            </div>
          </div>
          
          {/* Description Block (Col 9-12) */}
          <div className="col-span-1 md:col-start-9 md:col-span-4 pt-4 md:pt-6">
            <p className="phil-desc font-jakarta text-[16px] md:text-[22px] leading-[1.4] opacity-80 md:text-right">
              Rooted in purity, made for presence. Our organic tea blends 
              are carefully composed for the calm, conscious, and curious—inviting 
              you to unwind, one cup at a time.
            </p>
          </div>
        </div>

        {/* Features Staggered Grid */}
        <div className="feature-cards-container flex flex-wrap justify-between gap-y-16 min-h-[500px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card-parallax w-full sm:w-[304px] ${feature.offset}`}
            >
              <div className="feature-card-mask w-full h-full relative">
                <div className="bg-[#BBAEA4] rounded-[40px] p-8 flex flex-col items-center text-center w-full h-auto sm:min-h-[380px] shadow-lg">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm shrink-0">
                    <Image src={feature.icon} alt={feature.alt} width={40} height={40} />
                  </div>
                  <h3 className="font-jakarta text-[18px] font-bold leading-tight mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-jakarta text-[14px] opacity-70 leading-relaxed text-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider Line */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1311px] h-[0.8px] bg-foreground/20 z-10 hidden md:block" 
      />
    </section>
  );
}

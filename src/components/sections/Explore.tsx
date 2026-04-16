"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore
import { Draggable } from "gsap/Draggable";
import { useRef } from "react";

// Assets
import ProductImageRitual from "@/assets/Product image 1.png";
import ExploreImageBottle from "@/assets/ExploreImage.png";
import HibiscusPackage from "@/assets/Hibiscus Blossom Package 1.png";
import BombayPackage from "@/assets/Bombay Chai Package 1.png";
import CartIcon from "@/assets/Cart.svg";

gsap.registerPlugin(ScrollTrigger, Draggable);

const products = [
  {
    name: "Hibiscus Blossom",
    price: "₹299",
    category: "BLOOM RITUALS",
    image: HibiscusPackage,
  },
  {
    name: "Bombay Chai",
    price: "₹299",
    category: "BLOOM RITUALS",
    image: BombayPackage,
  },
  {
    name: "Hibiscus Blossom", // Duplicate for carousel length
    price: "₹299",
    category: "BLOOM RITUALS",
    image: HibiscusPackage,
  },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="flex-none w-[304px] h-[464px] bg-[#7E6D62] rounded-[16px] p-8 relative overflow-hidden group">
      {/* Card Header */}
      <div className="flex justify-between items-start z-10 relative">
        <div className="bg-white px-[16px] py-[4px] rounded-full flex items-center justify-center min-w-[123px] h-[23px]">
          <span className="font-jakarta text-[12px] font-bold uppercase tracking-[-0.04em] text-[#3F352C] whitespace-nowrap">
            {product.category}
          </span>
        </div>
        <div className="w-[25px] h-[25px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <Image src={CartIcon} alt="Add to Cart" width={12} height={12} className="brightness-0" />
        </div>
      </div>

      {/* Product Image */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 304px"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
        <span className="font-jakarta text-[14px] font-bold uppercase tracking-tight text-white/90">
          {product.name}
        </span>
        <span className="font-jakarta text-[14px] font-bold text-white/90">
          {product.price}
        </span>
      </div>
    </div>
  );
}

export default function Explore() {
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Basic Reveal
    gsap.from(".explore-reveal", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out"
    });

    // Word-by-word Reveal for big headings
    gsap.from(".split-word", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      },
      y: "110%",
      opacity: 0,
      stagger: 0.08,
      duration: 1.2,
      ease: "power3.out"
    });

    // Subtitle Stagger Line Reveal
    gsap.from(".split-line", {
      scrollTrigger: {
        trigger: ".row2-trigger",
        start: "top 70%",
      },
      y: "100%",
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out"
    });

    // Dynamic Draggable Logic
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const clientWidth = sliderRef.current.parentElement?.clientWidth || 0;
      
      Draggable.create(sliderRef.current, {
        type: "x",
        inertia: true,
        bounds: { minX: -(scrollWidth - clientWidth + 32), maxX: 0 },
        edgeResistance: 0.65,
        cursor: "grab",
        activeCursor: "grabbing"
      });
    }

    // Parallax Effects - More aggressive scaling and yPercent
    gsap.to(".parallax-ritual", {
      scrollTrigger: {
        trigger: ".parallax-ritual-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5, // slightly smoothed
      },
      yPercent: 20,
      scale: 1, // Ends at scale 1
      ease: "none",
    });

    gsap.to(".parallax-bottle", {
      scrollTrigger: {
        trigger: ".parallax-bottle-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
      yPercent: 25,
      scale: 1.05,
      ease: "none",
    });
  }, { scope: container });

  return (
    <section id="explore" ref={container} className="bg-primary pt-48 pb-0 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-40 explore-reveal flex flex-col items-center">
        <h2 className="font-cormorant text-[32px] md:text-[40px] uppercase tracking-[0.25em] leading-none mb-6 opacity-60">
          Explore
        </h2>
        <div className="relative inline-block">
          {/* Split Text structure to preserve SEO and semantics but allow animation */}
          <h3 className="font-cormorant italic text-[64px] md:text-[88px] leading-tight flex overflow-hidden py-2" aria-label="Pure Blends">
            <span className="block mr-[0.25em]">
              <span className="block split-word">Pure</span>
            </span>
            <span className="block">
              <span className="block split-word">Blends</span>
            </span>
          </h3>
          <div className="absolute bottom-2 left-0 w-full h-[0.8px] bg-foreground/40" />
        </div>
      </div>

      {/* Row 1: Ritual & Bloom */}
      <div id="gallery" className="w-full flex flex-col md:flex-row items-stretch relative row1-trigger">
        {/* Left: Cinematic Ritual Image (Left Bleed) - Z-20 for Overlay */}
        <div className="w-full md:w-1/2 h-[600px] md:h-[790px] relative z-20 overflow-hidden explore-reveal parallax-ritual-container">
          <Image 
            src={ProductImageRitual} 
            alt="Tea Ritual" 
            fill 
            className="object-cover object-center scale-[1.15] parallax-ritual transform -translate-y-[10%]"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Bloom Rituals & Collection - Z-10 to Slide Behind Left Image */}
        <div className="w-full md:w-1/2 pt-12 md:pt-24 pl-12 md:pl-28 pr-4 relative z-10 explore-reveal">
          <div className="mb-16">
            <h4 className="font-cormorant text-[48px] md:text-[72px] uppercase font-bold leading-none mb-1">
              Bloom
            </h4>
            <p className="font-cormorant italic text-[32px] md:text-[44px] opacity-80">
              Rituals
            </p>
          </div>

          {/* Draggable Slider Wrapper */}
          <div className="relative cursor-grab active:cursor-grabbing">
            <div 
              ref={sliderRef}
              className="flex gap-10 w-max no-scrollbar"
            >
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Nature's Essence & Detail */}
      <div className="w-full flex flex-col-reverse md:flex-row items-stretch row2-trigger relative">
        
        {/* Left: Content Block */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-20 px-8 md:px-0">
          <div className="w-full md:w-[528px] flex flex-col items-start text-left">
            <h2 className="font-cormorant font-bold text-[36px] md:text-[48px] leading-[1.05] mb-8 text-foreground/95" aria-label="Nature's Essence, Perfected in Every Drop">
              <span className="block overflow-hidden"><span className="block split-line">Nature&apos;s Essence, Perfected</span></span>
              <span className="block overflow-hidden"><span className="block split-line">in Every Drop</span></span>
            </h2>
            <h3 className="font-cormorant italic text-[24px] md:text-[36px] opacity-90 mb-10 text-foreground/90 overflow-hidden py-1">
              <span className="block split-line">Herbal purity, steeped in intention.</span>
            </h3>
            
            <div className="mb-14 overflow-hidden">
              <p className="font-jakarta text-[16px] md:text-[20px] leading-[1.65] text-foreground/85 split-line">
                Every drop tells a story — of handpicked botanicals, <br className="hidden md:block" />
                mindful harvesting, and a commitment to clean, calming <br className="hidden md:block" />
                tea rituals. At Teaure, we don&apos;t just blend leaves — we <br className="hidden md:block" />
                distill moments of calm, clarity, and connection.
              </p>
            </div>
            
            <div className="overflow-hidden p-2 -ml-2">
              <button className="group flex items-center gap-6 px-12 py-5 rounded-full border border-foreground/30 hover:bg-foreground hover:text-primary transition-all duration-500 split-line">
                <span className="font-jakarta font-bold text-[14px] uppercase tracking-widest">
                  Discover the Ritual
                </span>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Dropper Image */}
        <div className="w-full md:w-1/2 h-[600px] md:h-screen relative overflow-hidden explore-reveal parallax-bottle-container flex items-center justify-center bg-primary">
          <div className="w-full h-full relative">
            <Image 
              src={ExploreImageBottle} 
              alt="Nature's Essence" 
              fill 
              className="object-cover object-bottom scale-[1.1] parallax-bottle transform -translate-y-[15%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

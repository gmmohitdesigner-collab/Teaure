"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// Assets
import FeatureImage from "@/assets/tea_field_person_1776284449165.png";
import TeapotImage from "@/assets/tea_mint_teapot_1776284469034.png";
import TinsImage from "@/assets/tea_eco_tins_1776284491245.png";

interface JournalCardProps {
  title: string;
  description: string;
  date: string;
  image: any;
  link?: string;
  isLarge?: boolean;
}

function JournalCard({ title, description, date, image, link, isLarge }: JournalCardProps) {
  return (
    <div 
      className={`group flex flex-col bg-[#FDF8F4] text-foreground overflow-hidden reveal transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 mx-auto md:mx-0 ${!isLarge ? "journal-small-card" : ""}`}
      style={{ 
        width: isLarge ? "min(100%, 600px)" : "min(100%, 304px)",
        height: isLarge ? "auto" : "auto",
      }}
    >
      {/* Image Container */}
      <div 
        className={`relative overflow-hidden w-full ${isLarge ? "journal-feature-wrapper" : ""}`}
        style={{ height: isLarge ? "640px" : "280px" }}
      >
        <Image 
          src={image} 
          alt={title} 
          fill 
          className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isLarge ? "journal-feature-image scale-[1.25]" : ""}`}
          sizes={isLarge ? "600px" : "304px"}
        />
      </div>

      {/* Content Container */}
      <div 
        className={`p-6 md:px-8 flex flex-col justify-center`}
        style={{ height: isLarge ? "160px" : "120px" }}
      >
        <h4 className={`font-jakarta font-bold leading-tight group-hover:text-foreground/80 transition-colors ${isLarge ? "text-[18px] mb-2" : "text-[14px] mb-1"}`}>
          {title}
        </h4>
        <p className={`font-jakarta leading-relaxed opacity-70 mb-4 line-clamp-2 ${isLarge ? "text-[13px] md:text-[15px]" : "text-[12px] md:text-[13px]"}`}>
          {description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-jakarta text-[11px] md:text-[12px] opacity-50 uppercase tracking-widest font-semibold">
            {date}
          </span>
          <Link 
            href={link || "#"} 
            className="font-jakarta text-[11px] md:text-[12px] font-bold uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-foreground hover:opacity-50 transition-opacity"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Journal() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ScrollTrigger removed from cards as per user request. 
    // They now rely solely on hover animations.
  }, { scope: container });

  return (
    <section id="journal" ref={container} className="bg-foreground text-background py-32 md:py-48 px-6 md:px-0">
      <div className="max-w-[1312px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          
          {/* Left: Large Feature Card (Col 1-6) */}
          <div className="md:col-span-6 journal-reveal">
            <JournalCard 
              isLarge
              title="Ancient Infusions: Tea Rituals from Cultures Around the World"
              description="For centuries, tea has been more than a drink—it’s been a sacred pause. Discover how Japanese chanoyu, Moroccan mint ceremonies, and Indian chai all elevate daily moments into mindful rituals."
              date="30 july 2025"
              image={FeatureImage}
            />
          </div>

          {/* Right: Header + Smaller Cards (Col 7-12) */}
          <div className="md:col-span-6 flex flex-col pt-12 md:pt-0">
            {/* Section Header */}
            <div className="mb-16 md:mb-24 text-left md:text-right journal-reveal self-end max-w-xl">
              <h2 className="font-cormorant text-[48px] md:text-[72px] leading-[1.1] mb-6 flex flex-wrap md:justify-end gap-[0.2em]" aria-label="Stories steeped in serenity">
                <span className="block overflow-hidden"><span className="block split-word-journal">Stories</span></span>
                <span className="block overflow-hidden"><span className="block split-word-journal">steeped</span></span>
                <span className="block overflow-hidden"><span className="block split-word-journal">in</span></span>
                <span className="block overflow-hidden"><span className="block split-word-journal italic">serenity</span></span>
              </h2>
              <p className="font-jakarta text-[16px] md:text-[20px] leading-relaxed opacity-70 lg:ml-auto max-w-sm">
                Brew mindfulness with rituals, wellness tips, and nature’s wisdom—one story at a time.
              </p>
            </div>

            {/* Sub-grid of Small Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              <div className="journal-reveal">
                <JournalCard 
                  title="How Organic Teas Can Support Your Sleep Cycle"
                  description="Explore how chamomile, valerian root, and lavender blends naturally prepare your body for deep rest."
                  link="#"
                  date="15 july 2025"
                  image={TeapotImage}
                />
              </div>
              <div className="journal-reveal">
                <JournalCard 
                  title="Eco-Friendly Brewing: Sustainability in Every Sip"
                  description="From compostable tea bags to circular sourcing—how your daily tea ritual can care for the planet."
                  link="#"
                  date="5 july 2025"
                  image={TinsImage}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

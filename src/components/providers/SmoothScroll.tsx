"use client";

import { useEffect, ReactNode, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // 2. Robust Reveal Utility
  useGSAP(() => {
    const revealElements = gsap.utils.toArray(".reveal");
    
    revealElements.forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Force a calculation refresh once everything is mounted
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

  }, { scope: container });

  return <div ref={container}>{children}</div>;
}

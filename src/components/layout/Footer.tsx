"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // Logo & Description Reveal
    gsap.fromTo(".footer-reveal-left", {
      y: 30,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out"
    });

    // Links Mask Reveal
    gsap.fromTo(".footer-link-word", {
      y: "110%",
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
      y: "0%",
      opacity: 1,
      stagger: 0.05,
      duration: 0.8,
      ease: "power4.out"
    });

    // Bottom Divider and Text
    gsap.fromTo(".footer-bottom-reveal", {
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    });
  }, { scope: container });

  return (
    <footer ref={container} className="bg-foreground text-background py-24 px-6 font-jakarta tracking-tight overflow-hidden">
      <div className="max-w-[1312px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-8 footer-reveal-left">
            <Image
              src={Logo}
              alt="Teaure Logo"
              width={160}
              height={53}
              className="invert brightness-0"
              sizes="160px"
            />
          </Link>
          <div className="overflow-hidden">
            <p className="max-w-xs text-background/60 leading-relaxed font-jakarta footer-reveal-left">
              Elevating the tea ritual into a cinematic experience. From leaf to soul, 
              Teaure celebrates the art of mindfulness and refinement.
            </p>
          </div>
        </div>

        <div>
          <div className="overflow-hidden mb-6">
            <h4 className="font-medium text-lg uppercase tracking-widest footer-link-word block">Connect</h4>
          </div>
          <ul className="space-y-4 text-background/60 uppercase text-xs tracking-widest">
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Instagram</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">X / Twitter</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">LinkedIn</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Behance</Link></span></li>
          </ul>
        </div>

        <div>
          <div className="overflow-hidden mb-6">
            <h4 className="font-medium text-lg uppercase tracking-widest footer-link-word block">Legal</h4>
          </div>
          <ul className="space-y-4 text-background/60 uppercase text-xs tracking-widest">
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Privacy Policy</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Terms of Service</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Shipping & Returns</Link></span></li>
            <li className="overflow-hidden"><span className="block footer-link-word"><Link href="#" className="hover:text-background transition-colors block">Contact Us</Link></span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1312px] mx-auto border-t border-background/10 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-background/40 uppercase tracking-widest footer-bottom-reveal">
        <p>© {new Date().getFullYear()} Teaure. All Rights Reserved.</p>
        <p>Crafted for the Discerning Palette.</p>
      </div>
    </footer>
  );
}

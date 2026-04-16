"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Logo from "@/assets/Logo.svg";
import CartIcon from "@/assets/Cart.svg";
import AccountIcon from "@/assets/Account.svg";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle Smart Show/Hide on Scroll Direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useGSAP(() => {
    // Initial Load Animation: Spreading pill container
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(".navbar-pill", {
      width: "160px",
      opacity: 0,
    }, {
      width: "160px",
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(".navbar-pill", {
      width: "100%",
      duration: 1.2,
      ease: "power4.inOut",
    })
    .fromTo(".navbar-links", {
      opacity: 0,
      x: 10,
    }, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.4");

    // Hamburger Menu Overlay Animation
    if (isMenuOpen) {
      gsap.to(".mobile-menu", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out"
      });
      gsap.from(".mobile-link", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.2
      });
    } else {
      gsap.to(".mobile-menu", {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power4.in"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed left-0 w-full z-[100] top-4 flex justify-center px-4 md:px-8 transition-transform duration-500 ${
          !isVisible && !isMenuOpen ? "-translate-y-[calc(100%+16px)]" : "translate-y-0"
        }`}
      >
        <div className="navbar-pill w-full max-w-[1312px] flex justify-between items-center bg-primary/40 backdrop-blur-2xl shadow-sm border border-foreground/5 rounded-full py-4 px-8 opacity-0">
          
          {/* Logo - Centered in initial small pill, then stays left */}
          <Link href="/" className="relative flex-none w-[112px] h-[22px] z-[110] mx-auto md:mx-0">
            <Image 
              src={Logo} 
              alt="teaure" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 navbar-links opacity-0">
            <div className="flex items-center gap-10 font-jakarta text-[18px] font-bold tracking-wide">
              <Link href="#explore" className="hover:opacity-50 transition-opacity">Shop</Link>
              <Link href="#gallery" className="hover:opacity-50 transition-opacity">Gallery</Link>
              <Link href="#philosophy" className="hover:opacity-50 transition-opacity">About</Link>
            </div>

            {/* Icon Pill */}
            <div className="flex items-center justify-center gap-6 bg-transparent border-[1.6px] border-foreground/20 rounded-full w-[124px] h-[56px] hover:bg-foreground/5 transition-all cursor-pointer">
              <Image src={CartIcon} alt="Cart" width={24} height={24} />
              <div className="w-[1.6px] h-4 bg-foreground/20" />
              <Image src={AccountIcon} alt="Account" width={20} height={20} />
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="flex md:hidden flex-col gap-1.5 z-[110] navbar-links opacity-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-8 h-[2px] bg-foreground transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-8 h-[2px] bg-foreground transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-8 h-[2px] bg-foreground transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu fixed inset-0 bg-primary z-[105] flex flex-col items-center justify-center pointer-events-none opacity-0 -translate-y-full md:hidden">
        <div className="flex flex-col items-center gap-8 pointer-events-auto">
          <Link 
            href="#explore" 
            className="mobile-link font-cormorant text-[48px] font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            href="#gallery" 
            className="mobile-link font-cormorant text-[48px] font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link 
            href="/#philosophy" 
            className="mobile-link font-cormorant text-[48px] font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          <div className="mobile-link flex mt-12 gap-8">
            <Image src={CartIcon} alt="Cart" width={32} height={32} />
            <Image src={AccountIcon} alt="Account" width={32} height={32} />
          </div>
        </div>
      </div>
    </>
  );
}

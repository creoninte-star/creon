"use client";

import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useEffect } from "react";

export default function Hero() {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (!lenis) {
      window.location.hash = href;
      return;
    }
    lenis.scrollTo(href, {
      duration: 1.0,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)),
    });
  };

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full mix-blend-screen"
        >
          <source src="https://cdn.pixabay.com/video/2019/11/04/28741-371887461_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      <motion.div 
        className="flex flex-col items-center text-center relative z-10 px-6 container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-7xl md:text-[8rem] lg:text-[10rem] font-inter font-bold tracking-tighter text-gold leading-none mb-6"
        >
          CREON
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-text max-w-2xl font-inter tracking-wide font-light mb-12 uppercase"
        >
          CREativity ONset. Born Creative. Built to Scale.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <LiquidButton
            onClick={(e) => handleNavClick(e as any, '#services')}
            className="px-10 py-5 w-auto"
          >
            <span className="font-inter font-semibold tracking-widest uppercase text-sm text-gold">Work With Us</span>
          </LiquidButton>
          <LiquidButton
            onClick={(e) => handleNavClick(e as any, '#store')}
            className="px-10 py-5 w-auto"
          >
            <span className="font-inter font-semibold tracking-widest uppercase text-sm text-text">Visit Store</span>
          </LiquidButton>
        </motion.div>
      </motion.div>

    </section>
  );
}

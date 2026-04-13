"use client";

import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

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
    <section className="relative w-full overflow-hidden bg-background">
      {/* Subtle Cinematic Video Background Placeholder - using a deeply dark overlay to keep it matte */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full mix-blend-screen"
        >
          {/* Placeholder luxury cinematic particle/smoke video */}
          <source src="https://cdn.pixabay.com/video/2019/11/04/28741-371887461_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      <div className="relative z-10 w-full">
        <ContainerScroll
          titleComponent={
            <motion.div 
              className="flex flex-col items-center text-center pb-20 mt-10 md:mt-20"
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
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=3840"
            alt="hero luxury showcase"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center opacity-80 mix-blend-luminosity"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <canvas
        className="pointer-events-none fixed inset-0 w-full h-full z-50"
        id="canvas"
      ></canvas>
    </section>
  );
}

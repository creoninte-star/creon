"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import HeroShaderBackground from "@/components/ui/hero-shader-background";

export default function Hero() {

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
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

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.6 },
    },
  };

  const word: import("framer-motion").Variants = {
    hidden: { y: 60, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fade: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">

      {/* ── Premium hybrid shader background ── */}
      <HeroShaderBackground animationSpeed={1.0} enableDesktopInteractivity={true} />

      {/* ── Subtle horizontal light streak at center ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-[1]"
        style={{
          top: "42%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, rgba(212,175,55,0.06) 20%, rgba(212,175,55,0.12) 50%, rgba(212,175,55,0.06) 80%, transparent 100%)",
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 container mx-auto"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ perspective: "1200px" }}
      >
        {/* Small eyebrow label */}
        <motion.div variants={fade} className="mb-8">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-inter uppercase tracking-[0.35em] text-white/30 border border-white/8 px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70 inline-block" />
            Creative Agency
          </span>
        </motion.div>

        {/* CREON wordmark */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={word}
            className="text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-display font-black tracking-[-0.01em] leading-none"
            style={{
              background:
                "linear-gradient(160deg, #F5E6A0 0%, #D4AF37 40%, #A07C18 75%, #6B5010 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 60px rgba(212,175,55,0.12))",
            }}
          >
            CREON
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={fade}
          className="text-sm md:text-base text-white/50 max-w-lg font-inter tracking-[0.18em] font-light mb-14 uppercase"
        >
          CREativity ONset. Born Creative. Built to Scale.
        </motion.p>

        {/* CTAs — Premium Liquid Glass style */}
        <motion.div
          variants={fade}
          className="flex flex-col sm:flex-row gap-8 justify-center mt-10"
        >
          {/* Primary — Liquid Glass Gold */}
          <LiquidButton
            onClick={(e) => handleNavClick(e as any, "#services")}
            className="px-12 py-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-inter font-bold tracking-[0.2em] uppercase text-sm text-gold">Work With Us</span>
              <ArrowRight
                size={16}
                className="text-gold opacity-70 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </LiquidButton>

          {/* Secondary — Liquid Glass Silver/White */}
          <LiquidButton
            onClick={(e) => handleNavClick(e as any, "#store")}
            className="px-12 py-5"
          >
            <span className="font-inter font-bold tracking-[0.2em] uppercase text-sm text-white/80">Visit Store</span>
          </LiquidButton>
        </motion.div>
      </motion.div>

      {/* ── Bottom editorial divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[9px] font-inter tracking-[0.35em] uppercase text-white/20">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

    </section>
  );
}


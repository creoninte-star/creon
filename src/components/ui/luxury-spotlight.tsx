"use client";

import { useEffect, useRef, useCallback } from "react";

export default function LuxurySpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.42 });
  const targetRef = useRef({ x: 0.5, y: 0.42 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const fadeRef = useRef(0); // for fade-in on load

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      timeRef.current += 0.004;
      const t = timeRef.current;

      // Fade in on load (over ~1.5s at 60fps)
      fadeRef.current = Math.min(fadeRef.current + 0.008, 1);
      const fade = fadeRef.current;

      // Smooth lerp mouse — very restrained (0.025 = slow follow)
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.025;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.025;

      const w = canvas.width;
      const h = canvas.height;

      // Clear to matte black
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, w, h);

      // Slow ambient drift
      const driftX = Math.sin(t * 0.6) * 0.075;
      const driftY = Math.cos(t * 0.45) * 0.055;

      // Mouse contributes very lightly (10% influence)
      const lightX = (0.5 + driftX + (mouseRef.current.x - 0.5) * 0.1) * w;
      const lightY = (0.38 + driftY + (mouseRef.current.y - 0.5) * 0.08) * h;

      const r = Math.max(w, h);

      // --- Primary gold studio light ---
      const goldGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, r * 0.7);
      goldGrad.addColorStop(0,   `rgba(212, 175, 55, ${0.085 * fade})`);
      goldGrad.addColorStop(0.25, `rgba(180, 145, 35, ${0.045 * fade})`);
      goldGrad.addColorStop(0.55, `rgba(100, 75, 10, ${0.018 * fade})`);
      goldGrad.addColorStop(1,    "rgba(0, 0, 0, 0)");
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, w, h);

      // --- Warm white haze (offset slightly) — depth illusion ---
      const hazeX = lightX - w * 0.08;
      const hazeY = lightY + h * 0.04;
      const hazeGrad = ctx.createRadialGradient(hazeX, hazeY, 0, hazeX, hazeY, r * 0.55);
      hazeGrad.addColorStop(0,   `rgba(255, 248, 220, ${0.035 * fade})`);
      hazeGrad.addColorStop(0.35, `rgba(255, 245, 200, ${0.012 * fade})`);
      hazeGrad.addColorStop(1,    "rgba(0, 0, 0, 0)");
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, 0, w, h);

      // --- Second ambient drift light (counter-movement for cinematic parallax) ---
      const driftX2 = Math.sin(t * 0.35 + 1.2) * 0.12;
      const driftY2 = Math.cos(t * 0.28 + 0.8) * 0.07;
      const lightX2 = (0.38 + driftX2) * w;
      const lightY2 = (0.55 + driftY2) * h;
      const ambGrad = ctx.createRadialGradient(lightX2, lightY2, 0, lightX2, lightY2, r * 0.5);
      ambGrad.addColorStop(0,   `rgba(180, 140, 25, ${0.025 * fade})`);
      ambGrad.addColorStop(0.5,  `rgba(100, 75, 10, ${0.008 * fade})`);
      ambGrad.addColorStop(1,    "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, w, h);

      // --- Deep vignette to keep edges very dark and editorial ---
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, r * 0.25, w / 2, h / 2, r * 0.85);
      vigGrad.addColorStop(0,   "rgba(0, 0, 0, 0)");
      vigGrad.addColorStop(0.7,  `rgba(0, 0, 0, ${0.35 * fade})`);
      vigGrad.addColorStop(1,    `rgba(0, 0, 0, ${0.72 * fade})`);
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

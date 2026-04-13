"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function ScrollShowcase() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-inter font-semibold text-text uppercase tracking-widest mb-4">
              Unleash the power of <br />
              <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-gold">
                CREON ANIMATIONS
              </span>
            </h1>
          </>
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
  );
}

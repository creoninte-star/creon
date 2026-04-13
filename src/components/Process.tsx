"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding your brand, audience, and goals deeply." },
  { num: "02", title: "Design", desc: "Crafting visual identities and stunning prototypes." },
  { num: "03", title: "Build", desc: "Developing scalable, performant custom solutions." },
  { num: "04", title: "Launch", desc: "Going live and optimizing for growth and scale." },
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-inter font-bold tracking-tighter text-text mb-6 uppercase">Our Process</h2>
          <div className="w-16 h-[2px] bg-gold mx-auto"></div>
        </div>

        <div className="relative mt-24">
          {/* Main timeline line */}
          <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-secondary"></div>
          
          <div className="flex flex-col md:flex-row justify-between relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num} 
                className="relative flex-1 md:text-center group px-4 mb-16 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Connector overlay line animation */}
                {i < steps.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-[4.5rem] left-1/2 w-full h-[1px] bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.3, ease: "easeInOut" }}
                  ></motion.div>
                )}

                <div className="w-36 h-36 mx-auto bg-background rounded-none border border-secondary flex flex-col items-center justify-center mb-8 relative z-10 transition-colors duration-500 group-hover:border-teal">
                  <span className="text-teal text-4xl font-inter font-light tracking-widest">{step.num}</span>
                </div>

                <h3 className="text-2xl font-inter font-bold mb-4 uppercase text-text tracking-widest">{step.title}</h3>
                <p className="text-text-muted font-inter text-sm max-w-[14rem] mx-auto text-left md:text-center leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

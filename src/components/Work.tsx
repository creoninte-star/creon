"use client";

import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Nexus Rebrand", category: "Brand Identity", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80", height: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]" },
  { id: 2, title: "Aura E-Commerce", category: "Web Development", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-1 h-[300px]" },
  { id: 3, title: "CREON Supply: Watch", category: "E-Commerce", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-1 h-[300px]" },
  { id: 4, title: "Velocity Campaign", category: "Video Editing", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-2 h-[450px] md:h-full" },
  { id: 5, title: "Echo Festival", category: "Brand Identity", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80", height: "md:col-span-2 md:row-span-1 h-[350px]" },
  { id: 6, title: "CREON Supply: Kicks", category: "E-Commerce", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-1 h-[350px]" },
];

export default function Work() {
  return (
    <section id="work" className="py-32 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-inter font-bold tracking-tighter text-text mb-6 uppercase">Selected Work</h2>
            <div className="w-16 h-[2px] bg-gold"></div>
          </div>
          <a href="#" className="uppercase tracking-[0.2em] text-sm font-inter text-gold hover:text-teal transition-colors border-b border-gold hover:border-teal pb-1">
            View Archive
          </a>
        </div>

        {/* CSS Grid Masonry approximation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(0,1fr)]">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id} 
              className={`relative overflow-hidden group cursor-pointer bg-background border border-transparent hover:border-teal transition-colors duration-500 ${project.height}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image Base */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${project.img})` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/80 group-hover:bg-background/20 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="text-gold text-xs font-inter uppercase tracking-[0.2em] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-inter font-bold text-text uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

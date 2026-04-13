"use client";

import { motion } from "framer-motion";

const storeItems = [
  { id: 1, name: "The Executive Timepiece", price: "$495", category: "Watches", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80", col: "md:col-span-2 md:row-span-2 h-[500px]" },
  { id: 2, name: "Obsidian Loafers", price: "$250", category: "Shoes", img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80", col: "md:col-span-1 md:row-span-1 h-[240px]" },
  { id: 3, name: "Matte Horizon", price: "$650", category: "Watches", img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80", col: "md:col-span-1 md:row-span-1 h-[240px]" },
  { id: 4, name: "Midnight Runners", price: "$180", category: "Shoes", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80", col: "md:col-span-2 md:row-span-1 h-[240px]" },
];

export default function Store() {
  return (
    <section id="store" className="py-32 bg-background border-t border-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-inter font-bold tracking-tighter text-text mb-6 uppercase">CREON Supply</h2>
          <div className="w-16 h-[2px] bg-gold mx-auto"></div>
          <p className="text-xl text-text-muted font-inter mt-8 uppercase tracking-widest text-sm">Curated Essentials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(0,1fr)]">
          {storeItems.map((item, i) => (
            <motion.div 
              key={item.id}
              className={`group relative overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-gold/30 transition-all duration-500 cursor-pointer flex flex-col justify-end rounded-2xl shadow-2xl ${item.col}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <div className="absolute inset-0 bg-background/65 group-hover:bg-background/10 transition-colors duration-700"></div>
              {/* Gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
              
                <div className="relative z-10 p-8 flex justify-between items-end w-full">
                <div>
                  <div className="text-gold text-xs font-inter uppercase tracking-[0.2em] mb-2">{item.category}</div>
                  <h3 className="text-2xl font-inter font-bold text-white uppercase tracking-tight">{item.name}</h3>
                </div>
                <div className="text-gold font-inter font-bold tracking-widest text-xl">{item.price}</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                <span className="bg-gold text-background px-8 py-4 font-inter font-semibold uppercase tracking-widest text-xs rounded-full shadow-lg">Shop Now</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
            <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-inter font-semibold tracking-widest uppercase text-sm cursor-pointer hover:bg-gold hover:border-gold hover:text-background transition-all duration-300 rounded-full">
                View All Products
            </button>
        </div>
      </div>
    </section>
  );
}

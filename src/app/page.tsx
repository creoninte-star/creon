import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Store from "@/components/Store";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-wrapper" className="relative bg-background text-text selection:bg-gold selection:text-background w-full overflow-hidden origin-center will-change-transform">
        <Hero />
        <ScrollShowcase />
        <Services />
        <Process />
        <Work />
        <Store />
        <Footer />
      </main>
    </>
  );
}

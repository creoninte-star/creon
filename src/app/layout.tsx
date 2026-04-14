import type { Metadata } from "next";
import { Manrope, Epilogue, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-epilogue" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "CREON | Born Creative. Built to Scale.",
  description: "We build brands, websites, and experiences that make people stop scrolling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${epilogue.variable} ${space.variable} ${bebas.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-gold selection:text-background font-sans bg-background text-text">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

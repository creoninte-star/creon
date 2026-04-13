import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bebas_Neue, Big_Shoulders_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const bigShoulders = Big_Shoulders_Display({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-big-shoulders" });

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
    <html lang="en" className={`${inter.variable} ${space.variable} ${bebas.variable} ${bigShoulders.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-gold selection:text-background font-inter bg-background text-text">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

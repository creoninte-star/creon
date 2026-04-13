import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

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
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-gold selection:text-background font-inter bg-background text-text">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

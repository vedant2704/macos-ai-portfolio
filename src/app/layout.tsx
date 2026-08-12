import type { Metadata } from "next";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.owner.name} — macOS AI Portfolio & Systems Concierge`,
  description: "A high-end personal portfolio designed as a macOS desktop application, featuring AI Concierge streaming, floating draggable windows, Finder projects browser, Spotlight search, and interactive terminal.",
  keywords: ["AI Engineer Portfolio", "macOS Portfolio", "AI Concierge", "Full-Stack Developer", "Cybersecurity", "Next.js", "TypeScript"],
  authors: [{ name: PORTFOLIO_DATA.owner.name }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}

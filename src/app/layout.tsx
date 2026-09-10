import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navigation from "@/components/Navigation";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Anas | Vibe Coder & Developer",
  description: "Portfolio of Anas, a Vibe Coder and Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${manrope.variable} font-body antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <SmoothScroller>
          <Navigation />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

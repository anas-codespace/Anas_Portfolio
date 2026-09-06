import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Navigation from "@/components/Navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "700", "900"],
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
        className={`${montserrat.variable} font-sans antialiased bg-black text-white`}
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

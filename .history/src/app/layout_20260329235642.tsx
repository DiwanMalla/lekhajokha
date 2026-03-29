import type { Metadata } from "next";
import { Inter, Mukta } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "@/components/ThemeInitializer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mukta = Mukta({
  variable: "--font-devanagari",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin", "devanagari"],
});

export const metadata: Metadata = {
  title: "Lekhajokha | Nepal 100-Point Accountability Tracker",
  description: "Independent tracking of Nepal government's 100-point action plan with evidence, timelines, analytics, and citizen participation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mukta.variable} min-h-full flex flex-col antialiased`}>
        <ThemeInitializer>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </ThemeInitializer>
      </body>
    </html>
  );
}

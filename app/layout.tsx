import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import ScrollProgress from "../components/ScrollProgress";
import CursorLabel from "../components/CursorLabel";
import Intro from "../components/Intro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jefer Setiawan — Fullstack Developer",
  description:
    "Jefer Setiawan is a fullstack developer building reliable, scalable web applications — from databases and APIs to refined interfaces. Based in Tangerang, Indonesia.",
  openGraph: {
    title: "Jefer Setiawan — Fullstack Developer",
    description:
      "Fullstack developer building reliable, scalable web applications — from databases and APIs to refined interfaces.",
    siteName: "Jefer Setiawan",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${bricolage.variable} font-body antialiased`}
      >
        <SmoothScroll />
        <Intro />
        <Background />
        <ScrollProgress />
        <CursorLabel />
        <Navbar />
        <main className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

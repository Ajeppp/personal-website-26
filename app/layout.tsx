import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Big_Shoulders, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CursorLabel from "../components/CursorLabel";
import Intro from "../components/Intro";
import Hud from "../components/Hud";
import SmoothScroll from "../components/SmoothScroll";
import SceneMount from "../components/SceneMount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bigShoulders.variable} ${instrument.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Intro />
        {/* One fixed WebGL world behind the page. Sections sit above it (z-2);
            the hero title deliberately sits below it (z-0). */}
        <SceneMount />
        <div className="vignette z-[3]" aria-hidden="true" />
        <div className="grain z-[60]" aria-hidden="true" />
        <CursorLabel />
        <Navbar />
        <Hud />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

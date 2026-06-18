import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
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
  weight: ["400", "500", "600", "700", "900"],
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

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <Intro />
          <Background />
          <ScrollProgress />
          <CursorLabel />
          <Navbar />
          <main className="relative z-[2]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Jefer Setiawan | Fullstack Developer",
//   description:
//     "Fullstack developer building scalable web applications and automation systems with modern technologies.",
//   openGraph: {
//     title: "Jefer Setiawan | Fullstack Developer",
//     description:
//       "Portfolio of Jefer Setiawan — fullstack developer focused on scalable systems and end-to-end web applications.",
//     url: "https://yourdomain.com",
//     siteName: "Jefer Setiawan Portfolio",
//     locale: "en_US",
//     type: "website",
//   },
// };

export const metadata: Metadata = {
  title: "Jefer Setiawan | Fullstack Developer Portfolio",
  description:
    "Portfolio of Jefer Setiawan, a fullstack developer specializing in scalable web applications, backend APIs, system design, and modern frontend development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen mx-auto max-w-6xl px-6 pt-32 pb-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

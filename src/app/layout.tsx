import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";

import ChatbotWidget from "@/components/ChatbotWidget";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SplashScreen from "@/components/SplashScreen";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Techish Innovation | Custom Software, Web & Mobile Development",
    template: "%s | Techish Innovation",
  },
  description:
    "Techish Innovation is a software engineering company building scalable web, mobile, and cloud solutions for startups and enterprises worldwide.",
  keywords: [
    "software development company",
    "web application development",
    "mobile app development",
    "custom software development",
    "UI/UX design agency",
    "cloud & DevOps engineering",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SplashScreen />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}

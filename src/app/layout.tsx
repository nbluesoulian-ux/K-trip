import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KTrip - Korea Travel OS",
  description: "한국 여행, 계획부터 도착까지 한 번에. Your Korea trip, planned in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full antialiased ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#171717]">{children}</body>
    </html>
  );
}

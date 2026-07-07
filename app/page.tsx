import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import VerendarLanding from "@/components/landing/VerendarLanding";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Verendar — Sửa xe máy, không còn phải đoán giá",
  description:
    "Verendar cho bạn xem báo giá từng hạng mục trước khi garage mở cốp xe — minh bạch, tiện lợi, đáng tin cậy.",
};

export default function Home() {
  return (
    <div className={`${inter.variable} ${barlow.variable} ${mono.variable}`}>
      <VerendarLanding />
    </div>
  );
}

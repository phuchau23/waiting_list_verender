import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verendar — Sửa xe máy, không còn phải đoán giá",
  description:
    "Verendar cho bạn xem báo giá từng hạng mục trước khi garage mở cốp xe — minh bạch, tiện lợi, đáng tin cậy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}

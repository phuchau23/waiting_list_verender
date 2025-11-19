"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      alert("Cảm ơn bạn đã liên hệ MotoCare! ❤️");
    }, 800);
  };

  return (
    <section className="border-t border-red-900/30 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Liên hệ
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
            Kết nối với đội ngũ MotoCare
          </h2>
          <p className="mt-3 text-xs md:text-sm text-white/60 max-w-2xl mx-auto">
            Bạn cần tư vấn hoặc muốn trở thành đối tác? Hãy để lại thông tin,
            đội ngũ MotoCare sẽ liên hệ lại trong thời gian sớm nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-red-500/40 bg-black shadow-[0_0_40px_rgba(255,45,85,0.25)]">
              <Image
                src="/contact.jpg"
                alt="MotoCare contact"
                width={640}
                height={420}
                className="relative z-[1] w-full h-auto object-cover opacity-90"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden md:flex items-center gap-2 rounded-full bg-black/90 border border-red-500/40 px-4 py-2 text-[11px] text-red-300 shadow-[0_0_20px_rgba(255,45,85,0.4)]">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>Hỗ trợ trực tiếp từ MotoCare</span>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-3xl border border-red-500/30 bg-black p-6 md:p-8 text-white shadow-[0_0_40px_rgba(255,45,85,0.15)]">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-xl border border-red-500/20 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-red-500/20 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="text-left">
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Số điện thoại (tuỳ chọn)
                </label>
                <input
                  type="tel"
                  placeholder="09xx xxx xxx"
                  className="w-full rounded-xl border border-red-500/20 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Message */}
              <div className="text-left">
                <label className="block text-xs font-medium text-white/70 mb-1">
                  Mong muốn / vấn đề cần hỗ trợ
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cho mình xin tư vấn giải pháp quản lý xe..."
                  className="w-full rounded-xl border border-red-500/20 bg-black px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-white/40 text-left">
                  Thông tin của bạn sẽ được MotoCare bảo mật tuyệt đối.
                </p>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-2.5 text-xs md:text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,45,85,0.6)] hover:bg-red-400 hover:scale-[1.02] active:scale-[0.97] transition disabled:opacity-50"
                >
                  {isSending ? "Đang gửi..." : "Gửi thông tin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

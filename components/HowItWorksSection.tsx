"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse",
          // onEnter, onLeave, onEnterBack, onLeaveBack
        },
      });

      // Title
      tl.from(".how-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Items
      tl.from(
        ".how-item",
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/10 bg-black pt-7"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-how.jpg')", // đổi link ảnh vào đây
          filter: "brightness(0.65)", // làm tối ảnh
        }}
      />

      {/* Overlay mờ để dễ đọc chữ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative container mx-auto max-w-5xl px-4 lg:px-0 py-16 lg:py-24">
        {/* Title */}
        <div className="text-center mb-12 how-title">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            Process
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-white">
            How it works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="how-item text-center space-y-4 ">
            <div className="mx-auto h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-sm font-semibold text-white">
              1
            </div>
            <h3 className="font-semibold text-white">Đăng kí</h3>
            <p className="text-xs md:text-sm text-white/70 max-w-[240px] mx-auto leading-relaxed">
              Đăng ký tài khoản MotoCare và thêm chiếc xe đầu tiên của bạn.
            </p>
          </div>

          <div className="how-item text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-sm font-semibold text-white">
              2
            </div>
            <h3 className="font-semibold text-white">Thêm xe của bạn</h3>
            <p className="text-xs md:text-sm text-white/70 max-w-[240px] mx-auto leading-relaxed">
              Nhập thông tin xe, lịch bảo dưỡng, số km và thời gian nhắc nhở.
            </p>
          </div>

          <div className="how-item text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-sm font-semibold text-white">
              3
            </div>
            <h3 className="font-semibold text-white">Thành công</h3>
            <p className="text-xs md:text-sm text-white/70 max-w-[260px] mx-auto leading-relaxed">
              Ứng dụng tự động nhắc thay nhớt, kiểm tra định kỳ và lưu lại chi
              phí sử dụng xe cho bạn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

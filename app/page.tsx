"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import ContactSection from "@/components/ContactSection";
import DidYouKnowSection from "@/components/DidYouKnowSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "./feature/page";
import Header from "@/components/common/header";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const headerHeight = 100;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 1️⃣ Smooth scroll bằng Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis với ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2️⃣ Hiệu ứng vào màn khi vừa load
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".hero-heading-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .from(
          ".hero-sub",
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-form",
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-partners",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .from(
          ".hero-3d",
          {
            x: 80,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // 3️⃣ GSAP ScrollTrigger (đã bỏ HERO pin + scale để không còn ảnh to đùng)
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // ✅ Hero 3D – float nhẹ liên tục (KHÔNG scale theo scroll)
      gsap.to(".hero-3d-float", {
        y: "-=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // THANH TIẾN TRÌNH CUỘN Ở BÊN PHẢI
      gsap.to(".scroll-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // ================= CÁCH HOẠT ĐỘNG =================
      const howTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-how",
          start: "top 75%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      howTl
        .from(".section-how", {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".section-how .how-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".section-how .how-item",
          {
            y: 70,
            opacity: 0,
            rotateX: -18,
            transformOrigin: "top center",
            filter: "blur(6px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: {
              each: 0.14,
              from: "center",
            },
          },
          "-=0.25",
        );

      // ================= BẠN CÓ BIẾT =================
      const dykTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-didyou",
          start: "top 80%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      });

      dykTl
        .from(".section-didyou", {
          opacity: 0,
          y: 80,
          scale: 0.94,
          duration: 0.9,
          ease: "power3.out",
        })
        .from(
          ".section-didyou .stat-card, .section-didyou .chart-card",
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            rotateZ: (index: number) => (index % 2 === 0 ? -2.5 : 2.5),
            transformOrigin: "center center",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.3",
        )
        .to(
          ".section-didyou",
          {
            boxShadow: "0 30px 120px rgba(220,38,38,0.25)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5",
        );

      // ================= PHẦN TÍNH NĂNG =================
      const featureTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-feature",
          start: "top 80%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      });

      featureTl
        .from(".section-feature", {
          opacity: 0,
          y: 80,
          scale: 0.96,
          duration: 0.85,
          ease: "power3.out",
        })
        .from(
          ".section-feature .feature-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".section-feature .feature-card",
          {
            y: 60,
            opacity: 0,
            x: (index: number) => (index % 2 === 0 ? -40 : 40),
            rotateY: (index: number) => (index % 2 === 0 ? -10 : 10),
            transformOrigin: "center center",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.16,
          },
          "-=0.2",
        );

      // Parallax nhẹ cho background feature (nếu có)
      gsap.to(".section-feature", {
        backgroundPositionY: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".section-feature",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ================= BẢNG GIÁ =================
      const pricingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-pricing",
          start: "top 80%",
          end: "bottom 55%",
          toggleActions: "play none none reverse",
        },
      });

      pricingTl
        .from(".section-pricing", {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".section-pricing .pricing-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".section-pricing .pricing-card",
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotateX: -10,
            transformOrigin: "top center",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.16,
          },
          "-=0.2",
        )
        .to(
          ".section-pricing .pricing-card--primary",
          {
            scale: 1.04,
            boxShadow: "0 30px 120px rgba(220,38,38,0.25)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );

      // ================= LIÊN HỆ =================
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-contact",
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      contactTl
        .from(".section-contact", {
          opacity: 0,
          y: 60,
          scale: 0.97,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".section-contact .contact-visual",
          {
            x: -80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".section-contact .contact-form",
          {
            x: 80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".section-contact .contact-chip, .section-contact .contact-tag",
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.6",
        );

      // ================= CHÂN TRANG =================
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-footer",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      footerTl
        .from(".section-footer", {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
        })
        .from(
          ".section-footer .footer-col",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          ".section-footer .footer-link, .section-footer .footer-badge",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.4",
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <div ref={pageRef} className="min-h-screen bg-gray-50 text-gray-800">
        {/* THANH TIẾN TRÌNH CUỘN Ở BÊN PHẢI */}
        <div className="fixed right-6 top-1/2 z-50 h-40 w-px -translate-y-1/2 overflow-hidden bg-red-100 pointer-events-none">
          <div className="scroll-progress h-full w-full origin-bottom scale-y-0 bg-gradient-to-t from-red-500 via-red-400 to-red-300" />
        </div>

        {/* HERO TOÀN MÀN HÌNH */}
        <main className="hero-section relative flex h-screen items-center overflow-hidden">
          <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
            {/* TRÁI: NỘI DUNG HERO */}
            <section className="hero-content relative z-10 max-w-xl space-y-6 text-gray-800">
              {/* Huy hiệu */}
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/50 px-4 py-2 text-xs tracking-wide">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span className="font-medium uppercase text-[11px] tracking-[0.18em] text-gray-600">
                  #1 Ứng dụng chăm sóc xe máy
                </span>
              </div>

              {/* Tiêu đề */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight space-y-1">
                <span className="hero-heading-line block">Quản lý xe</span>
                <span className="hero-heading-line block">dễ dàng với</span>
                <span className="hero-heading-line block bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                  Verendar
                </span>
              </h1>

              {/* Mô tả */}
              <p className="hero-sub text-sm md:text-base text-gray-600 max-w-md">
                Theo dõi bảo dưỡng, nhắc thay nhớt, chi phí và lịch sử sửa chữa xe một cách dễ dàng – tất cả ngay trên
                điện thoại của bạn.
              </p>

              {/* Nút kêu gọi hành động */}
              <div className="hero-form flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={scrollToContact}
                  className="rounded-full items-end px-6 py-3 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md shadow-red-500/20 cursor-pointer"
                >
                  Trải Nghiệm Ngay
                </button>
              </div>

              {/* Đối tác toàn cầu */}
              <div className="hero-partners pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Đối tác toàn cầu</p>
                <div className="flex gap-3">
                  {["A", "B", "C", "D"].map((item) => (
                    <div
                      key={item}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-red-50/50 text-xs font-medium text-gray-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PHẢI: ẢNH HERO (từ /public) */}
            <section className="hero-3d absolute inset-y-0 -right-40 hidden md:flex items-center">
              {/* Glow nền */}
              <div className="hero-bg-glow absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_60%)] blur-3xl" />

              <div className="hero-3d-float relative z-5 flex items-center justify-center py-8">
                <div className="relative h-[460px] w-[760px]">
                  <Image
                    src="/hero-bike.png"
                    alt="Ảnh hero Verendar"
                    fill
                    priority
                    className="rounded-xl object-contain"
                  />
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* CÁC SECTION PHÍA DƯỚI */}
        <section className="section-how">
          <HowItWorksSection />
        </section>

        <section className="section-didyou">
          <DidYouKnowSection />
        </section>

        <section className="section-feature">
          <FeaturesSection />
        </section>

        <section className="section-pricing">
          <PricingSection />
        </section>

        <section className="section-contact">
          <ContactSection />
        </section>

        <section className="section-footer"></section>
      </div>
      <Footer />
    </>
  );
}

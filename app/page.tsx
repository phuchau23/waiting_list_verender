"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import ContactSection from "@/components/ContactSection";
import DidYouKnowSection from "@/components/DidYouKnowSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "./feature/page";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // 1️⃣ Smooth scroll bằng Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // độ mượt
      wheelMultiplier: 1, // độ nhạy cuộn chuột
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

  // 2️⃣ Hero entrance khi mới load
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
          "-=0.2"
        )
        .from(
          ".hero-sub",
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-form",
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-partners",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .from(
          ".hero-3d",
          {
            x: 80,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // 3️⃣ GSAP ScrollTrigger cho toàn trang
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // ================= HERO =================
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=220%", // kéo dài thêm để có đoạn “ngắm xe”
          scrub: true,
          pin: true,
        },
      });

      // Phase 1: text biến mất + xe phóng to
      heroTl
        .to(
          ".hero-content",
          {
            y: -300,
            opacity: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          ".hero-3d-float",
          {
            y: -40,
            scale: 1.35,
            xPercent: -38,
            transformOrigin: "center center",
            ease: "power2.inOut",
            duration: 1,
          },
          0
        )
        .to(
          ".hero-bg-glow",
          {
            opacity: 0.9,
            scale: 1.1,
            ease: "power2.inOut",
            duration: 1,
          },
          0
        )
        .to(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: 20,
            ease: "none",
            duration: 1,
          },
          0
        );

      // Phase 2: giữ nguyên trạng thái 1 đoạn (ngắm xe)
      heroTl.to({}, { duration: 1 });

      // Hero 3D – float nhẹ liên tục
      gsap.to(".hero-3d-float", {
        y: "-=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // SCROLL PROGRESS BAR BÊN PHẢI
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

      // ================= HOW IT WORKS =================
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
          "-=0.3"
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
          "-=0.25"
        );

      // ================= DID YOU KNOW =================
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
          "-=0.3"
        )
        .to(
          ".section-didyou",
          {
            boxShadow: "0 30px 120px rgba(16,185,129,0.25)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        );

      // ================= FEATURES SECTION =================
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
          "-=0.3"
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
          "-=0.2"
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

      // ================= PRICING =================
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
          "-=0.25"
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
          "-=0.2"
        )
        // card ở giữa (nếu có class .pricing-card--primary) pop mạnh hơn
        .to(
          ".section-pricing .pricing-card--primary",
          {
            scale: 1.04,
            boxShadow: "0 30px 120px rgba(56,189,248,0.25)",
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // ================= CONTACT =================
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
          "-=0.3"
        )
        .from(
          ".section-contact .contact-form",
          {
            x: 80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
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
          "-=0.6"
        );

      // ================= FOOTER =================
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
          "-=0.4"
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
          "-=0.4"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#050505] text-white">
      {/* SCROLL PROGRESS BAR BÊN PHẢI */}
      <div className="fixed right-6 top-1/2 z-50 h-40 w-px -translate-y-1/2 overflow-hidden bg-white/10 pointer-events-none">
        <div className="scroll-progress h-full w-full origin-bottom scale-y-0 bg-gradient-to-t from-emerald-400 via-cyan-300 to-sky-400" />
      </div>

      {/* HERO FULL SCREEN */}
      <main className="hero-section relative flex h-screen items-center overflow-hidden">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
          {/* LEFT: HERO TEXT */}
          <section className="hero-content relative z-10 max-w-xl space-y-6 text-white">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wide">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium uppercase text-[11px] tracking-[0.18em] text-white/80">
                #1 Motorbike Care App
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight space-y-1">
              <span className="hero-heading-line block">Quản lý xe</span>
              <span className="hero-heading-line block">dễ dàng với</span>
              <span className="hero-heading-line block bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Verender
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-sub text-sm md:text-base text-white/60 max-w-md">
              Theo dõi bảo dưỡng, nhắc thay nhớt, chi phí và lịch sử sửa chữa xe
              một cách dễ dàng – tất cả ngay trên điện thoại của bạn.
            </p>

            {/* Email form */}
            <div className="hero-form flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-transparent"
              />
              <button className="rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition-colors">
                Get Started
              </button>
            </div>

            {/* Global partner */}
            <div className="hero-partners pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                Global Partner
              </p>
              <div className="flex gap-3">
                {["A", "B", "C", "D"].map((item) => (
                  <div
                    key={item}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-medium text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT: 3D MODEL */}
          <section className="hero-3d absolute inset-y-0 right-[-160px] hidden md:flex items-center">
            {/* Glow nền (không chặn chuột) */}
            <div className="hero-bg-glow absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.35),_transparent_60%)] blur-3xl" />

            {/* Kawasaki Z900 3D Model */}
            <div className="hero-3d-float relative z-[5] flex items-center justify-center py-8">
              <iframe
                title="Kawasaki Z900 3Dscan (retopology model)"
                width="760"
                height="460"
                src="https://sketchfab.com/models/ffde1136537448178fbd82d4066b4704/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_theme=dark"
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </section>

          {/* Scroll Indicator */}
          <div className="hero-scroll-indicator absolute left-6 bottom-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span className="h-px w-6 bg-white/30" />
            Scroll để khám phá
          </div>
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

      <section className="section-footer">
        <Footer />
      </section>
    </div>
  );
}

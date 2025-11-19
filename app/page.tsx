// import { BikeViewer } from "@/components/BikeViewer";
import ContactSection from "@/components/ContactSection";
import DidYouKnowSection from "@/components/DidYouKnowSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0b0b0b] to-[#111111]">
      {/* HERO FULL SCREEN */}
      <main className="h-screen flex items-center">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
          {/* LEFT: HERO TEXT */}
          <section className="relative z-10 max-w-xl space-y-6 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wide">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium uppercase text-[11px] tracking-[0.18em] text-white/80">
                #1 Motorbike Care App
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Quản lý xe
              <br />
              dễ dàng với
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Verender
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-base text-white/60 max-w-md">
              Theo dõi bảo dưỡng, nhắc thay nhớt, chi phí và lịch sử sửa chữa xe
              một cách dễ dàng – tất cả ngay trên điện thoại của bạn.
            </p>

            {/* Email form */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
            <div className="pt-6">
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

          {/* RIGHT: 3D MODEL – PHÓNG TO CẢ KHUNG + XE */}
          <section className="pointer-events-none md:pointer-events-auto absolute inset-y-0 right-[-160px] flex items-center">
            <div className="relative w-[780px] sm:w-[820px] lg:w-[840px] rounded-3xl overflow-hidden bg-[#050505] shadow-[0_35px_120px_rgba(0,0,0,0.8)]">
              {/* Dark Radial Glow */}
              <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(0,0,0,0.9))] blur-3xl" />
              </div>

              {/* Kawasaki Z900 3D Model */}
              <div className="relative z-[5] flex items-center justify-center py-8">
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
            </div>
          </section>
        </div>
      </main>

      {/* SCROLL XUỐNG DƯỚI MỚI THẤY PHẦN NÀY */}
      <HowItWorksSection />

      <DidYouKnowSection />

      {/* SCROLL XUỐNG NỮA: PRICING */}
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

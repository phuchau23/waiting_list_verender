// src/components/PricingSection.tsx
"use client";

export default function PricingSection() {
  return (
    <section className="border-t border-white/10 bg-gradient-to-b from-[#050505] via-[#050505] to-[#020202]">
      <div className="mx-auto max-w-5xl px-4 lg:px-0 py-16 lg:py-24 text-center">
        <div className="pricing-title mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
            Chọn kế hoạch của bạn
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
            Chọn gói phù hợp với nhu cầu của bạn – bắt đầu miễn phí và nâng cấp
            khi cần thêm tính năng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* BASIC */}
          <div className="pricing-card rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">
                Gói miễn phí
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₫0</span>
                <span className="text-xs text-white/50">/tháng</span>
              </div>
              <p className="text-xs text-white/55">Dành cho người dùng mới.</p>

              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>· Theo dõi 1 xe</li>
                <li>· Nhắc lịch thay nhớt cơ bản</li>
                <li>· Lưu lịch sử sửa chữa</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors">
              Bắt đầu miễn phí
            </button>
          </div>

          {/* STANDARD */}
          <div className="pricing-card rounded-3xl border border-emerald-400/60 bg-[#0f1515] px-6 py-12 text-left flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.9)] scale-[1.03]">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-emerald-400/10 border border-emerald-400/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                Recommended
              </p>
              <h3 className="text-base font-semibold text-white">
                Gói Standard
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₫79.000</span>
                <span className="text-xs text-white/50">/tháng</span>
              </div>
              <p className="text-xs text-white/65">
                Phù hợp cho đa số người dùng, quản lý nhiều xe.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-white/80">
                <li>· Theo dõi tới 3 xe</li>
                <li>· Nhắc bảo dưỡng nâng cao (lốp, phanh, lọc gió...)</li>
                <li>· Ghi lại chi phí, thống kê theo tháng</li>
                <li>· Sao lưu dữ liệu trên cloud</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-300 transition-colors">
              Chọn gói Standard
            </button>
          </div>

          {/* PREMIUM */}
          <div className="pricing-card rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">
                Gói Premium
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">₫149.000</span>
                <span className="text-xs text-white/50">/tháng</span>
              </div>
              <p className="text-xs text-white/55">
                Cho biker chơi lớn, nhiều xe và nhiều chuyến đi.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>· Theo dõi không giới hạn số xe</li>
                <li>· Nhắc bảo dưỡng tuỳ chỉnh sâu</li>
                <li>· Xuất báo cáo chi phí PDF/Excel</li>
                <li>· Hỗ trợ ưu tiên qua chat</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors">
              Chọn gói Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/PricingSection.tsx
"use client";

export default function PricingSection() {
  return (
    <section className="border-t border-red-100 bg-gradient-to-b from-gray-50 via-red-50/10 to-gray-50">
      <div className="mx-auto max-w-5xl px-4 lg:px-0 py-16 lg:py-24 text-center">
        <div className="pricing-title mb-10">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Pricing</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-gray-800">Chọn kế hoạch của bạn</h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chọn gói phù hợp với nhu cầu của bạn – bắt đầu miễn phí và nâng cấp khi cần thêm tính năng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {/* BASIC */}
          <div className="pricing-card rounded-3xl border border-red-100 bg-white px-6 py-10 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Gói miễn phí</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">₫0</span>
                <span className="text-xs text-gray-500">/tháng</span>
              </div>
              <p className="text-xs text-gray-600">Dành cho người dùng mới.</p>

              <ul className="mt-4 space-y-2 text-xs text-gray-600">
                <li>· Theo dõi 1 xe</li>
                <li>· Nhắc lịch thay nhớt cơ bản</li>
                <li>· Lưu lịch sử sửa chữa</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full border border-red-100 bg-red-50/50 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 transition-colors">
              Bắt đầu miễn phí
            </button>
          </div>

          {/* STANDARD */}
          <div className="pricing-card pricing-card--primary rounded-3xl border-2 border-red-400 bg-red-50/50 px-6 py-12 text-left flex flex-col justify-between shadow-[0_20px_80px_rgba(239,68,68,0.15)] scale-[1.03]">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-red-500 border border-red-400 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Recommended
              </p>
              <h3 className="text-base font-semibold text-gray-800">Gói Standard</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">₫19.000</span>
                <span className="text-xs text-gray-500">/tháng</span>
              </div>
              <p className="text-xs text-gray-700">Phù hợp cho đa số người dùng, quản lý nhiều xe.</p>

              <ul className="mt-4 space-y-2 text-xs text-gray-700">
                <li>· Theo dõi tới 3 xe</li>
                <li>· Nhắc bảo dưỡng nâng cao (lốp, phanh, lọc gió...)</li>
                <li>· Ghi lại chi phí, thống kê theo tháng</li>
                <li>· Sao lưu dữ liệu trên cloud</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20">
              Chọn gói Standard
            </button>
          </div>

          {/* PREMIUM */}
          <div className="pricing-card rounded-3xl border border-red-100 bg-white px-6 py-10 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">Gói Premium</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">₫39.000</span>
                <span className="text-xs text-gray-500">/tháng</span>
              </div>
              <p className="text-xs text-gray-600">Cho biker chơi lớn, nhiều xe và nhiều chuyến đi.</p>

              <ul className="mt-4 space-y-2 text-xs text-gray-600">
                <li>· Theo dõi không giới hạn số xe</li>
                <li>· Nhắc bảo dưỡng tuỳ chỉnh sâu</li>
                <li>· Xuất báo cáo chi phí PDF/Excel</li>
                <li>· Hỗ trợ ưu tiên qua chat</li>
              </ul>
            </div>

            <button className="mt-8 inline-flex items-center justify-center rounded-full border border-red-100 bg-red-50/50 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 transition-colors">
              Chọn gói Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

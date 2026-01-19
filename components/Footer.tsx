"use client";

export default function Footer() {
  return (
    <footer className="border-t border-red-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.6fr] gap-10 md:gap-8 items-start">
          {/* Brand + intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center text-xs font-bold text-white">
                V
              </div>
              <span className="text-lg font-semibold text-gray-800">Verender</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 max-w-xs leading-relaxed">
              Verender giúp bạn theo dõi bảo dưỡng, chi phí và lịch sử sửa chữa
              cho từng chiếc xe – đơn giản và trực quan.
            </p>

            {/* Store badges (placeholder) */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="h-9 px-4 rounded-lg border border-red-100 bg-red-50/50 text-[11px] text-gray-700 flex items-center gap-2">
                <span className="text-base">▶</span>
                <span className="leading-tight text-left">
                  <span className="block text-[9px] uppercase tracking-[0.16em] text-gray-500">
                    Get it on
                  </span>
                  <span className="block text-xs font-medium">Google Play</span>
                </span>
              </button>
              <button className="h-9 px-4 rounded-lg border border-red-100 bg-red-50/50 text-[11px] text-gray-700 flex items-center gap-2">
                <span className="text-base"></span>
                <span className="leading-tight text-left">
                  <span className="block text-[9px] uppercase tracking-[0.16em] text-gray-500">
                    Download on the
                  </span>
                  <span className="block text-xs font-medium">App Store</span>
                </span>
              </button>
            </div>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Dịch vụ</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>Theo dõi bảo dưỡng</li>
              <li>Nhắc thay nhớt</li>
              <li>Quản lý chi phí</li>
              <li>Lịch sử sửa chữa</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Công ty</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>Về Verender</li>
              <li>Blog & tips bảo dưỡng</li>
              <li>Liên hệ</li>
            </ul>
          </div>

          {/* Newsletter + social */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Nhận thông tin mới nhất
              </h4>
              <p className="text-xs md:text-sm text-gray-600 mb-3">
                Nhập email để nhận mẹo chăm xe và cập nhật tính năng mới.
              </p>

              <div className="flex items-stretch gap-2">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 rounded-full border border-red-100 bg-red-50/50 px-4 py-2 text-xs md:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:border-transparent"
                />
                <button className="rounded-full px-4 md:px-5 py-2 text-xs md:text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-2">
                Kết nối với chúng tôi:
              </p>
              <div className="flex gap-3 text-gray-700 text-lg">
                <button className="h-8 w-8 rounded-full border border-red-100 flex items-center justify-center hover:bg-red-50/50">
                  ⓕ
                </button>
                <button className="h-8 w-8 rounded-full border border-red-100 flex items-center justify-center hover:bg-red-50/50">
                  ⓘ
                </button>
                <button className="h-8 w-8 rounded-full border border-red-100 flex items-center justify-center hover:bg-red-50/50">
                  🐦
                </button>
                <button className="h-8 w-8 rounded-full border border-red-100 flex items-center justify-center hover:bg-red-50/50">
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 border-t border-red-100 text-center">
          <p className="text-[11px] text-gray-500">
            Copyright © {new Date().getFullYear()} Verender. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

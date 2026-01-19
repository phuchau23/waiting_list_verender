// src/components/HowItWorksSection.tsx
"use client";

export default function HowItWorksSection() {
  return (
    <section className="relative border-t border-red-100 bg-gray-50 pt-7">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/bg-how.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gray-50/90" />

      <div className="relative container mx-auto max-w-5xl px-4 lg:px-0 py-16 lg:py-24">
        <div className="text-center mb-12 how-title">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Process
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-gray-800">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="how-item text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-full border border-red-200 bg-red-50/50 flex items-center justify-center text-sm font-semibold text-red-500">
              1
            </div>
            <h3 className="font-semibold text-gray-800">Đăng kí</h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-[240px] mx-auto leading-relaxed">
              Đăng ký tài khoản Verendar và thêm chiếc xe đầu tiên của bạn.
            </p>
          </div>

          <div className="how-item text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-full border border-red-200 bg-red-50/50 flex items-center justify-center text-sm font-semibold text-red-500">
              2
            </div>
            <h3 className="font-semibold text-gray-800">Thêm xe của bạn</h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-[240px] mx-auto leading-relaxed">
              Nhập thông tin xe, lịch bảo dưỡng, số km và thời gian nhắc nhở.
            </p>
          </div>

          <div className="how-item text-center space-y-4">
            <div className="mx-auto h-10 w-10 rounded-full border border-red-200 bg-red-50/50 flex items-center justify-center text-sm font-semibold text-red-500">
              3
            </div>
            <h3 className="font-semibold text-gray-800">Thành công</h3>
            <p className="text-xs md:text-sm text-gray-600 max-w-[260px] mx-auto leading-relaxed">
              Ứng dụng tự động nhắc thay nhớt, kiểm tra định kỳ và lưu lại chi
              phí sử dụng xe cho bạn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// app/features/page.tsx
import { Droplets, Wrench, Wallet, History } from "lucide-react";

const features = [
  {
    id: 1,
    label: "Theo dõi bảo dưỡng",
    icon: Wrench,
    badge: "Giữ xe luôn trong tình trạng tốt",
    description: "Ghi lại và nhắc bạn các mốc bảo dưỡng quan trọng dựa trên số km và thời gian sử dụng.",
    points: [
      "Lưu lịch bảo dưỡng gần nhất cho từng xe",
      "Gợi ý mốc bảo dưỡng tiếp theo",
      "Giảm rủi ro hỏng vặt giữa đường",
    ],
  },
  {
    id: 2,
    label: "Nhắc thay nhớt",
    icon: Droplets,
    badge: "Không còn quên kỳ thay nhớt",
    description: "Tự động nhắc thay nhớt theo quãng đường hoặc thời gian, phù hợp từng loại nhớt.",
    points: [
      "Thiết lập ngưỡng km hoặc số tháng",
      "Thông báo trước kỳ thay để bạn chủ động sắp xếp",
      "Bảo vệ động cơ, chạy êm và tiết kiệm xăng",
    ],
  },
  {
    id: 3,
    label: "Quản lý chi phí",
    icon: Wallet,
    badge: "Biết rõ xe tốn bao nhiêu tiền",
    description: "Theo dõi mọi khoản chi cho xe: xăng, sửa chữa, nâng cấp… dưới dạng bảng và biểu đồ.",
    points: [
      "Ghi nhanh chi phí chỉ trong vài thao tác",
      "Tổng hợp theo tuần/tháng/năm",
      "Giúp bạn tối ưu ngân sách chăm xe",
    ],
  },
  {
    id: 4,
    label: "Lịch sử sửa chữa",
    icon: History,
    badge: "Nhìn lại toàn bộ hành trình của xe",
    description: "Lưu lại chi tiết mỗi lần sửa chữa để dễ tra cứu khi cần bảo hành hoặc bán lại.",
    points: [
      "Lưu ngày sửa, hạng mục và chi phí",
      "Ghi chú garage/thợ sửa uy tín",
      "Hỗ trợ đánh giá tình trạng xe theo thời gian",
    ],
  },
];

export default function FeaturesSection() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 opacity-30 blur-3xl">
          <div className="absolute -top-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.15),_transparent_60%)]" />
        </div>

        <main className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 lg:py-24">
          {/* Breadcrumb / small label */}
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-red-500">Tính năng</div>

          {/* Hero section */}
          <section className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]">
                Quản lý xe máy thông minh với <span className="text-red-500">Verendar</span>
              </h1>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                Tất cả thông tin về bảo dưỡng, chi phí và sửa chữa được gom lại trong một ứng dụng. Bạn chỉ cần tập
                trung chạy xe, phần còn lại để Verendar lo.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-600">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/50 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Theo dõi nhiều xe trong một tài khoản
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/50 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  Thiết kế cho người dùng Việt Nam
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-gray-600">
              <div className="rounded-2xl border border-red-100 bg-red-50/50 px-4 py-3">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-gray-500">Lợi ích chính</p>
                <ul className="mt-2 space-y-1.5">
                  <li>✔ Không quên lịch thay nhớt & bảo dưỡng</li>
                  <li>✔ Nắm rõ chi phí vận hành xe</li>
                  <li>✔ Dễ dàng xem lại lịch sử sửa chữa</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features grid */}
          <section className="space-y-6">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Bộ tính năng chính</h2>
              <p className="text-sm text-gray-600">
                Mỗi tính năng được thiết kế xoay quanh câu hỏi:{" "}
                <span className="text-red-500">&quot;Làm sao để bạn chăm xe đơn giản mà vẫn hiệu quả?&quot;</span>
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.id}
                    className="group relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-b from-white via-red-50/20 to-white p-6 shadow-[0_24px_80px_rgba(239,68,68,0.08)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-red-300"
                  >
                    {/* Subtle highlight line */}
                    <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-4">
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50/50">
                        <div className="absolute inset-0 rounded-2xl bg-red-100/30 blur-md" />
                        <Icon className="relative h-5 w-5 text-red-500" />
                      </div>

                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2">
                          <h3 className="text-base font-semibold sm:text-lg">{feature.label}</h3>
                        </div>
                        <p className="inline-flex rounded-full bg-red-50/50 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-red-500">
                          {feature.badge}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-gray-600">{feature.description}</p>

                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      {feature.points.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      <span>Phù hợp cho mọi loại xe số, tay ga, côn tay.</span>
                      <span className="text-red-500/90 group-hover:text-red-600">
                        Sắp ra mắt trên iOS & Android
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

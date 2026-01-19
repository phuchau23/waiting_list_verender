// app/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/common/header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Sổ tay kỹ thuật số",
      description:
        "Dễ dàng ghi lại mọi lần thay nhớt, sửa chữa lớn và chi phí nhiên liệu trong một nơi duy nhất, có tổ chức. Không còn giấy tờ hay bảng tính lộn xộn nữa.",
    },
    {
      title: "Nhắc nhở thông minh",
      description:
        "Đặt nhắc nhở tự động, cá nhân hóa dựa trên số km hoặc thời gian đã trôi qua kể từ lần bảo dưỡng cuối cùng.",
    },
    {
      title: "Gợi ý gara & loại nhớt phù hợp",
      description: "Nhận đề xuất các gara uy tín tại TP.HCM và loại nhớt phù hợp cho mẫu xe máy cụ thể của bạn.",
    },
    {
      title: "Trực quan hóa chi phí",
      description:
        "Xem dữ liệu chi tiêu hàng tháng một cách rõ ràng, giúp bạn quản lý ngân sách tốt hơn và xác định các khu vực có thể cắt giảm chi phí.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  };

  const fadeZoom = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1 }, // chỉ giữ giá trị animate
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
      <Header />

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="min-h-screen bg-gray-50 text-gray-800 mt-15 -mb-12"
      >
        {/* Header */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
          {/* Background Image với overlay tối + hiệu ứng blur nhẹ */}
          <div className="absolute inset-0">
            <Image
              src="/office.jpg" // thay bằng ảnh văn phòng thực tế của bạn
              alt="QuInTech Office"
              fill
              className="object-cover opacity-15"
              priority
            />
            <div className="absolute inset-0 bg-gray-50/85 backdrop-blur-xs" />
          </div>

          {/* Nội dung chính */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 text-center lg:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate="show" viewport={{ once: false, amount: 0.3 }}>
              {/* Logo + Tên công ty */}
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none
               bg-linear-to-r from-red-500 via-red-400 to-red-300
               bg-clip-text text-transparent"
              >
                Verendar
              </h1>

              {/* Tiêu đề phụ */}
              <div className="max-w-4xl">
                <motion.h2
                  variants={fadeUp}
                  custom={0.2}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6"
                >
                  Take care of your bike like your wallet.
                  <br />
                </motion.h2>

                {/* Mô tả ngắn */}
                <motion.p variants={fadeZoom} className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Ứng dụng nhắc bảo dưỡng xe máy dành cho người Việt hiện đại.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeUp}
                  custom={0.4}
                  className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                >
                  <Link href="/" className="inline-block">
                    <span className="group px-8 py-5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-md shadow-red-500/20 cursor-pointer">
                      Get Started
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Hiệu ứng ánh sáng nhẹ góc dưới */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-linear-to-t from-red-400/15 via-transparent to-transparent pointer-events-none" />
        </section>

        {/* OUR MISSION SECTION */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center"
            >
              {/* Tiêu đề "Our Mission" màu đỏ gradient đẹp */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="bg-linear-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>

              {/* Đoạn mô tả */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-10 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed"
              >
                Cách mạng hóa cách thức vận hành của doanh nghiệp thông qua công nghệ tiên tiến, cung cấp giải pháp toàn
                diện nhằm tối ưu hóa mọi mặt hoạt động kinh doanh.
              </motion.p>
            </motion.div>
          </div>
        </section>
        {/* COMPREHENSIVE TECHNOLOGY SOLUTIONS SECTION */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                <span className="bg-linear-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
                  Verendar Digital Mechanic
                </span>
              </h2>
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-100 hover:border-red-300">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">{service.title}</h3>
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* FINAL CTA SECTION - RED BOLD */}
        <section className="py-24 lg:py-32 bg-linear-to-b from-red-500 via-red-400 to-red-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-10"
            >
              {/* Tiêu đề chính */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight">
                <span className="text-white">Verendar</span>
              </h2>

              {/* Mô tả phụ */}
              <p className="text-xl md:text-2xl text-white font-medium max-w-4xl mx-auto">
                Verendar giúp bạn theo dõi toàn bộ lịch sử bảo dưỡng, nhắc thay nhớt – linh kiện đúng hạn và gợi ý tiệm
                sửa xe uy tín gần bạn. Tất cả gói gọn trong một ứng dụng.
              </p>

              {/* Nút CTA nổi bật */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <button className="group relative inline-flex items-center gap-4 px-10 py-6 bg-white text-red-500 text-xl font-bold rounded-full shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
                  Contact Us Now
                  <svg
                    className="w-7 h-7 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Hiệu ứng ánh sáng nhẹ ở dưới */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white/15 to-transparent pointer-events-none" />
        </section>
      </motion.div>
      <Footer />
    </>
  );
}

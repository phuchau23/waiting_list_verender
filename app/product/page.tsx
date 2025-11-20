"use client";

import Header from "@/components/common/header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductPage() {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-black ">
        {/* ==================== PHẦN CŨ - KHÔNG ĐỘNG GÌ HẾT ==================== */}
        <section className="w-full flex items-center bg-black -mt-8">
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }} // <--- đây
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="mt-50 text-5xl font-bold text-white">About Apps</h1>
              <div className="space-y-3">
                <p className="text-2xl font-semibold text-white"> Nhắc thay nhớt & linh kiện</p>
                <ul className="text-gray-300 space-y-2 text-lg">
                  <li>• Ứng dụng tự động nhắc bạn khi gần đến hạn thay nhớt</li>
                  <li>• Khi cần kiểm tra phanh, bugi, lốp, lọc gió</li>
                  <li>• Lịch sử bảo dưỡng từng lần</li>
                  <li>• Ước lượng tuổi linh kiện dựa trên số km bạn nhập</li>
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 px-8 py-4 bg-white text-black rounded-full text-lg font-bold shadow-lg"
              >
                Đăng ký ngay!
              </motion.button>
            </motion.div>

            {/* RIGHT PHONE WITH LABELS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center items-start gap-8"
            >
              {/* HÌNH NỀN PHÍA SAU (Bên trái hoặc phải) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="mt-50 relative rounded-3xl shadow-xl"
              >
                <Image src="/phoneimage.png" alt="Background" width={230} height={550} className="rounded-3xl" />

                {/* bóng cho điện thoại 1 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 w-3/4 h-12 bg-white/20 rounded-full blur-xl z-0"></div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl shadow-xl mt-34"
              >
                <Image src="/phone1.png" alt="App preview" width={230} height={550} className="rounded-3xl shadow-xl" />

                {/* bóng cho điện thoại 2 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 w-3/4 h-12 bg-white/30 rounded-full blur-xl z-0"></div>
              </motion.div>

              {/* <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="absolute -left-10 top-20 bg-black text-gray-800 px-4 py-2 rounded-xl shadow-md"
            >
              Không cần tự nhớ
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7 }}
              className="absolute -left-10 bottom-20 bg-purple-200 text-purple-800 px-4 py-2 rounded-xl shadow-md"
            >
              Xe ít hỏng vặt
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.9 }}
              className="absolute -right-10 top-24 bg-blue-200 text-blue-800 px-4 py-2 rounded-xl shadow-md"
            >
              Tăng độ bền xe
            </motion.div> */}
            </motion.div>
          </div>
        </section>

        {/* ==================== SECTION MỚI - CHUẨN HÌNH BẠN GỬI 100% ==================== */}

        <section className="w-full min-h-screen flex items-center bg-black">
          <div className="max-w-7xl mx-auto px-6 py-32">
            {/* 3 cột: Hình trái – Chữ giữa – Hình phải */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              {/* Cột trái */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9 }}
                className="flex justify-center"
              >
                <Image
                  src="/phone-chi-phi.png"
                  alt="Chi phí bảo dưỡng"
                  width={300}
                  height={740}
                  className="rounded-3xl shadow-2xl"
                />
              </motion.div>

              {/* Cột giữa: Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="-mt-2 space-y-10 text-center lg:text-left"
              >
                {" "}
                <h1 className="inline-block text-8xl md:text-5xl font-bold text-gray-200">About Apps</h1>
                <h2 className="text-4xl md:text-2xl font-bold text-gray-100 leading-tight">
                  Theo dõi chi phí bảo dưỡng
                </h2>
                <ul className="space-y-6 text-xl md:text-xl text-gray-100">
                  {[
                    "Tự lưu & phân loại chi phí",
                    "So sánh giá bạn trả với thị trường",
                    "Cảnh báo khi bị tính phí cao",
                    "Hiển thị biểu đồ chi phí theo tháng",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                      className="flex items-start gap-3 justify-center lg:justify-start"
                    >
                      <span className="text-white text-4xl leading-none">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Cột phải */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="space-y-8 flex flex-col items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5 }}
                >
                  <Image
                    src="/phone-thong-ke1.png"
                    alt="Thống kê"
                    width={520}
                    height={2040}
                    style={{ width: "360px", height: "460px" }}
                    className="rounded-3xl shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full min-h-screen flex items-center bg-black">
          <div className="w-full bg-black py-32">
            <div className="max-w-7xl mx-auto px-6">
              {/* Layout 3 phần: Phone trái - Text giữa - Phone phải */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Phone bên trái */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.9 }}
                  className="flex justify-center lg:justify-end"
                >
                  <Image
                    src="/phone-habitt.png" // thay bằng ảnh điện thoại "STICK to your habits"
                    alt="Habit tracking"
                    width={500}
                    height={800}
                    className="rounded-3xl shadow-2xl"
                  />
                </motion.div>

                {/* Nội dung giữa */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-8"
                >
                  <h2 className="text-4xl md:text-2xl font-bold text-white">Lịch sử sửa chữa & cảnh báo hỏng</h2>

                  <ul className="space-y-5 text-lg md:text-xl text-gray-200">
                    {[
                      "Lưu lịch sử sửa chữa",
                      "Theo dõi km & tuổi thọ linh kiện",
                      "Cảnh báo sớm khi sắp hỏng (phanh, lốp, ắc quy...)",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                        className="flex items-center gap-4"
                      >
                        <span className="text-white text-3xl">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Phone bên phải (danh sách lịch sử sửa chữa) */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="flex justify-center lg:justify-start relative"
                >
                  <Image src="/phone-his.png" alt="Lịch sử sửa chữa" width={220} height={280} />

                  {/* Đoạn văn nhỏ lệch phải dưới chân hình */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0, x: -100 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute right-0 bottom-[-150px] w-[320px] text-left text-gray-200 text-sm leading-relaxed"
                  >
                    <p>
                      • Ở SỐ MỘT CÓ THỂ THAY THẾ KIỂU NHƯ TÍCH SỐ NGÀY BẢO NHIỄU NGÀY ĐÃ ĐI SỬA CHỮA RỒI WEB SẼ TỰ ĐỘNG
                      CẬP NHẬT TÍCH NGÀY
                      <br />
                      ĐI SỬA CHỮA RỒI KẾT HỢP LẠI TẠO NÊN THÔNG BÁO CÒN NHIỀU NGÀY PHẢI SỬA XE
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

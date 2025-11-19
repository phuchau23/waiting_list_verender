// app/page.tsx
"use client";

import Image from "next/image";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const categories = [
    "Bảo dưỡng định kỳ",
    "Sửa chữa động cơ",
    "Hệ thống điện",
    "Phanh và an toàn",
    "Lốp và bánh xe",
    "Hệ thống làm mát",
    "Phụ tùng xe",
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
        className="min-h-screen bg-black text-white mt-15 -mb-12"
      >
        {/* Header */}
        <motion.header
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          whileInView="show"
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="px-6 py-8 lg:px-20"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold tracking-tighter">BLOG</h1>
          </div>
        </motion.header>

        {/* Hero Featured Post */}
        <motion.section
          variants={fadeZoom}
          initial="hidden"
          animate="show"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="px-6 lg:px-20 mb-12"
        >
          <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/5">
            <div className="grid lg:grid-cols-2">
              <motion.div
                variants={fadeUp}
                custom={0.05}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                className="p-12 lg:p-20 flex flex-col justify-center"
              >
                <span className="text-emerald-400 text-sm font-medium mb-4">Category • Verendar 1</span>
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  Những Giải Pháp AI Quản Lý Xe <br /> Tốt Nhất!
                </h2>
                <button
                  onClick={() => router.push("/blog/newblog")}
                  className="self-start flex items-center gap-3 text-cyan-300 hover:gap-5 transition-all"
                >
                  <span className="font-medium">Read More</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </motion.div>

              <motion.div
                variants={fadeZoom}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                className="relative h-96 lg:h-auto"
              >
                {/* giữ lớp gradient & mờ như thiết kế */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
                <Image src="/blog5.png" alt="Home gym" fill className="object-cover" />
                <div className="absolute top-8 left-8 w-16 h-16 bg-orange-500 rounded-full blur-xl opacity-70" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Grid Posts */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          viewport={{ once: false }}
          className="px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Post 1 */}
          <motion.article
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-linear-to-br from-emerald-400/10 to-transparent border border-white/5 hover:border-emerald-400/30 transition-all"
          >
            <div className="p-8">
              <span className="text-emerald-400 text-xs font-medium">Category • Verendar 2</span>
              <h3 className="text-3xl font-bold mt-4 mb-6 leading-tight">
                Thay nhớt quá sớm hay quá trễ đều hại xe – vì sao?
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">Sai lầm khi thay dầu nhớt xe máy ...</p>

              <div className="flex flex-col gap-4">
                <a
                  href="https://thanhnien.vn/3-sai-lam-khi-thay-dau-nhot-xe-may-phan-dong-nguoi-viet-mac-phai-185231107121546968.htm"
                  className="text-cyan-300 text-sm flex items-center gap- hover:gap-3 transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  3 sai lầm khi thay dầu nhớt xe máy (Thanh Niên)
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="https://plo.vn/giam-tuoi-tho-xe-hao-xang-cai-gia-phai-tra-khi-quen-thay-nhot-dinh-ky-post826636.html"
                  className="text-cyan-300 text-sm flex items-center gap- hover:gap-3 transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  Giá phải trả khi quên thay nhớt định kỳ (PLO)
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="https://vtcnews.vn/sai-lam-khi-thay-dau-nhot-xe-may-ar835758.html"
                  className="text-cyan-300 text-sm flex items-center gap- hover:gap-3 transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sai lầm khi thay dầu nhớt xe máy (VTC News)
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="relative h-80"
            >
              <Image
                src="/blog2.jpg"
                alt="Running"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.article>

          {/* Post 2 */}
          <motion.article
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-linear-to-br from-sky-400/10 to-transparent border border-white/5 hover:border-sky-400/30 transition-all"
          >
            <div className="relative w-full">
              <Image
                src="/blog3.jpg"
                alt="Overcoming laziness"
                width={1200}
                height={800}
                className="rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-8">
              <span className="text-sky-400 text-xs font-medium">Category • Verendar 3</span>
              <h3 className="text-3xl font-bold mt-4">Vì Sao Nhớt Cũ Lại Làm Xe Hao Xăng Hơn?</h3>
            </div>
          </motion.article>

          {/* Post 3 */}
          <motion.article
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            className="group cursor-pointer rounded-3xl overflow-hidden bg-linear-to-br from-purple-500/10 to-transparent border border-white/5 hover:border-purple-400/30 transition-all"
          >
            <div className="relative w-full">
              <Image
                src="/blog4.jpg"
                alt="Training styles"
                width={1200}
                height={800}
                className="rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
                <span>5 Min</span>
                <span>•</span>
                <span>22 Feb</span>
              </div>
              <span className="text-purple-400 text-xs font-medium">Category • Verendar 4</span>
              <h3 className="text-3xl font-bold mt-4 leading-tight">
                Làm sao để khắc phục tình trạng xe máy dễ hư hỏng vào mùa mưa?
              </h3>
            </div>
          </motion.article>
        </motion.section>

        {/* Categories */}
        <motion.section
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="px-6 lg:px-20 mt-20 mb-12 py-12"
        >
          <div className="flex flex-wrap gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.88 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.45, delay: i * 0.04 } },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                className={`px-6 py-3 rounded-full border transition-all ${
                  i % 3 === 0
                    ? "bg-emerald-400/20 border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/30"
                    : i % 3 === 1
                    ? "bg-cyan-300/10 border-cyan-300/30 text-cyan-300 hover:bg-cyan-300/20"
                    : "bg-sky-400/10 border-sky-400/30 text-sky-300 hover:bg-sky-400/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.section>
      </motion.div>
      <Footer />
    </>
  );
}

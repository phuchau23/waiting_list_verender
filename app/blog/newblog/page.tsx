"use client";

import Header from "@/components/common/header";
import Footer from "@/components/Footer";
import { easeInOut, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        ease: easeInOut, // dùng easing function
      },
    }),
  };

  const content = [
    "Thay nhớt cho xe máy định kỳ luôn là yếu tố quan trọng giúp xe hoạt động trong tình trạng tốt nhất cũng như có thể phát hiện các hư hỏng để từ đó có thể kịp thời sửa chữa.",
    "Xe có dấu hiệu chạy yếu hơn bình thường: Dầu nhớt xe máy là chất xúc tác bôi trơn các chi tiết động cơ, nếu không thường xuyên thay nhớt khi đó nhớt bên trong động cơ rất có thể bị hao hút hoặc mất đi tính năng bôi trơn sẽ làm xe chạy ì ạch, yếu hơn, khó để tăng tốc hơn.",
    "Động cơ xe phát ra tiếng kêu lạ: Một trong những dấu hiệu xe máy cần thay nhớt ngay lập tức dễ dàng nhận biết là khi trong quá trình vận hành động cơ thường xuyên phát tiếng kêu lạ, đặc biệt là khi bạn nhấn ga càng mạnh, nó sẽ càng kêu to.",
    "Xe chạy tốn xăng hơn lúc bình thường: Xe chạy hao xăng là cách nhận biết khi nào xe máy cần thay nhớt ngay bởi khi quên thay nhớt lúc này các chi tiết máy không được bôi trơn, dẫn đến cần tiêu tốn nguồn nhiên liệu nhiều hơn để đảm bảo quá trình hoạt động cho xe.",
    "Xe chạy nhanh nóng hoặc có mùi khét: Nếu xe chạy nhanh nóng, thường có mùi khét phát ra từ pô xe rất có thể đó là dấu hiệu nhận biết xe máy cần phải thay nhớt bởi lúc này xe của bạn đã hết nhớt các chi tiết động cơ sẽ không được bôi trơn và làm mát.",
    "Kiểm tra dầu nhớt xe máy nhưng không thấy: Thường xuyên kiểm tra que thăm nhớt là một trong những cách nhận biết xe máy cần thay nhớt trực quan nhất. Nếu phát hiện lượng nhớt bên trong đã bị hụt hay đổi màu đen thì lúc này bạn nên tiến hành thay nhớt mới cho xe.",
  ];

  return (
    <>
      <Header />

      <motion.div
        initial="hidden"
        animate="show"
        className="min-h-screen bg-black text-white px-6 lg:px-20 py-12 mt-15"
      >
        {/* Back button */}
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 px-6 py-3 border border-white/20 rounded-full text-white/80 hover:bg-white/5 transition"
        >
          ← Back
        </motion.button>

        {/* Hero Image + Title */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="relative mb-12 rounded-3xl overflow-hidden"
        >
          {/* Video */}
          <video
            src="/video.mp4" // đường dẫn video trong public
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-3xl"
          />

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="absolute bottom-8 left-8 text-5xl font-bold text-white leading-tight z-99999"
          >
            Các dấu hiệu nhận biết khi nào cần thay nhớt <br /> xe máy lập tức
          </motion.h1>
        </motion.div>

        {/* Content */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false }} className="space-y-8">
          {content.map((paragraph, i) => (
            <motion.p key={i} variants={fadeUp} custom={i} className="text-gray-300 text-lg leading-relaxed">
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Optional: highlight important tip with image */}
        <motion.div
          variants={fadeUp}
          custom={content.length}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="relative mt-12 rounded-2xl overflow-hidden"
        >
          <Image src="/blog3.jpg" alt="Engine oil" width={1500} height={600} className="object-cover rounded-2xl" />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <motion.span
            variants={fadeUp}
            custom={content.length + 1}
            className="absolute bottom-6 left-6 text-2xl font-semibold text-white z-20"
          >
            Thay dầu nhớt chính hãng ở đâu uy tín, giá tốt?
          </motion.span>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
}

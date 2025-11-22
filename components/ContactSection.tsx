// src/components/ContactSection.tsx
"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate đã chọn 1 trong 3 mô tả
    if (!description) {
      showToast("error", "Vui lòng chọn một nội dung mô tả.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Email", email);
      // Các field còn lại không dùng, truyền rỗng (BE coi như null)
      formData.append("FirstName", "");
      formData.append("LastName", "");
      formData.append("PhoneNumber", "");
      formData.append("WishMessage", description);

      const res = await fetch(
        "https://waitinglistweb.onrender.com/api/waiting-list",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data?.id?.statusCode === 200) {
        showToast("success", "Đăng ký waiting list thành công. Cảm ơn bạn!");

        // reset form
        setEmail("");
        setDescription("");
      } else {
        showToast(
          "error",
          data?.id?.message || "Có lỗi xảy ra, vui lòng thử lại sau ít phút."
        );
      }
    } catch (error) {
      console.error(error);
      showToast(
        "error",
        "Không thể gửi yêu cầu. Vui lòng kiểm tra kết nối và thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* TOAST LAYER */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ y: -40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed top-6 left-1/2 z-[60] -translate-x-1/2"
          >
            <div
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-lg
                ${
                  toast.type === "success"
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                    : "border-red-400/40 bg-red-400/10 text-red-100"
                }`}
            >
              <div
                className={`h-7 w-7 flex items-center justify-center rounded-full text-xs font-semibold
                  ${
                    toast.type === "success"
                      ? "bg-emerald-400 text-black"
                      : "bg-red-400 text-black"
                  }`}
              >
                {toast.type === "success" ? "✓" : "!"}
              </div>
              <p className="max-w-xs">{toast.message}</p>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="ml-1 text-xs uppercase tracking-wide opacity-70 hover:opacity-100"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="relative py-20 px-6 md:px-8 lg:px-12">
        {/* Gradient glow background */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="h-64 w-[70%] max-w-4xl bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_transparent_60%)] opacity-60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/40 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)] shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: TEXT / DESCRIPTION */}
            <div className="contact-left flex flex-col justify-between gap-8 p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-white/8">
              <div className="space-y-6">
                <button className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-white/70 uppercase">
                  Contact
                </button>

                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                    Get in touch
                    <br />
                    with us!
                  </h2>
                  <p className="text-sm md:text-base text-white/60 max-w-md">
                    Có câu hỏi, góp ý hay ý tưởng tính năng mới cho Verender?
                    Hãy gửi cho chúng tôi – đội ngũ luôn sẵn sàng lắng nghe và
                    đồng hành cùng hành trình chăm xe của bạn.
                  </p>
                </div>
              </div>

              <div>
                <button className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(16,185,129,0.45)] hover:bg-emerald-300 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="contact-form p-8 md:p-10 lg:p-12">
              <h3 className="mb-6 text-lg font-semibold text-white">
                Liên hệ với chúng tôi
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
                    LÝ DO
                  </label>

                  <div className=" pt-1.5 grid grid-cols-1 gap-3">
                    {[
                      "Tôi thích về việc tiện lợi của nền tảng",
                      "Tôi thấy có nhiều tính năng rất hay",
                      "Tôi thấy sự sáng tạo của nền tảng",
                    ].map((txt) => (
                      <button
                        key={txt}
                        type="button"
                        onClick={() => setDescription(txt)}
                        className={`w-full text-left rounded-xl px-4 py-3 text-sm transition border 
                          ${
                            description === txt
                              ? "bg-emerald-400 text-black border-emerald-400"
                              : "bg-black/40 text-white/70 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(16,185,129,0.45)] hover:bg-emerald-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Đang gửi..." : "Submit"}
                  </button>
                </div>

                <p className="text-[11px] text-white/40 pt-1">
                  Bằng cách gửi form, bạn đồng ý để Verender liên hệ lại qua
                  email hoặc số điện thoại bạn cung cấp.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

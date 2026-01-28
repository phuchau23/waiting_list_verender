// src/components/ContactSection.tsx
"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactSection() {
  // ✅ Thay vì chỉ email, dùng 1 field cho Email hoặc SĐT
  const [contact, setContact] = useState("");
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

  const isValidEmail = (value: string) => {
    // đủ dùng cho FE validate
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const onlyDigits = (value: string) => value.replace(/\D/g, "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description) {
      showToast("error", "Vui lòng chọn một nội dung mô tả.");
      return;
    }

    const raw = contact.trim();
    if (!raw) {
      showToast("error", "Vui lòng nhập email hoặc số điện thoại.");
      return;
    }

    let emailToSend = "";
    let phoneToSend = "";

    if (raw.includes("@")) {
      if (!isValidEmail(raw)) {
        showToast("error", "Email không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
      emailToSend = raw;
      phoneToSend = "";
    } else {
      const digits = onlyDigits(raw);
      if (digits.length !== 10) {
        showToast("error", "Số điện thoại phải đủ 10 chữ số.");
        return;
      }

      phoneToSend = digits;

      // ✅ BE required Email, Swagger cũng cho phép số => dùng số làm Email để pass validation
      emailToSend = digits;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Email", emailToSend); // ✅ luôn có giá trị
      formData.append("PhoneNumber", phoneToSend); // ✅ lưu SĐT đúng field
      formData.append("FirstName", "");
      formData.append("LastName", "");
      formData.append("WishMessage", description);

      const res = await fetch("https://waitinglistweb.onrender.com/api/waiting-list", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data?.id?.statusCode === 200) {
        showToast("success", "Đăng ký waiting list thành công. Cảm ơn bạn!");
        setContact("");
        setDescription("");
      } else {
        showToast("error", data?.id?.message || "Có lỗi xảy ra, vui lòng thử lại sau ít phút.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Không thể gửi yêu cầu. Vui lòng kiểm tra kết nối và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* LỚP TOAST */}
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
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-lg
                ${
                  toast.type === "success"
                    ? "border-red-500/40 bg-red-50 text-red-900"
                    : "border-red-400/40 bg-red-100 text-red-900"
                }`}
            >
              <div
                className={`h-7 w-7 flex items-center justify-center rounded-full text-xs font-semibold
                  ${toast.type === "success" ? "bg-red-600 text-white" : "bg-red-500 text-white"}`}
              >
                {toast.type === "success" ? "✓" : "!"}
              </div>
              <p className="max-w-xs">{toast.message}</p>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="ml-1 text-xs uppercase tracking-wide opacity-70 hover:opacity-100"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="relative py-20 px-6 md:px-8 lg:px-12 bg-gray-50">
        {/* Nền glow dạng gradient */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="h-64 w-[70%] max-w-4xl bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.15),_transparent_60%)] opacity-50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-red-100 bg-white shadow-[0_24px_80px_rgba(239,68,68,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* TRÁI: TEXT / MÔ TẢ */}
            <div className="contact-left flex flex-col justify-between gap-8 p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-red-100">
              <div className="space-y-6">
                <button className="rounded-full border border-red-100 bg-red-50/50 px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-gray-600 uppercase">
                  Liên hệ
                </button>

                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
                    Kết nối
                    <br />
                    với chúng tôi!
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 max-w-md">
                    Có câu hỏi, góp ý hay ý tưởng tính năng mới cho Verendar? Hãy gửi cho chúng tôi – đội ngũ luôn sẵn
                    sàng lắng nghe và đồng hành cùng hành trình chăm xe của bạn.
                  </p>
                </div>
              </div>

              <div>
                <button className="inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.2)] hover:bg-red-600 transition-colors">
                  Liên hệ chúng tôi
                </button>
              </div>
            </div>

            {/* PHẢI: FORM */}
            <div className="contact-form p-8 md:p-10 lg:p-12">
              <h3 className="mb-6 text-lg font-semibold text-gray-800">Liên hệ với chúng tôi</h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.16em] text-gray-600">
                      Email hoặc số điện thoại
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      placeholder="vd: you@example.com hoặc 0901234567"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded-xl border border-red-100 bg-red-50/50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/60 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-[0.16em] text-gray-600">LÝ DO</label>

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
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-red-50/50 text-gray-700 border-red-100 hover:bg-red-50"
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
                    className="w-full md:w-auto rounded-full bg-red-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(239,68,68,0.2)] hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi"}
                  </button>
                </div>

                <p className="text-[11px] text-gray-500 pt-1">
                  Bằng cách gửi form, bạn đồng ý để Verendar liên hệ lại qua email hoặc số điện thoại bạn cung cấp.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

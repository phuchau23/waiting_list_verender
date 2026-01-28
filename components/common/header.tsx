/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const [isCompact, setIsCompact] = useState(false);
  const [open, setOpen] = useState(false); // ✅ mobile menu
  const pathname = usePathname();

  const menuItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/product" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // đóng menu mobile khi scroll sang compact
  useEffect(() => {
    if (isCompact) setOpen(false);
  }, [isCompact]);

  // đóng menu khi đổi route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        layout
        initial={false}
        animate={isCompact ? "compact" : "expanded"}
        variants={{
          expanded: {
            top: 0,
            left: 0,
            x: 0,
            width: "100%",
            height: 72,
            borderRadius: 0,
            backgroundColor: "rgba(249,250,251,0.95)",
            boxShadow: "0 1px 0 rgba(239,68,68,0.08)",
          },
          compact: {
            top: 20,
            left: "50%",
            x: "-50%",
            width: "min(100% - 3rem, 680px)",
            height: 56,
            borderRadius: 9999,
            backgroundColor: "rgba(249,250,251,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(239,68,68,0.15)",
            boxShadow: "0 8px 30px rgba(239,68,68,0.1)",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 28,
        }}
        className="
          fixed z-[999]
          backdrop-blur-xl
          flex items-center
        "
      >
        <div
          className={
            isCompact
              ? "flex w-full items-center justify-between px-4 md:px-6"
              : "mx-auto flex w-full max-w-6xl items-center justify-between px-4 md:px-6"
          }
        >
          {/* LOGO */}
          <motion.div
            layout
            animate={{ scale: isCompact ? 0.95 : 1 }}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            className="font-semibold"
          >
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo_main.png" alt="Logo" className="w-9 h-9" />
              <span
                className="bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text
                text-base font-semibold text-transparent"
              >
                Verendar
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP MENU */}
          <ul className={["hidden md:flex items-center", isCompact ? "gap-2 text-[12px]" : "gap-4 text-sm"].join(" ")}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  {active && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-full bg-red-50"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 26,
                      }}
                    />
                  )}

                  <Link
                    href={item.href}
                    className={[
                      "relative rounded-full px-4 transition-colors whitespace-nowrap",
                      isCompact ? "py-1.5" : "py-2",
                      active ? "text-red-500 font-semibold" : "text-gray-600 hover:text-red-500",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-full hover:bg-red-50 transition">
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-red-500" />
              <span className="block h-0.5 w-5 bg-red-500" />
              <span className="block h-0.5 w-5 bg-red-500" />
            </div>
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU DROPDOWN */}
      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
          closed: { opacity: 0, y: -10, pointerEvents: "none" },
        }}
        transition={{ duration: 0.2 }}
        className="
          md:hidden
          fixed top-[90px] left-1/2 -translate-x-1/2
          w-[calc(100%-2rem)]
          max-w-sm
          rounded-2xl
          bg-white/95 backdrop-blur-xl
          border border-red-100
          shadow-xl
          z-[998]
        "
      >
        <ul className="flex flex-col p-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "px-4 py-3 rounded-xl transition",
                  active ? "bg-red-50 text-red-500 font-semibold" : "text-gray-700 hover:bg-red-50",
                ].join(" ")}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}

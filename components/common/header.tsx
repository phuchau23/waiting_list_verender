/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
  const [isCompact, setIsCompact] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "About Us", href: "/about" },
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

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      layout
      initial={false}
      animate={isCompact ? "compact" : "expanded"}
      variants={{
        // 🔵 TRẠNG THÁI BAN ĐẦU – FULL WIDTH, DÍNH TOP
        expanded: {
          top: 0,
          left: 0,
          x: 0,
          width: "100%",
          height: 72,
          borderRadius: 0,
          backgroundColor: "rgba(5,5,5,0.92)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.05)",
        },

        // 🟢 TRẠNG THÁI DYNAMIC – NHỎ LẠI, TRẮNG MỜ, KHÔNG NHÁY
        compact: {
          top: 20,
          left: "50%",
          x: "-50%",
          width: "min(100% - 3rem, 680px)", // UI rộng thoáng hơn
          height: 56, // dynamic cao hơn → sang trọng hơn
          borderRadius: 9999,
          backgroundColor: "rgba(255,255,255,0.14)", // trắng nhẹ – không flash
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 8px 30px rgba(255,255,255,0.05)", // rất nhẹ → không bị nháy
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
            ? "flex w-full items-center justify-between px-6"
            : "mx-auto flex w-full max-w-6xl items-center justify-between px-6"
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
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full 
              bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-400 text-[12px] font-bold text-black"
            >
              V
            </span>
            <span
              className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 bg-clip-text 
              text-base font-semibold text-transparent"
            >
              Verender
            </span>
          </Link>
        </motion.div>

        {/* MENU */}
        <ul
          className={
            isCompact
              ? "flex items-center gap-2 text-[12px]"
              : "flex items-center gap-4 text-sm"
          }
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="relative">
                {/* highlight mềm – không nháy */}
                {active && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-full bg-white/15"
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
                    active
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.header>
  );
}

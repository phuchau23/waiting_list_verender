/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isSmall, setIsSmall] = useState(false);
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsSmall(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.href === pathname);
    setActiveIndex(index !== -1 ? index : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={false}
        animate={{ height: isSmall ? 48 : 64 }}
        className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md flex items-center"
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <motion.div
            initial={false}
            animate={{
              scale: isSmall ? 0.9 : 1,
              fontSize: isSmall ? "1rem" : "1.25rem",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="font-bold text-white"
          >
            LOGO NÈ
          </motion.div>

          {/* MENU */}
          <AnimatePresence>
            {!isSmall && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative mx-auto flex items-center gap-4 text-lg"
              >
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-5 py-2 transition ${
                        isActive(item.href) ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* FLOAT MENU */}
      <AnimatePresence>
        {isSmall && (
          <ul
            className="z-9999 fixed top-6 left-1/2 -translate-x-1/2 
          bg-black/40 backdrop-blur-md shadow-lg px-6 py-3 
          rounded-full border border-white/20
          flex items-center gap-2 text-base transition-all mt-5"
          >
            {/* HIGHLIGHT FOLLOWER */}
            <div className="absolute inset-0 flex pointer-events-none">
              {menuItems.map((_, i) => (
                <div key={i} className="relative flex items-center">
                  {(hoverIndex === i || activeIndex === i) && (
                    <div
                      className="absolute inset-0 w-[calc(100%/4)] left-[calc(100%*i/4)] 
                    h-8 bg-white/10 rounded-full transition-all"
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {menuItems.map((item, i) => (
              <li key={item.href} className="relative">
                {(hoverIndex === i || activeIndex === i) && (
                  <div
                    className="absolute left-0 w-full h-10 bg-white/10 rounded-full transition-all"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  ></div>
                )}
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(i)}
                  className={`relative px-5 py-2 text-sm transition 
                ${isActive(item.href) ? "text-white font-semibold" : "text-gray-200 hover:text-white"}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </>
  );
}

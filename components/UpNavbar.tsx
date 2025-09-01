// components/UpNavbar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const items = [
  { href: "#home", label: "INDEX" },
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export default function UpNavbar() {
  const show = useScrollDirection({ threshold: 12, showAtTop: true });

  // Se activa cuando terminan los subtítulos
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const arm = () => setArmed(true);

    // Si los subtítulos ya terminaron antes de montar el navbar
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("hero-subs-done")
    ) {
      setArmed(true);
    }

    window.addEventListener("hero:subs:done", arm);
    return () => window.removeEventListener("hero:subs:done", arm);
  }, []);

  const navDrop = {
    off: { y: -40, opacity: 0 },
    on:  { y: 0,  opacity: 1 },
  };

  const listVariants = {
    on: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    off: { y: -12, opacity: 0 },
    on:  { y: 0,   opacity: 1 },
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[1000] bg-transparent",
        "transition-transform duration-300 ease-out",
        show ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none",
      ].join(" ")}
    >
      {/* Mismos gutters que el hero */}
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        {/* Animamos SOLO el contenido, para no interferir con el translate del header */}
        <motion.div
          variants={navDrop}
          initial="off"
          animate={armed ? "on" : "off"}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.ul
            variants={listVariants}
            initial={armed ? "on" : "off"}
            animate={armed ? "on" : "off"}
            className="h-[72px] sm:h-[84px] lg:h-[96px]
                       flex items-center justify-between
                       uppercase font-semibold tracking-widest
                       text-[clamp(16px,2.4vw,28px)]
                       text-white mix-blend-difference"
          >
            {items.map((it) => (
              <motion.li key={it.label} variants={itemVariants} className="shrink-0">
                <a
                  href={it.href}
                  className="relative inline-block py-1
                             after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
                             after:h-[3px] after:w-0 after:bg-white after:mix-blend-difference
                             after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  {it.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </nav>
    </header>
  );
}

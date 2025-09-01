"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const markReady = () => setReady(true);
    if (typeof document !== "undefined" && document.documentElement.classList.contains("splash-done")) {
      setReady(true);
    }
    window.addEventListener("splash:done", markReady);
    return () => window.removeEventListener("splash:done", markReady);
  }, []);

  const TITLE_DUR = 0.8;
  const TITLE_STAGGER = 0.2;
  const SUB_DELAY_AFTER_TITLES = 0.8;
  const subtitlesDelay = useMemo(
    () => TITLE_DUR + TITLE_STAGGER + SUB_DELAY_AFTER_TITLES,
    []
  );

  // usa el cubic-bezier directamente (ease-out personalizado)
  const easeOutCustom = [0.22, 1, 0.36, 1] as const;

  const titleUp = {
    off: { y: 80, opacity: 0 },
    on:  { y: 0,  opacity: 1 },
  };

  const subsUp = {
    off: { y: 40, opacity: 0 },
    on:  { y: 0,  opacity: 1 },
  };

  return (
    <section id="home" className="bg-neutral-900 text-white pt-[72px] sm:pt-[84px] lg:pt-[96px] pb-8 sm:pb-10">
      <div className="px-4 sm:px-6 lg:px-8 min-h-0 md:min-h-[calc(60svh-96px)] flex flex-col">
        <motion.h1
          variants={titleUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: TITLE_DUR, ease: easeOutCustom, delay: 0 }}
          className="font-extrabold leading-[0.82] tracking-tight text-[18vw] sm:text-[18vw] md:text-[14vw] lg:text-[18vw] text-center md:text-left"
        >
          VICTOR
        </motion.h1>

        <motion.h1
          variants={titleUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: TITLE_DUR, ease: easeOutCustom, delay: TITLE_STAGGER }}
          className="font-extrabold leading-[0.82] tracking-tight text-[18vw] sm:text-[18vw] md:text-[14vw] lg:text-[18vw] text-center md:text-right"
        >
          ALVAREZ
        </motion.h1>

        <motion.div
          variants={subsUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: 0.8, ease: easeOutCustom, delay: subtitlesDelay }}
          onAnimationComplete={() => {
            document.documentElement.classList.add("hero-subs-done");
            window.dispatchEvent(new Event("hero:subs:done"));
          }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left text-md sm:text-lg md:text-2xl font-medium lg:flex lg:justify-evenly"
        >
          <p className="uppercase">
            B.S. Computer Science
            <br />
            BASED IN CARACAS
          </p>
          <p className="md:text-right">
            SPECIALIZING IN
            <br />
            FRAMER AND WEB DESIGN
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { PointerHighlight } from "./ui/pointer-highlight";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const pointerTimerRef = useRef<number | null>(null);

  // Escucha fin de Splash para animar títulos/subtítulos
  useEffect(() => {
    const markReady = () => setReady(true);

    if (typeof document !== "undefined" && document.documentElement.classList.contains("splash-done")) {
      setReady(true);
    }
    window.addEventListener("splash:done", markReady);
    return () => window.removeEventListener("splash:done", markReady);
  }, []);

  // Cuando TERMINAN los subtítulos del hero (evento ya existente en tu flujo),
  // arrancamos el contador de 5s para el PointerHighlight
  useEffect(() => {
    const startPointerDelay = () => {
      // Por seguridad, limpia cualquier timer previo
      if (pointerTimerRef.current) {
        window.clearTimeout(pointerTimerRef.current);
        pointerTimerRef.current = null;
      }
      pointerTimerRef.current = window.setTimeout(() => {
        setHighlightVisible(true);
        pointerTimerRef.current = null;
      }, 5000); // ⟵ 5s
    };

    // Si el evento ya se emitió antes de montar este componente (fallback)
    if (typeof document !== "undefined" && document.documentElement.classList.contains("hero-subs-done")) {
      startPointerDelay();
    }

    window.addEventListener("hero:subs:done", startPointerDelay);
    return () => {
      window.removeEventListener("hero:subs:done", startPointerDelay);
      if (pointerTimerRef.current) {
        window.clearTimeout(pointerTimerRef.current);
        pointerTimerRef.current = null;
      }
    };
  }, []);

  const TITLE_DUR = 0.8;
  const TITLE_STAGGER = 0.2;
  const SUB_DELAY_AFTER_TITLES = 0.8;
  const subtitlesDelay = useMemo(
    () => TITLE_DUR + TITLE_STAGGER + SUB_DELAY_AFTER_TITLES,
    []
  );

  const easeOutCustom = [0.22, 1, 0.36, 1] as const;

  const titleUp = {
    off: { y: 80, opacity: 0 },
    on:  { y: 0, opacity: 1 },
  };

  const subsUp = {
    off: { y: 40, opacity: 0 },
    on:  { y: 0, opacity: 1 },
  };

  return (
    <section
      id="home"
      className="bg-neutral-900 text-white pt-[72px] sm:pt-[84px] lg:pt-[96px] pb-8 sm:pb-10"
    >
      <div className="px-4 sm:px-6 lg:px-8 min-h-0 md:min-h-[calc(60svh-96px)] flex flex-col">
        {/* Título 1 */}
        <motion.h1
          variants={titleUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: TITLE_DUR, ease: easeOutCustom, delay: 0 }}
          className="font-extrabold leading-[0.82] tracking-tight text-[18vw] sm:text-[18vw] md:text-[14vw] lg:text-[18vw] text-center md:text-left"
        >
          VICTOR
        </motion.h1>

        {/* Título 2 */}
        <motion.h1
          variants={titleUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: TITLE_DUR, ease: easeOutCustom, delay: TITLE_STAGGER }}
          className="font-extrabold leading-[0.82] tracking-tight text-[18vw] sm:text-[18vw] md:text-[14vw] lg:text-[18vw] text-center md:text-right"
        >
          ALVAREZ
        </motion.h1>

        {/* Subtítulos */}
        <motion.div
          variants={subsUp}
          initial="off"
          animate={ready ? "on" : "off"}
          transition={{ duration: 0.8, ease: easeOutCustom, delay: subtitlesDelay }}
          onAnimationComplete={() => {
            // Emite el evento que orquesta navbar + heroImage (y ahora dispara el timer del highlight)
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

          <div className="md:text-right uppercase text-white text-center">
            SPECIALIZING IN
            <br />
            {highlightVisible ? (
              <PointerHighlight>
                <span className="text-center">Full-Stack Software Developer</span>
              </PointerHighlight>
            ) : (
              <span>Full-Stack Software Developer</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

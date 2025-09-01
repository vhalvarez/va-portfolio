// components/HeroImageSection.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";

export default function HeroImageSection() {
  const [armed, setArmed] = useState(false);
  const [sectionTop, setSectionTop] = useState(0); // valor inicial seguro
  const [clientHeight, setClientHeight] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const arm = () => setArmed(true);
    if (document.documentElement.classList.contains("hero-subs-done")) {
      setArmed(true);
    }
    window.addEventListener("hero:subs:done", arm);
    return () => window.removeEventListener("hero:subs:done", arm);
  }, []);

  const measure = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionTop(rect.top + window.scrollY);
    setClientHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mvOne = useMotionValue(1);
  const mvZero = useMotionValue(0);

  const approachEnd = sectionTop + clientHeight * 0.2;

  const scaleApproachMV = prefersReducedMotion
    ? mvOne
    : useTransform(scrollY, [0, approachEnd || 1], [1.4, 1.0]);

  const scaleInViewMV = prefersReducedMotion
    ? mvOne
    : useTransform(scrollYProgress, [0, 1], [1.0, 0.98]);

  const scaleCombined = prefersReducedMotion
    ? mvOne
    : useTransform(
        [scaleApproachMV, scaleInViewMV] as const,
        ([ga, iv]: readonly [number, number]) => ga * iv
      );

  const scale = prefersReducedMotion
    ? mvOne
    : useSpring(scaleCombined, { stiffness: 140, damping: 24, mass: 0.8 });

  const yApproachMV = prefersReducedMotion
    ? mvZero
    : useTransform(scrollY, [0, approachEnd || 1], [0, 40]);

  const yInViewMV = prefersReducedMotion
    ? mvZero
    : useTransform(scrollYProgress, [0, 1], [0, 40]);

  const yCombined = prefersReducedMotion
    ? mvZero
    : useTransform(
        [yApproachMV, yInViewMV] as const,
        ([a, b]: readonly [number, number]) => a + b
      );

  const dropIn = {
    off: { y: -60, opacity: 0 },
    on: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      ref={sectionRef}
      id="hero-image"
      variants={dropIn}
      initial="off"
      animate={armed ? "on" : "off"}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        style={{ scale, y: yCombined }}
        className="absolute inset-0 will-change-transform transform-gpu"
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-black/25" />
    </motion.section>
  );
}

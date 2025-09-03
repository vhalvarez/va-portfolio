"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";

type Opts = {
  /** porcentaje del alto del viewport que define el “approach” antes de entrar a la sección */
  approachFactor?: number; // 0.2 por defecto
  /** escalas */
  maxScale?: number; // 1.4
  minScale?: number; // 1.0
  /** desplazamientos en px */
  yApproach?: number; // 40
  yInView?: number;   // 40
  /** nombre de evento opcional para armar la animación (ej: "hero:subs:done") */
  armedEventName?: string;
};

export function useParallaxScaleY(opts: Opts = {}) {
  const {
    approachFactor = 0.2,
    maxScale = 1.4,
    minScale = 1.0,
    yApproach = 40,
    yInView = 40,
    armedEventName,
  } = opts;

  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [armed, setArmed] = useState(!armedEventName); // si no hay evento, arranca armado
  const [sectionTop, setSectionTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    if (!armedEventName) return;
    const arm = () => setArmed(true);
    window.addEventListener(armedEventName, arm);
    return () => window.removeEventListener(armedEventName, arm);
  }, [armedEventName]);

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

  const approachEnd = sectionTop + clientHeight * approachFactor;

  const scaleApproachMV = prefersReducedMotion
    ? mvOne
    : useTransform(scrollY, [0, approachEnd || 1], [maxScale, minScale]);

  const scaleInViewMV = prefersReducedMotion
    ? mvOne
    : useTransform(scrollYProgress, [0, 1], [1.0, 0.98]);

  const scaleCombined = prefersReducedMotion
    ? mvOne
    : useTransform([scaleApproachMV, scaleInViewMV], ([ga, iv]) => Number(ga) * Number(iv));

  const scale = prefersReducedMotion
    ? mvOne
    : useSpring(scaleCombined, { stiffness: 140, damping: 24, mass: 0.8 });

  const yApproachMV = prefersReducedMotion
    ? mvZero
    : useTransform(scrollY, [0, approachEnd || 1], [0, yApproach]);

  const yInViewMV = prefersReducedMotion
    ? mvZero
    : useTransform(scrollYProgress, [0, 1], [0, yInView]);

  const y = prefersReducedMotion
    ? mvZero
    : useTransform([yApproachMV, yInViewMV], ([a, b]) => Number(a) + Number(b));

  return { sectionRef, scale, y, armed };
}

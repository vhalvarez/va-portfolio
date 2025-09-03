"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParallaxScaleY } from "@/hooks/useParallaxScaleY";

type Props = {
  /** Imagen del hero (puede ser local o remota si está permitida en next.config.js) */
  src?: string;
  alt?: string;
  /** altura del section; antes tenías h-[100svh] */
  heightClassName?: string;
  /** overlay oscuro por encima de la imagen */
  overlay?: boolean;
};

export default function HeroImageSection({
  src = "/images/retrato.jpg",
  alt = "Hero image",
  heightClassName = "h-[100svh]",
  overlay = true,
}: Props) {
  // Mismas sensaciones que tu versión anterior
  const { sectionRef, scale, y, armed } = useParallaxScaleY({
    approachFactor: 0.2,
    maxScale: 1.4,
    minScale: 1.0,
    yApproach: 40,
    yInView: 40,
    armedEventName: "hero:subs:done", // respeta tu gateo por evento
  });

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
      className={`relative w-full overflow-hidden ${heightClassName}`}
    >
      {/* Contenedor con parallax/scale */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 will-change-transform transform-gpu"
      >
        {/* Necesitamos un wrapper relativo para <Image fill /> */}
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
      )}
    </motion.section>
  );
}

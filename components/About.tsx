"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParallaxScaleY } from "@/hooks/useParallaxScaleY";

export default function About() {
  // Ajusta intensidades si quieres (maxScale, yApproach, etc.)
  const { sectionRef, scale, y, armed } = useParallaxScaleY({
    approachFactor: 0.2,
    maxScale: 1.4,
    minScale: 1.0,
    yApproach: 40,
    yInView: 40,
  });

  return (
    <section className="bg-neutral-900 text-white pt-[80px] sm:pt-[84px] lg:pt-[96px] pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="font-medium leading-[0.82] tracking-tight text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[10vw] text-center uppercase">
          More About
        </p>
        <p className="font-medium leading-[0.82] tracking-tight text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[10vw] text-center uppercase">
          Victor
        </p>

        {/* Imagen tipo poster con parallax/scale */}
        <div ref={sectionRef} className="mt-6 sm:mt-10 flex justify-center p-10">
          <motion.figure
            style={{ scale, y }}
            initial={{ y: -60, opacity: 0 }}
            animate={armed ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative w-full max-w-3xl aspect-[3/4] overflow-hidden rounded-lg will-change-transform transform-gpu"
          >
            <Image
              src="/images/retrato.jpg"
              alt="Retrato de Victor"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
              className="object-cover object-center grayscale"
            />
          </motion.figure>
        </div>

        <div className="mt-12 flex justify-center">
          <p className="font-bold tracking-tight text-3xl text-center uppercase">
            Full stack software developer with over 7 years of experience in creating innovative and secure digital platforms.
          </p>
        </div>

      </div>
    </section>
  );
}

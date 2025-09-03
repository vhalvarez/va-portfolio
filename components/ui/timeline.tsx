"use client";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const trackWrapperRef = useRef<HTMLDivElement>(null);   // el wrapper que contiene TODAS las cards/ítems
  const containerRef = useRef<HTMLDivElement>(null);       // el contenedor que observa useScroll
  const [height, setHeight] = useState(0);

  const measure = () => {
    const el = trackWrapperRef.current;
    if (!el) return;
    // scrollHeight captura la altura total del contenido aunque haya overflow o contenido que cambie
    setHeight(el.scrollHeight);
  };

  // Medición inicial lo antes posible
  useLayoutEffect(() => {
    measure();
  }, []);

  // Re-mediición reactiva (imágenes, resize, cambios dinámicos)
  useEffect(() => {
    const el = trackWrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    // por si algunos recursos terminan de cargar después
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Que el progreso llegue a 1 casi al final del contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // “start 15%” => inicia el progreso cuando el top del container entra al 85% del viewport
    // “end 90%”  => llega a 1 cuando el bottom del container se acerca mucho al fondo del viewport
    offset: ["start 15%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div className="w-full bg-neutral-900 font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-white font-medium leading-[0.82] tracking-tight text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[10vw] text-center">
          Experience
        </h2>
      </div>

      {/* Wrapper de toda la lista + línea */}
      <div ref={trackWrapperRef} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 p-2" />
              </div>
              <div className="flex flex-col">
                <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-bold text-white ">
                  {item.title}
                </h3>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-white ">
                  {item.subtitle}
                </h3>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white ">
                {item.title}
              </h3>
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white ">
                {item.subtitle}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Track gris con degradado/máscara */}
        <div
          style={{ height: height ? `${height}px` : "100%" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]
                     bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                     from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]
                     [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Progreso de color */}
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

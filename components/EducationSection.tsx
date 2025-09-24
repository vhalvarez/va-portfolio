"use client";

import { useEffect, useRef, useState } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `I’m currently completing my B.S. in Computer Science
at Universidad Nueva Esparta (2022–2025). My coursework includes Data Structures and Algorithms, Operating Systems,
Machine Organization and Programming, Artificial Intelligence, Mobile App Development,
Software Engineering, UX/UI Design, and Object-Oriented Programming. This academic foundation strengthens my professional work in full stack development,
ensuring that every project combines theoretical knowledge with practical, real-world application.`;

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true); // activa animación
          observer.disconnect(); // opcional: que se ejecute una sola vez
        }
      },
      { threshold: 0.3 } // % de visibilidad requerida
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20 md:py-28 bg-neutral-900 text-white"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr] max-w-7xl mx-auto">
        {/* Columna izquierda — título grande */}
        <div className="order-1 md:order-1 md:sticky md:top-24 self-start">
          <h2 className="font-extrabold text-4xl leading-none tracking-wider uppercase text-start">
            EDUCATION
          </h2>
        </div>

        {/* Columna derecha — texto animado */}
        <div className="order-2 md:order-2 space-y-10 text-lg leading-8 md:text-xl md:leading-9">
          {visible && (
            <TextGenerateEffect words={words} filter={true} duration={0.5} />
          )}
        </div>
      </div>
    </section>
  );
}

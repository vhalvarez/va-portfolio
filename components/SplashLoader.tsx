"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "filling" | "lifting" | "hidden";

export default function SplashLoaderCurtain() {
  const pathname = usePathname();

  // === Ajustes del efecto ===
  const STEP_MS = 300; // 0.3 s por paso
  const STEP_PCT = 15; // +15% por paso
  const MIN_DURATION_MS = 8 * STEP_MS; // 2.4 s visible mínimo
  const LIFT_DURATION_MS = 700; // subida de la cortina

  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>("filling");

  const startedAtRef = useRef<number>(0);
  const pageLoadedRef = useRef<boolean>(false);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const liftTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ------- helpers -------
  const clearTimers = () => {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
    if (liftTimerRef.current) clearTimeout(liftTimerRef.current);
  };

  const start = () => {
    clearTimers();
    setPercent(0);
    setPhase("filling");
    startedAtRef.current = Date.now();
    document.documentElement.classList.add("overflow-hidden");

    stepTimerRef.current = setInterval(() => {
      setPercent((p) => Math.min(100, p + STEP_PCT));
    }, STEP_MS);
  };

  // Lógica para decidir cuándo levantar
  const scheduleLiftIfReady = () => {
    const elapsed = Date.now() - startedAtRef.current;
    const remainingToMin = Math.max(0, MIN_DURATION_MS - elapsed);

    const needLoad = true;

    const go = () => {
      if (phase !== "filling") return;
      setPhase("lifting");
      document.documentElement.classList.remove("overflow-hidden");

      // ⬆️ Avisamos que empieza el lift
      window.dispatchEvent(new Event("splash:done"));
      document.documentElement.classList.add("splash-done");

      liftTimerRef.current = setTimeout(() => setPhase("hidden"), LIFT_DURATION_MS);
    };

    setTimeout(() => {
      if (!needLoad || pageLoadedRef.current) go();
    }, remainingToMin);
  };

  // ------- efectos -------
  useEffect(() => {
    start();

    const onLoad = () => {
      pageLoadedRef.current = true;
      if (percent === 100) scheduleLiftIfReady();
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Repetir en cambios de ruta (opcional)
  useEffect(() => {
    if (!pathname) return;
    pageLoadedRef.current = true;
    start();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (percent === 100) {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      scheduleLiftIfReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[9999] pointer-events-none overflow-hidden",
        phase === "lifting"
          ? "transition-transform duration-700 ease-in-out translate-y-[-100%]"
          : "translate-y-0",
        "bg-black",
      ].join(" ")}
    >
      {/* Barra de llenado */}
      <div className="absolute inset-0">
        <div
          className="h-full bg-white transition-[width] duration-300 ease-out will-change-[width]"
          style={{ width: `${percent}vw` }}
        />
      </div>

      {/* HUD del porcentaje */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`text-center transition-colors duration-500 select-none ${
            percent >= 45 ? "text-black" : "text-white"
          }`}
        >
          <div
            className="font-extrabold leading-none
                       text-[22vw] sm:text-[16vw] md:text-[12vw] lg:text-[10vw]"
          >
            {percent}%
          </div>
          <div className="mt-4 text-xs sm:text-sm tracking-widest opacity-80">
            VICTOR ALVAREZ
          </div>
          <div className="text-[10px] sm:text-xs opacity-70">©2025</div>
        </div>
      </div>
    </div>
  );
}

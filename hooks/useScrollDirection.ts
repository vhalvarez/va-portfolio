// hooks/useScrollDirection.ts
"use client";
import { useEffect, useState } from "react";

export function useScrollDirection({
  threshold = 12,
  showAtTop = true,
}: { threshold?: number; showAtTop?: boolean } = {}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      if (Math.abs(d) < threshold) return;
      if (y <= 0) setShow(showAtTop); else setShow(d < 0); // sube: muestra; baja: oculta
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, showAtTop]);

  return show;
}

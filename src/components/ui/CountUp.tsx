"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ end, duration = 1.2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    if (end <= 0) {
      setCount(0);
      return;
    }

    const start = performance.now();
    const totalMs = Math.max(200, duration * 1000);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / totalMs);
      setCount(Math.round(end * progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration]);

  return <span>{count}</span>;
}

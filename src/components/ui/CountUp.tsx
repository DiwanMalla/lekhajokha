"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

export function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endVal = end;
      if (start === endVal) return;

      const incrementTime = (duration / endVal) * 1000;

      const timer = setInterval(() => {
        start += 1;
        setCount(String(start) as any);
        if (start === endVal) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

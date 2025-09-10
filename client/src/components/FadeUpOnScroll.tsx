"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type FadeUpOnScrollProps = {
  children: ReactNode;
  delay?: number;       // jeda sebelum animasi mulai
  threshold?: number;   // persentase elemen terlihat sebelum animasi jalan
  duration?: number;    // durasi animasi dalam detik
};

export default function FadeUpOnScroll({
  children,
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
}: FadeUpOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
}

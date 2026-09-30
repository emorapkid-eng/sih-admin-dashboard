import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const delayClasses = ["delay-0", "delay-75", "delay-150", "delay-200"] as const;

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: 0 | 1 | 2 | 3 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.unobserve(element);
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={cn("scroll-reveal", delayClasses[delay], visible && "is-visible", className)}>{children}</div>;
}
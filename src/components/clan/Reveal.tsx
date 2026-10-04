import { useEffect, useRef, type ReactNode } from "react";

/** Fades its children in once they scroll into view. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function SectionHead({ kicker, title, demo }: { kicker: string; title: string; demo?: boolean }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">{kicker}</p>
      <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-black sm:text-5xl">
        {title}
        {demo && <DemoTag />}
      </h2>
    </div>
  );
}

export function DemoTag() {
  return (
    <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
      Demo
    </span>
  );
}

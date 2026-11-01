"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/utils";

/** Yatay kaydırmalı karusel (dokunmatikte parmakla, masaüstünde oklarla). */
export default function Carousel({ title, eyebrow, action, children, itemClass = "w-[78%] sm:w-[44%] lg:w-[calc((100%-72px)/4)]" }:
  { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode[]; itemClass?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current; if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, []);

  const move = (dir: 1 | -1) => {
    const el = track.current; if (!el) return;
    const item = el.querySelector("li"); const w = item ? item.getBoundingClientRect().width + 24 : el.clientWidth;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section aria-label={title} className="px-5 sm:px-10 lg:px-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          {eyebrow && <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-mute">{eyebrow}</p>}
          <h2 className="text-[34px] font-light lowercase leading-none sm:text-[44px]">{title}</h2>
        </div>
        <div className="flex items-center gap-5">
          {action}
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => move(-1)} disabled={edges.start} aria-label="Önceki" className="flex h-11 w-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper disabled:border-line disabled:text-line disabled:hover:bg-transparent"><ChevronLeft size={18} strokeWidth={1.2} /></button>
            <button onClick={() => move(1)} disabled={edges.end} aria-label="Sonraki" className="flex h-11 w-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper disabled:border-line disabled:text-line disabled:hover:bg-transparent"><ChevronRight size={18} strokeWidth={1.2} /></button>
          </div>
        </div>
      </div>
      <ul ref={track} onScroll={update} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {children.map((c, i) => <li key={i} className={cx("shrink-0 snap-start", itemClass)}>{c}</li>)}
      </ul>
    </section>
  );
}

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Img from "@/components/ui/Img";
import { useEscape, useLockBody } from "@/hooks/useUi";
import { badgeLabel, cx } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Ürün galerisi.
 * Masaüstü: büyük görsel + küçük resim şeridi. Mobil: parmakla kaydırılan şerit + nokta göstergesi.
 * Tıklayınca tam ekran görüntüleyici açılır (oklar, klavye, Esc).
 */
export default function ProductGallery({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const n = p.images.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);
  const caption = (k: number) => (k === 0 ? "Ürün görseli" : "Ortam görseli (temsilî)");

  useLockBody(full);
  useEscape(full, () => setFull(false));
  useEffect(() => {
    if (!full) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [full, i, go]);

  // Mobil şeritte kaydırma ile aktif görseli izle
  const onStrip = () => { const el = strip.current; if (el) setI(Math.round(el.scrollLeft / el.clientWidth)); };

  return (
    <div>
      {/* Mobil */}
      <div className="relative lg:hidden">
        <div ref={strip} onScroll={onStrip} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
          {p.images.map((id, k) => (
            <button key={id} onClick={() => { setI(k); setFull(true); }} className="relative aspect-[4/5] w-full shrink-0 snap-start bg-sand" aria-label={`${caption(k)} büyüt`}>
              <Img id={id} alt={`${p.name} ${p.title} ${k + 1}`} sizes="100vw" priority={k === 0} />
            </button>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {p.images.map((id, k) => <span key={id} className={cx("h-1.5 w-1.5 rounded-full", k === i ? "bg-paper" : "bg-paper/50")} />)}
        </div>
        {p.badge && <Badge b={p.badge} />}
      </div>

      {/* Masaüstü */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-[84px_1fr]">
        <div className="flex flex-col gap-3">
          {p.images.map((id, k) => (
            <button key={id} onClick={() => setI(k)} aria-label={`${k + 1}. görsel`} aria-current={k === i}
              className={cx("relative aspect-[4/5] overflow-hidden bg-sand transition-opacity", k === i ? "opacity-100 outline outline-1 outline-ink" : "opacity-60 hover:opacity-100")}>
              <Img id={id} alt="" sizes="84px" />
            </button>
          ))}
        </div>
        <div className="group relative aspect-[4/5] overflow-hidden bg-sand xl:aspect-[5/5]">
          {p.images.map((id, k) => (
            <div key={id} className={cx("absolute inset-0 transition-opacity duration-700", k === i ? "opacity-100" : "opacity-0")}>
              <Img id={id} alt={`${p.name} ${p.title} ${k + 1}`} sizes="(min-width:1024px) 55vw" priority={k === 0} />
            </div>
          ))}
          {p.badge && <Badge b={p.badge} />}
          <span className="absolute bottom-4 left-4 bg-paper/90 px-2 py-1 text-[11px] text-ink-soft">{caption(i)}</span>
          <button onClick={() => go(i - 1)} aria-label="Önceki görsel" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-paper/90 opacity-0 transition-opacity group-hover:opacity-100"><ChevronLeft size={20} strokeWidth={1.2} /></button>
          <button onClick={() => go(i + 1)} aria-label="Sonraki görsel" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-paper/90 opacity-0 transition-opacity group-hover:opacity-100"><ChevronRight size={20} strokeWidth={1.2} /></button>
          <button onClick={() => setFull(true)} aria-label="Tam ekran" className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-paper/90"><Expand size={18} strokeWidth={1.2} /></button>
        </div>
      </div>

      {/* Tam ekran */}
      {full && (
        <div role="dialog" aria-modal="true" aria-label="Görsel görüntüleyici" className="fixed inset-0 z-[90] bg-paper">
          <div className="absolute inset-0">
            <Img key={p.images[i]} id={p.images[i]} alt={`${p.name} ${i + 1}`} sizes="100vw" priority className="object-contain" />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span className="bg-paper/90 px-2 py-1 text-[13px]">{i + 1} / {n} · {caption(i)}</span>
            <button autoFocus onClick={() => setFull(false)} aria-label="Kapat" className="flex h-11 w-11 items-center justify-center bg-paper/90"><X size={22} strokeWidth={1.2} /></button>
          </div>
          <button onClick={() => go(i - 1)} aria-label="Önceki" className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-paper/90"><ChevronLeft size={22} strokeWidth={1.2} /></button>
          <button onClick={() => go(i + 1)} aria-label="Sonraki" className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-paper/90"><ChevronRight size={22} strokeWidth={1.2} /></button>
        </div>
      )}
    </div>
  );
}

function Badge({ b }: { b: string }) {
  return <span className={cx("absolute left-4 top-4 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-paper", b === "kesif" ? "bg-discover" : b === "ozel-gunler" ? "bg-promo" : "bg-ink")}>{badgeLabel[b]}</span>;
}

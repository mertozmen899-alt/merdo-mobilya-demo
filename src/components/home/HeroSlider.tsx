"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/data/content";
import { getProduct } from "@/data/catalog";
import Img from "@/components/ui/Img";
import { badgeLabel, cx, formatPrice } from "@/lib/utils";

const DURATION = 6500;

/**
 * Tam ekran koleksiyon slider'ı.
 * Geçiş: çapraz solma (fade). Otomatik ilerler, durdurulabilir, ok ve kaydırma ile elle geçilebilir.
 */
export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [cycle, setCycle] = useState(0); // ilerleme çubuğunu yeniden başlatmak için
  const touch = useRef<number | null>(null);
  const n = heroSlides.length;

  const go = useCallback((i: number) => { setIndex((i + n) % n); setCycle((c) => c + 1); }, [n]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
    const vis = () => document.hidden && setPlaying(false);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [playing, index, cycle, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Öne çıkan koleksiyonlar"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink text-paper"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      {heroSlides.map((s, i) => {
        const p = s.productSlug ? getProduct(s.productSlug) : undefined;
        const active = i === index;
        const near = active || i === (index + 1) % n;
        return (
          <div key={s.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${n}`} aria-hidden={!active}
            className={cx("absolute inset-0 transition-opacity duration-[1100ms] ease-lux", active ? "z-10 opacity-100" : "z-0 opacity-0")}>
            {(near || i === 0) && <Img id={s.image} alt={p ? `${p.name} ${p.title}` : s.title} priority={i === 0} position={s.imageMobilePosition} />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

            <div className="absolute inset-x-0 bottom-0 px-6 pb-28 sm:px-10 lg:px-16 lg:pb-20">
              {s.kind === "kampanya" ? (
                <div className="max-w-xl">
                  <p className="text-[12px] uppercase tracking-[0.22em] text-paper/90">{s.eyebrow}</p>
                  <h2 className="mt-3 text-[52px] font-light lowercase leading-[0.95] sm:text-[80px] lg:text-[104px]">{s.title}</h2>
                  <p className="mt-4 max-w-md text-[16px] font-light text-paper/90">{s.subtitle}</p>
                  <Link href={s.href} tabIndex={active ? 0 : -1} className="mt-7 inline-block border border-paper bg-paper px-7 py-3.5 text-[12px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-transparent hover:text-paper">{s.cta}</Link>
                </div>
              ) : p && (
                <div className="max-w-xl">
                  {p.badge && <span className={cx("inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]", p.badge === "kesif" ? "bg-discover" : p.badge === "ozel-gunler" ? "bg-promo" : "bg-ink")}>{badgeLabel[p.badge]}</span>}
                  <h2 className="mt-3 text-[56px] font-light lowercase leading-[0.95] sm:text-[84px] lg:text-[110px]">{p.name}</h2>
                  <p className="mt-2 text-[15px] font-light">{p.title} <span className="text-paper/75">· tasarım {p.designer}</span></p>
                  <p className="mt-3 text-[15px]">
                    {p.oldPrice && <span className="mr-3 text-paper/70 line-through">{formatPrice(p.oldPrice)}</span>}
                    {formatPrice(p.price)}
                  </p>
                  <Link href={s.href} tabIndex={active ? 0 : -1} className="link-line is-on mt-5 inline-block pb-1 text-[12px] uppercase tracking-[0.18em]">{s.cta} +</Link>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Kontroller */}
      <div className="absolute bottom-8 left-6 right-24 z-20 flex items-center gap-4 sm:left-auto sm:right-28 lg:right-32 lg:bottom-10">
        <div className="flex flex-1 gap-1.5 sm:w-[280px] sm:flex-none">
          {heroSlides.map((s, i) => (
            <button key={s.id} onClick={() => go(i)} aria-label={`${i + 1}. slayta git`} aria-current={i === index}
              className="group relative h-6 flex-1">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/35" />
              <span key={i === index ? `${cycle}-${playing}` : undefined}
                className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-paper"
                style={i === index ? (playing ? { animation: `progress ${DURATION}ms linear forwards` } : { transform: "scaleX(1)" }) : { transform: i < index ? "scaleX(1)" : "scaleX(0)", opacity: i < index ? 0.6 : 1 }} />
            </button>
          ))}
        </div>
        <span className="hidden text-[12px] tabular-nums tracking-[0.1em] sm:inline">{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button onClick={() => go(index - 1)} aria-label="Önceki" className="hidden p-1 sm:block"><ChevronLeft size={22} strokeWidth={1.2} /></button>
        <button onClick={() => go(index + 1)} aria-label="Sonraki" className="hidden p-1 sm:block"><ChevronRight size={22} strokeWidth={1.2} /></button>
        <button onClick={() => { setPlaying((p) => !p); setCycle((c) => c + 1); }} aria-label={playing ? "Durdur" : "Oynat"} className="p-1">
          {playing ? <Pause size={18} strokeWidth={1.2} /> : <Play size={18} strokeWidth={1.2} />}
        </button>
      </div>
    </section>
  );
}

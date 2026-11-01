"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/data/content";
import { getProduct } from "@/data/catalog";
import Img from "@/components/ui/Img";
import { badgeLabel, cx, formatPrice } from "@/lib/utils";
import type { HeroSlide } from "@/types";

const DURATION = 7000;
// 3D motoru yalnızca tarayıcıda ve gerektiğinde yüklenir
const Turntable = dynamic(() => import("@/components/three/Turntable"), { ssr: false });
const mixkit = (id: string) => ({
  src: `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  poster: `https://assets.mixkit.co/videos/${id}/${id}-thumb-720-0.jpg`,
});

/**
 * Tam ekran koleksiyon slider'ı.
 * Video slaytlarda arka planda sessiz video oynar; fotoğraflı slaytlarda görsel yavaşça yakınlaşır.
 * Kendiliğinden ilerler; sekme arka plandayken bekler, geri gelince devam eder.
 * Durdur, ok, nokta ve parmakla kaydırma ile elle yönetilebilir.
 */
export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);   // kullanıcının seçimi
  const [visible, setVisible] = useState(true);   // sekme görünür mü
  const [cycle, setCycle] = useState(0);
  const touch = useRef<number | null>(null);
  const n = heroSlides.length;
  const running = playing && visible;
  const dur = heroSlides[index].duration ?? DURATION;

  const go = useCallback((i: number) => { setIndex((i + n) % n); setCycle((c) => c + 1); }, [n]);

  useEffect(() => {
    const vis = () => { setVisible(!document.hidden); if (!document.hidden) setCycle((c) => c + 1); };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), dur);
    return () => clearTimeout(t);
  }, [running, index, cycle, go, dur]);

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
      {heroSlides.map((s, i) => (
        <Slide key={s.id} s={s} active={i === index} near={i === index || i === (index + 1) % n || i === 0}
          running={running} cycle={cycle} label={`${i + 1} / ${n}`} first={i === 0} />
      ))}

      {/* Kontroller */}
      <div className="absolute bottom-8 left-6 right-24 z-20 flex items-center gap-4 sm:left-auto sm:right-28 lg:right-32 lg:bottom-10">
        <div className="flex flex-1 gap-1.5 sm:w-[280px] sm:flex-none">
          {heroSlides.map((s, i) => (
            <button key={s.id} onClick={() => go(i)} aria-label={`${i + 1}. slayta git`} aria-current={i === index} className="relative h-6 flex-1">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/35" />
              <span key={i === index ? `${cycle}-${running}` : undefined}
                className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-paper"
                style={i === index ? (running ? { animation: `progress ${dur}ms linear forwards` } : { transform: "scaleX(1)" }) : { transform: i < index ? "scaleX(1)" : "scaleX(0)", opacity: i < index ? 0.6 : 1 }} />
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

function Slide({ s, active, near, running, cycle, label, first }: { s: HeroSlide; active: boolean; near: boolean; running: boolean; cycle: number; label: string; first: boolean }) {
  const p = s.productSlug ? getProduct(s.productSlug) : undefined;
  const video = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Video kaynağı yüklenemezse fotoğrafa geri dön (React <source> hatasını her zaman yakalamaz)
  useEffect(() => {
    const v = video.current;
    const src = v?.querySelector("source");
    if (!v || !src) return;
    const fail = () => setVideoFailed(true);
    src.addEventListener("error", fail);
    if (v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) fail();
    return () => src.removeEventListener("error", fail);
  });

  // Video yalnızca aktif slaytta ve oynatma açıkken oynar
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true; // tarayıcılar yalnızca sessiz videoyu kendiliğinden oynatır
    if (active && running) v.play().catch(() => {});
    else v.pause();
    if (!active) v.currentTime = 0;
  }, [active, running]);

  const showVideo = !!s.video && !videoFailed;
  const m = s.video ? mixkit(s.video) : null;
  const [threeFailed, setThreeFailed] = useState(false);
  const show3d = s.kind === "3d" && !!s.model && !threeFailed;

  return (
    <div role="group" aria-roledescription="slide" aria-label={label} aria-hidden={!active}
      className={cx("absolute inset-0 transition-opacity duration-[1200ms] ease-lux", active ? "z-10 opacity-100" : "z-0 opacity-0")}>
      {near && show3d ? (
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 68% 62%, #6b5646 0%, #3a2d24 48%, #1d1713 100%)" }}>
          <div className="absolute inset-x-0 top-[6%] h-[64%] lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[64%]">
            <Turntable modelId={s.model!} active={active} tone="dark" onState={(st) => st === "error" && setThreeFailed(true)} />
          </div>
          <p className="absolute right-6 top-[calc(var(--topbar-h)+var(--header-h)+12px)] text-[10px] uppercase tracking-[0.2em] text-paper/50 sm:right-10 lg:right-16">Temsilî 3D model</p>
        </div>
      ) : near && (showVideo && m ? (
        <video ref={video} muted loop playsInline preload={first ? "auto" : "metadata"} poster={m.poster} autoPlay={first}
          onError={() => setVideoFailed(true)} aria-hidden
          className="absolute inset-0 h-full w-full object-cover">
          <source src={m.src} type="video/mp4" onError={() => setVideoFailed(true)} />
        </video>
      ) : (
        <div key={active ? `on-${cycle}` : "off"} className={cx("absolute inset-0", active && "kenburns")} style={!running && active ? { animationPlayState: "paused" } : undefined}>
          <Img id={s.image} alt={p ? `${p.name} ${p.title}` : s.title} priority={first} position={s.imageMobilePosition} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-28 sm:px-10 lg:px-16 lg:pb-20">
        {s.kind !== "urun" ? (
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
}

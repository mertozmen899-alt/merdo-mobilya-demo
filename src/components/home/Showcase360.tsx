"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Move3d } from "lucide-react";
import { showcaseModels } from "@/data/showcase";
import { cx } from "@/lib/utils";

const Turntable = dynamic(() => import("@/components/three/Turntable"), { ssr: false });

/** Etkileşimli 360° vitrin: ziyaretçi ürünü sürükleyerek her yönden inceler. */
export default function Showcase360() {
  const [i, setI] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const m = showcaseModels[i];

  return (
    <section aria-label="360 derece ürün vitrini" className="relative grid overflow-hidden bg-sand lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      <div className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-24">
        <p className="text-[11px] uppercase tracking-[0.22em] text-mute">360° vitrin</p>
        <h2 className="mt-3 text-[44px] font-light lowercase leading-none sm:text-[64px]">{m.name}</h2>
        <p className="mt-2 text-[17px] font-light">{m.title}</p>
        <p className="mt-4 max-w-sm text-[15px] font-light leading-7 text-ink-soft">{m.text}</p>

        <div className="mt-8 flex gap-2" role="tablist" aria-label="Model seçimi">
          {showcaseModels.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} onClick={() => setI(k)}
              className={cx("border px-5 py-2.5 text-[13px] lowercase transition-colors", k === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>
              {x.name}
            </button>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 text-[13px] text-mute"><Move3d size={18} strokeWidth={1.3} /> Sürükleyerek her yönden inceleyin</p>
        <Link href={m.href} className="link-line is-on mt-6 self-start pb-1 text-[12px] uppercase tracking-[0.16em]">Koltukları keşfet</Link>
        <p className="mt-6 text-[11px] text-mute">Temsilî 3D model (Poly Haven, CC0). Gerçek ürün renk ve dokuları farklılık gösterebilir.</p>
      </div>

      <div className="relative h-[62vh] min-h-[380px] lg:h-auto lg:min-h-[78vh]"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 60%, #ffffff 0%, #efeae2 55%, #e2dace 100%)" }}>
        {failed[m.id] ? (
          <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-[13px] text-mute">3D model şu anda yüklenemedi. Lütfen sayfayı yenileyin.</div>
        ) : (
          <Turntable key={m.id} modelId={m.id} interactive tone="light" onState={(st) => st === "error" && setFailed((f) => ({ ...f, [m.id]: true }))} />
        )}
      </div>
    </section>
  );
}

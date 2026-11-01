"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Info, MessageCircle, Truck } from "lucide-react";
import type { Product } from "@/types";
import FavoriteButton from "./FavoriteButton";
import AppointmentModal from "./AppointmentModal";
import { site } from "@/data/content";
import { cx, formatPrice } from "@/lib/utils";

/**
 * Ürün bilgisi ve kişiselleştirme: ölçü, kaplama ve renk seçimi.
 * Fiyat, seçilen ölçü ve kaplamaya göre güncellenir.
 * Seçilen renge ait gerçek görsel olmadığı için görsel değiştirilmez; bu durum açıkça belirtilir.
 */
export default function Configurator({ p }: { p: Product }) {
  const [size, setSize] = useState(p.sizes.findIndex((s) => s.priceDelta === 0) >= 0 ? p.sizes.findIndex((s) => s.priceDelta === 0) : 0);
  const [cov, setCov] = useState(0);
  const [color, setColor] = useState(0);
  const [appt, setAppt] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => setColor(0), [cov]);
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = p.sizes[size];
  const c = p.coverings[cov];
  const col = c.colors[color];
  const delta = s.priceDelta + c.priceDelta;
  const price = p.price + delta;
  const oldPrice = p.oldPrice ? p.oldPrice + delta : undefined;
  const summary = `${p.name} ${p.title} | ${s.label} (G ${s.width} x Y ${s.height} x D ${s.depth} cm) | ${c.name}, ${col.name}`;
  const wa = useMemo(() => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Merhaba, bu ürün hakkında bilgi almak istiyorum: ${summary}`)}`, [summary]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[44px] font-light lowercase leading-none sm:text-[56px]">{p.name}</h1>
          <p className="mt-2 text-[17px] font-light">{p.title}</p>
          <p className="mt-1 text-[13px] text-mute">Tasarım <Link href={`/urunler/?tasarimci=${encodeURIComponent(p.designer)}`} className="underline">{p.designer}</Link></p>
        </div>
        <FavoriteButton slug={p.slug} label={`${p.name} ${p.title}`} className="mt-2 p-2" />
      </div>

      <div className="mt-6 border-t border-line pt-6" aria-live="polite">
        {oldPrice && <p className="text-[12px] uppercase tracking-[0.14em] text-promo">{p.badge === "kesif" ? "Keşif fiyatı" : "Kampanya fiyatı"}</p>}
        <p className="mt-1 text-[24px] font-light">
          {oldPrice && <><span className="sr-only">Eski fiyat</span><span className="mr-3 text-[18px] text-mute line-through">{formatPrice(oldPrice)}</span></>}
          <span className="sr-only">Güncel fiyat</span>{formatPrice(price)}
        </p>
        <p className="mt-1 text-[12px] text-mute">Seçili yapılandırma için. Teslimat hariçtir. Demo fiyat.</p>
      </div>

      {/* Ölçü */}
      <fieldset className="mt-8">
        <legend className="mb-3 text-[12px] uppercase tracking-[0.16em]">Ölçü <span className="normal-case tracking-normal text-mute">· G {s.width} x Y {s.height} x D {s.depth} cm</span></legend>
        <div className="flex flex-wrap gap-2">
          {p.sizes.map((o, k) => (
            <button key={o.label} onClick={() => setSize(k)} aria-pressed={k === size}
              className={cx("border px-4 py-2.5 text-[13px] transition-colors", k === size ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Kaplama */}
      {p.coverings.length > 0 && (
        <fieldset className="mt-7">
          <legend className="mb-3 text-[12px] uppercase tracking-[0.16em]">Kaplama <span className="normal-case tracking-normal text-mute">· {c.name}</span></legend>
          <div className="flex flex-wrap gap-2">
            {p.coverings.map((o, k) => (
              <button key={o.name} onClick={() => setCov(k)} aria-pressed={k === cov}
                className={cx("border px-4 py-2.5 text-[13px] transition-colors", k === cov ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>
                {o.name}{o.priceDelta !== 0 && <span className="ml-1 opacity-70">{o.priceDelta > 0 ? "+" : "−"}{formatPrice(Math.abs(o.priceDelta))}</span>}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Renk */}
      <fieldset className="mt-7">
        <legend className="mb-3 text-[12px] uppercase tracking-[0.16em]">Renk <span className="normal-case tracking-normal text-mute">· {col.name}</span></legend>
        <div className="flex flex-wrap gap-2.5">
          {c.colors.map((o, k) => (
            <button key={o.name} onClick={() => setColor(k)} aria-pressed={k === color} aria-label={o.name} title={o.name}
              className={cx("h-9 w-9 rounded-full border-2 p-0.5 transition-colors", k === color ? "border-ink" : "border-transparent hover:border-line")}>
              <span className="block h-full w-full rounded-full border border-black/10" style={{ background: o.hex }} />
            </button>
          ))}
        </div>
        <p className="mt-3 flex items-start gap-2 text-[12px] text-mute">
          <Info size={14} strokeWidth={1.4} className="mt-0.5 shrink-0" />
          Bu renk için ayrı fotoğraf yok. Görseller temsilîdir; kumaş kartelasını mağazada görebilirsiniz.
        </p>
      </fieldset>

      {/* Eylemler */}
      <div className="mt-8 grid gap-3">
        <button onClick={() => setAppt(true)} className="flex items-center justify-center gap-2 bg-ink py-4 text-[12px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink-soft">
          <CalendarDays size={16} strokeWidth={1.4} /> Mağazada randevu al
        </button>
        <a href={wa} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-ink py-4 text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper">
          <MessageCircle size={16} strokeWidth={1.4} /> WhatsApp&apos;tan bilgi al
        </a>
        <FavoriteButton slug={p.slug} label={`${p.name} ${p.title}`} withText className="justify-center py-3 text-[12px] uppercase tracking-[0.16em]" />
      </div>

      <p className="mt-6 flex items-center gap-2 text-[13px] text-ink-soft"><Truck size={16} strokeWidth={1.3} /> Tahmini teslimat: {p.deliveryWeeks}{p.fastDelivery && " · Hızlı teslimat uygun"}</p>

      {/* Yapışkan alt çubuk */}
      <div className={cx("fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur transition-transform duration-500 ease-lux", sticky ? "translate-y-0" : "translate-y-full")} aria-hidden={!sticky}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 pr-20 sm:px-10 sm:pr-24">
          <div className="min-w-0">
            <p className="truncate text-[15px]"><span className="lowercase">{p.name}</span> <span className="font-light text-ink-soft">{p.title}</span></p>
            <p className="text-[13px]">{formatPrice(price)}</p>
          </div>
          <button tabIndex={sticky ? 0 : -1} onClick={() => setAppt(true)} className="shrink-0 bg-ink px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-paper sm:px-8">Randevu al</button>
        </div>
      </div>

      <AppointmentModal open={appt} onClose={() => setAppt(false)} summary={summary} />
    </div>
  );
}

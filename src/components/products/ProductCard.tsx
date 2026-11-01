import Link from "next/link";
import type { Product } from "@/types";
import Img from "@/components/ui/Img";
import FavoriteButton from "./FavoriteButton";
import { colorCount } from "@/data/catalog";
import { badgeLabel, cx, formatPrice } from "@/lib/utils";

/**
 * Ürün kartı: büyük görsel (üzerine gelince ortam görseli), ad, tip, fiyat, renkler ve seçenek sayısı.
 */
export default function ProductCard({ p, sizes = "(min-width:1024px) 33vw, 50vw", priority }: { p: Product; sizes?: string; priority?: boolean }) {
  const swatches = p.coverings[0].colors;
  const total = colorCount(p);
  const shown = swatches.slice(0, 5);
  return (
    <article className="group relative">
      <Link href={`/urun/${p.slug}/`} className="block" aria-label={`${p.name} ${p.title}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Img id={p.images[0]} alt={`${p.name} ${p.title}`} sizes={sizes} priority={priority} />
          {p.images[1] && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-lux group-hover:opacity-100">
              <Img id={p.images[1]} alt="" sizes={sizes} />
            </div>
          )}
          {p.badge && (
            <span className={cx("absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-paper", p.badge === "kesif" ? "bg-discover" : p.badge === "ozel-gunler" ? "bg-promo" : "bg-ink")}>
              {badgeLabel[p.badge]}
            </span>
          )}
          <span className="absolute inset-x-3 bottom-3 translate-y-2 bg-paper/95 py-2.5 text-center text-[11px] uppercase tracking-[0.16em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
            {p.coverings.length > 1 || p.sizes.length > 1 ? "Kişiselleştir" : "Keşfet"}
          </span>
        </div>

        <div className="mt-4 pr-8">
          <h3 className="text-[17px] leading-tight"><span className="lowercase">{p.name}</span></h3>
          <p className="mt-0.5 text-[14px] font-light text-ink-soft">{p.title}</p>
          <p className="mt-0.5 text-[12px] text-mute">{p.type}</p>
          <p className="mt-2 text-[14px]">
            {p.oldPrice && <><span className="sr-only">Eski fiyat</span><span className="mr-2 text-mute line-through">{formatPrice(p.oldPrice)}</span><span className="sr-only">Güncel fiyat</span></>}
            <span className={cx(p.oldPrice && "text-promo")}>{formatPrice(p.price)}</span>
          </p>
        </div>
      </Link>

      <div className="mt-3 flex items-center gap-1.5" aria-label={`${total} renk seçeneği`}>
        {shown.map((c) => <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c.hex }} />)}
        {total > shown.length && <span className="ml-1 text-[12px] text-mute">+{total - shown.length}</span>}
      </div>
      <p className="mt-2 text-[12px] text-mute">
        {p.coverings.length} kaplama · {p.sizes.length} ölçü
        {p.fastDelivery && <span className="ml-2 border border-ink px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink">Hızlı Teslimat</span>}
      </p>

      <FavoriteButton slug={p.slug} label={`${p.name} ${p.title}`} className="absolute right-0 top-0 mt-[calc(125%+14px)] p-1" />
    </article>
  );
}

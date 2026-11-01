"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category, Product } from "@/types";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";
import Img from "@/components/ui/Img";
import { categories } from "@/data/catalog";
import { emptyFilters, matches, PAGE_SIZE, parseFilters, sortOptions, sortProducts, toSearch, type FilterState } from "@/lib/filters";
import { badgeLabel, formatPrice } from "@/lib/utils";

interface Props { items: Product[]; category?: Category }

/** Ürün listeleme: filtre, sıralama, aktif filtre etiketleri ve "daha fazla göster". Durum URL'de tutulur. */
export default function Catalog({ items, category }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const f = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  const [panel, setPanel] = useState(false);

  const push = useCallback((next: FilterState) => router.replace(`${pathname}${toSearch(next)}`, { scroll: false }), [router, pathname]);
  const update = useCallback((patch: Partial<FilterState>) => push({ ...f, ...patch }), [f, push]);
  const clear = () => push(emptyFilters({ sirala: f.sirala }));

  const results = useMemo(() => sortProducts(items.filter((p) => matches(p, f)), f.sirala), [items, f]);
  const visible = results.slice(0, f.sayfa * PAGE_SIZE);
  const catName = (s: string) => categories.find((c) => c.slug === s)?.name ?? s;

  // Aktif filtre etiketleri
  const chips: { label: string; remove: () => void }[] = [];
  if (f.q) chips.push({ label: `“${f.q}”`, remove: () => update({ q: "", sayfa: 1 }) });
  const listChip = (key: "kategori" | "altKategori" | "malzeme" | "koleksiyon" | "tasarimci" | "rozet", label = (v: string) => v) =>
    f[key].forEach((v) => chips.push({ label: label(v), remove: () => update({ [key]: f[key].filter((x) => x !== v), sayfa: 1 } as Partial<FilterState>) }));
  listChip("kategori", catName); listChip("altKategori"); listChip("malzeme"); listChip("koleksiyon"); listChip("tasarimci"); listChip("rozet", (v) => badgeLabel[v] ?? v);
  if (f.eko) chips.push({ label: "Eko-tasarım", remove: () => update({ eko: false }) });
  if (f.hizli) chips.push({ label: "Hızlı teslimat", remove: () => update({ hizli: false }) });
  const range = (a: number | undefined, z: number | undefined, name: string, fmt: (n: number) => string, patch: Partial<FilterState>) => {
    if (a === undefined && z === undefined) return;
    chips.push({ label: `${name}: ${a !== undefined ? fmt(a) : "…"} - ${z !== undefined ? fmt(z) : "…"}`, remove: () => update({ ...patch, sayfa: 1 }) });
  };
  range(f.fiyatMin, f.fiyatMax, "Fiyat", formatPrice, { fiyatMin: undefined, fiyatMax: undefined });
  range(f.genMin, f.genMax, "Genişlik", (n) => `${n} cm`, { genMin: undefined, genMax: undefined });
  range(f.yukMin, f.yukMax, "Yükseklik", (n) => `${n} cm`, { yukMin: undefined, yukMax: undefined });
  range(f.derMin, f.derMax, "Derinlik", (n) => `${n} cm`, { derMin: undefined, derMax: undefined });

  const showEditorial = chips.length === 0 && results.length > 6 && !!category;

  return (
    <div>
      {/* Araç çubuğu */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-5 flex items-center justify-between gap-4 border-y border-line bg-paper/95 px-5 py-3 backdrop-blur sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
        <button onClick={() => setPanel(true)} className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em]">
          <SlidersHorizontal size={16} strokeWidth={1.3} /> Filtrele{chips.length > 0 && ` (${chips.length})`}
        </button>
        <p className="hidden text-[13px] text-mute sm:block" aria-live="polite">{results.length} ürün</p>
        <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em]">
          <span className="hidden sm:inline">Sırala</span>
          <select value={f.sirala} onChange={(e) => update({ sirala: e.target.value as FilterState["sirala"], sayfa: 1 })}
            aria-label="Sıralama" className="cursor-pointer bg-transparent py-1 text-[13px] normal-case tracking-normal outline-none">
            {sortOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </label>
      </div>

      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button key={c.label} onClick={c.remove} className="flex items-center gap-2 border border-line px-3 py-1.5 text-[13px] transition-colors hover:border-ink">
              {c.label}<X size={13} strokeWidth={1.5} /><span className="sr-only">filtresini kaldır</span>
            </button>
          ))}
          <button onClick={clear} className="link-line is-on ml-2 text-[13px]">Tümünü temizle</button>
        </div>
      )}

      {results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[22px] font-light">Bu seçimlere uygun ürün bulunamadı.</p>
          <button onClick={clear} className="mt-6 border border-ink px-7 py-3.5 text-[12px] uppercase tracking-[0.16em]">Filtreleri temizle</button>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {visible.map((p, i) => (
            <Fragment key={p.id}>
              <li><ProductCard p={p} priority={i < 3} /></li>
              {showEditorial && i === 3 && category && (
                <li className="col-span-2">
                  <Link href={`/urunler/?koleksiyon=${encodeURIComponent(items[0].collection)}`} className="group relative block h-full min-h-[420px] overflow-hidden bg-sand">
                    <Img id={category.image} alt="" sizes="(min-width:1024px) 66vw, 100vw" className="transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-7 text-paper sm:p-10">
                      <p className="text-[11px] uppercase tracking-[0.22em]">Koleksiyon</p>
                      <p className="mt-2 text-[40px] font-light lowercase leading-none sm:text-[56px]">{items[0].collection}</p>
                      <span className="link-line is-on mt-4 inline-block pb-1 text-[12px] uppercase tracking-[0.16em]">Tüm koleksiyon</span>
                    </div>
                  </Link>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      )}

      {results.length > 0 && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-[13px] text-mute">{results.length} ürünün {visible.length} tanesi gösteriliyor</p>
          <div className="h-px w-48 bg-line"><div className="h-px bg-ink transition-all" style={{ width: `${(visible.length / results.length) * 100}%` }} /></div>
          {visible.length < results.length && (
            <button onClick={() => update({ sayfa: f.sayfa + 1 })} className="mt-2 border border-ink px-10 py-3.5 text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper">
              Daha fazla göster
            </button>
          )}
        </div>
      )}

      <FilterPanel open={panel} onClose={() => setPanel(false)} items={items} f={f} update={update} clear={clear} resultCount={results.length} showCategory={!category} />
    </div>
  );
}

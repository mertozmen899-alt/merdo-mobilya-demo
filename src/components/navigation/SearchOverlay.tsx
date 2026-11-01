"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/data/catalog";
import { emptyFilters, matches } from "@/lib/filters";
import { useUI } from "@/store/selections";
import { useEscape, useLockBody } from "@/hooks/useUi";
import Img from "@/components/ui/Img";
import { cx, formatPrice } from "@/lib/utils";

const popular = ["kanepe", "berjer", "yemek masası", "deri", "lambader", "yatak"];

/** Üstten açılan arama paneli. Yazdıkça ürünler süzülür; Enter tüm sonuçları katalogda açar. */
export default function SearchOverlay() {
  const { searchOpen, set } = useUI();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const close = useCallback(() => set({ searchOpen: false }), [set]);

  useLockBody(searchOpen);
  useEscape(searchOpen, close);
  useEffect(() => { if (searchOpen) setTimeout(() => input.current?.focus(), 60); }, [searchOpen]);
  useEffect(() => { close(); }, [pathname, close]);

  const results = useMemo(() => (q.trim().length < 2 ? [] : products.filter((p) => matches(p, emptyFilters({ q: q.trim() })))), [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/urunler/?q=${encodeURIComponent(q.trim())}`);
    close();
  };

  return (
    <div className={cx("fixed inset-0 z-[55]", searchOpen ? "visible" : "invisible")} aria-hidden={!searchOpen}>
      <div onClick={close} className={cx("absolute inset-0 bg-black/30 transition-opacity duration-500", searchOpen ? "opacity-100" : "opacity-0")} />
      <div role="dialog" aria-label="Arama"
        className={cx("absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-paper pt-[calc(var(--topbar-h)+var(--header-h))] transition-transform duration-500 ease-lux", searchOpen ? "translate-y-0" : "-translate-y-full")}>
        <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-8 sm:px-10">
          <form onSubmit={submit} className="flex items-center gap-4 border-b border-ink pb-3">
            <Search size={22} strokeWidth={1.2} />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ürün, koleksiyon veya tasarımcı arayın"
              aria-label="Arama" className="w-full bg-transparent text-[22px] font-light outline-none placeholder:text-mute sm:text-[28px]" />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Temizle"><X size={20} strokeWidth={1.2} /></button>}
          </form>

          {q.trim().length < 2 ? (
            <div className="mt-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-mute">Popüler aramalar</p>
              <div className="flex flex-wrap gap-2">
                {popular.map((p) => (
                  <button key={p} onClick={() => setQ(p)} className="border border-line px-4 py-2 text-[14px] transition-colors hover:border-ink">{p}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="text-[11px] uppercase tracking-[0.2em] text-mute">{results.length} ürün bulundu</p>
                {results.length > 0 && <Link href={`/urunler/?q=${encodeURIComponent(q.trim())}`} className="link-line is-on text-[13px]">Tüm sonuçları gör</Link>}
              </div>
              {results.length === 0 ? (
                <p className="text-[15px] text-ink-soft">“{q}” için sonuç bulunamadı. Başka bir kelime deneyin.</p>
              ) : (
                <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link href={`/urun/${p.slug}/`} className="group block">
                        <div className="relative aspect-square overflow-hidden bg-sand"><Img id={p.images[0]} alt={`${p.name} ${p.title}`} sizes="200px" className="transition-transform duration-700 group-hover:scale-105" /></div>
                        <p className="mt-2 text-[14px] lowercase">{p.name}</p>
                        <p className="text-[12px] text-mute">{p.title}</p>
                        <p className="text-[12px]">{formatPrice(p.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

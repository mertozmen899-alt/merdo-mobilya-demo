"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/types";
import Modal from "@/components/ui/Modal";
import { categories } from "@/data/catalog";
import { bounds, facetCounts, type FilterState } from "@/lib/filters";
import { cx } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  items: Product[];
  f: FilterState;
  update: (patch: Partial<FilterState>) => void;
  clear: () => void;
  resultCount: number;
  showCategory: boolean;
}

type ListKey = "kategori" | "altKategori" | "malzeme" | "koleksiyon" | "tasarimci";

/** Sağdan açılan filtre paneli. Her seçim sonuçları anında günceller. */
export default function FilterPanel({ open, onClose, items, f, update, clear, resultCount, showCategory }: Props) {
  const b = bounds(items);
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  const facet = (key: ListKey, title: string, pick: (p: Product) => string[], label: (v: string) => string = (v) => v) => {
    const counts = facetCounts(items, f, key, pick);
    const all = Array.from(new Set(items.flatMap(pick))).sort((a, z) => label(a).localeCompare(label(z), "tr"));
    const selected = f[key];
    return (
      <Section title={title} badge={selected.length}>
        <ul className="space-y-1">
          {all.map((v) => {
            const n = counts.get(v) ?? 0;
            const on = selected.includes(v);
            return (
              <li key={v}>
                <label className={cx("flex cursor-pointer items-center gap-3 py-1.5 text-[14px]", n === 0 && !on && "text-mute/60")}>
                  <input type="checkbox" checked={on} disabled={n === 0 && !on}
                    onChange={() => update({ [key]: on ? selected.filter((x) => x !== v) : [...selected, v], sayfa: 1 } as Partial<FilterState>)}
                    className="h-4 w-4 accent-ink" />
                  <span className="flex-1">{label(v)}</span><span className="text-[12px] text-mute">{n}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </Section>
    );
  };

  return (
    <Modal open={open} onClose={onClose} title="Filtrele" side="right">
      <div className="flex min-h-full flex-col">
        <div className="flex-1 px-6">
          <Section title="Öne çıkanlar" badge={(f.eko ? 1 : 0) + (f.hizli ? 1 : 0)} defaultOpen>
            <Toggle label="Eko-tasarım" on={f.eko} onChange={(v) => update({ eko: v, sayfa: 1 })} />
            <Toggle label="Hızlı teslimat" on={f.hizli} onChange={(v) => update({ hizli: v, sayfa: 1 })} />
          </Section>
          {showCategory
            ? facet("kategori", "Kategori", (p) => [p.category], catName)
            : facet("altKategori", "Kategori", (p) => [p.subcategory])}
          {facet("malzeme", "Malzeme", (p) => p.materials)}
          {facet("koleksiyon", "Koleksiyon", (p) => [p.collection])}
          {facet("tasarimci", "Tasarımcı", (p) => [p.designer])}
          <Section title="Fiyat (₺)" badge={f.fiyatMin !== undefined || f.fiyatMax !== undefined ? 1 : 0}>
            <Range min={b.fiyat.min} max={b.fiyat.max} vMin={f.fiyatMin} vMax={f.fiyatMax} step={500} onCommit={(a, z) => update({ fiyatMin: a, fiyatMax: z, sayfa: 1 })} />
          </Section>
          <Section title="Ölçüler (cm)" badge={[f.genMin, f.genMax, f.yukMin, f.yukMax, f.derMin, f.derMax].filter((x) => x !== undefined).length ? 1 : 0}>
            <p className="mb-1 text-[12px] uppercase tracking-[0.14em] text-mute">Genişlik</p>
            <Range min={b.gen.min} max={b.gen.max} vMin={f.genMin} vMax={f.genMax} onCommit={(a, z) => update({ genMin: a, genMax: z, sayfa: 1 })} />
            <p className="mb-1 mt-5 text-[12px] uppercase tracking-[0.14em] text-mute">Yükseklik</p>
            <Range min={b.yuk.min} max={b.yuk.max} vMin={f.yukMin} vMax={f.yukMax} onCommit={(a, z) => update({ yukMin: a, yukMax: z, sayfa: 1 })} />
            <p className="mb-1 mt-5 text-[12px] uppercase tracking-[0.14em] text-mute">Derinlik</p>
            <Range min={b.der.min} max={b.der.max} vMin={f.derMin} vMax={f.derMax} onCommit={(a, z) => update({ derMin: a, derMax: z, sayfa: 1 })} />
          </Section>
        </div>
        <div className="sticky bottom-0 grid grid-cols-2 gap-3 border-t border-line bg-paper px-6 py-5">
          <button onClick={clear} className="border border-ink py-3.5 text-[12px] uppercase tracking-[0.14em]">Temizle</button>
          <button onClick={onClose} className="bg-ink py-3.5 text-[12px] uppercase tracking-[0.14em] text-paper">Ürünleri gör ({resultCount})</button>
        </div>
      </div>
    </Modal>
  );
}

function Section({ title, badge, children, defaultOpen }: { title: string; badge: number; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen || badge > 0);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between py-5 text-[13px] uppercase tracking-[0.16em]">
        <span>{title}{badge > 0 && <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-paper">{badge}</span>}</span>
        {open ? <Minus size={16} strokeWidth={1.2} /> : <Plus size={16} strokeWidth={1.2} />}
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2 text-[14px]">
      {label}
      <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)}
        className={cx("relative h-6 w-11 rounded-full transition-colors", on ? "bg-ink" : "bg-line")}>
        <span className={cx("absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform", on ? "translate-x-[22px]" : "translate-x-0.5")} />
      </button>
    </label>
  );
}

/** Min/maks alanları. Değer, alandan çıkınca veya Enter'a basınca uygulanır. */
function Range({ min, max, vMin, vMax, step = 1, onCommit }: { min: number; max: number; vMin?: number; vMax?: number; step?: number; onCommit: (a?: number, z?: number) => void }) {
  const [a, setA] = useState(vMin?.toString() ?? "");
  const [z, setZ] = useState(vMax?.toString() ?? "");
  useEffect(() => { setA(vMin?.toString() ?? ""); setZ(vMax?.toString() ?? ""); }, [vMin, vMax]);
  const commit = () => {
    const pa = a === "" ? undefined : Number(a); const pz = z === "" ? undefined : Number(z);
    if (pa !== vMin || pz !== vMax) onCommit(pa, pz);
  };
  const field = "w-full border-b border-line bg-transparent py-2 text-[14px] outline-none focus:border-ink";
  return (
    <div className="grid grid-cols-2 gap-4" onKeyDown={(e) => e.key === "Enter" && commit()}>
      <label className="text-[12px] text-mute">En az
        <input type="number" inputMode="numeric" min={min} max={max} step={step} value={a} placeholder={String(min)} onChange={(e) => setA(e.target.value)} onBlur={commit} className={field} />
      </label>
      <label className="text-[12px] text-mute">En çok
        <input type="number" inputMode="numeric" min={min} max={max} step={step} value={z} placeholder={String(max)} onChange={(e) => setZ(e.target.value)} onBlur={commit} className={field} />
      </label>
    </div>
  );
}

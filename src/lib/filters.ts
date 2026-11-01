import type { Product } from "@/types";
import { categories } from "@/data/catalog";

/*
  Katalog filtre motoru. Tüm durum URL sorgu parametrelerinde tutulur,
  böylece sayfa yenilendiğinde veya bağlantı paylaşıldığında seçimler korunur.
*/

export const PAGE_SIZE = 12;

export type SortKey = "onerilen" | "az" | "za" | "fiyat-artan" | "fiyat-azalan";
export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "onerilen", label: "Önerilen" },
  { key: "az", label: "Alfabetik A-Z" },
  { key: "za", label: "Alfabetik Z-A" },
  { key: "fiyat-artan", label: "Fiyat (artan)" },
  { key: "fiyat-azalan", label: "Fiyat (azalan)" },
];

export interface FilterState {
  q: string;
  kategori: string[];
  altKategori: string[];
  malzeme: string[];
  koleksiyon: string[];
  tasarimci: string[];
  rozet: string[];
  eko: boolean;
  hizli: boolean;
  fiyatMin?: number; fiyatMax?: number;
  genMin?: number; genMax?: number;
  yukMin?: number; yukMax?: number;
  derMin?: number; derMax?: number;
  sirala: SortKey;
  sayfa: number;
}

const list = (p: URLSearchParams, k: string) => p.getAll(k).flatMap((v) => v.split(",")).filter(Boolean);
const num = (p: URLSearchParams, k: string) => { const v = p.get(k); if (v === null || v === "") return undefined; const n = Number(v); return Number.isFinite(n) ? n : undefined; };

export function parseFilters(p: URLSearchParams): FilterState {
  const sirala = (p.get("sirala") as SortKey) || "onerilen";
  return {
    q: p.get("q") ?? "",
    kategori: list(p, "kategori"), altKategori: list(p, "alt"), malzeme: list(p, "malzeme"),
    koleksiyon: list(p, "koleksiyon"), tasarimci: list(p, "tasarimci"), rozet: list(p, "rozet"),
    eko: p.get("eko") === "1", hizli: p.get("hizli") === "1",
    fiyatMin: num(p, "fiyatMin"), fiyatMax: num(p, "fiyatMax"),
    genMin: num(p, "genMin"), genMax: num(p, "genMax"),
    yukMin: num(p, "yukMin"), yukMax: num(p, "yukMax"),
    derMin: num(p, "derMin"), derMax: num(p, "derMax"),
    sirala: sortOptions.some((o) => o.key === sirala) ? sirala : "onerilen",
    sayfa: Math.max(1, Number(p.get("sayfa")) || 1),
  };
}

export function toSearch(f: FilterState): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  const add = (k: string, v: string[]) => v.length && p.set(k, v.join(","));
  add("kategori", f.kategori); add("alt", f.altKategori); add("malzeme", f.malzeme);
  add("koleksiyon", f.koleksiyon); add("tasarimci", f.tasarimci); add("rozet", f.rozet);
  if (f.eko) p.set("eko", "1");
  if (f.hizli) p.set("hizli", "1");
  (["fiyatMin", "fiyatMax", "genMin", "genMax", "yukMin", "yukMax", "derMin", "derMax"] as const)
    .forEach((k) => { if (f[k] !== undefined) p.set(k, String(f[k])); });
  if (f.sirala !== "onerilen") p.set("sirala", f.sirala);
  if (f.sayfa > 1) p.set("sayfa", String(f.sayfa));
  const s = p.toString();
  return s ? `?${s}` : "";
}

const norm = (s: string) => s.toLocaleLowerCase("tr-TR");
const inRange = (v: number, min?: number, max?: number) => (min === undefined || v >= min) && (max === undefined || v <= max);

/** Bir ürünün herhangi bir ölçü seçeneği aralığa uyuyorsa ürün eşleşir. */
const sizeMatch = (p: Product, f: FilterState) =>
  p.sizes.some((s) => inRange(s.width, f.genMin, f.genMax) && inRange(s.height, f.yukMin, f.yukMax) && inRange(s.depth, f.derMin, f.derMax));

export function matches(p: Product, f: FilterState, ignore?: keyof FilterState) {
  if (f.q && ignore !== "q") {
    const cat = categories.find((c) => c.slug === p.category)?.name ?? "";
    const hay = norm([p.name, p.title, p.type, p.designer, p.collection, cat, ...p.materials].join(" "));
    if (!norm(f.q).split(/\s+/).every((w) => hay.includes(w))) return false;
  }
  if (ignore !== "kategori" && f.kategori.length && !f.kategori.includes(p.category)) return false;
  if (ignore !== "altKategori" && f.altKategori.length && !f.altKategori.includes(p.subcategory)) return false;
  if (ignore !== "malzeme" && f.malzeme.length && !f.malzeme.some((m) => p.materials.includes(m as never))) return false;
  if (ignore !== "koleksiyon" && f.koleksiyon.length && !f.koleksiyon.includes(p.collection)) return false;
  if (ignore !== "tasarimci" && f.tasarimci.length && !f.tasarimci.includes(p.designer)) return false;
  if (ignore !== "rozet" && f.rozet.length && !(p.badge && f.rozet.includes(p.badge))) return false;
  if (f.eko && !p.eco) return false;
  if (f.hizli && !p.fastDelivery) return false;
  if (!inRange(p.price, f.fiyatMin, f.fiyatMax)) return false;
  if (!sizeMatch(p, f)) return false;
  return true;
}

export function sortProducts(items: Product[], key: SortKey) {
  const a = [...items];
  const coll = (x: string, y: string) => x.localeCompare(y, "tr");
  switch (key) {
    case "az": return a.sort((x, y) => coll(x.name + x.title, y.name + y.title));
    case "za": return a.sort((x, y) => coll(y.name + y.title, x.name + x.title));
    case "fiyat-artan": return a.sort((x, y) => x.price - y.price);
    case "fiyat-azalan": return a.sort((x, y) => y.price - x.price);
    default: return a;
  }
}

/** Bir yüz (facet) için seçenek sayıları: o yüz dışındaki filtreler uygulanmış haliyle. */
export function facetCounts(items: Product[], f: FilterState, key: "altKategori" | "kategori" | "malzeme" | "koleksiyon" | "tasarimci", pick: (p: Product) => string[]) {
  const counts = new Map<string, number>();
  items.filter((p) => matches(p, f, key)).forEach((p) => pick(p).forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1)));
  return counts;
}

export function bounds(items: Product[]) {
  const all = items.flatMap((p) => p.sizes);
  const r = (vals: number[]) => ({ min: Math.min(...vals), max: Math.max(...vals) });
  return {
    fiyat: r(items.map((p) => p.price)),
    gen: r(all.map((s) => s.width)), yuk: r(all.map((s) => s.height)), der: r(all.map((s) => s.depth)),
  };
}

export const emptyFilters = (base?: Partial<FilterState>): FilterState => ({
  q: "", kategori: [], altKategori: [], malzeme: [], koleksiyon: [], tasarimci: [], rozet: [],
  eko: false, hizli: false, sirala: "onerilen", sayfa: 1, ...base,
});

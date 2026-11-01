"use client";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/catalog";
import { useSelections } from "@/store/selections";

export default function SelectionsPage() {
  const slugs = useSelections((s) => s.slugs);
  const clear = useSelections((s) => s.clear);
  const items = products.filter((p) => slugs.includes(p.slug));
  return (
    <div className="px-5 pt-[calc(var(--topbar-h)+var(--header-h))] sm:px-10 lg:px-16">
      <div className="py-8">
        <Breadcrumb items={[{ label: "Seçimlerim" }]} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[44px] font-light lowercase leading-none sm:text-[64px]">seçimlerim</h1>
          {items.length > 0 && <button onClick={clear} className="link-line is-on text-[13px]">Listeyi temizle</button>}
        </div>
        <p className="mt-5 text-[15px] font-light text-ink-soft">Beğendiğiniz ürünler bu tarayıcıda saklanır. Showroom ziyaretinizde bu listeyi ekibimize gösterebilirsiniz.</p>
      </div>
      {items.length === 0 ? (
        <div className="border-t border-line py-20 text-center">
          <p className="text-[22px] font-light">Henüz ürün eklemediniz.</p>
          <p className="mt-2 text-[14px] text-mute">Ürün kartlarındaki kalp simgesine dokunarak ekleyebilirsiniz.</p>
          <Link href="/urunler/" className="mt-8 inline-block border border-ink px-8 py-3.5 text-[12px] uppercase tracking-[0.16em]">Ürünleri keşfet</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {items.map((p) => <li key={p.id}><ProductCard p={p} /></li>)}
        </ul>
      )}
    </div>
  );
}

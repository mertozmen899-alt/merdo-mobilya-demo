import { Suspense } from "react";
import type { Metadata } from "next";
import Catalog from "@/components/products/Catalog";
import ListingHeader from "@/components/products/ListingHeader";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = { title: "Tüm ürünler", description: "Kanepe, koltuk, sehpa, yemek masası, sandalye, yatak ve aydınlatma." };

export default function AllProductsPage() {
  return (
    <div className="px-5 pt-[calc(var(--topbar-h)+var(--header-h))] sm:px-10 lg:px-16">
      <ListingHeader title="tüm ürünler" crumbs={[{ label: "Ürünler" }]}
        intro="Oturma odasından yatak odasına tüm koleksiyonlarımız. Filtreleri kullanarak malzemeye, tasarımcıya, fiyata ve ölçüye göre arayın."
        links={categories.map((c) => ({ label: c.name, href: `/urunler/${c.slug}/` }))} />
      <Suspense fallback={<div className="h-[60vh]" />}>
        <Catalog items={products} />
      </Suspense>
    </div>
  );
}

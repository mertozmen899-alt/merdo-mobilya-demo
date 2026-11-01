import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Catalog from "@/components/products/Catalog";
import ListingHeader from "@/components/products/ListingHeader";
import { categories, getCategory, productsByCategory } from "@/data/catalog";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const c = getCategory((await params).kategori);
  return c ? { title: c.name, description: c.intro } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) notFound();
  const items = productsByCategory(c.slug);
  const siblings = categories.filter((x) => x.room === c.room);
  return (
    <div className="px-5 pt-[calc(var(--topbar-h)+var(--header-h))] sm:px-10 lg:px-16">
      <ListingHeader title={c.name} intro={c.intro} crumbs={[{ label: "Ürünler", href: "/urunler/" }, { label: c.name }]}
        links={siblings.map((s) => ({ label: s.name, href: `/urunler/${s.slug}/`, active: s.slug === c.slug }))} />
      <Suspense fallback={<div className="h-[60vh]" />}>
        <Catalog items={items} category={c} />
      </Suspense>
    </div>
  );
}

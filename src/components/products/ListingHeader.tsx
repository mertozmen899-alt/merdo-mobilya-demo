"use client";
import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { cx } from "@/lib/utils";

/** Katalog başlığı: konum, başlık, giriş metni ve alt kategori kısayolları. */
export default function ListingHeader({ title, intro, crumbs, links }: { title: string; intro: string; crumbs: { label: string; href?: string }[]; links?: { label: string; href: string; active?: boolean }[] }) {
  const [more, setMore] = useState(false);
  return (
    <header className="pb-8 pt-8">
      <Breadcrumb items={crumbs} />
      <h1 className="mt-6 text-[44px] font-light lowercase leading-none sm:text-[64px]">{title}</h1>
      <p className={cx("mt-5 max-w-2xl text-[15px] font-light leading-7 text-ink-soft", !more && "line-clamp-2 sm:line-clamp-none")}>{intro}</p>
      <button onClick={() => setMore(!more)} className="mt-1 text-[13px] underline sm:hidden">{more ? "Daha az" : "Devamını oku"}</button>
      {links && links.length > 0 && (
        <ul className="no-scrollbar -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {links.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link href={l.href} className={cx("block border px-4 py-2 text-[13px] transition-colors", l.active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

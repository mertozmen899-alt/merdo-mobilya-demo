import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { designers, products } from "@/data/catalog";

export const metadata: Metadata = { title: "Tasarımcılar" };

export default function DesignersPage() {
  return (
    <div className="px-5 pt-[calc(var(--topbar-h)+var(--header-h))] sm:px-10 lg:px-16">
      <div className="py-8">
        <Breadcrumb items={[{ label: "Tasarımcılar" }]} />
        <h1 className="mt-6 text-[44px] font-light lowercase leading-none sm:text-[64px]">tasarımcılar</h1>
      </div>
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {designers.map((d) => {
          const n = products.filter((p) => p.designer === d.name).length;
          return (
            <li key={d.slug} id={d.slug} className="scroll-mt-40">
              <Reveal>
                <Link href={`/urunler/?tasarimci=${encodeURIComponent(d.name)}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand"><Img id={d.image} alt="" sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-[1200ms] group-hover:scale-105" /></div>
                  <h2 className="mt-4 text-[24px] font-light">{d.name}</h2>
                  <p className="mt-2 text-[14px] font-light leading-6 text-ink-soft">{d.bio}</p>
                  <span className="link-line is-on mt-3 inline-block text-[12px] uppercase tracking-[0.16em]">{n} ürün</span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

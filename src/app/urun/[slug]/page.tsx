import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import Configurator from "@/components/products/Configurator";
import Description from "@/components/products/Description";
import ProductCard from "@/components/products/ProductCard";
import Carousel from "@/components/ui/Carousel";
import Img from "@/components/ui/Img";
import { getCategory, getDesigner, getProduct, products } from "@/data/catalog";
import { site } from "@/data/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.name} ${p.title}`, description: p.description.slice(0, 155) } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const designer = getDesigner(p.designer);
  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.collection === p.collection)).slice(0, 8);

  return (
    <div className="pt-[calc(var(--topbar-h)+var(--header-h))]">
      <div className="px-5 pt-6 sm:px-10 lg:px-16">
        <Breadcrumb items={[{ label: cat.name, href: `/urunler/${cat.slug}/` }, { label: p.name }]} />
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14 lg:px-16">
        <ProductGallery p={p} />
        <div className="px-5 sm:px-10 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start lg:px-0">
          <Configurator p={p} />
          <div className="mt-10"><Description p={p} /></div>
        </div>
      </div>

      {/* Tasarımcı */}
      {designer && (
        <section className="mt-24 grid items-center gap-10 bg-sand md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[460px]"><Img id={designer.image} alt="" sizes="50vw" /></div>
          <div className="px-6 pb-12 md:px-12 md:py-16">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mute">Tasarımcı</p>
            <h2 className="mt-3 text-[36px] font-light">{designer.name}</h2>
            <p className="mt-4 max-w-md text-[15px] font-light leading-7 text-ink-soft">{designer.bio}</p>
            <Link href={`/urunler/?tasarimci=${encodeURIComponent(designer.name)}`} className="link-line is-on mt-6 inline-block pb-1 text-[12px] uppercase tracking-[0.16em]">Tasarımcının ürünleri</Link>
          </div>
        </section>
      )}

      {/* İlgili ürünler */}
      {related.length > 0 && (
        <div className="mt-24">
          <Carousel title="bunlar da ilginizi çekebilir" eyebrow={`${p.collection} koleksiyonu ve ${cat.name.toLocaleLowerCase("tr")}`}>
            {related.map((r) => <ProductCard key={r.id} p={r} sizes="(min-width:1024px) 25vw, 78vw" />)}
          </Carousel>
        </div>
      )}

      {/* Hizmetler */}
      <section className="mt-24 grid gap-px border-y border-line bg-line sm:grid-cols-3">
        {[
          { t: "Dekorasyon danışmanlığı", d: "İç mimarlarımızla ücretsiz yerleşim planı.", h: "/sayfa/dekorasyon-danismanligi/" },
          { t: "Kişiselleştirme", d: "Kumaş kartelamızı showroom'da inceleyin.", h: "/magaza/" },
          { t: "Bize ulaşın", d: `${site.phone}`, h: site.phoneHref },
        ].map((s) => (
          <Link key={s.t} href={s.h} className="group bg-paper px-8 py-10 transition-colors hover:bg-sand">
            <h3 className="text-[20px] font-light">{s.t}</h3>
            <p className="mt-2 text-[14px] text-mute">{s.d}</p>
            <span className="link-line mt-4 inline-block text-[12px] uppercase tracking-[0.16em] group-hover:bg-[length:100%_1px]">Devam et</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

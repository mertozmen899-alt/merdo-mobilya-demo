import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Img from "@/components/ui/Img";
import { ButtonLink } from "@/components/ui/Button";
import { contentPages, getContentPage, site } from "@/data/content";

export const dynamicParams = false;
export function generateStaticParams() { return contentPages.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getContentPage((await params).slug);
  return p ? { title: p.title, description: p.intro } : {};
}

export default async function ContentPageView({ params }: { params: Promise<{ slug: string }> }) {
  const p = getContentPage((await params).slug);
  if (!p) notFound();
  return (
    <div className="pt-[calc(var(--topbar-h)+var(--header-h))]">
      <div className="relative h-[56vh] min-h-[360px] bg-sand">
        <Img id={p.image} alt="" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 px-5 pb-10 text-paper sm:px-10 lg:px-16">
          <p className="text-[11px] uppercase tracking-[0.22em]">{p.eyebrow}</p>
          <h1 className="mt-3 text-[44px] font-light lowercase leading-none sm:text-[68px]">{p.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-10">
        <Breadcrumb items={[{ label: p.title }]} />
        <p className="mt-8 text-[20px] font-light leading-8">{p.intro}</p>
        {p.sections.length > 0 && (
          <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
            {p.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-[12px] uppercase tracking-[0.18em]">{s.heading}</h2>
                <p className="mt-3 text-[15px] font-light leading-7 text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/magaza/">Showroom ve randevu</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">Bizi arayın</ButtonLink>
        </div>
      </div>
    </div>
  );
}

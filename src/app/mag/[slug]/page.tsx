import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Img from "@/components/ui/Img";
import Carousel from "@/components/ui/Carousel";
import MagCard from "@/components/home/MagCard";
import { articles, getArticle } from "@/data/content";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  return (
    <article className="pt-[calc(var(--topbar-h)+var(--header-h))]">
      <div className="relative h-[70vh] min-h-[420px] bg-sand"><Img id={a.image} alt="" priority /></div>
      <div className="mx-auto max-w-[760px] px-5 py-12 sm:px-10">
        <Breadcrumb items={[{ label: "Mag", href: "/mag/" }, { label: a.category }]} />
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-mute">{a.category} · {a.date}</p>
        <h1 className="mt-3 text-[38px] font-light leading-tight sm:text-[52px]">{a.title}</h1>
        <p className="mt-6 text-[19px] font-light leading-8">{a.excerpt}</p>
        <div className="mt-8 space-y-6 text-[16px] font-light leading-8 text-ink-soft">{a.body.map((t, i) => <p key={i}>{t}</p>)}</div>
      </div>
      <div className="mt-10">
        <Carousel title="diğer yazılar">{articles.filter((x) => x.slug !== a.slug).map((x) => <MagCard key={x.slug} a={x} />)}</Carousel>
      </div>
    </article>
  );
}

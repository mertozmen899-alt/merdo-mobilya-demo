import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import MagCard from "@/components/home/MagCard";
import Reveal from "@/components/ui/Reveal";
import { articles } from "@/data/content";

export const metadata: Metadata = { title: "Mag", description: "Dekorasyon önerileri, koleksiyon hikâyeleri ve atölyeden haberler." };

export default function MagPage() {
  return (
    <div className="px-5 pt-[calc(var(--topbar-h)+var(--header-h))] sm:px-10 lg:px-16">
      <div className="py-8">
        <Breadcrumb items={[{ label: "Mag" }]} />
        <h1 className="mt-6 text-[44px] font-light lowercase leading-none sm:text-[64px]">mag</h1>
        <p className="mt-5 max-w-2xl text-[15px] font-light leading-7 text-ink-soft">Dekorasyon önerileri, koleksiyon hikâyeleri ve atölyemizden notlar.</p>
      </div>
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => <li key={a.slug}><Reveal><MagCard a={a} /></Reveal></li>)}
      </ul>
    </div>
  );
}

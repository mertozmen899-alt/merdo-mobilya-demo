import Link from "next/link";
import type { Article } from "@/types";
import Img from "@/components/ui/Img";

export default function MagCard({ a }: { a: Article }) {
  return (
    <Link href={`/mag/${a.slug}/`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Img id={a.image} alt="" sizes="(min-width:1024px) 25vw, 78vw" className="transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.05]" />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-mute">{a.category}</p>
      <h3 className="mt-1.5 text-[19px] font-light leading-snug">{a.title}</h3>
    </Link>
  );
}

import Link from "next/link";
import { promoTiles } from "@/data/content";
import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";

/** Kampanya ve hizmet kutuları: masaüstünde 2 sütun, mobilde alt alta. */
export default function PromoTiles() {
  return (
    <section aria-label="Kampanyalar ve hizmetler" className="grid gap-1 pt-1 md:grid-cols-2">
      {promoTiles.map((t, i) => (
        <Reveal key={t.title}>
          <Link href={t.href} className="group relative block aspect-[4/5] overflow-hidden bg-sand md:aspect-[1/1]">
            <Img id={t.image} alt="" sizes="(min-width: 768px) 50vw, 100vw" priority={i < 2} className="transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-paper sm:p-10">
              <h2 className="text-[34px] font-light lowercase leading-none sm:text-[44px]">{t.title}</h2>
              <p className="mt-3 max-w-sm text-[15px] font-light text-paper/90">{t.text}</p>
              <span className="link-line is-on mt-5 inline-block pb-1 text-[12px] uppercase tracking-[0.18em]">{t.cta}</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}

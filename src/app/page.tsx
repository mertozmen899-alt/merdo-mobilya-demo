import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import PromoTiles from "@/components/home/PromoTiles";
import Carousel from "@/components/ui/Carousel";
import MagCard from "@/components/home/MagCard";
import { articles, site } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">{site.brand}: {site.city}&apos;da çağdaş mobilya</h1>
      <HeroSlider />
      <PromoTiles />

      <div className="mt-24">
        <Carousel title="mag" eyebrow="İlham, dekorasyon ve atölye"
          action={<Link href="/mag/" className="link-line is-on hidden text-[12px] uppercase tracking-[0.16em] sm:inline">Tüm yazılar</Link>}>
          {articles.map((a) => <MagCard key={a.slug} a={a} />)}
        </Carousel>
      </div>

      {/* Fiyat dipnotları */}
      <section aria-label="Fiyat bilgileri" className="mx-auto mt-20 max-w-[1200px] space-y-2 px-5 text-[11px] leading-5 text-mute sm:px-10">
        <p>* {site.campaign.name} kampanyası {site.campaign.from} - {site.campaign.to} tarihleri arasında, seçili ürünlerde ve stoklarla sınırlı olarak geçerlidir.</p>
        <p>** Keşif Fiyatı, yeni koleksiyon ürünlerinde lansman dönemine özel tanıtım fiyatıdır. Fiyatlara teslimat dahil değildir. Bu sitedeki fiyatlar demo amaçlıdır.</p>
      </section>
    </>
  );
}

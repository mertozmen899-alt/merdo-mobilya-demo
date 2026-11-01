import { Suspense } from "react";
import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Img from "@/components/ui/Img";
import StoreClient from "./StoreClient";
import { site } from "@/data/content";

export const metadata: Metadata = { title: `${site.city} Showroom`, description: `${site.brand} ${site.city} showroom adresi, çalışma saatleri ve randevu.` };

export default function StorePage() {
  return (
    <div className="pt-[calc(var(--topbar-h)+var(--header-h))]">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] bg-sand lg:aspect-auto lg:min-h-[calc(100vh-var(--header-h))]"><Img id="1583847268964-b28dc8f51f92" alt={`${site.brand} ${site.city} showroom (temsilî görsel)`} sizes="50vw" priority /></div>
        <div className="px-5 py-10 sm:px-10 lg:px-16 lg:py-16">
          <Breadcrumb items={[{ label: "Mağazamız" }]} />
          <h1 className="mt-6 text-[44px] font-light lowercase leading-none sm:text-[60px]">{site.city} showroom</h1>
          <p className="mt-5 max-w-lg text-[15px] font-light leading-7 text-ink-soft">Tüm koleksiyonlarımızı, kumaş kartelalarımızı ve deri örneklerimizi showroom&apos;umuzda yakından görebilirsiniz. Dekorasyon danışmanlığı için randevu almanızı öneririz.</p>
          <div className="mt-10"><Suspense><StoreClient /></Suspense></div>
        </div>
      </div>
    </div>
  );
}

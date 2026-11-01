"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUp, Globe, MapPin, Minus, Plus } from "lucide-react";
import { footerColumns } from "@/data/navigation";
import { site } from "@/data/content";
import { useUI } from "@/store/selections";
import { cx } from "@/lib/utils";

const cities = ["Çorum", "Amasya", "Sungurlu", "Osmancık", "İskilip", "Alaca", "Yozgat", "Samsun"];

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "Pinterest", href: "https://www.pinterest.com/" },
  { name: "YouTube", href: "https://www.youtube.com/" },
];

export default function Footer() {
  return (
    <footer id="footer" className="mt-24">
      <div className="flex justify-center border-t border-line py-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em]">
          <ArrowUp size={14} strokeWidth={1.3} /> Sayfa başına dön
        </button>
      </div>
      <StoreLocator />
      <SocialNewsletter />
      <BrandText />
      <Columns />
      <BottomBar />
    </footer>
  );
}

/** Mağaza bulucu: şehir önerili arama. Demo sitede tek mağaza vardır, sonuç mağaza sayfasında gösterilir. */
function StoreLocator() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const sugg = cities.filter((c) => c.toLocaleLowerCase("tr").startsWith(q.toLocaleLowerCase("tr")) && q);
  const go = (city: string) => router.push(`/magaza/?sehir=${encodeURIComponent(city)}`);
  return (
    <section className="bg-sand px-5 py-12 sm:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <MapPin size={26} strokeWidth={1} />
          <div>
            <h2 className="text-[22px] font-light">Mağaza bulun</h2>
            <p className="text-[13px] text-mute">Showroom&apos;umuzu ziyaret edin, ürünleri yakından görün.</p>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); go(q || site.city); }} className="relative w-full md:w-[420px]">
          <label htmlFor="sehir" className="sr-only">Şehir</label>
          <input id="sehir" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)}
            placeholder="Şehir veya ilçe yazın" autoComplete="off"
            className="w-full border-b border-ink bg-transparent py-3 pr-20 text-[15px] outline-none placeholder:text-mute" />
          <button type="submit" className="absolute right-0 top-3 text-[12px] uppercase tracking-[0.16em]">Bul</button>
          {focus && sugg.length > 0 && (
            <ul className="absolute inset-x-0 top-full z-10 border border-line bg-paper shadow-sm">
              {sugg.map((c) => <li key={c}><button type="button" onMouseDown={() => go(c)} className="w-full px-4 py-2.5 text-left text-[14px] hover:bg-sand">{c}</button></li>)}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
}

function SocialNewsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <section className="px-5 py-14 sm:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-[22px] font-light">Bizi takip edin</h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-[0.14em]">
            {socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noreferrer" className="link-line">{s.name}</a></li>)}
          </ul>
          <p className="mt-3 text-[12px] text-mute">Sosyal medya bağlantıları mağazanın kendi hesaplarıyla değiştirilecektir.</p>
        </div>
        <div>
          <h2 className="text-[22px] font-light">Bültene kaydolun</h2>
          {ok ? (
            <p className="mt-5 text-[15px]" role="status">Teşekkürler. {email} adresi bülten listesine eklendi (demo, kayıt sunucuya gönderilmez).</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="mt-5">
              <div className="flex border-b border-ink">
                <label htmlFor="bulten" className="sr-only">E-posta</label>
                <input id="bulten" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta adresiniz"
                  className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-mute" />
                <button type="submit" disabled={!consent} className="text-[12px] uppercase tracking-[0.16em] disabled:opacity-40">Kaydol</button>
              </div>
              <label className="mt-3 flex items-start gap-2 text-[12px] text-mute">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-ink" />
                <span>Kampanya ve yeniliklerden e-posta ile haberdar olmayı kabul ediyorum. <Link href="/sayfa/kvkk/" className="underline">KVKK metni</Link></span>
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function BrandText() {
  return (
    <section className="border-t border-line px-5 py-12 sm:px-10">
      <p className="mx-auto max-w-[820px] text-center text-[14px] leading-7 text-ink-soft">
        {site.brand}, {site.city}&apos;da kurulan çağdaş bir mobilya markasıdır. Kanepeden yemek masasına kadar tüm ürünlerimiz kendi atölyemizde,
        yerel ustalarla üretilir. Kumaş, renk ve ölçü seçenekleriyle her parça evinize göre kişiselleştirilebilir.
      </p>
    </section>
  );
}

function Columns() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="border-t border-line px-5 sm:px-10">
      <div className="mx-auto grid max-w-[1200px] md:grid-cols-4 md:gap-10 md:py-14">
        {footerColumns.map((col) => {
          const isOpen = open === col.title;
          return (
            <div key={col.title} className="border-b border-line md:border-0">
              <h3>
                <button onClick={() => setOpen(isOpen ? null : col.title)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-5 text-[12px] uppercase tracking-[0.18em] md:pointer-events-none md:py-0 md:pb-5">
                  {col.title}<span className="md:hidden">{isOpen ? <Minus size={16} strokeWidth={1.2} /> : <Plus size={16} strokeWidth={1.2} />}</span>
                </button>
              </h3>
              <ul className={cx("space-y-2.5 overflow-hidden pb-5 text-[14px] text-ink-soft md:block md:pb-0", isOpen ? "block" : "hidden")}>
                {col.links.map((l) => <li key={l.href}><Link href={l.href} className="link-line">{l.label}</Link></li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BottomBar() {
  const set = useUI((s) => s.set);
  return (
    <div className="bg-ink px-5 py-6 text-[12px] text-paper/80 sm:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link href="/sayfa/iletisim/" className="link-line">İletişim</Link></li>
          <li><Link href="/magaza/" className="link-line">Mağazamız</Link></li>
          <li><Link href="/sayfa/kvkk/" className="link-line">Gizlilik ve KVKK</Link></li>
          <li>© 2026 {site.legalName} · Demo site</li>
        </ul>
        <button onClick={() => set({ countryOpen: true })} className="flex items-center gap-2 uppercase tracking-[0.14em]">
          <Globe size={14} strokeWidth={1.3} /> Türkiye | Türkçe
        </button>
      </div>
    </div>
  );
}

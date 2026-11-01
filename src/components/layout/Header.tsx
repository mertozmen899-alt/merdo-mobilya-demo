"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, MapPin, Menu, Search, User } from "lucide-react";
import { useSelections, useUI } from "@/store/selections";
import { site } from "@/data/content";
import { cx } from "@/lib/utils";

/**
 * Üst başlık.
 * Ana sayfada en üstteyken slider üzerinde şeffaf ve beyaz yazılıdır; kaydırınca beyaz zemine geçer.
 * Aşağı kaydırırken gizlenir, yukarı kaydırırken geri gelir.
 */
export default function Header() {
  const isHome = usePathname() === "/";
  const { set, menuOpen, searchOpen } = useUI();
  const count = useSelections((s) => s.slugs.length);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > 400 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen && !searchOpen;
  const iconBtn = "flex items-center gap-2 p-2 text-[12px] uppercase tracking-[0.16em]";

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,color] duration-500 ease-lux",
        hidden && !menuOpen && !searchOpen ? "-translate-y-full" : scrolled ? "-translate-y-[var(--topbar-h)]" : "translate-y-0",
        transparent ? "text-paper" : "bg-paper text-ink",
      )}
    >
      {/* Duyuru şeridi */}
      <div className="flex h-[var(--topbar-h)] items-center justify-center bg-ink px-4 text-center text-[11px] tracking-[0.12em] text-paper">
        <Link href="/urunler/?rozet=ozel-gunler" className="truncate uppercase">
          {site.campaign.name}: {site.campaign.from} - {site.campaign.to}
          <span className="hidden sm:inline"> &nbsp;·&nbsp; Ücretsiz dekorasyon danışmanlığı</span>
        </Link>
      </div>

      <div className={cx("grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-6 lg:px-10", !transparent && "border-b border-line")}>
        <div className="flex items-center gap-1 sm:gap-3">
          <button className={iconBtn} onClick={() => set({ menuOpen: true, searchOpen: false })} aria-label="Menüyü aç" aria-expanded={menuOpen}>
            <Menu size={22} strokeWidth={1.2} /><span className="hidden lg:inline">Menü</span>
          </button>
          <button className={iconBtn} onClick={() => set({ searchOpen: !searchOpen, menuOpen: false })} aria-label="Ara" aria-expanded={searchOpen}>
            <Search size={20} strokeWidth={1.2} /><span className="hidden lg:inline">Ara</span>
          </button>
        </div>

        <Link href="/" aria-label={`${site.brand} ana sayfa`} className="text-[26px] font-light lowercase leading-none tracking-[0.34em] sm:text-[30px] lg:text-[34px]" style={{ paddingLeft: "0.34em" }}>
          {site.brand}
        </Link>

        <div className="flex items-center justify-end gap-0 sm:gap-2">
          <Link href="/magaza/" className={cx(iconBtn, "hidden md:flex")}><MapPin size={20} strokeWidth={1.2} /><span className="hidden xl:inline">Mağazamız</span></Link>
          <Link href="/secimlerim/" className={cx(iconBtn, "relative")} aria-label={`Seçimlerim (${count})`}>
            <Heart size={20} strokeWidth={1.2} />
            <span className="hidden xl:inline">Seçimlerim</span>
            {count > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-promo px-1 text-[10px] tracking-normal text-paper xl:static">{count}</span>}
          </Link>
          <button className={iconBtn} onClick={() => set({ accountOpen: true })} aria-label="Hesabım">
            <User size={20} strokeWidth={1.2} />
          </button>
        </div>
      </div>
    </header>
  );
}

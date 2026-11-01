"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronRight, Globe, MapPin, Phone, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/content";
import { useUI } from "@/store/selections";
import { useEscape, useLockBody } from "@/hooks/useUi";
import Img from "@/components/ui/Img";
import { cx } from "@/lib/utils";

/**
 * Soldan açılan menü (mega menü).
 * Masaüstünde alt menü ilk panelin yanında açılır; mobilde aynı alanda "Geri" ile katmanlı ilerler.
 */
export default function MenuPanel() {
  const { menuOpen, set } = useUI();
  const [active, setActive] = useState<number | null>(null);
  const pathname = usePathname();
  const first = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { set({ menuOpen: false }); }, [set]);

  useLockBody(menuOpen);
  useEscape(menuOpen, () => (active !== null ? setActive(null) : close()));
  useEffect(() => { close(); setActive(null); }, [pathname, close]);
  useEffect(() => { if (menuOpen) setTimeout(() => first.current?.focus(), 50); else setActive(null); }, [menuOpen]);

  const item = active !== null ? mainNav[active] : null;

  return (
    <div className={cx("fixed inset-0 z-[70]", menuOpen ? "visible" : "invisible")} aria-hidden={!menuOpen}>
      <div onClick={close} className={cx("absolute inset-0 bg-black/40 transition-opacity duration-500", menuOpen ? "opacity-100" : "opacity-0")} />

      <nav aria-label="Ana menü"
        className={cx("absolute left-0 top-0 flex h-full w-full transition-transform duration-500 ease-lux sm:w-auto", menuOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* 1. seviye */}
        <div className="relative flex h-full w-full flex-col bg-paper sm:w-[400px]">
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-6">
            <span className="text-[12px] uppercase tracking-[0.18em]">Menü</span>
            <button ref={first} onClick={close} aria-label="Menüyü kapat" className="-mr-2 p-2"><X size={22} strokeWidth={1.2} /></button>
          </div>
          <ul className="flex-1 overflow-y-auto px-6 py-4">
            {mainNav.map((n, i) => (
              <li key={n.label}>
                {n.groups ? (
                  <button onClick={() => setActive(i)} aria-expanded={active === i}
                    className={cx("flex w-full items-center justify-between py-3.5 text-left text-[20px] font-light transition-colors", active !== null && active !== i && "lg:text-mute")}>
                    {n.label}<ChevronRight size={18} strokeWidth={1.2} />
                  </button>
                ) : (
                  <Link href={n.href!} className="block py-3.5 text-[20px] font-light">{n.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="shrink-0 space-y-3 border-t border-line px-6 py-6 text-[13px]">
            <Link href="/magaza/" className="flex items-center gap-3"><MapPin size={16} strokeWidth={1.3} />{site.city} showroom</Link>
            <a href={site.phoneHref} className="flex items-center gap-3"><Phone size={16} strokeWidth={1.3} />{site.phone}</a>
            <button onClick={() => set({ countryOpen: true })} className="flex items-center gap-3"><Globe size={16} strokeWidth={1.3} />Türkiye | Türkçe</button>
          </div>

          {/* 2. seviye: mobilde aynı alanı kaplar */}
          <div className={cx("absolute inset-0 flex flex-col bg-paper transition-transform duration-500 ease-lux sm:hidden", item ? "translate-x-0" : "translate-x-full")}>
            {item && <SubMenu item={item} onBack={() => setActive(null)} />}
          </div>
        </div>

        {/* 2. seviye: masaüstünde yanda açılır */}
        <div className={cx("hidden h-full overflow-hidden border-l border-line bg-paper transition-[width] duration-500 ease-lux sm:block", item ? "w-[min(560px,calc(100vw-400px))]" : "w-0")}>
          <div className="flex h-full w-[min(560px,calc(100vw-400px))] flex-col">
            {item && <SubMenu item={item} onBack={() => setActive(null)} desktop />}
          </div>
        </div>
      </nav>
    </div>
  );
}

function SubMenu({ item, onBack, desktop }: { item: (typeof mainNav)[number]; onBack: () => void; desktop?: boolean }) {
  return (
    <>
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-line px-6">
        {!desktop && <button onClick={onBack} aria-label="Geri" className="-ml-2 p-2"><ArrowLeft size={20} strokeWidth={1.2} /></button>}
        <span className="text-[12px] uppercase tracking-[0.18em]">{item.label}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className={cx("grid gap-x-10 gap-y-8", desktop && (item.groups?.length ?? 0) > 2 && "grid-cols-2")}>
          {item.groups?.map((g) => (
            <div key={g.title}>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mute">{g.title}</p>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="link-line text-[16px] font-light">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.image && desktop && (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-sand">
            <Img id={item.image} alt="" sizes="560px" />
          </div>
        )}
      </div>
    </>
  );
}

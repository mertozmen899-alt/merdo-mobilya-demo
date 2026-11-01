"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useUI } from "@/store/selections";

const countries = [
  { region: "Avrupa ve Türkiye", items: [{ name: "Türkiye", lang: "Türkçe", active: true }] },
];

/** Ülke seçimi ve hesap pencereleri. */
export default function GlobalModals() {
  const { countryOpen, accountOpen, set } = useUI();
  return (
    <>
      <Modal open={countryOpen} onClose={() => set({ countryOpen: false })} title="Ülke ve dil">
        <div className="px-6 py-6">
          {countries.map((c) => (
            <div key={c.region}>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mute">{c.region}</p>
              {c.items.map((i) => (
                <div key={i.name} className="flex items-center justify-between border-b border-line py-3 text-[15px]">
                  <span>{i.name} <span className="text-mute">| {i.lang}</span></span>
                  {i.active && <Check size={16} />}
                </div>
              ))}
            </div>
          ))}
          <p className="mt-6 text-[13px] text-mute">Bu demo sitede yalnızca Türkiye ve Türkçe seçeneği bulunur.</p>
        </div>
      </Modal>

      <Modal open={accountOpen} onClose={() => set({ accountOpen: false })} title="Hesabım">
        <div className="space-y-5 px-6 py-6 text-[15px] text-ink-soft">
          <p>Bu demo sitede üyelik sistemi bulunmuyor.</p>
          <p>Beğendiğiniz ürünleri kalp simgesiyle <strong className="font-medium text-ink">Seçimlerim</strong> listesine ekleyebilirsiniz. Liste bu tarayıcıda saklanır.</p>
          <Link href="/secimlerim/" onClick={() => set({ accountOpen: false })} className="inline-block border border-ink px-6 py-3 text-[12px] uppercase tracking-[0.16em] text-ink">Seçimlerime git</Link>
        </div>
      </Modal>
    </>
  );
}

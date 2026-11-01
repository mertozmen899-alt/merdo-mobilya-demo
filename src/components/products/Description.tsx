"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/types";

/** Açıklama, ölçüler, malzemeler ve teslimat: açılır kapanır bölümler. */
export default function Description({ p }: { p: Product }) {
  const sections = [
    { t: "Açıklama", body: <p>{p.description}</p> },
    { t: "Ölçüler", body: (
      <table className="w-full text-left text-[14px]">
        <thead className="text-[11px] uppercase tracking-[0.14em] text-mute"><tr><th className="py-2 font-normal">Seçenek</th><th className="font-normal">G</th><th className="font-normal">Y</th><th className="font-normal">D</th></tr></thead>
        <tbody>{p.sizes.map((s) => <tr key={s.label} className="border-t border-line"><td className="py-2">{s.label}</td><td>{s.width}</td><td>{s.height}</td><td>{s.depth}</td></tr>)}</tbody>
      </table>
    ) },
    { t: "Malzemeler", body: <p>{p.materials.join(", ")}. Kaplama seçenekleri: {p.coverings.map((c) => c.name).join(", ")}.{p.eco && " Eko-tasarım: sertifikalı ahşap ve geri dönüştürülmüş dolgu."}</p> },
    { t: "Teslimat ve kurulum", body: <p>Tahmini teslimat süresi {p.deliveryWeeks}. Çorum merkez ve ilçelerine teslimat ve kurulum ücretsizdir.</p> },
  ];
  const [open, setOpen] = useState<string | null>("Açıklama");
  return (
    <div className="border-t border-line">
      {sections.map((s) => (
        <div key={s.t} className="border-b border-line">
          <button onClick={() => setOpen(open === s.t ? null : s.t)} aria-expanded={open === s.t} className="flex w-full items-center justify-between py-5 text-[13px] uppercase tracking-[0.16em]">
            {s.t}{open === s.t ? <Minus size={16} strokeWidth={1.2} /> : <Plus size={16} strokeWidth={1.2} />}
          </button>
          {open === s.t && <div className="pb-6 text-[15px] font-light leading-7 text-ink-soft">{s.body}</div>}
        </div>
      ))}
    </div>
  );
}

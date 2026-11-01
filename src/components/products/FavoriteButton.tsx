"use client";
import { Heart } from "lucide-react";
import { useSelections } from "@/store/selections";
import { cx } from "@/lib/utils";

export default function FavoriteButton({ slug, label, className, withText }: { slug: string; label: string; className?: string; withText?: boolean }) {
  const on = useSelections((s) => s.slugs.includes(slug));
  const toggle = useSelections((s) => s.toggle);
  return (
    <button type="button" onClick={(e) => { e.preventDefault(); toggle(slug); }} aria-pressed={on}
      aria-label={on ? `${label} seçimlerimden çıkar` : `${label} seçimlerime ekle`} className={cx("flex items-center gap-2", className)}>
      <Heart size={withText ? 18 : 17} strokeWidth={1.3} className={cx("transition-colors", on && "fill-ink")} />
      {withText && <span>{on ? "Seçimlerimde" : "Seçimlerime ekle"}</span>}
    </button>
  );
}

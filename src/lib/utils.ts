/** Unsplash görsel adresi üretir (ücretsiz Unsplash lisansı). */
export function unsplash(id: string, width = 1200, quality = 72) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const IMG_WIDTHS = [480, 768, 1080, 1440, 1920];

export function unsplashSrcSet(id: string) {
  return IMG_WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");
}

const tl = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
export const formatPrice = (n: number) => `${tl.format(n)} ₺`;

export const cx = (...c: (string | number | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const badgeLabel: Record<string, string> = {
  kesif: "Keşif Fiyatı",
  "ozel-gunler": "Özel Günler",
  yeni: "Yeni",
};

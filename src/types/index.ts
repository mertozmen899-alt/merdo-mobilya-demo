export type CategorySlug =
  | "kanepeler"
  | "koltuklar"
  | "sehpalar"
  | "yemek-masalari"
  | "sandalyeler"
  | "yataklar"
  | "aydinlatma";

export type Material = "Kumaş" | "Deri" | "Ahşap" | "Metal" | "Mermer" | "Cam";

export interface Category {
  slug: CategorySlug;
  name: string;
  room: string;
  intro: string;
  subcategories: string[];
  image: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Covering {
  /** Kaplama türü (ör. "Kumaş Lina") */
  name: string;
  colors: ColorOption[];
  /** Fiyata eklenen fark (₺) */
  priceDelta: number;
}

export interface SizeOption {
  label: string;
  width: number;
  height: number;
  depth: number;
  /** Fiyata eklenen fark (₺) */
  priceDelta: number;
}

export type Badge = "kesif" | "ozel-gunler" | "yeni";

export interface Product {
  id: string;
  slug: string;
  /** Küçük harfle yazılan koleksiyon/model adı, ör. "lina" */
  name: string;
  /** Ürün başlığı, ör. "Büyük 3'lü kanepe" */
  title: string;
  /** Kısa tip satırı */
  type: string;
  category: CategorySlug;
  subcategory: string;
  materials: Material[];
  collection: string;
  designer: string;
  price: number;
  oldPrice?: number;
  badge?: Badge;
  eco?: boolean;
  fastDelivery?: boolean;
  coverings: Covering[];
  sizes: SizeOption[];
  /** Unsplash fotoğraf kimlikleri. İlki ürün görseli, diğerleri ortam görseli. */
  images: string[];
  description: string;
  deliveryWeeks: string;
}

export interface Designer {
  slug: string;
  name: string;
  bio: string;
  image: string;
}

export interface HeroSlide {
  id: string;
  kind: "kampanya" | "urun" | "marka";
  image: string;
  /** Mixkit video kimliği (ücretsiz Mixkit lisansı). Varsa görsel yerine video oynar. */
  video?: string;
  imageMobilePosition?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  productSlug?: string;
  tone?: "light" | "dark";
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  body: string[];
}

export interface ContentPage {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  intro: string;
  sections: { heading: string; text: string }[];
}

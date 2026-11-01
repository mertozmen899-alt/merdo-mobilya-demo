import { categories, collections, designers } from "./catalog";

export interface NavLink { label: string; href: string }
export interface NavGroup { title: string; links: NavLink[] }
export interface NavItem { label: string; href?: string; groups?: NavGroup[]; image?: string }

const byRoom = (room: string) =>
  categories.filter((c) => c.room === room).map((c) => ({ label: c.name, href: `/urunler/${c.slug}/` }));

export const productGroups: NavGroup[] = [
  { title: "Oturma Odası", links: byRoom("Oturma Odası") },
  { title: "Yemek Odası", links: byRoom("Yemek Odası") },
  { title: "Yatak Odası", links: byRoom("Yatak Odası") },
  { title: "Dekorasyon", links: byRoom("Dekorasyon") },
  { title: "Koleksiyonlar", links: collections.map((c) => ({ label: c, href: `/urunler/?koleksiyon=${encodeURIComponent(c)}` })) },
];

export const mainNav: NavItem[] = [
  { label: "Ürünler", groups: [{ title: "Tümü", links: [{ label: "Tüm ürünler", href: "/urunler/" }] }, ...productGroups], image: "1758448511322-8bfc73daf606" },
  { label: "Tasarımcılar", groups: [{ title: "Tasarımcılar", links: designers.map((d) => ({ label: d.name, href: `/tasarimcilar/#${d.slug}` })) }], image: "1618221195710-dd6b41faaea6" },
  { label: "Yeni & Kampanyalar", groups: [{ title: "Öne çıkanlar", links: [
    { label: "Yeni ürünler", href: "/urunler/?rozet=yeni" },
    { label: "Keşif fiyatları", href: "/urunler/?rozet=kesif" },
    { label: "Özel Günler", href: "/urunler/?rozet=ozel-gunler" },
    { label: "Hızlı teslimat", href: "/urunler/?hizli=1" },
    { label: "Eko-tasarım", href: "/urunler/?eko=1" } ] }], image: "1757524503555-b62633f47670" },
  { label: "Mağazamız", href: "/magaza/" },
  { label: "Dekorasyon Danışmanlığı", href: "/sayfa/dekorasyon-danismanligi/" },
  { label: "Kataloglar", href: "/sayfa/kataloglar/" },
  { label: "Mag", href: "/mag/" },
  { label: "Hakkımızda", groups: [{ title: "Marka", links: [
    { label: "Hakkımızda", href: "/sayfa/hakkimizda/" },
    { label: "Sürdürülebilirlik", href: "/sayfa/surdurulebilirlik/" },
    { label: "Atölyemiz", href: "/mag/atolye-ziyareti/" } ] }], image: "1554995207-c18c203602cb" },
];

export const footerColumns: NavGroup[] = [
  { title: "Profesyoneller", links: [
    { label: "Kurumsal satış", href: "/sayfa/kurumsal-satis/" }, { label: "Kariyer", href: "/sayfa/kariyer/" } ] },
  { title: "Hizmetler", links: [
    { label: "Dekorasyon danışmanlığı", href: "/sayfa/dekorasyon-danismanligi/" },
    { label: "Hızlı teslimat", href: "/sayfa/hizli-teslimat/" },
    { label: "Kataloglar", href: "/sayfa/kataloglar/" },
    { label: "Teslimat ve kurulum", href: "/sayfa/teslimat/" },
    { label: "Garanti", href: "/sayfa/garanti/" },
    { label: "Bakım rehberi", href: "/sayfa/bakim-rehberi/" } ] },
  { title: "Marka", links: [
    { label: "Hakkımızda", href: "/sayfa/hakkimizda/" },
    { label: "Sürdürülebilirlik", href: "/sayfa/surdurulebilirlik/" },
    { label: "Tasarımcılar", href: "/tasarimcilar/" },
    { label: "Mag", href: "/mag/" } ] },
  { title: "Ürünler", links: categories.map((c) => ({ label: c.name, href: `/urunler/${c.slug}/` })) },
];

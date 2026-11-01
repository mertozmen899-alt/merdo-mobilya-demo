import type { Article, ContentPage, HeroSlide } from "@/types";

/* ---------- Site bilgileri (mobilyacıya göre değiştirilecek alan) ---------- */
export const site = {
  brand: "Merdo",
  legalName: "Merdo Mobilya",
  city: "Çorum",
  address: "Örnek Mah. Örnek Cad. No: 00, Merkez / Çorum",
  phone: "0 (364) 000 00 00",
  phoneHref: "tel:+903640000000",
  whatsapp: "900000000000",
  email: "bilgi@merdo-ornek.com",
  hours: [
    { day: "Pazartesi - Cuma", time: "09:00 - 19:30" },
    { day: "Cumartesi", time: "10:00 - 18:00" },
    { day: "Pazar", time: "Kapalı" },
  ],
  mapsQuery: "Çorum merkez",
  campaign: { name: "Özel Günler", from: "1 Kasım", to: "30 Kasım 2026" },
};

/* ---------- Ana sayfa slider ---------- */
export const heroSlides: HeroSlide[] = [
  { id: "kampanya", kind: "kampanya", image: "1758448511322-8bfc73daf606", video: "4196", eyebrow: "1 - 30 Kasım",
    title: "özel günler", subtitle: "Seçili kanepe, masa ve yataklarda %15'e varan indirim", cta: "Fırsatları keşfet", href: "/urunler/?rozet=ozel-gunler" },
  { id: "marka", kind: "marka", image: "1758565811176-ccd94357a844", video: "4488", eyebrow: "Yeni sezon 2026",
    title: "evin ortasında", subtitle: "Sade çizgiler, doğal dokular, yıllarca yaşanacak parçalar.", cta: "Koleksiyonu keşfet", href: "/urunler/" },
  { id: "lina", kind: "urun", productSlug: "lina-buyuk-3lu-kanepe", image: "1583847268964-b28dc8f51f92",
    title: "lina", cta: "daha fazla", href: "/urun/lina-buyuk-3lu-kanepe/" },
  { id: "ada", kind: "urun", productSlug: "ada-yemek-masasi", image: "1604578762246-41134e37f9cc",
    title: "ada", cta: "daha fazla", href: "/urun/ada-yemek-masasi/" },
  { id: "mira", kind: "urun", productSlug: "mira-berjer", image: "1774477178005-bff823e43be8", imageMobilePosition: "35% 50%",
    title: "mira", cta: "daha fazla", href: "/urun/mira-berjer/" },
  { id: "selin", kind: "urun", productSlug: "selin-baslikli-yatak", image: "1770941633927-b7a15557e0e1",
    title: "selin", cta: "daha fazla", href: "/urun/selin-baslikli-yatak/" },
  { id: "ova", kind: "urun", productSlug: "ova-kose-kanepe", image: "1758565811176-ccd94357a844", video: "4029",
    title: "ova", cta: "daha fazla", href: "/urun/ova-kose-kanepe/" },
];

/* ---------- Ana sayfa kampanya / hizmet kutuları ---------- */
export const promoTiles = [
  { title: "Özel Günler", text: "1 - 30 Kasım arası seçili ürünlerde avantajlı fiyatlar.", cta: "Ürünleri gör",
    href: "/urunler/?rozet=ozel-gunler", image: "1757524503555-b62633f47670", tone: "dark" as const },
  { title: "Kış Kataloğu 2026", text: "Yeni sezonun tüm koleksiyonları tek katalogda.", cta: "Kataloğu incele",
    href: "/sayfa/kataloglar/", image: "1598928506311-c55ded91a20c", tone: "dark" as const },
  { title: "Hızlı Teslimat", text: "Stoktaki ürünler 15 gün içinde evinizde.", cta: "Hızlı teslimat ürünleri",
    href: "/urunler/?hizli=1", image: "1564078516393-cf04bd966897", tone: "dark" as const },
  { title: "Dekorasyon Danışmanlığı", text: "İç mimarlarımızla evinizi birlikte planlayalım. Ücretsizdir.", cta: "Randevu al",
    href: "/sayfa/dekorasyon-danismanligi/", image: "1613545325278-f24b0cae1224", tone: "dark" as const },
];

/* ---------- Mag (dergi) ---------- */
export const articles: Article[] = [
  { slug: "kum-koleksiyonu", category: "Koleksiyon", title: "Kum: doğal dokuların sessiz gücü", image: "1618221195710-dd6b41faaea6", date: "28 Ekim 2026",
    excerpt: "Elif Aras ile yeni koleksiyonun hikâyesini konuştuk.",
    body: ["Kum koleksiyonu, Anadolu'nun toprak tonlarından ilham aldı. Keten, bouclé ve masif meşe bir araya geldiğinde ortaya sakin ama karakterli bir oturma odası çıkıyor.", "Elif Aras, tasarım sürecinde en çok oranlar üzerinde durduğunu anlatıyor: alçak sırtlar, geniş oturumlar ve yere yakın gövdeler odayı olduğundan daha ferah gösteriyor."] },
  { slug: "kucuk-salon-onerileri", category: "Dekorasyon", title: "Küçük salonlar için 7 öneri", image: "1560448204-e02f11c3d0e2", date: "21 Ekim 2026",
    excerpt: "Metrekareden bağımsız ferah bir oturma odası kurmanın yolları.",
    body: ["Ayaklı mobilyalar zemini görünür bıraktığı için odayı büyük gösterir. Kanepenizi duvara tamamen yaslamak yerine 10-15 cm boşluk bırakın.", "Tek renk ailesinde kalıp dokuyu değiştirmek, küçük alanlarda kalabalık hissi yaratmadan zenginlik sağlar."] },
  { slug: "yemek-odasi-isik", category: "Aydınlatma", title: "Yemek odasında doğru ışık", image: "1636138388621-258a72ecb07e", date: "14 Ekim 2026",
    excerpt: "Sarkıt avizenin yüksekliğinden ışık rengine kadar.",
    body: ["Sarkıt avizenin alt noktası masa tablasından yaklaşık 70-80 cm yukarıda olmalı. Böylece karşı karşıya oturanlar birbirini rahatça görür.", "Yemek alanında 2700K civarı sıcak beyaz ışık, hem yemeği hem ahşabı daha davetkâr gösterir."] },
  { slug: "deri-bakimi", category: "Bakım", title: "Deri kanepeniz yıllarca nasıl güzel kalır?", image: "1616047006789-b7af5afb8c20", date: "7 Ekim 2026",
    excerpt: "Anilin derinin bakımı için ustalarımızdan pratik bilgiler.",
    body: ["Deriyi doğrudan güneş ışığından ve kalorifer peteğinden uzak tutun. Toz, kuru ve yumuşak bir bezle haftada bir alınmalı.", "Yılda iki kez deri besleyici kullanmak, yüzeyin kurumasını ve çatlamasını önler."] },
  { slug: "yatak-odasi-huzur", category: "İlham", title: "Huzurlu bir yatak odası kurmak", image: "1616594039964-ae9021a400a0", date: "30 Eylül 2026",
    excerpt: "Mina Sarp'tan sakin yatak odaları için ipuçları.",
    body: ["Yatak odasında az ama iyi seçilmiş parçalar, zihni de sakinleştirir. Başlık, odanın odak noktası olmalı.", "Tekstilde katmanlar kullanın: keten çarşaf, yün battaniye ve kadife yastıklar dokunsal bir zenginlik verir."] },
  { slug: "atolye-ziyareti", category: "Atölye", title: "Bir kanepe nasıl üretilir?", image: "1554995207-c18c203602cb", date: "23 Eylül 2026",
    excerpt: "Çorum atölyemizde bir kanepenin yolculuğu.",
    body: ["Her kanepe, kurutulmuş kayın iskeletin kesilmesiyle başlar. Ardından yaylar, süngerler ve dolgular katman katman yerleşir.", "Kumaş kesimi ve dikiş ustalarımızın elinde şekillenir. Bir kanepenin tamamlanması yaklaşık iki iş günü sürer."] },
];

/* ---------- Kurumsal / hizmet sayfaları ---------- */
export const contentPages: ContentPage[] = [
  { slug: "dekorasyon-danismanligi", eyebrow: "Hizmet", title: "Dekorasyon Danışmanlığı", image: "1613545325278-f24b0cae1224",
    intro: "İç mimarlarımız mekânınızı ölçer, ihtiyaçlarınızı dinler ve size özel bir yerleşim planı hazırlar. Hizmet ücretsizdir.",
    sections: [
      { heading: "Nasıl işler?", text: "Randevu alırsınız, iç mimarımız mağazada ya da evinizde sizinle buluşur. Ölçüler alınır ve 3 boyutlu bir yerleşim önerisi hazırlanır." },
      { heading: "Neler hazırlanır?", text: "Yerleşim planı, kumaş ve renk önerileri, aydınlatma yerleşimi ve bütçeye uygun ürün listesi." },
      { heading: "Süre", text: "İlk görüşme yaklaşık bir saat sürer. Öneri dosyası bir hafta içinde size iletilir." } ] },
  { slug: "hizli-teslimat", eyebrow: "Hizmet", title: "Hızlı Teslimat", image: "1564078516393-cf04bd966897",
    intro: "Stokta bulunan ürünleri 15 gün içinde Çorum ve çevresinde evinize teslim ediyoruz.",
    sections: [
      { heading: "Hangi ürünler?", text: "Ürün kartlarında 'Hızlı Teslimat' etiketi bulunan tüm ürünler bu kapsamdadır." },
      { heading: "Kurulum", text: "Teslimat ekibimiz ürünü yerleştirir, kurar ve ambalajları geri götürür." } ] },
  { slug: "kataloglar", eyebrow: "Katalog", title: "Kataloglar", image: "1598928506311-c55ded91a20c",
    intro: "Kış 2026 kataloğumuz mağazamızda basılı olarak mevcuttur. Dijital sürüm için bize ulaşabilirsiniz.",
    sections: [
      { heading: "Kış 2026", text: "Kum, Ova ve Yaprak koleksiyonlarının tamamı, kumaş kartelaları ve ölçü tablolarıyla." },
      { heading: "Basılı katalog", text: "Adresinize ücretsiz gönderim için iletişim sayfasındaki formu doldurabilirsiniz (demo)." } ] },
  { slug: "teslimat", eyebrow: "Hizmet", title: "Teslimat ve Kurulum", image: "1758060215425-303300b1c7e2",
    intro: "Çorum merkez ve ilçelerine teslimat ücretsizdir. Diğer illere teslimat ücreti siparişte bildirilir.",
    sections: [
      { heading: "Süreler", text: "Ürüne göre 2 ile 10 hafta arasında değişir. Her ürün sayfasında tahmini süre yazılıdır." },
      { heading: "Kurulum", text: "Tüm mobilyalar uzman ekibimiz tarafından kurulur." } ] },
  { slug: "garanti", eyebrow: "Hizmet", title: "Garanti", image: "1599696848652-f0ff23bc911f",
    intro: "Tüm ürünlerimiz 2 yıl, kanepe iskeletleri 10 yıl garantilidir.", sections: [
      { heading: "Kapsam", text: "Üretim ve malzeme kaynaklı tüm kusurlar garanti kapsamındadır." },
      { heading: "Başvuru", text: "Fatura numaranızla mağazamıza ya da telefonla başvurabilirsiniz." } ] },
  { slug: "bakim-rehberi", eyebrow: "Hizmet", title: "Bakım Rehberi", image: "1616047006789-b7af5afb8c20",
    intro: "Mobilyalarınızın uzun ömürlü olması için malzemeye göre bakım önerileri.", sections: [
      { heading: "Kumaş", text: "Haftalık süpürme, lekeye anında kuru bezle müdahale. Kılıflar 30 derecede yıkanabilir." },
      { heading: "Deri", text: "Güneşten uzak tutun, yılda iki kez deri besleyici kullanın." },
      { heading: "Masif ahşap", text: "Nemli bezle silin, yılda bir kez doğal yağ uygulayın." } ] },
  { slug: "hakkimizda", eyebrow: "Marka", title: "Hakkımızda", image: "1554995207-c18c203602cb",
    intro: "Merdo, Çorum'da kurulmuş bir çağdaş mobilya markasıdır. Tasarım atölyemiz ve showroom'umuz aynı çatı altındadır.",
    sections: [
      { heading: "Değerlerimiz", text: "Uzun ömürlü ürünler, yerel ustalık ve şeffaf fiyat." },
      { heading: "Sürdürülebilirlik", text: "Eko-tasarım etiketli ürünlerimizde sertifikalı ahşap ve geri dönüştürülmüş dolgu kullanıyoruz." } ] },
  { slug: "surdurulebilirlik", eyebrow: "Marka", title: "Sürdürülebilirlik", image: "1618221195710-dd6b41faaea6",
    intro: "Daha az ama daha uzun ömürlü üretmek için çalışıyoruz.", sections: [
      { heading: "Malzeme", text: "FSC sertifikalı ahşap, su bazlı boyalar ve geri dönüştürülmüş elyaf." },
      { heading: "Onarım", text: "Kılıf değişimi ve yeniden döşeme hizmetiyle ürünlerinizin ömrünü uzatıyoruz." } ] },
  { slug: "iletisim", eyebrow: "İletişim", title: "Bize Ulaşın", image: "1583847268964-b28dc8f51f92",
    intro: "Sorularınız için telefon, WhatsApp ya da e-posta ile bize ulaşabilirsiniz.", sections: [
      { heading: "Telefon", text: "0 (364) 000 00 00" }, { heading: "E-posta", text: "bilgi@merdo-ornek.com" } ] },
  { slug: "kvkk", eyebrow: "Yasal", title: "Gizlilik ve KVKK", image: "1615874959474-d609969a20ed",
    intro: "Bu bir demo sitedir. Gerçek kullanımda 6698 sayılı KVKK kapsamındaki aydınlatma metni buraya eklenmelidir.", sections: [] },
  { slug: "kurumsal-satis", eyebrow: "Profesyoneller", title: "Kurumsal Satış", image: "1781794902242-f8578908d640",
    intro: "Otel, ofis ve restoran projeleri için özel üretim ve toplu fiyat teklifleri hazırlıyoruz.", sections: [
      { heading: "Süreç", text: "Proje çizimlerinizi paylaşın, ekibimiz 5 iş günü içinde teklif hazırlasın." } ] },
  { slug: "kariyer", eyebrow: "Profesyoneller", title: "Kariyer", image: "1554995207-c18c203602cb",
    intro: "Atölyemizde ve showroom'umuzda birlikte çalışmak için başvurunuzu bekliyoruz.", sections: [] },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getContentPage = (slug: string) => contentPages.find((p) => p.slug === slug);

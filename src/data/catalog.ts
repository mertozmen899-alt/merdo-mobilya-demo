import type { Category, Covering, Designer, Product, SizeOption } from "@/types";

/*
  DEMO VERİ KATMANI
  Gerçek bir stok/ERP sistemi olmadığı için ürünler burada tutulur.
  Fiyatlar, ölçüler ve isimler örnektir. Görseller Unsplash lisansıyla kullanılan fotoğraflardır.
*/

export const categories: Category[] = [
  { slug: "kanepeler", name: "Kanepeler", room: "Oturma Odası", image: "1759722665629-29df6ee4f9a5",
    intro: "Kanepe, oturma odasının merkezidir. Düz, köşe, yataklı ve modüler modellerimiz; kumaş, kadife ya da deri kaplama seçenekleriyle evinize göre şekillenir.",
    subcategories: ["Düz Kanepeler", "Köşe ve Modüler Kanepeler", "Yataklı Kanepeler"] },
  { slug: "koltuklar", name: "Koltuklar", room: "Oturma Odası", image: "1759722667456-71e7bfd118b2",
    intro: "Okuma köşesinden pencere önüne: berjerler, tekli koltuklar ve puflar ile her köşeye karakter katın.",
    subcategories: ["Berjerler", "Tekli Koltuklar", "Puflar"] },
  { slug: "sehpalar", name: "Sehpalar", room: "Oturma Odası", image: "1758565811033-84d1365000c6",
    intro: "Mermer, masif ahşap ve metalin buluştuğu orta ve yan sehpalar.",
    subcategories: ["Orta Sehpalar", "Yan Sehpalar", "Konsollar"] },
  { slug: "yemek-masalari", name: "Yemek Masaları", room: "Yemek Odası", image: "1758977404039-6e834be8eca8",
    intro: "Kalabalık sofralar ve uzun sohbetler için tasarlanmış masif ahşap ve mermer masalar.",
    subcategories: ["Dikdörtgen Masalar", "Yuvarlak ve Oval Masalar", "Açılır Masalar"] },
  { slug: "sandalyeler", name: "Sandalyeler", room: "Yemek Odası", image: "1617364852223-75f57e78dc96",
    intro: "Masanıza eşlik eden, uzun oturumlarda bile rahat sandalyeler ve bar tabureleri.",
    subcategories: ["Sandalyeler", "Bar Tabureleri"] },
  { slug: "yataklar", name: "Yataklar", room: "Yatak Odası", image: "1616594039964-ae9021a400a0",
    intro: "Kumaş başlıklı yataklar, komodinler ve yatak odası tamamlayıcıları.",
    subcategories: ["Başlıklı Yataklar", "Bazalı Yataklar", "Komodinler"] },
  { slug: "aydinlatma", name: "Aydınlatma", room: "Dekorasyon", image: "1759647020559-2f91a4290ae4",
    intro: "Lambader, masa lambası ve avizelerle evinizin ışığını tasarlayın.",
    subcategories: ["Lambaderler", "Masa Lambaları", "Sarkıt Avizeler"] },
];

export const designers: Designer[] = [
  { slug: "studio-merdo", name: "Studio Merdo", image: "1618221195710-dd6b41faaea6",
    bio: "Çorum'daki atölyemizin tasarım ekibi. Yerel ustalıkla çağdaş çizgiyi bir araya getirir." },
  { slug: "elif-aras", name: "Elif Aras", image: "1598928506311-c55ded91a20c",
    bio: "Yumuşak hatlar ve doğal dokular üzerine çalışan iç mimar. Kum koleksiyonunun tasarımcısı." },
  { slug: "kerem-tan", name: "Kerem Tan", image: "1616047006789-b7af5afb8c20",
    bio: "Masif ahşap ve metal birleşimleriyle tanınan endüstriyel tasarımcı." },
  { slug: "deniz-okur", name: "Deniz Okur", image: "1600210491892-03d54c0aaf87",
    bio: "Işık ve oran üzerine kurulu aydınlatma ve küçük mobilya tasarımları." },
  { slug: "mina-sarp", name: "Mina Sarp", image: "1616486029423-aaa4789e8c9a",
    bio: "Yatak odası ve tekstil odaklı tasarımlarıyla sakin mekânlar kurar." },
];

export const collections = ["Kum", "Ova", "Hisar", "Yaprak", "Lale"] as const;

/* ---------- Kaplama setleri ---------- */
const KUMAS: Covering = { name: "Kumaş Lina", priceDelta: 0, colors: [
  { name: "Kum", hex: "#d8cbb5" }, { name: "Taş", hex: "#b9b1a4" }, { name: "Zeytin", hex: "#7c7a55" },
  { name: "Kiremit", hex: "#a65a3d" }, { name: "Gece Mavisi", hex: "#2f3a4f" }, { name: "Antrasit", hex: "#4a4a48" },
  { name: "Krem", hex: "#ece4d4" }, { name: "Adaçayı", hex: "#9ea58c" } ] };
const KADIFE: Covering = { name: "Kadife Nora", priceDelta: 6500, colors: [
  { name: "Hardal", hex: "#c19a3c" }, { name: "Yosun", hex: "#4f5d43" }, { name: "Bordo", hex: "#6e2a2f" },
  { name: "Pudra", hex: "#d8b4a6" }, { name: "Lacivert", hex: "#26304a" }, { name: "Tarçın", hex: "#8a5536" } ] };
const DERI: Covering = { name: "Deri Aspen", priceDelta: 18500, colors: [
  { name: "Konyak", hex: "#8a4f2a" }, { name: "Siyah", hex: "#1d1b1a" }, { name: "Taş", hex: "#a99d8c" },
  { name: "Kahve", hex: "#4e3426" }, { name: "Bej", hex: "#cbb593" } ] };
const CEVIZ: Covering = { name: "Masif Ceviz", priceDelta: 0, colors: [
  { name: "Doğal Ceviz", hex: "#6b4a32" }, { name: "Koyu Ceviz", hex: "#3f2b1f" } ] };
const MESE: Covering = { name: "Masif Meşe", priceDelta: -3000, colors: [
  { name: "Doğal Meşe", hex: "#b38b5d" }, { name: "Füme Meşe", hex: "#5b4636" }, { name: "Beyaz Meşe", hex: "#d9c7a9" } ] };
const MERMER: Covering = { name: "Mermer", priceDelta: 14000, colors: [
  { name: "Carrara", hex: "#ece9e4" }, { name: "Nero Marquina", hex: "#1f1f1f" }, { name: "Emperador", hex: "#6a4a36" } ] };
const METAL: Covering = { name: "Metal", priceDelta: 0, colors: [
  { name: "Pirinç", hex: "#b58d4f" }, { name: "Mat Siyah", hex: "#1e1e1e" }, { name: "Beyaz", hex: "#f0efe9" } ] };
const KETEN: Covering = { name: "Keten Abajur", priceDelta: 900, colors: [
  { name: "Keten", hex: "#e2d8c6" }, { name: "Antrasit", hex: "#4a4a48" } ] };

const s = (label: string, width: number, height: number, depth: number, priceDelta = 0): SizeOption =>
  ({ label, width, height, depth, priceDelta });

const SOFA = "Oturum minderleri yüksek yoğunluklu sünger ve kaz tüyü karışımıyla doldurulur; kılıflar çıkarılabilir. İskelet fırınlanmış kayın ve kontrplaktan üretilir.";
const TABLE = "Tablalar tek tek seçilen masif kerestelerden hazırlanır, doğal yağ ile korunur. Her masa damar yapısı nedeniyle eşsizdir.";
const LIGHT = "LED uyumlu E27 duy. Kablo uzunluğu 2 metredir, ayaktan dimmer ile ışık şiddeti ayarlanabilir.";
const BED = "Başlık, sökülebilir kılıflı kalın dolgulu panelden oluşur. Baza dahil değildir; ortopedik lata sistemi ile kullanılır.";

export const products: Product[] = [
  /* ---------- Kanepeler ---------- */
  { id: "K1001", slug: "lina-buyuk-3lu-kanepe", name: "lina", title: "Büyük 3'lü kanepe", type: "Kanepe 3-4 kişilik",
    category: "kanepeler", subcategory: "Düz Kanepeler", materials: ["Kumaş", "Ahşap"], collection: "Kum", designer: "Elif Aras",
    price: 64900, oldPrice: 74900, badge: "kesif", eco: true, fastDelivery: true, coverings: [KUMAS, KADIFE, DERI],
    sizes: [s("2'li", 180, 82, 98, -9000), s("3'lü", 228, 82, 98), s("Büyük 3'lü", 252, 82, 104, 7500), s("4'lü", 284, 82, 104, 14000)],
    images: ["1759722665629-29df6ee4f9a5", "1758448511322-8bfc73daf606", "1583847268964-b28dc8f51f92"],
    description: "Lina, alçak sırtı ve geniş oturumuyla gün boyu uzanmak için tasarlandı. " + SOFA, deliveryWeeks: "6-8 hafta" },
  { id: "K1002", slug: "ova-kose-kanepe", name: "ova", title: "Köşe kanepe", type: "Modüler köşe kanepe",
    category: "kanepeler", subcategory: "Köşe ve Modüler Kanepeler", materials: ["Kumaş"], collection: "Ova", designer: "Studio Merdo",
    price: 118000, oldPrice: 132000, badge: "ozel-gunler", coverings: [KUMAS, KADIFE],
    sizes: [s("Köşe A", 290, 78, 200), s("Köşe B", 320, 78, 220, 9800), s("U form", 360, 78, 240, 24000)],
    images: ["1759722665935-0967b4e0da93", "1758565811176-ccd94357a844", "1564078516393-cf04bd966897"],
    description: "Ova, parçaları istediğiniz gibi birleştirebileceğiniz modüler bir sistemdir. Köşe, U ya da ada formu kurabilirsiniz. " + SOFA, deliveryWeeks: "8-10 hafta" },
  { id: "K1003", slug: "hisar-deri-2li-kanepe", name: "hisar", title: "2'li deri kanepe", type: "Kanepe 2 kişilik",
    category: "kanepeler", subcategory: "Düz Kanepeler", materials: ["Deri", "Metal"], collection: "Hisar", designer: "Kerem Tan",
    price: 89500, coverings: [DERI], sizes: [s("2'li", 176, 80, 92), s("3'lü", 214, 80, 92, 16500)],
    images: ["1549187774-b4e9b0445b41", "1616047006789-b7af5afb8c20", "1554995207-c18c203602cb"],
    description: "Hisar, ince metal ayakları ve el dikişli tam anilin derisiyle zamanla güzelleşen bir kanepe. " + SOFA, deliveryWeeks: "8-10 hafta" },
  { id: "K1004", slug: "yaprak-kanepe", name: "yaprak", title: "Kavisli kanepe", type: "Kanepe 3-4 kişilik",
    category: "kanepeler", subcategory: "Düz Kanepeler", materials: ["Kumaş"], collection: "Yaprak", designer: "Elif Aras",
    price: 72400, oldPrice: 81000, badge: "kesif", coverings: [KADIFE, KUMAS],
    sizes: [s("3'lü", 236, 76, 104), s("Büyük 3'lü", 268, 76, 110, 8200)],
    images: ["1768946131549-f03cafef7bc1", "1768144092684-c1a5dd6c7aad", "1618221195710-dd6b41faaea6"],
    description: "Yaprak'ın yumuşak kavisi, odanın ortasına yerleştirildiğinde her açıdan zarif görünür. " + SOFA, deliveryWeeks: "6-8 hafta" },
  { id: "K1005", slug: "lale-yatakli-kanepe", name: "lale", title: "Yataklı kanepe", type: "Yataklı kanepe 3 kişilik",
    category: "kanepeler", subcategory: "Yataklı Kanepeler", materials: ["Kumaş", "Metal"], collection: "Lale", designer: "Studio Merdo",
    price: 58900, fastDelivery: true, coverings: [KUMAS],
    sizes: [s("3'lü (140 yatak)", 214, 86, 98), s("3'lü (160 yatak)", 234, 86, 98, 5600)],
    images: ["1698936061086-2bf99c7b9fc5", "1578683010236-d716f9a3f461", "1560448204-e02f11c3d0e2"],
    description: "Lale, tek hareketle 140 ya da 160 cm'lik rahat bir yatağa dönüşür. Misafir odaları için ideal. " + SOFA, deliveryWeeks: "4-6 hafta" },
  { id: "K1006", slug: "kum-uzanmali-kanepe", name: "kum", title: "Uzanmalı kanepe", type: "Kanepe ve şezlong",
    category: "kanepeler", subcategory: "Köşe ve Modüler Kanepeler", materials: ["Kumaş", "Ahşap"], collection: "Kum", designer: "Elif Aras",
    price: 96800, oldPrice: 108000, badge: "ozel-gunler", eco: true, coverings: [KUMAS, KADIFE, DERI],
    sizes: [s("Sağ şezlong", 268, 80, 160), s("Sol şezlong", 268, 80, 160), s("Büyük", 304, 80, 172, 11000)],
    images: ["1634497885778-152eb6fd543d", "1757524503555-b62633f47670", "1613545325278-f24b0cae1224"],
    description: "Kum, geri dönüştürülmüş elyaf dolgusu ve FSC sertifikalı ahşap iskeletiyle çevreye duyarlı bir uzanmalı kanepe. " + SOFA, deliveryWeeks: "6-8 hafta" },
  { id: "K1007", slug: "ova-modul-kanepe", name: "ova", title: "Modül kanepe kompozisyonu", type: "Kompozisyon B",
    category: "kanepeler", subcategory: "Köşe ve Modüler Kanepeler", materials: ["Kumaş"], collection: "Ova", designer: "Studio Merdo",
    price: 142000, coverings: [KUMAS, KADIFE],
    sizes: [s("Kompozisyon A", 312, 78, 210), s("Kompozisyon B", 354, 78, 254, 18000)],
    images: ["1759722665623-c4c1075c0a6b", "1781794902242-f8578908d640", "1758448511322-8bfc73daf606"],
    description: "Ova modüllerinin geniş aileler için hazırlanmış kompozisyonu. Modüller sonradan eklenebilir. " + SOFA, deliveryWeeks: "8-10 hafta" },
  { id: "K1008", slug: "tarcin-kanepe", name: "tarçın", title: "Dokulu kanepe", type: "Kanepe 3 kişilik",
    category: "kanepeler", subcategory: "Düz Kanepeler", materials: ["Kumaş"], collection: "Yaprak", designer: "Mina Sarp",
    price: 61200, badge: "yeni", coverings: [KUMAS, KADIFE],
    sizes: [s("3'lü", 220, 80, 96), s("4'lü", 262, 80, 96, 9200)],
    images: ["1768946131536-39b5f3ec329d", "1599696848652-f0ff23bc911f", "1598928506311-c55ded91a20c"],
    description: "Tarçın, bouclé dokulu kumaşı ve sıcak tonlarıyla odaya sakin bir derinlik katar. " + SOFA, deliveryWeeks: "6-8 hafta" },

  /* ---------- Koltuklar ---------- */
  { id: "B2001", slug: "mira-berjer", name: "mira", title: "Berjer", type: "Tekli koltuk",
    category: "koltuklar", subcategory: "Berjerler", materials: ["Kumaş", "Ahşap"], collection: "Kum", designer: "Elif Aras",
    price: 24900, oldPrice: 28900, badge: "kesif", fastDelivery: true, coverings: [KUMAS, KADIFE],
    sizes: [s("Standart", 78, 86, 82)],
    images: ["1759722667456-71e7bfd118b2", "1774477178005-bff823e43be8", "1675767528117-963ce219b52a"],
    description: "Mira'nın yuvarlak formu sizi sarar. Okuma köşeleri ve yatak odaları için birebir. " + SOFA, deliveryWeeks: "4-6 hafta" },
  { id: "B2002", slug: "hisar-deri-koltuk", name: "hisar", title: "Deri tekli koltuk", type: "Tekli koltuk",
    category: "koltuklar", subcategory: "Tekli Koltuklar", materials: ["Deri", "Ahşap"], collection: "Hisar", designer: "Kerem Tan",
    price: 38700, coverings: [DERI], sizes: [s("Standart", 74, 78, 80)],
    images: ["1601366533287-5ee4c763ae4e", "1616047006789-b7af5afb8c20", "1554995207-c18c203602cb"],
    description: "Hisar koltuk, masif ceviz kolçakları ve kalın derisiyle kalıcı bir klasik. " + SOFA, deliveryWeeks: "6-8 hafta" },
  { id: "B2003", slug: "lale-koltuk", name: "lale", title: "Tekli koltuk", type: "Tekli koltuk",
    category: "koltuklar", subcategory: "Tekli Koltuklar", materials: ["Kumaş", "Ahşap"], collection: "Lale", designer: "Deniz Okur",
    price: 19800, badge: "yeni", coverings: [KADIFE, KUMAS], sizes: [s("Standart", 70, 80, 76)],
    images: ["1586023492125-27b2c045efd7", "1634712282287-14ed57b9cc89", "1606744888344-493238951221"],
    description: "Lale, ince ahşap çerçevesi ve canlı kadife renkleriyle odanın vurgu parçası olur. " + SOFA, deliveryWeeks: "4-6 hafta" },
  { id: "B2004", slug: "ova-berjer", name: "ova", title: "Kollu berjer", type: "Berjer",
    category: "koltuklar", subcategory: "Berjerler", materials: ["Kumaş"], collection: "Ova", designer: "Studio Merdo",
    price: 22600, oldPrice: 25400, badge: "ozel-gunler", coverings: [KUMAS, KADIFE], sizes: [s("Standart", 82, 84, 86)],
    images: ["1759722667490-e5fd31b8dbd5", "1757969704802-4d0050f038d7", "1611967164521-abae8fba4668"],
    description: "Ova kanepelerle aynı modül diliyle tasarlanan berjer. " + SOFA, deliveryWeeks: "6-8 hafta" },
  { id: "B2005", slug: "nil-koltuk", name: "nil", title: "Kapitone deri koltuk", type: "Tekli koltuk",
    category: "koltuklar", subcategory: "Tekli Koltuklar", materials: ["Deri", "Metal"], collection: "Hisar", designer: "Kerem Tan",
    price: 41500, coverings: [DERI], sizes: [s("Standart", 80, 76, 82)],
    images: ["1567538096630-e0c55bd6374c", "1600210491892-03d54c0aaf87", "1560448204-e02f11c3d0e2"],
    description: "Nil, el ile işlenen kapitone deri sırtıyla Hisar ailesinin en gösterişli üyesi. " + SOFA, deliveryWeeks: "8-10 hafta" },

  /* ---------- Sehpalar ---------- */
  { id: "S3001", slug: "ova-orta-sehpa", name: "ova", title: "Orta sehpa", type: "Orta sehpa yuvarlak",
    category: "sehpalar", subcategory: "Orta Sehpalar", materials: ["Mermer", "Metal"], collection: "Ova", designer: "Deniz Okur",
    price: 27400, oldPrice: 31000, badge: "kesif", coverings: [MERMER, CEVIZ], sizes: [s("Ø 90", 90, 34, 90), s("Ø 110", 110, 34, 110, 5200)],
    images: ["1758565811033-84d1365000c6", "1768144092684-c1a5dd6c7aad", "1757524503555-b62633f47670"],
    description: "Ova orta sehpa, ince metal kaidesi üzerinde süzülen mermer tablasıyla hafif bir görünüm sunar. " + TABLE, deliveryWeeks: "6-8 hafta" },
  { id: "S3002", slug: "kum-ahsap-sehpa", name: "kum", title: "Masif ahşap orta sehpa", type: "Orta sehpa dikdörtgen",
    category: "sehpalar", subcategory: "Orta Sehpalar", materials: ["Ahşap"], collection: "Kum", designer: "Kerem Tan",
    price: 18900, eco: true, fastDelivery: true, coverings: [MESE, CEVIZ], sizes: [s("120 x 60", 120, 36, 60), s("140 x 70", 140, 36, 70, 2800)],
    images: ["1777513538143-8525eb3943f6", "1581428982868-e410dd047a90", "1583847268964-b28dc8f51f92"],
    description: "Kum sehpa, sürdürülebilir ormanlardan gelen masif meşeden ve doğal yağ bitişiyle üretilir. " + TABLE, deliveryWeeks: "4-6 hafta" },
  { id: "S3003", slug: "defne-konsol", name: "defne", title: "Konsol", type: "Konsol 4 kapaklı",
    category: "sehpalar", subcategory: "Konsollar", materials: ["Ahşap", "Metal"], collection: "Yaprak", designer: "Studio Merdo",
    price: 46500, coverings: [CEVIZ, MESE], sizes: [s("180 cm", 180, 72, 45), s("220 cm", 220, 72, 45, 7400)],
    images: ["1767963758785-b9def36c13e3", "1758977404038-8aa1845d6635", "1598928506311-c55ded91a20c"],
    description: "Defne konsol, oluklu ceviz kapakları ve itmeli açılan menteşeleriyle sade bir saklama alanı sunar. " + TABLE, deliveryWeeks: "8-10 hafta" },
  { id: "S3004", slug: "hisar-yan-sehpa", name: "hisar", title: "Yan sehpa", type: "Yan sehpa",
    category: "sehpalar", subcategory: "Yan Sehpalar", materials: ["Mermer", "Metal"], collection: "Hisar", designer: "Deniz Okur",
    price: 9800, badge: "yeni", coverings: [MERMER, METAL], sizes: [s("Ø 45", 45, 52, 45)],
    images: ["1779905697138-5a3453572b59", "1778936317432-fead3b62c53b", "1642689703534-e41f29622078"],
    description: "Kanepe yanı ve yatak başı için kompakt bir mermer yan sehpa. " + TABLE, deliveryWeeks: "4-6 hafta" },

  /* ---------- Yemek masaları ---------- */
  { id: "M4001", slug: "ada-yemek-masasi", name: "ada", title: "Yemek masası", type: "Dikdörtgen masa 8 kişilik",
    category: "yemek-masalari", subcategory: "Dikdörtgen Masalar", materials: ["Ahşap"], collection: "Kum", designer: "Kerem Tan",
    price: 54800, oldPrice: 61500, badge: "kesif", eco: true, coverings: [CEVIZ, MESE],
    sizes: [s("200 x 100", 200, 75, 100), s("240 x 105", 240, 75, 105, 8600), s("280 x 110", 280, 75, 110, 16400)],
    images: ["1758977404039-6e834be8eca8", "1604578762246-41134e37f9cc", "1505409628601-edc9af17fda6"],
    description: "Ada, 4 cm kalınlığında masif tablası ve heykelsi ayaklarıyla yemek odasının merkezi olur. " + TABLE, deliveryWeeks: "8-10 hafta" },
  { id: "M4002", slug: "lale-oval-masa", name: "lale", title: "Oval yemek masası", type: "Oval masa 6 kişilik",
    category: "yemek-masalari", subcategory: "Yuvarlak ve Oval Masalar", materials: ["Mermer", "Ahşap"], collection: "Lale", designer: "Elif Aras",
    price: 68200, coverings: [MERMER, MESE], sizes: [s("200 x 110", 200, 75, 110), s("240 x 120", 240, 75, 120, 11000)],
    images: ["1594000311835-6d564e5a46b3", "1773578978637-c9771e7a9913", "1616486886892-ff366aa67ba4"],
    description: "Lale oval masa, yumuşak köşeleriyle herkesin birbirini görebildiği bir sofra kurar. " + TABLE, deliveryWeeks: "8-10 hafta" },
  { id: "M4003", slug: "hisar-acilir-masa", name: "hisar", title: "Açılır yemek masası", type: "Açılır masa 6-10 kişilik",
    category: "yemek-masalari", subcategory: "Açılır Masalar", materials: ["Ahşap", "Metal"], collection: "Hisar", designer: "Kerem Tan",
    price: 49900, oldPrice: 55000, badge: "ozel-gunler", fastDelivery: true, coverings: [CEVIZ, MESE],
    sizes: [s("180-260", 180, 76, 95), s("220-300", 220, 76, 100, 6200)],
    images: ["1615066390971-03e4e1c36ddf", "1657524398377-567034729507", "1636138388621-258a72ecb07e"],
    description: "Hisar, tek kişinin rahatça açabildiği kelebek uzatma mekanizmasıyla 10 kişiye kadar büyür. " + TABLE, deliveryWeeks: "4-6 hafta" },
  { id: "M4004", slug: "yaprak-yuvarlak-masa", name: "yaprak", title: "Yuvarlak yemek masası", type: "Yuvarlak masa 4 kişilik",
    category: "yemek-masalari", subcategory: "Yuvarlak ve Oval Masalar", materials: ["Ahşap"], collection: "Yaprak", designer: "Studio Merdo",
    price: 32600, badge: "yeni", coverings: [MESE, CEVIZ], sizes: [s("Ø 120", 120, 75, 120), s("Ø 140", 140, 75, 140, 4800)],
    images: ["1607809714110-e34f71c7b2ed", "1602872030490-4a484a7b3ba6", "1616046229478-9901c5536a45"],
    description: "Yaprak, tek ayaklı kaidesiyle küçük yemek alanlarında bile ferah bir görünüm sağlar. " + TABLE, deliveryWeeks: "6-8 hafta" },

  /* ---------- Sandalyeler ---------- */
  { id: "C5001", slug: "nora-sandalye", name: "nora", title: "Döşemeli sandalye", type: "Sandalye",
    category: "sandalyeler", subcategory: "Sandalyeler", materials: ["Ahşap", "Kumaş"], collection: "Kum", designer: "Elif Aras",
    price: 8900, oldPrice: 9900, badge: "kesif", fastDelivery: true, coverings: [KUMAS, DERI], sizes: [s("Standart", 52, 82, 56)],
    images: ["1617364852223-75f57e78dc96", "1758977404039-6e834be8eca8", "1788104317221-e85195344eb2"],
    description: "Nora, kavisli sırtı ve döşemeli oturumuyla uzun akşam yemeklerinde rahat ettirir. " + TABLE, deliveryWeeks: "4-6 hafta" },
  { id: "C5002", slug: "ada-sandalye", name: "ada", title: "Kollu sandalye", type: "Kollu sandalye",
    category: "sandalyeler", subcategory: "Sandalyeler", materials: ["Ahşap", "Kumaş"], collection: "Hisar", designer: "Kerem Tan",
    price: 11400, coverings: [KUMAS, KADIFE], sizes: [s("Standart", 58, 80, 58)],
    images: ["1586158291800-2665f07bba79", "1604578762246-41134e37f9cc", "1583845112239-97ef1341b271"],
    description: "Ada sandalye, masif ceviz çerçevesi ve sarmalayan kolçaklarıyla masanın başköşesine yakışır. " + TABLE, deliveryWeeks: "6-8 hafta" },
  { id: "C5003", slug: "lale-bar-taburesi", name: "lale", title: "Bar taburesi", type: "Bar taburesi",
    category: "sandalyeler", subcategory: "Bar Tabureleri", materials: ["Metal", "Deri"], collection: "Lale", designer: "Deniz Okur",
    price: 7600, badge: "yeni", coverings: [DERI, METAL], sizes: [s("Oturum 65", 44, 92, 48), s("Oturum 75", 44, 102, 48, 600)],
    images: ["1605702098590-d552a98dc93d", "1773578978637-c9771e7a9913", "1617806118233-18e1de247200"],
    description: "Lale bar taburesi, ayak dayama halkası ve deri oturumuyla mutfak adaları için tasarlandı. " + TABLE, deliveryWeeks: "4-6 hafta" },

  /* ---------- Yataklar ---------- */
  { id: "Y6001", slug: "selin-baslikli-yatak", name: "selin", title: "Başlıklı yatak", type: "Çift kişilik yatak",
    category: "yataklar", subcategory: "Başlıklı Yataklar", materials: ["Kumaş", "Ahşap"], collection: "Kum", designer: "Mina Sarp",
    price: 47800, oldPrice: 53800, badge: "kesif", coverings: [KUMAS, KADIFE],
    sizes: [s("160 x 200", 176, 110, 214), s("180 x 200", 196, 110, 214, 4200)],
    images: ["1616594039964-ae9021a400a0", "1770941633927-b7a15557e0e1", "1615874959474-d609969a20ed"],
    description: "Selin, geniş ve yumuşak başlığıyla yatakta kitap okumayı keyifli hale getirir. " + BED, deliveryWeeks: "6-8 hafta" },
  { id: "Y6002", slug: "ova-yatak", name: "ova", title: "Bazalı yatak", type: "Çift kişilik yatak",
    category: "yataklar", subcategory: "Bazalı Yataklar", materials: ["Kumaş"], collection: "Ova", designer: "Studio Merdo",
    price: 39600, fastDelivery: true, coverings: [KUMAS], sizes: [s("160 x 200", 170, 98, 210), s("180 x 200", 190, 98, 210, 3600)],
    images: ["1778731525620-ae459167c176", "1758060215425-303300b1c7e2", "1595526114035-0d45ed16cfbf"],
    description: "Ova yatak, hidrolik açılan bazasıyla yatak altında geniş saklama alanı sunar. " + BED, deliveryWeeks: "4-6 hafta" },
  { id: "Y6003", slug: "yaprak-yatak", name: "yaprak", title: "Kadife başlıklı yatak", type: "Çift kişilik yatak",
    category: "yataklar", subcategory: "Başlıklı Yataklar", materials: ["Kumaş", "Ahşap"], collection: "Yaprak", designer: "Mina Sarp",
    price: 52400, badge: "ozel-gunler", oldPrice: 58000, coverings: [KADIFE], sizes: [s("160 x 200", 180, 120, 216), s("180 x 200", 200, 120, 216, 4600)],
    images: ["1566665797739-1674de7a421a", "1560185893-a55cbc8c57e8", "1768487422639-7ba3900d0f02"],
    description: "Yaprak, dikey kanallı kadife başlığıyla yatak odasına otel konforu getirir. " + BED, deliveryWeeks: "6-8 hafta" },
  { id: "Y6004", slug: "kum-komodin", name: "kum", title: "Komodin", type: "Komodin 1 çekmeceli",
    category: "yataklar", subcategory: "Komodinler", materials: ["Ahşap"], collection: "Kum", designer: "Kerem Tan",
    price: 8400, eco: true, coverings: [MESE, CEVIZ], sizes: [s("Standart", 50, 48, 40)],
    images: ["1774578342100-f779e988c83d", "1616486029423-aaa4789e8c9a", "1615874959474-d609969a20ed"],
    description: "Kum komodin, yumuşak kapanan çekmecesi ve açık rafıyla yatak başında düzen sağlar. " + TABLE, deliveryWeeks: "4-6 hafta" },

  /* ---------- Aydınlatma ---------- */
  { id: "L7001", slug: "isik-lambader", name: "ışık", title: "Lambader", type: "Lambader",
    category: "aydinlatma", subcategory: "Lambaderler", materials: ["Metal", "Kumaş"], collection: "Yaprak", designer: "Deniz Okur",
    price: 12900, oldPrice: 14500, badge: "kesif", fastDelivery: true, coverings: [KETEN, METAL], sizes: [s("Standart", 46, 165, 46)],
    images: ["1759647020559-2f91a4290ae4", "1673939859210-23d8444237ff", "1675767528183-628d7e46ae59"],
    description: "Işık lambader, keten abajurundan yayılan yumuşak ışıkla akşamları odayı sakinleştirir. " + LIGHT, deliveryWeeks: "2-4 hafta" },
  { id: "L7002", slug: "dalga-masa-lambasi", name: "dalga", title: "Masa lambası", type: "Masa lambası",
    category: "aydinlatma", subcategory: "Masa Lambaları", materials: ["Ahşap"], collection: "Kum", designer: "Deniz Okur",
    price: 5400, badge: "yeni", eco: true, coverings: [MESE], sizes: [s("Standart", 24, 42, 24)],
    images: ["1769255119650-f658d3dbc397", "1780571189324-326018f0dfac", "1642689703534-e41f29622078"],
    description: "Dalga, tornada şekillendirilen masif meşe gövdesiyle sıcak ve dolaylı ışık verir. " + LIGHT, deliveryWeeks: "2-4 hafta" },
  { id: "L7003", slug: "kule-lambader", name: "kule", title: "Heykelsi lambader", type: "Lambader",
    category: "aydinlatma", subcategory: "Lambaderler", materials: ["Metal", "Cam"], collection: "Hisar", designer: "Studio Merdo",
    price: 16800, coverings: [METAL], sizes: [s("Standart", 30, 170, 30)],
    images: ["1780898406363-a3858597ca6c", "1494438639946-1ebd1d20bf85", "1630578877871-1a2f9d372fd2"],
    description: "Kule, beton kaidesi ve ışıklı panelleriyle bir aydınlatmadan çok heykel gibi durur. " + LIGHT, deliveryWeeks: "4-6 hafta" },
];

/* ---------- Yardımcılar ---------- */
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getDesigner = (name: string) => designers.find((d) => d.name === name);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const colorCount = (p: Product) => p.coverings.reduce((n, c) => n + c.colors.length, 0);

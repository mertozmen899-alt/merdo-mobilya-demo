// Playwright: ekran görüntüsü + fonksiyon testleri. Çalıştırma: node tests/smoke.mjs
import { createRequire } from "module"; const { chromium } = createRequire(import.meta.url)(process.env.PW || "playwright");
const BASE = process.env.BASE || "http://localhost:4321";
const out = [];
const ok = (name, cond, extra = "") => { out.push(`${cond ? "✓" : "✗"} ${name}${extra ? " — " + extra : ""}`); };

const b = await chromium.launch();
const pages = ["/", "/urunler/", "/urunler/kanepeler/", "/urun/lina-buyuk-3lu-kanepe/", "/magaza/", "/mag/", "/mag/kum-koleksiyonu/", "/sayfa/dekorasyon-danismanligi/", "/tasarimcilar/", "/secimlerim/"];
for (const [vw, vh, tag] of [[1440, 900, "d"], [390, 844, "m"], [768, 1024, "t"], [1920, 1080, "w"]]) {
  const ctx = await b.newContext({ viewport: { width: vw, height: vh } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|ERR_|net::/.test(m.text())) errs.push(m.text()); });
  for (const path of pages) {
    await p.goto(BASE + path, { waitUntil: "networkidle" });
    await p.waitForTimeout(300);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(`[${vw}] ${path} yatay taşma yok`, overflow <= 0, overflow > 0 ? `${overflow}px` : "");
    if (tag === "d" || tag === "m" || (tag !== "d" && path === "/")) {
      const name = path === "/" ? "home" : path.replace(/\//g, "_").replace(/^_|_$/g, "");
      await p.screenshot({ path: `shots/${tag}-${name}.png` });
    }
  }
  ok(`[${vw}] konsolda kritik hata yok`, errs.length === 0, errs.slice(0, 3).join(" | "));
  await ctx.close();
}

// ---- Fonksiyon testleri (masaüstü) ----
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(BASE + "/", { waitUntil: "networkidle" });
// Hero
const first = await p.locator('[aria-roledescription="slide"][aria-hidden="false"]').getAttribute("aria-label");
await p.getByRole("button", { name: "Sonraki" }).first().click();
await p.waitForTimeout(400);
const second = await p.locator('[aria-roledescription="slide"][aria-hidden="false"]').getAttribute("aria-label");
ok("Hero: sonraki düğmesi slaytı değiştirir", first !== second, `${first} → ${second}`);
await p.getByRole("button", { name: "Durdur" }).click();
ok("Hero: durdur/oynat", await p.getByRole("button", { name: "Oynat" }).isVisible());
// Menü
await p.getByRole("button", { name: "Menüyü aç" }).click();
await p.waitForTimeout(500);
await p.getByRole("navigation", { name: "Ana menü" }).getByRole("button", { name: "Ürünler" }).click();
await p.waitForTimeout(500);
await p.screenshot({ path: "shots/d-menu.png" });
await p.getByRole("navigation", { name: "Ana menü" }).getByRole("link", { name: "Kanepeler" }).last().click();
await p.waitForURL("**/urunler/kanepeler/");
ok("Menü: Ürünler > Kanepeler sayfasına gider", p.url().endsWith("/urunler/kanepeler/"));
// Arama
await p.getByRole("button", { name: "Ara" }).click();
await p.waitForTimeout(400);
await p.getByRole("textbox", { name: "Arama" }).fill("berjer");
await p.waitForTimeout(300);
await p.screenshot({ path: "shots/d-search.png" });
const found = await p.getByText(/ürün bulundu/).textContent();
await p.getByRole("textbox", { name: "Arama" }).press("Enter");
await p.waitForURL("**/urunler/?q=berjer");
ok("Arama: sonuç gösterir ve Enter kataloğa götürür", /ürün bulundu/.test(found ?? ""), found ?? "");
// Filtre
await p.goto(BASE + "/urunler/", { waitUntil: "networkidle" });
const before = await p.locator("main ul > li article").count();
await p.getByRole("button", { name: /^Filtrele/ }).click();
await p.waitForTimeout(500);
await p.getByRole("button", { name: /^Malzeme/ }).click();
await p.getByLabel(/^Deri/).click();
await p.waitForTimeout(400);
await p.screenshot({ path: "shots/d-filter.png" });
await p.getByRole("button", { name: /Ürünleri gör/ }).click();
await p.waitForTimeout(500);
const after = await p.locator("main ul > li article").count();
ok("Filtre: Deri seçince sonuç güncellenir ve URL'ye yazılır", after < before && p.url().includes("malzeme=Deri"), `${before} → ${after}, ${p.url()}`);
await p.reload({ waitUntil: "networkidle" });
ok("Filtre: sayfa yenilenince korunur", (await p.locator("main ul > li article").count()) === after);
await p.getByRole("button", { name: /Deri filtresini kaldır/ }).click();
await p.waitForTimeout(400);
ok("Filtre: etiketten kaldırılır", !p.url().includes("malzeme"));
// Sıralama
await p.getByLabel("Sıralama").selectOption("fiyat-artan");
await p.waitForTimeout(400);
const prices = await p.locator("main ul > li article .text-\\[14px\\].mt-2").allTextContents();
const nums = prices.map((t) => Number(t.replace(/[^\d ]/g, "").trim().split(" ").pop().replace(/\D/g, "")));
ok("Sıralama: fiyat artan", nums.every((n, i) => i === 0 || n >= nums[i - 1]) && p.url().includes("sirala=fiyat-artan"));
// Daha fazla
const c1 = await p.locator("main ul > li article").count();
await p.getByRole("button", { name: "Daha fazla göster" }).click();
await p.waitForTimeout(400);
const c2 = await p.locator("main ul > li article").count();
ok("Daha fazla göster çalışır", c2 > c1, `${c1} → ${c2}`);
// Ürün detayı
await p.goto(BASE + "/urun/lina-buyuk-3lu-kanepe/", { waitUntil: "networkidle" });
const priceEl = p.locator('[aria-live="polite"]').filter({ hasText: "₺" }).first();
const p1 = await priceEl.textContent();
await p.getByRole("button", { name: "4'lü" }).click();
await p.getByRole("button", { name: /Deri Aspen/ }).click();
const p2 = await priceEl.textContent();
ok("Ürün: ölçü ve kaplama seçimi fiyatı günceller", p1 !== p2, `${p1?.slice(-12)} → ${p2?.slice(-12)}`);
await p.getByRole("button", { name: "Konyak" }).click();
ok("Ürün: renk seçimi adı gösterir", await p.getByText("· Konyak").isVisible());
await p.getByRole("button", { name: /seçimlerime ekle/ }).first().click();
await p.waitForTimeout(200);
ok("Seçimlerim: sayaç artar", await p.getByRole("link", { name: "Seçimlerim (1)" }).isVisible());
await p.getByRole("button", { name: "Tam ekran" }).click();
await p.waitForTimeout(300);
await p.keyboard.press("ArrowRight");
const lb = await p.getByText(/2 \/ 3/).isVisible();
await p.keyboard.press("Escape");
ok("Galeri: tam ekran, klavye ve Esc", lb && !(await p.getByRole("dialog", { name: "Görsel görüntüleyici" }).isVisible()));
await p.getByRole("button", { name: "Mağazada randevu al" }).click();
await p.waitForTimeout(400);
await p.screenshot({ path: "shots/d-randevu.png" });
ok("Randevu penceresi açılır", await p.getByRole("dialog", { name: "Mağazada randevu" }).isVisible());
await p.keyboard.press("Escape");
await p.goto(BASE + "/secimlerim/", { waitUntil: "networkidle" });
ok("Seçimlerim sayfası ürünü gösterir (yenileme sonrası)", (await p.locator("main article").count()) === 1);
// Mobil menü
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await m.goto(BASE + "/", { waitUntil: "networkidle" });
await m.getByRole("button", { name: "Menüyü aç" }).click();
await m.waitForTimeout(500);
await m.getByRole("navigation", { name: "Ana menü" }).getByRole("button", { name: "Ürünler" }).click();
await m.waitForTimeout(600);
await m.screenshot({ path: "shots/m-menu.png" });
ok("Mobil menü: alt menü açılır", await m.getByRole("button", { name: "Geri" }).isVisible());
await m.goto(BASE + "/urunler/kanepeler/", { waitUntil: "networkidle" });
await m.getByRole("button", { name: /^Filtrele/ }).click();
await m.waitForTimeout(500);
await m.screenshot({ path: "shots/m-filter.png" });
ok("Mobil filtre paneli açılır", await m.getByRole("dialog", { name: "Filtrele" }).isVisible());
await b.close();
console.log(out.join("\n"));
console.log(`\n${out.filter((x) => x.startsWith("✓")).length}/${out.length} başarılı`);

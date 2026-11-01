# Merdo | Demo Mobilya Sitesi

Çorum'daki mobilyacılara gösterilmek üzere hazırlanmış demo site.

- Canlı site: https://mertozmen899-alt.github.io/merdo-mobilya-demo/
- Teknoloji: Next.js (statik çıktı), TypeScript, Tailwind CSS, Zustand
- Mağaza bilgileri (ad, adres, telefon, WhatsApp): `src/data/content.ts` içindeki `site`
- Ürünler: `src/data/catalog.ts`
- Görseller: Unsplash lisanslı fotoğraflar

## Yerelde çalıştırma

```
npm install
npm run dev
```

## Yayın için derleme

```
BASE_PATH=/merdo-mobilya-demo npm run build
```

`out/` klasörünün içeriği `gh-pages` dalına yüklenir.

## Testler

```
node tests/smoke.mjs
```

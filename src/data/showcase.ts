/*
  3D vitrin modelleri
  Kaynak: Poly Haven (polyhaven.com), CC0 lisans: ticari kullanım dahil serbest, atıf zorunlu değil.
  Modeller temsilîdir; mağazanın gerçek ürünleri çekildiğinde değiştirilebilir.
*/
export interface ShowcaseModel {
  id: string;          // Poly Haven varlık kimliği
  name: string;        // sitede görünen ad
  title: string;
  text: string;
  href: string;
  /** Kamera açısı ince ayarı (derece) */
  tilt?: number;
}

export const showcaseModels: ShowcaseModel[] = [
  { id: "modern_arm_chair_01", name: "hisar", title: "Meşe çerçeveli deri koltuk",
    text: "Masif meşe iskelet, el dikişli deri minderler.", href: "/urunler/koltuklar/" },
  { id: "mid_century_lounge_chair", name: "loca", title: "Döner dinlenme koltuğu",
    text: "Ahşap kabuk, yumuşak deri minderler, 360° dönen ayak.", href: "/urunler/koltuklar/" },
];

/** Poly Haven glTF dosya adreslerini çözer (dokular ve .bin farklı klasörlerdedir). */
export function polyhaven(id: string, res: "1k" | "2k") {
  const root = "https://dl.polyhaven.org/file/ph-assets/Models";
  return {
    gltf: `${root}/gltf/${res}/${id}/${id}_${res}.gltf`,
    resolve(url: string) {
      const name = url.split("/").pop() ?? url;
      if (name.endsWith(".bin")) return `${root}/gltf/8k/${id}/${name}`;
      if (/\.(jpg|png)$/.test(name)) return `${root}/jpg/${res}/${id}/${name}`;
      return url;
    },
  };
}

"use client";
import { useEffect, useRef, useState } from "react";
import { unsplash, unsplashSrcSet, cx } from "@/lib/utils";

interface Props {
  id: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  position?: string;
}

/**
 * Duyarlı görsel: srcset ile cihaz genişliğine uygun boyut yüklenir.
 * Kapsayıcı oranı (aspect-ratio) dışarıdan verilir, böylece yüklenirken kayma olmaz.
 * Görsel yüklenemezse açıkça işaretlenmiş geçici bir alan gösterilir.
 */
export default function Img({ id, alt, sizes = "100vw", className, priority, position }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Görsel, sayfa etkileşime hazır olmadan yüklendiyse onLoad kaçabilir; burada kontrol edilir.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete) {
      if (el.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, []);

  if (failed) {
    return (
      <div className={cx("absolute inset-0 flex items-center justify-center bg-stone text-[11px] uppercase tracking-[0.2em] text-mute", className)}>
        Geçici görsel
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={unsplash(id, 1440)}
      srcSet={unsplashSrcSet(id)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      style={position ? { objectPosition: position } : undefined}
      className={cx("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", loaded || priority ? "opacity-100" : "opacity-0", className)}
    />
  );
}

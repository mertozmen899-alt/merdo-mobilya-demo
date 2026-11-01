"use client";
import { useEffect, useRef } from "react";

/** Açık panel varken sayfanın arkada kaymasını engeller (kaydırma çubuğu boşluğunu koruyarak). */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const sb = window.innerWidth - document.documentElement.clientWidth;
    const prev = { o: document.body.style.overflow, p: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${sb}px`;
    return () => { document.body.style.overflow = prev.o; document.body.style.paddingRight = prev.p; };
  }, [locked]);
}

export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onEscape();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, onEscape]);
}

/** Öğe görünür olduğunda "is-in" sınıfı ekler (kaydırınca belirme). */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/** "Seçimlerim": ziyaretçinin beğendiği ürünler. Tarayıcıda saklanır. */
interface SelectionState {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
}

const safeStorage = createJSONStorage(() => {
  try { return window.localStorage; } catch { return { getItem: () => null, setItem: () => {}, removeItem: () => {} }; }
});

export const useSelections = create<SelectionState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => set((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug] })),
      has: (slug) => get().slugs.includes(slug),
      clear: () => set({ slugs: [] }),
    }),
    { name: "merdo-secimlerim", storage: safeStorage, skipHydration: true },
  ),
);

/** UI durumları (menü, arama, ülke seçimi) */
interface UIState {
  menuOpen: boolean;
  searchOpen: boolean;
  countryOpen: boolean;
  accountOpen: boolean;
  set: (p: Partial<Omit<UIState, "set">>) => void;
}
export const useUI = create<UIState>((set) => ({
  menuOpen: false, searchOpen: false, countryOpen: false, accountOpen: false,
  set: (p) => set(p),
}));

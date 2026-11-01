"use client";
import { useEffect } from "react";
import { useSelections } from "@/store/selections";

/** Tarayıcıda saklanan "Seçimlerim" listesini sayfa açıldıktan sonra yükler (hidrasyon uyumsuzluğunu önler). */
export default function Providers() {
  useEffect(() => { useSelections.persist.rehydrate(); }, []);
  return null;
}

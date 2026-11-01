"use client";
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useUi";
import { cx } from "@/lib/utils";

export default function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "li" }) {
  const ref = useReveal<HTMLDivElement>();
  return <Tag ref={ref as never} className={cx("reveal", className)}>{children}</Tag>;
}

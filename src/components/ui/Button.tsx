import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "solid" | "outline" | "light" | "outline-light";
const styles: Record<Variant, string> = {
  solid: "bg-ink text-paper border-ink hover:bg-ink-soft",
  outline: "border-ink text-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink border-paper hover:bg-transparent hover:text-paper",
  "outline-light": "border-paper text-paper hover:bg-paper hover:text-ink",
};
const base = "inline-flex items-center justify-center gap-2 border px-7 py-3.5 text-[12px] uppercase tracking-[0.16em] transition-colors duration-300";

export function ButtonLink({ href, children, variant = "solid", className }: { href: string; children: ReactNode; variant?: Variant; className?: string }) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cx(base, styles[variant], className)}>{children}</a>;
  return <Link href={href} className={cx(base, styles[variant], className)}>{children}</Link>;
}

export function Button({ children, variant = "solid", className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...rest} className={cx(base, styles[variant], "disabled:opacity-40", className)}>{children}</button>;
}

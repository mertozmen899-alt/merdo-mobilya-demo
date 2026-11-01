import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Konum" className="text-[12px] text-mute">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li><Link href="/" className="link-line">Ana sayfa</Link></li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {it.href ? <Link href={it.href} className="link-line">{it.label}</Link> : <span aria-current="page" className="text-ink">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

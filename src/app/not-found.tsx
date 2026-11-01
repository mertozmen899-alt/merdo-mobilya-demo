import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-[calc(var(--topbar-h)+var(--header-h))] text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-mute">404</p>
      <h1 className="mt-3 text-[40px] font-light lowercase">sayfa bulunamadı</h1>
      <Link href="/" className="mt-8 border border-ink px-8 py-3.5 text-[12px] uppercase tracking-[0.16em]">Ana sayfaya dön</Link>
    </div>
  );
}

"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CalendarDays, MapPin, Navigation, Phone } from "lucide-react";
import AppointmentModal from "@/components/products/AppointmentModal";
import { site } from "@/data/content";

export default function StoreClient() {
  const city = useSearchParams().get("sehir");
  const [appt, setAppt] = useState(false);
  const same = !city || city.toLocaleLowerCase("tr") === site.city.toLocaleLowerCase("tr");
  return (
    <div>
      {city && (
        <p className="mb-8 border-l-2 border-ink bg-sand px-4 py-3 text-[14px]" role="status">
          {same ? `“${city}” için 1 mağaza bulundu.` : `“${city}” bölgesinde mağazamız yok. Size en yakın mağazamız ${site.city} showroom'udur.`}
        </p>
      )}
      <dl className="grid gap-8 sm:grid-cols-2">
        <div><dt className="text-[11px] uppercase tracking-[0.2em] text-mute">Adres</dt><dd className="mt-2 flex gap-2 text-[15px]"><MapPin size={16} strokeWidth={1.3} className="mt-1 shrink-0" />{site.address}</dd></div>
        <div><dt className="text-[11px] uppercase tracking-[0.2em] text-mute">Telefon</dt><dd className="mt-2 flex gap-2 text-[15px]"><Phone size={16} strokeWidth={1.3} className="mt-1 shrink-0" /><a href={site.phoneHref} className="underline">{site.phone}</a></dd></div>
        <div className="sm:col-span-2"><dt className="text-[11px] uppercase tracking-[0.2em] text-mute">Çalışma saatleri</dt>
          <dd className="mt-2 text-[15px]"><ul className="divide-y divide-line border-y border-line">{site.hours.map((h) => <li key={h.day} className="flex justify-between py-2.5"><span>{h.day}</span><span>{h.time}</span></li>)}</ul></dd></div>
      </dl>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <button onClick={() => setAppt(true)} className="flex items-center justify-center gap-2 bg-ink py-4 text-[12px] uppercase tracking-[0.16em] text-paper"><CalendarDays size={16} strokeWidth={1.4} />Randevu al</button>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-ink py-4 text-[12px] uppercase tracking-[0.16em]"><Navigation size={16} strokeWidth={1.4} />Yol tarifi</a>
      </div>
      <AppointmentModal open={appt} onClose={() => setAppt(false)} />
    </div>
  );
}

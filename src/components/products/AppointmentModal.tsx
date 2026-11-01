"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { site } from "@/data/content";

/**
 * Randevu formu. Sunucu olmadığı için form gönderilmez;
 * bunun yerine bilgiler hazır bir WhatsApp mesajı olarak açılır (gerçekten çalışan demo davranışı).
 */
export default function AppointmentModal({ open, onClose, summary }: { open: boolean; onClose: () => void; summary?: string }) {
  const [form, setForm] = useState({ ad: "", tel: "", tarih: "", saat: "11:00", not: "" });
  const [done, setDone] = useState(false);
  const field = "mt-1 w-full border-b border-line bg-transparent py-2.5 text-[15px] outline-none focus:border-ink";
  const msg = `Merhaba, ${site.city} showroom için randevu almak istiyorum.\nAd: ${form.ad}\nTelefon: ${form.tel}\nTarih: ${form.tarih} ${form.saat}${summary ? `\nÜrün: ${summary}` : ""}${form.not ? `\nNot: ${form.not}` : ""}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setDone(true);
  };

  return (
    <Modal open={open} onClose={() => { onClose(); setDone(false); }} title="Mağazada randevu">
      {done ? (
        <div className="px-6 py-8 text-[15px]" role="status">
          <p className="text-[22px] font-light">Teşekkürler, {form.ad.split(" ")[0]}.</p>
          <p className="mt-3 text-ink-soft">Randevu talebiniz WhatsApp mesajı olarak hazırlandı. Mesajı gönderdiğinizde ekibimiz sizi arayarak saati onaylayacak.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5 px-6 py-6">
          {summary && <p className="bg-sand px-4 py-3 text-[13px] text-ink-soft">{summary}</p>}
          <label className="block text-[12px] uppercase tracking-[0.14em] text-mute">Ad soyad
            <input required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} className={field} autoComplete="name" />
          </label>
          <label className="block text-[12px] uppercase tracking-[0.14em] text-mute">Telefon
            <input required type="tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} className={field} autoComplete="tel" placeholder="05xx xxx xx xx" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[12px] uppercase tracking-[0.14em] text-mute">Tarih
              <input required type="date" value={form.tarih} onChange={(e) => setForm({ ...form, tarih: e.target.value })} className={field} />
            </label>
            <label className="block text-[12px] uppercase tracking-[0.14em] text-mute">Saat
              <select value={form.saat} onChange={(e) => setForm({ ...form, saat: e.target.value })} className={field}>
                {["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label className="block text-[12px] uppercase tracking-[0.14em] text-mute">Not (isteğe bağlı)
            <textarea rows={3} value={form.not} onChange={(e) => setForm({ ...form, not: e.target.value })} className={field} />
          </label>
          <button type="submit" className="w-full bg-ink py-4 text-[12px] uppercase tracking-[0.16em] text-paper">WhatsApp ile randevu iste</button>
          <p className="text-[12px] text-mute">Demo: form bir sunucuya gönderilmez, bilgiler WhatsApp mesajı olarak açılır.</p>
        </form>
      )}
    </Modal>
  );
}

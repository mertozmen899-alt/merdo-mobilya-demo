"use client";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useEscape, useLockBody } from "@/hooks/useUi";
import { cx } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "center" | "right" | "left";
  wide?: boolean;
}

/** Ortak modal / çekmece. Esc ve arka plana tıklama ile kapanır, odak içeride başlar. */
export default function Modal({ open, onClose, title, children, side = "center", wide }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useLockBody(open);
  useEscape(open, close);
  useEffect(() => { if (open) panel.current?.focus(); }, [open]);

  const pos = {
    center: cx("left-1/2 top-1/2 w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2", wide ? "max-w-3xl" : "max-w-lg", open ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"),
    right: cx("right-0 top-0 h-full w-full max-w-md", open ? "translate-x-0" : "translate-x-full"),
    left: cx("left-0 top-0 h-full w-full max-w-md", open ? "translate-x-0" : "-translate-x-full"),
  }[side];

  return (
    <div className={cx("fixed inset-0 z-[80]", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div onClick={close} className={cx("absolute inset-0 bg-black/40 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cx("absolute flex flex-col bg-paper outline-none transition-all duration-500 ease-lux", side !== "center" && "max-h-full", side === "center" && "max-h-[90vh]", pos)}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-[13px] uppercase tracking-[0.18em]">{title}</h2>
          <button onClick={close} aria-label="Kapat" className="-mr-2 p-2"><X size={20} strokeWidth={1.3} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

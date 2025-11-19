"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HelpTooltip({ content }: { content: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);
  return (
    <div
      ref={ref}
      className="relative inline-block align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Ayuda"
        className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[var(--royal-plum)] text-[var(--royal-plum)] bg-white hover:bg-[var(--alabaster-grey)]"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 15.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm1.1-3.9c-.7.4-1.1.8-1.1 1.4v.5H10v-.6c0-1.2.7-2 1.8-2.6.9-.5 1.4-1 1.4-1.8 0-1-.8-1.7-2-1.7-1.1 0-1.9.6-2.1 1.6H7.9C8.1 7.3 9.4 6 11.2 6c2.1 0 3.5 1.2 3.5 2.9 0 1.3-.7 2.1-1.6 2.6Z" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 mt-2 w-64 rounded-md border border-[var(--royal-plum)] bg-white p-3 text-sm text-[var(--midnight-violet)] shadow-lg"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
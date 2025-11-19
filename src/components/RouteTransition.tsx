"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -48 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        style={{ willChange: "transform, opacity", position: "absolute", inset: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
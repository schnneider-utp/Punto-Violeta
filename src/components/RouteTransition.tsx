"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialX = "-100%";
  const initialRotate = 3;
  const initialScale = 0.995;

  return (
    <motion.div
      key={pathname}
      initial={{ x: initialX, rotateY: initialRotate, scale: initialScale }}
      animate={{ x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform", position: "absolute", inset: 0, transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
    >
      {children}
    </motion.div>
  );
}
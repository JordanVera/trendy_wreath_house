"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeLuxury } from "@/lib/motion";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ImageReveal({ children, className }: ImageRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(6% 0% 6% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.05, ease: easeLuxury }}
    >
      {children}
    </motion.div>
  );
}

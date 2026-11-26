"use client";

import { motion } from "motion/react";
import { easeLuxury } from "@/lib/motion";

type TextGenerateEffectProps = {
  lines: readonly string[];
  className?: string;
  italicFrom?: number;
};

export function TextGenerateEffect({ lines, className, italicFrom = 1 }: TextGenerateEffectProps) {
  return (
    <span className={className}>
      {lines.map((line, lineIndex) => {
        const previousWords = lines
          .slice(0, lineIndex)
          .reduce((total, item) => total + item.split(" ").length, 0);
        return (
          <span key={`${lineIndex}-${line}`} className={lineIndex >= italicFrom ? "block italic" : "block"}>
            {line.split(" ").map((word, wordIndex) => {
              const index = previousWords + wordIndex;
              return (
                <motion.span
                  key={`${lineIndex}-${word}-${index}`}
                  className="generate-word mr-[0.28em] inline-block"
                  initial={{ opacity: 0.5, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.75, delay: index * 0.055, ease: easeLuxury }}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

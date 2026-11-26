"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
};

export function ParallaxImage({ src, alt, sizes }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className="relative h-[78vw] overflow-hidden lg:h-full lg:min-h-[92svh]">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}

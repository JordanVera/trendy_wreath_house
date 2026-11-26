"use client";

import { useEffect, useRef } from "react";
import { botanicalAssetMap } from "@/data/botanical-assets";
import { arcPoint, wreathLayers } from "@/data/wreath-composition";
import { cn } from "@/lib/utils";

export function AnimatedWreath() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const sources = new Set(wreathLayers.map((item) => botanicalAssetMap[item.assetId].src));
    sources.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let live = false;
    const timer = window.setTimeout(() => {
      live = true;
    }, 4300);

    const onMove = (event: PointerEvent) => {
      if (!live) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--px", x.toFixed(3));
      stage.style.setProperty("--py", y.toFixed(3));
    };

    const onLeave = () => {
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className="wreath-stage" aria-hidden="true">
      {wreathLayers.map((item) => {
        const asset = botanicalAssetMap[item.assetId];
        const mid = arcPoint(item);
        return (
          <div
            key={item.id}
            className={cn("wreath-layer", item.desktopOnly && "max-md:hidden")}
            style={{
              width: `${item.width / 10}%`,
              zIndex: item.z,
              ["--duration" as string]: `${item.duration}s`,
              ["--delay" as string]: `${item.delay}s`,
              ["--end-x" as string]: item.x / 10,
              ["--end-y" as string]: item.y / 10,
              ["--start-r" as string]: `${item.startRotation}deg`,
              ["--end-r" as string]: `${item.rotation}deg`,
              ["--sx" as string]: `calc(${(item.startX - item.x) / 10} * 1cqw)`,
              ["--sy" as string]: `calc(${(item.startY - item.y) / 10} * 1cqh)`,
              ["--mx" as string]: `calc(${(mid.x - item.x) / 10} * 1cqw)`,
              ["--my" as string]: `calc(${(mid.y - item.y) / 10} * 1cqh)`,
            }}
          >
            <div className="wreath-origin">
              <div className="wreath-parallax" style={{ ["--depth" as string]: item.depth }}>
                {/* Decorative stage layers. A plain image keeps the CSS timeline on the transform. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.src}
                  alt=""
                  width={asset.width}
                  height={asset.height}
                  draggable={false}
                  className="h-auto w-full select-none"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

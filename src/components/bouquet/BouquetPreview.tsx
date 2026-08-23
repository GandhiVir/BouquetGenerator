"use client";

import { forwardRef } from "react";
import { RIBBONS, WRAPS } from "@/data/bouquetOptions";
import { getFlowerMeta } from "@/lib/bouquet";
import type { BouquetConfig, FlatFlower, LayoutItem } from "@/types/bouquet";
import { FlowerHead } from "./FlowerHead";
import { RibbonSvg } from "./RibbonSvg";

function FlowerStem({
  flower,
  position,
  renderStyle,
}: {
  flower: FlatFlower;
  position: LayoutItem;
  renderStyle: BouquetConfig["flowerStyle"];
}) {
  const meta = getFlowerMeta(flower.type);
  const petalColor =
    meta?.petal?.[flower.color as keyof typeof meta.petal] || "#fda4af";

  return (
    <g
      transform={`translate(${position.x} ${position.y}) rotate(${position.rotate}) scale(${position.scale})`}
    >
      <line
        x1="0"
        y1="12"
        x2="0"
        y2={position.stemBaseY - position.y}
        stroke="#5f8b63"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="-10"
        cy="85"
        rx="12"
        ry="7"
        fill="#82a97f"
        transform="rotate(-30 -10 85)"
      />
      <ellipse
        cx="12"
        cy="110"
        rx="12"
        ry="7"
        fill="#82a97f"
        transform="rotate(30 12 110)"
      />
      <FlowerHead type={flower.type} color={petalColor} renderStyle={renderStyle} />
    </g>
  );
}

export const BouquetPreview = forwardRef<
  SVGSVGElement,
  {
    config: BouquetConfig;
    flatFlowers: FlatFlower[];
    layout: LayoutItem[];
  }
>(({ config, flatFlowers, layout }, svgRef) => {
  const wrap = WRAPS.find((item) => item.id === config.wrap) || WRAPS[0];
  const ribbon =
    RIBBONS.find((item) => item.id === config.ribbon) || RIBBONS[0];

  return (
    <div className="rounded-[28px] bg-[linear-gradient(180deg,#fffdfa_0%,#f8efe8_100%)] p-4 md:p-6">
      <div className="mx-auto max-w-[480px] rounded-[28px] bg-white/60 p-3 shadow-inner">
        <svg
          ref={svgRef}
          viewBox="0 0 460 620"
          className="w-full overflow-visible rounded-[24px] bg-transparent"
        >
          <defs>
            <filter
              id="softShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="14"
                floodOpacity="0.14"
              />
            </filter>
          </defs>

          <rect x="0" y="0" width="460" height="620" rx="26" fill="#fffaf8" />
          <circle cx="230" cy="185" r="155" fill="#fff1ec" opacity="0.7" />

          <g filter="url(#softShadow)">
            <polygon
              points="95,308 230,610 365,308"
              fill={wrap.edge}
              opacity="0.9"
            />
            <polygon points="125,308 230,600 335,308" fill={wrap.color} />
          </g>

          {flatFlowers.map((flower, index) => (
            <FlowerStem
              key={`${flower.type}-${flower.color}-${index}`}
              flower={flower}
              position={layout[index]}
              renderStyle={config.flowerStyle}
            />
          ))}

          <g filter="url(#softShadow)">
            <polygon
              points="130,332 230,595 330,332"
              fill={wrap.color}
              opacity="0.95"
            />
          </g>

          <RibbonSvg color={ribbon.color} />
        </svg>
      </div>

      <div className="mx-auto mt-5 max-w-md rounded-[24px] bg-white px-5 py-4 text-center shadow-sm ring-1 ring-stone-100">
        <p className="text-sm uppercase tracking-[0.25em] text-rose-400">
          Message card
        </p>
        <p className="mt-3 text-base leading-7 text-stone-700">
          {config.message}
        </p>
        <p className="mt-3 text-sm text-stone-500">
          — {config.senderName || "Anonymous"}
        </p>
      </div>
    </div>
  );
});

BouquetPreview.displayName = "BouquetPreview";

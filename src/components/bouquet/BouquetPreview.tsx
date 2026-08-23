"use client";

import { RIBBONS, WRAPS } from "@/data/bouquetOptions";
import { getFlowerMeta } from "@/lib/bouquet";
import type { BouquetConfig, FlatFlower, LayoutItem } from "@/types/bouquet";
import { FlowerHead } from "./FlowerHead";
import { RibbonSvg } from "./RibbonSvg";

const BLOOM_KEYFRAMES =
  "@keyframes bloom-in { 0% { opacity: 0; transform: scale(0.35); } 100% { opacity: 1; transform: scale(1); } }";

function FlowerStem({
  flower,
  position,
  renderStyle,
  animationDelay,
}: {
  flower: FlatFlower;
  position: LayoutItem;
  renderStyle: BouquetConfig["flowerStyle"];
  animationDelay?: number;
}) {
  const meta = getFlowerMeta(flower.type);
  const petalColor =
    meta?.petal?.[flower.color as keyof typeof meta.petal] || "#fda4af";

  return (
    <g
      transform={`translate(${position.x} ${position.y}) rotate(${position.rotate}) scale(${position.scale})`}
    >
      <g
        style={
          animationDelay === undefined
            ? undefined
            : {
                transformOrigin: "0px 0px",
                animation: `bloom-in 0.55s cubic-bezier(0.34,1.56,0.64,1) ${animationDelay}s both`,
              }
        }
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
    </g>
  );
}

export function BouquetSvgContent({
  config,
  flatFlowers,
  layout,
  animated = false,
  canvasHeight = 620,
}: {
  config: BouquetConfig;
  flatFlowers: FlatFlower[];
  layout: LayoutItem[];
  animated?: boolean;
  canvasHeight?: number;
}) {
  const wrap = WRAPS.find((item) => item.id === config.wrap) || WRAPS[0];
  const ribbon = RIBBONS.find((item) => item.id === config.ribbon) || RIBBONS[0];
  const ribbonDelay = 0.15 + flatFlowers.length * 0.09 + 0.15;

  return (
    <>
      {animated && <style>{BLOOM_KEYFRAMES}</style>}

      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodOpacity="0.14" />
        </filter>
      </defs>

      <rect x="0" y="0" width="460" height={canvasHeight} rx="26" fill="#fffaf8" />
      <circle cx="230" cy="185" r="155" fill="#fff1ec" opacity="0.7" />

      <g filter="url(#softShadow)">
        <polygon points="95,308 230,610 365,308" fill={wrap.edge} opacity="0.9" />
        <polygon points="125,308 230,600 335,308" fill={wrap.color} />
      </g>

      {flatFlowers.map((flower, index) => (
        <FlowerStem
          key={`${flower.type}-${flower.color}-${index}`}
          flower={flower}
          position={layout[index]}
          renderStyle={config.flowerStyle}
          animationDelay={animated ? 0.15 + index * 0.09 : undefined}
        />
      ))}

      <g filter="url(#softShadow)">
        <polygon points="130,332 230,595 330,332" fill={wrap.color} opacity="0.95" />
      </g>

      <g
        style={
          animated
            ? {
                transformOrigin: "230px 502px",
                animation: `bloom-in 0.5s cubic-bezier(0.34,1.56,0.64,1) ${ribbonDelay}s both`,
              }
            : undefined
        }
      >
        <RibbonSvg color={ribbon.color} />
      </g>
    </>
  );
}

export function BouquetPreview({
  config,
  flatFlowers,
  layout,
  animated = false,
}: {
  config: BouquetConfig;
  flatFlowers: FlatFlower[];
  layout: LayoutItem[];
  animated?: boolean;
}) {
  return (
    <div className="rounded-[28px] bg-[linear-gradient(180deg,#fffdfa_0%,#f8efe8_100%)] p-4 md:p-6">
      <div className="mx-auto max-w-[480px] rounded-[28px] bg-white/60 p-3 shadow-inner">
        <svg
          viewBox="0 0 460 620"
          className="w-full overflow-visible rounded-[24px] bg-transparent"
        >
          <BouquetSvgContent
            config={config}
            flatFlowers={flatFlowers}
            layout={layout}
            animated={animated}
          />
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
}

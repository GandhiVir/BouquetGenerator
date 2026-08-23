"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Flower2, Gift, Palette, RotateCcw, Ruler, Shuffle } from "lucide-react";
import { BouquetPreview } from "@/components/bouquet/BouquetPreview";
import { ColorSwatches } from "@/components/controls/ControlSwatches";
import { ControlRow } from "@/components/controls/ControlRow";
import { FlowerSelector } from "@/components/controls/FlowerSelector";
import { InfoCard } from "@/components/controls/InfoCard";
import { SectionCard } from "@/components/controls/SectionCard";
import { SegmentedControl } from "@/components/controls/SegmentedControl";
import {
  FLOWER_STYLES,
  OCCASIONS,
  RIBBONS,
  SIZES,
  STEM_LENGTHS,
  STYLES,
  WRAPS,
} from "@/data/bouquetOptions";
import { flattenFlowers, getLayout, shuffleFlowers } from "@/lib/bouquet";
import { downloadSvg } from "@/lib/download";
import { useBouquetStore } from "@/store/bouquetStore";
import type {
  BouquetSize,
  BouquetStyle,
  FlowerRenderStyle,
  StemLength,
} from "@/types/bouquet";

export default function BuilderPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { config, updateField, resetConfig, shuffleSeed, reshuffle } =
    useBouquetStore();

  const maxFlowers =
    config.size === "small" ? 8 : config.size === "medium" ? 12 : 18;
  const flatFlowers = useMemo(
    () =>
      shuffleFlowers(flattenFlowers(config.flowers, maxFlowers), shuffleSeed),
    [config.flowers, maxFlowers, shuffleSeed],
  );
  const layout = useMemo(
    () =>
      getLayout(
        config.size,
        config.style,
        config.stemLength,
        flatFlowers.length,
        shuffleSeed,
      ),
    [config.size, config.style, config.stemLength, flatFlowers.length, shuffleSeed],
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-7xl px-4 py-10 md:px-6"
    >
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500">
          Builder
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Design your bouquet
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Pick your flowers, shape the arrangement, and add a message — the
          preview updates as you go.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionCard title="Flowers" icon={<Flower2 className="h-4 w-4" />}>
            <ControlRow label="Flower style">
              <SegmentedControl
                options={FLOWER_STYLES}
                value={config.flowerStyle}
                onChange={(value) =>
                  updateField("flowerStyle", value as FlowerRenderStyle)
                }
              />
            </ControlRow>
            <FlowerSelector />
          </SectionCard>

          <SectionCard title="Shape & size" icon={<Ruler className="h-4 w-4" />}>
            <ControlRow label="Size">
              <SegmentedControl
                options={SIZES}
                value={config.size}
                onChange={(value) =>
                  updateField("size", value as BouquetSize)
                }
              />
            </ControlRow>
            <ControlRow label="Style">
              <SegmentedControl
                options={STYLES}
                value={config.style}
                onChange={(value) =>
                  updateField("style", value as BouquetStyle)
                }
              />
            </ControlRow>
            <ControlRow label="Stem length">
              <SegmentedControl
                options={STEM_LENGTHS}
                value={config.stemLength}
                onChange={(value) =>
                  updateField("stemLength", value as StemLength)
                }
              />
            </ControlRow>
          </SectionCard>

          <SectionCard title="Wrap & ribbon" icon={<Palette className="h-4 w-4" />}>
            <ControlRow label="Wrap">
              <ColorSwatches
                items={WRAPS}
                value={config.wrap}
                onChange={(value) => updateField("wrap", value)}
              />
            </ControlRow>
            <ControlRow label="Ribbon">
              <ColorSwatches
                items={RIBBONS}
                value={config.ribbon}
                onChange={(value) => updateField("ribbon", value)}
              />
            </ControlRow>
          </SectionCard>

          <SectionCard title="Message card" icon={<Gift className="h-4 w-4" />}>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Occasion</label>
                <select
                  value={config.occasion}
                  onChange={(e) => updateField('occasion', e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm outline-none"
                >
                  {OCCASIONS.map((occasion) => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Message</label>
                <textarea
                  rows={4}
                  maxLength={140}
                  value={config.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Sender name</label>
                <input
                  value={config.senderName}
                  onChange={(e) => updateField('senderName', e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm outline-none"
                />
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-rose-500">Live preview</p>
                <h2 className="mt-1 text-2xl font-semibold">Your digital bouquet</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={reshuffle} className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50">
                  <Shuffle className="h-4 w-4" />
                  Reshuffle
                </button>
                <button onClick={resetConfig} className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button onClick={() => downloadSvg(svgRef.current)} className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="mt-5">
              <BouquetPreview ref={svgRef} config={config} flatFlowers={flatFlowers} layout={layout} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Occasion" value={config.occasion} icon={<Gift className="h-4 w-4" />} />
            <InfoCard title="Flowers used" value={String(flatFlowers.length)} icon={<Flower2 className="h-4 w-4" />} />
            <InfoCard title="Theme" value={WRAPS.find((w) => w.id === config.wrap)?.name || 'Cream'} icon={<Palette className="h-4 w-4" />} />
          </div>
        </div>
      </div>
    </motion.main>
  )
}

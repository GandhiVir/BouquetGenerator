"use client";

import { useMemo, useRef } from "react";
import { Download } from "lucide-react";
import Link from "next/link";
import { BouquetPreview } from "@/components/bouquet/BouquetPreview";
import { DetailRow } from "@/components/controls/DetailRow";
import { RIBBONS, WRAPS } from "@/data/bouquetOptions";
import { flattenFlowers, getLayout, shuffleFlowers } from "@/lib/bouquet";
import { downloadSvg } from "@/lib/download";
import { useBouquetStore } from "@/store/bouquetStore";

export default function ResultPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { config, resetConfig, shuffleSeed } = useBouquetStore();

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
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_10px_50px_rgba(15,23,42,0.08)]">
        <div className="bg-gradient-to-r from-rose-50 via-white to-orange-50 px-8 py-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500">
            Final bouquet
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Made with love, wrapped your way
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            A shareable digital bouquet with your chosen flowers, paper, ribbon,
            and message.
          </p>
        </div>

        <div className="grid gap-8 px-8 py-8 lg:grid-cols-[1.2fr_0.8fr]">
          <BouquetPreview
            ref={svgRef}
            config={config}
            flatFlowers={flatFlowers}
            layout={layout}
          />

          <div className="flex flex-col justify-center">
            <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
                Details
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <DetailRow label="Occasion" value={config.occasion} />
                <DetailRow label="Bouquet size" value={config.size} />
                <DetailRow label="Style" value={config.style} />
                <DetailRow label="Stem length" value={config.stemLength} />
                <DetailRow
                  label="Wrap"
                  value={
                    WRAPS.find((w) => w.id === config.wrap)?.name || config.wrap
                  }
                />
                <DetailRow
                  label="Ribbon"
                  value={
                    RIBBONS.find((r) => r.id === config.ribbon)?.name ||
                    config.ribbon
                  }
                />
                <DetailRow
                  label="Sender"
                  value={config.senderName || "Anonymous"}
                />
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => downloadSvg(svgRef.current)}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
              >
                <Download className="h-4 w-4" />
                Download SVG
              </button>
              <Link
                href="/builder"
                className="rounded-full border border-stone-200 px-5 py-3 text-sm font-medium"
              >
                Edit bouquet
              </Link>
              <Link
                href="/builder"
                onClick={() => resetConfig()}
                className="rounded-full border border-stone-200 px-5 py-3 text-sm font-medium"
              >
                Create another
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

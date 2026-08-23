"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Check, Download, Film, Share } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BouquetPreview } from "@/components/bouquet/BouquetPreview";
import { DetailRow } from "@/components/controls/DetailRow";
import { RIBBONS, WRAPS } from "@/data/bouquetOptions";
import { flattenFlowers, getLayout, shuffleFlowers } from "@/lib/bouquet";
import { downloadSvgMarkup } from "@/lib/download";
import { buildBouquetSvgMarkup } from "@/lib/exportSvg";
import { decodeBouquetConfig, encodeBouquetConfig } from "@/lib/shareLink";
import { useBouquetStore } from "@/store/bouquetStore";

function SharedLinkLoader() {
  const searchParams = useSearchParams();
  const setConfig = useBouquetStore((state) => state.setConfig);

  useEffect(() => {
    const shared = searchParams.get("b");
    if (!shared) return;
    const decoded = decodeBouquetConfig(shared);
    if (decoded) setConfig(decoded);
  }, [searchParams, setConfig]);

  return null;
}

export default function ResultPage() {
  const { config, resetConfig, shuffleSeed } = useBouquetStore();
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    const url = `${window.location.origin}/result?b=${encodeURIComponent(
      encodeBouquetConfig(config),
    )}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "A bouquet for you", url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link to share your bouquet:", url);
    }
  };

  const handleDownloadAnimated = () => {
    const markup = buildBouquetSvgMarkup(config, flatFlowers, layout, true);
    downloadSvgMarkup(markup, "digital-bouquet-animated.svg");
  };

  const handleDownloadStatic = () => {
    const markup = buildBouquetSvgMarkup(config, flatFlowers, layout, false);
    downloadSvgMarkup(markup, "digital-bouquet.svg");
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Suspense fallback={null}>
        <SharedLinkLoader />
      </Suspense>

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
            config={config}
            flatFlowers={flatFlowers}
            layout={layout}
            animated
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
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Share className="h-4 w-4" />
                )}
                {copied ? "Link copied" : "Share link"}
              </button>
              <button
                onClick={handleDownloadStatic}
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
              >
                <Download className="h-4 w-4" />
                Download SVG
              </button>
              <button
                onClick={handleDownloadAnimated}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-3 text-sm font-medium hover:bg-stone-50"
              >
                <Film className="h-4 w-4" />
                Download animated
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

import type { BouquetConfig } from "@/types/bouquet";

export type SharePayload = {
  config: BouquetConfig;
  shuffleSeed: number;
};

export function encodeShareState(config: BouquetConfig, shuffleSeed: number): string {
  const json = JSON.stringify({ config, shuffleSeed });
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeShareState(value: string): SharePayload | null {
  try {
    const json = decodeURIComponent(escape(atob(value)));
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;

    if (parsed.config && Array.isArray(parsed.config.flowers)) {
      return {
        config: parsed.config as BouquetConfig,
        shuffleSeed: typeof parsed.shuffleSeed === "number" ? parsed.shuffleSeed : 0,
      };
    }

    // Legacy links (encoded before shuffleSeed was included) were a bare config object.
    if (Array.isArray(parsed.flowers)) {
      return { config: parsed as BouquetConfig, shuffleSeed: 0 };
    }

    return null;
  } catch {
    return null;
  }
}

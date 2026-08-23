import type { BouquetConfig } from "@/types/bouquet";

export function encodeBouquetConfig(config: BouquetConfig): string {
  const json = JSON.stringify(config);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeBouquetConfig(value: string): BouquetConfig | null {
  try {
    const json = decodeURIComponent(escape(atob(value)));
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.flowers)) {
      return parsed as BouquetConfig;
    }
    return null;
  } catch {
    return null;
  }
}

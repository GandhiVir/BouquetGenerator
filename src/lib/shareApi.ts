import type { BouquetConfig } from "@/types/bouquet";
import { encodeShareState } from "./shareLink";

export async function createShareUrl(
  config: BouquetConfig,
  shuffleSeed: number,
): Promise<string> {
  const origin = window.location.origin;

  try {
    const response = await fetch("/api/bouquets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config, shuffleSeed }),
    });
    if (response.ok) {
      const { id } = await response.json();
      return `${origin}/result?id=${id}`;
    }
  } catch {
    // No storage backend available (e.g. local dev without `netlify dev`) —
    // fall back to encoding the bouquet directly in the URL.
  }

  return `${origin}/result?b=${encodeURIComponent(encodeShareState(config, shuffleSeed))}`;
}

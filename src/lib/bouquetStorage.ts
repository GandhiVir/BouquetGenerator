import { getStore } from "@netlify/blobs";
import type { BouquetConfig } from "@/types/bouquet";

const STORE_NAME = "shared-bouquets";
const EXPIRY_MS = 14 * 24 * 60 * 60 * 1000;

type StoredBouquet = {
  config: BouquetConfig;
  shuffleSeed: number;
  createdAt: number;
};

function generateId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

export async function saveSharedBouquet(
  config: BouquetConfig,
  shuffleSeed: number,
): Promise<string> {
  const store = getStore(STORE_NAME);
  const id = generateId();
  const payload: StoredBouquet = { config, shuffleSeed, createdAt: Date.now() };
  await store.setJSON(id, payload);
  return id;
}

export async function getSharedBouquet(
  id: string,
): Promise<{ config: BouquetConfig; shuffleSeed: number } | null> {
  const store = getStore(STORE_NAME);
  const stored = (await store.get(id, { type: "json" })) as StoredBouquet | null;
  if (!stored) return null;

  if (Date.now() - stored.createdAt > EXPIRY_MS) {
    await store.delete(id).catch(() => {});
    return null;
  }

  return { config: stored.config, shuffleSeed: stored.shuffleSeed };
}

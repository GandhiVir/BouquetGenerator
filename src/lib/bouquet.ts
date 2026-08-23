import { FLOWER_TYPES } from "@/data/bouquetOptions";
import type {
  BouquetSize,
  BouquetStyle,
  FlatFlower,
  FlowerSelection,
  LayoutItem,
  StemLength,
} from "@/types/bouquet";

export function flattenFlowers(
  flowers: FlowerSelection[],
  maxCount: number,
): FlatFlower[] {
  return flowers
    .flatMap((flower) =>
      Array.from({ length: Math.max(0, Math.min(flower.count, 10)) }, () => ({
        type: flower.type,
        color: flower.color,
      })),
    )
    .slice(0, maxCount);
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleFlowers<T>(items: T[], seed: number): T[] {
  if (!seed) return items;
  const random = mulberry32(seed);
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getLayout(
  size: BouquetSize,
  style: BouquetStyle,
  stemLength: StemLength,
  count: number,
  seed = 0,
): LayoutItem[] {
  const canvas = {
    width: 460,
    height: 700,
    centerX: 230,
    stemBaseY:
      stemLength === "short" ? 380 : stemLength === "medium" ? 420 : 460,
  };

  const radius = size === "small" ? 70 : size === "medium" ? 95 : 120;
  const spread = style === "fan" ? 1.25 : style === "neat" ? 0.78 : 1;
  const topY = size === "small" ? 185 : size === "medium" ? 165 : 145;
  const scale = size === "small" ? 0.92 : size === "medium" ? 1 : 1.08;
  const random = seed ? mulberry32(seed) : null;

  return Array.from({ length: count }, (_, i) => {
    const denom = Math.max(count - 1, 1);
    const t = count === 1 ? 0.5 : i / denom;
    const angle = (-Math.PI * 0.8 * spread) / 2 + t * (Math.PI * 0.8 * spread);
    const ringBump = style === "round" ? Math.sin(t * Math.PI) * 18 : 0;
    const neatOffset = style === "neat" ? (i % 2 === 0 ? -8 : 8) : 0;
    const jitterX = random ? (random() - 0.5) * 14 : 0;
    const jitterY = random ? (random() - 0.5) * 10 : 0;
    const jitterRotate = random ? (random() - 0.5) * 8 : 0;
    const x = canvas.centerX + Math.sin(angle) * radius + neatOffset + jitterX;
    const y =
      topY +
      Math.cos(angle) * 18 -
      ringBump +
      (style === "fan" ? Math.abs(t - 0.5) * 20 : 0) +
      jitterY;
    const rotate = ((x - canvas.centerX) / radius) * 14 + jitterRotate;

    return { x, y, stemBaseY: canvas.stemBaseY, scale, rotate };
  });
}

export function getFlowerMeta(type: string) {
  return FLOWER_TYPES.find((f) => f.id === type);
}

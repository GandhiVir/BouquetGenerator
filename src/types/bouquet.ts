export type FlowerType = "rose" | "tulip" | "sunflower" | "lily" | "daisy";
export type BouquetSize = "small" | "medium" | "large";
export type BouquetStyle = "round" | "fan" | "neat";
export type StemLength = "short" | "medium" | "long";
export type FlowerRenderStyle = "classic" | "lego" | "realistic";

export type FlowerSelection = {
  type: FlowerType;
  color: string;
  count: number;
};

export type BouquetConfig = {
  flowers: FlowerSelection[];
  size: BouquetSize;
  style: BouquetStyle;
  stemLength: StemLength;
  wrap: string;
  ribbon: string;
  occasion: string;
  message: string;
  senderName: string;
  flowerStyle: FlowerRenderStyle;
  songUrl: string;
};

export type FlatFlower = {
  type: FlowerType;
  color: string;
};

export type LayoutItem = {
  x: number;
  y: number;
  stemBaseY: number;
  scale: number;
  rotate: number;
};

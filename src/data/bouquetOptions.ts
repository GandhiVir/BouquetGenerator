import type { BouquetConfig } from "@/types/bouquet";

export const FLOWER_TYPES = [
  {
    id: "rose",
    name: "Rose",
    colors: ["red", "pink", "white"],
    petal: { red: "#dc2626", pink: "#ec4899", white: "#f8fafc" },
  },
  {
    id: "tulip",
    name: "Tulip",
    colors: ["pink", "yellow", "white"],
    petal: { pink: "#f472b6", yellow: "#facc15", white: "#f8fafc" },
  },
  {
    id: "sunflower",
    name: "Sunflower",
    colors: ["yellow"],
    petal: { yellow: "#fbbf24" },
  },
  {
    id: "lily",
    name: "Lily",
    colors: ["white", "orange"],
    petal: { white: "#f8fafc", orange: "#fb923c" },
  },
  {
    id: "daisy",
    name: "Daisy",
    colors: ["white", "pink"],
    petal: { white: "#ffffff", pink: "#f9a8d4" },
  },
] as const;

export const WRAPS = [
  { id: "cream", name: "Cream", color: "#f5efe6", edge: "#eadfce" },
  { id: "blush", name: "Blush", color: "#f8d7da", edge: "#efc2c8" },
  { id: "sage", name: "Sage", color: "#dbe7db", edge: "#c8d8c8" },
  { id: "lavender", name: "Lavender", color: "#e9ddff", edge: "#d8c8fa" },
  { id: "midnight", name: "Midnight", color: "#334155", edge: "#1e293b" },
] as const;

export const RIBBONS = [
  { id: "red", name: "Red", color: "#dc2626" },
  { id: "rose", name: "Rose", color: "#e11d48" },
  { id: "gold", name: "Gold", color: "#ca8a04" },
  { id: "sage", name: "Sage", color: "#6b8f71" },
  { id: "black", name: "Black", color: "#111827" },
] as const;

export const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Thank You",
  "Just Because",
] as const;
export const SIZES = ["small", "medium", "large"] as const;
export const STYLES = ["round", "fan", "neat"] as const;
export const STEM_LENGTHS = ["short", "medium", "long"] as const;
export const FLOWER_STYLES = ["classic", "lego", "realistic"] as const;

export const DEFAULT_CONFIG: BouquetConfig = {
  flowers: [
    { type: "rose", color: "red", count: 3 },
    { type: "tulip", color: "pink", count: 2 },
    { type: "sunflower", color: "yellow", count: 1 },
    { type: "lily", color: "white", count: 1 },
    { type: "daisy", color: "white", count: 2 },
  ],
  size: "medium",
  style: "round",
  stemLength: "medium",
  wrap: "cream",
  ribbon: "red",
  occasion: "Birthday",
  message: "Wishing you a day as beautiful as these flowers.",
  senderName: "From me",
  flowerStyle: "classic",
  songUrl: "https://open.spotify.com/track/74RjCYWXEq02lyMumMTKDI?si=a2faed000f884ec5",
};

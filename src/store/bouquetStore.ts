"use client";

import { create } from "zustand";
import { DEFAULT_CONFIG } from "@/data/bouquetOptions";
import type { BouquetConfig } from "@/types/bouquet";

type BouquetStore = {
  config: BouquetConfig;
  shuffleSeed: number;
  setConfig: (config: BouquetConfig) => void;
  updateField: <K extends keyof BouquetConfig>(
    field: K,
    value: BouquetConfig[K],
  ) => void;
  updateFlowerCount: (type: string, count: number) => void;
  updateFlowerColor: (type: string, color: string) => void;
  reshuffle: () => void;
  resetConfig: () => void;
};

export const useBouquetStore = create<BouquetStore>((set) => ({
  config: DEFAULT_CONFIG,
  shuffleSeed: 0,
  setConfig: (config) => set({ config }),
  updateField: (field, value) =>
    set((state) => ({
      config: { ...state.config, [field]: value },
    })),
  updateFlowerCount: (type, count) =>
    set((state) => ({
      config: {
        ...state.config,
        flowers: state.config.flowers.map((flower) =>
          flower.type === type
            ? {
                ...flower,
                count: Math.max(0, Math.min(10, Number(count) || 0)),
              }
            : flower,
        ),
      },
    })),
  updateFlowerColor: (type, color) =>
    set((state) => ({
      config: {
        ...state.config,
        flowers: state.config.flowers.map((flower) =>
          flower.type === type ? { ...flower, color } : flower,
        ),
      },
    })),
  reshuffle: () => set({ shuffleSeed: Math.floor(Math.random() * 2 ** 31) || 1 }),
  resetConfig: () => set({ config: DEFAULT_CONFIG, shuffleSeed: 0 }),
}));

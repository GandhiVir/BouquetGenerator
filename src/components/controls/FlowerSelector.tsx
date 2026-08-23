"use client";

import { FLOWER_TYPES } from "@/data/bouquetOptions";
import { classNames } from "@/lib/utils";
import { useBouquetStore } from "@/store/bouquetStore";

export function FlowerSelector() {
  const { config, updateFlowerColor, updateFlowerCount } = useBouquetStore();

  return (
    <div className="space-y-4">
      {FLOWER_TYPES.map((flower) => {
        const selected = config.flowers.find((item) => item.type === flower.id);

        return (
          <div
            key={flower.id}
            className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-stone-900">{flower.name}</p>
                <p className="text-sm text-stone-500">
                  Choose color and quantity
                </p>
              </div>
              <input
                type="number"
                min={0}
                max={10}
                value={selected?.count ?? 0}
                onChange={(e) =>
                  updateFlowerCount(flower.id, Number(e.target.value))
                }
                className="w-20 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {flower.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateFlowerColor(flower.id, color)}
                  className={classNames(
                    "rounded-full border px-3 py-1.5 text-sm capitalize transition",
                    selected?.color === color
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white hover:border-stone-400",
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

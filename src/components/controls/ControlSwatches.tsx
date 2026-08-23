import { classNames } from "@/lib/utils";

export function ColorSwatches({
  items,
  value,
  onChange,
}: {
  items: readonly { id: string; name: string; color: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className="group flex items-center gap-2"
        >
          <span
            className={classNames(
              "h-8 w-8 rounded-full border-2 shadow-sm transition",
              value === item.id
                ? "border-stone-900 ring-2 ring-stone-300"
                : "border-white",
            )}
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-stone-600 group-hover:text-stone-900">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}

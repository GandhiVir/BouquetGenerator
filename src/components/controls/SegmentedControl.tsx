import { classNames } from "@/lib/utils";

export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={classNames(
            "rounded-full border px-4 py-2 text-sm font-medium capitalize transition",
            value === option
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-200 bg-white text-stone-700 hover:border-stone-400",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

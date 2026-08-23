import { classNames } from "@/lib/utils";

export function NavButton({
  active,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
}) {
  return (
    <button
      {...props}
      className={classNames(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-stone-900 text-white"
          : "text-stone-600 hover:bg-stone-100",
      )}
    >
      {children}
    </button>
  );
}

"use client";

import Link from "next/link";
import { Flower2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSharedResultView =
    pathname === "/result" && (searchParams.has("id") || searchParams.has("b"));

  if (isSharedResultView) return null;

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
            <Flower2 className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold">Bouquet Studio</p>
            <p className="text-xs text-stone-500">Custom digital bouquets</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
            href="/"
          >
            Home
          </Link>
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
            href="/builder"
          >
            Builder
          </Link>
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
            href="/result"
          >
            Result
          </Link>
        </nav>
      </div>
    </header>
  );
}

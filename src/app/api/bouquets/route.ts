import { NextResponse } from "next/server";
import { saveSharedBouquet } from "@/lib/bouquetStorage";
import type { BouquetConfig } from "@/types/bouquet";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body !== "object" ||
    !Array.isArray(body.config?.flowers) ||
    typeof body.shuffleSeed !== "number"
  ) {
    return NextResponse.json({ error: "Invalid bouquet payload" }, { status: 400 });
  }

  try {
    const id = await saveSharedBouquet(
      body.config as BouquetConfig,
      body.shuffleSeed as number,
    );
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}

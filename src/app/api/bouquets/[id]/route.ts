import { NextResponse } from "next/server";
import { getSharedBouquet } from "@/lib/bouquetStorage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const bouquet = await getSharedBouquet(id);
    if (!bouquet) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(bouquet);
  } catch {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}

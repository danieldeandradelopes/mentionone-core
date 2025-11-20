// app/api/boxes/[id]/route.ts
import { NextResponse } from "next/server";
import { getBoxById, updateBox, deleteBox } from "@/app/lib/boxes";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const box = await getBoxById(id);

  if (!box) {
    return NextResponse.json({ error: "Box não encontrada" }, { status: 404 });
  }

  return NextResponse.json(box);
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  const updated = await updateBox(id, body);

  if (!updated) {
    return NextResponse.json({ error: "Box não encontrada" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const deleted = await deleteBox(id);

  if (!deleted) {
    return NextResponse.json({ error: "Box não encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

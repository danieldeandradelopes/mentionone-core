import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao fazer logout" },
      { status: 500 }
    );
  }
}

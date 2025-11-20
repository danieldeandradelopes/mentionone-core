import Feedback from "@/app/entities/Feedback";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { feedbackStore } from "@/app/lib/storage";

// GET → retorna todos os feedbacks
export async function GET() {
  const feedbacks = feedbackStore.getAll();
  return NextResponse.json(feedbacks);
}

// POST → salva um novo feedback
export async function POST(req: Request) {
  const { boxId, text, category } = await req.json();
  console.log(boxId, text, category);

  if (!boxId || !text || !category) {
    return NextResponse.json(
      { error: "boxId, text e category são obrigatórios." },
      { status: 400 }
    );
  }

  const newEntry = new Feedback(
    randomUUID(),
    boxId || "",
    text,
    category,
    new Date()
  );

  feedbackStore.create(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}

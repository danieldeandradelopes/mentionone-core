import Feedback from "@/app/entities/Feedback";
import { randomUUID } from "crypto";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "feedback.json");

// Helper para ler JSON
function readFeedbackFile(): Feedback[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as Feedback[];
  } catch {
    return [];
  }
}

// Helper para salvar JSON
function writeFeedbackFile(data: Feedback[]) {
  // Garante que o diretório existe antes de salvar
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// GET → retorna todos os feedbacks
export async function GET() {
  const file = readFeedbackFile();
  return NextResponse.json(file);
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

  const file = readFeedbackFile();
  file.push(newEntry);
  writeFeedbackFile(file);

  return NextResponse.json(newEntry, { status: 201 });
}

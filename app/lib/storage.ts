// Sistema de armazenamento em memória para ambientes serverless
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import Feedback from "@/app/entities/Feedback";
import { Box } from "./boxes";

// Armazenamento em memória
let boxesStorage: Box[] = [];
let feedbackStorage: Feedback[] = [];

// Caminhos dos arquivos JSON
const boxesPath = path.join(process.cwd(), "data", "boxes.json");
const feedbackPath = path.join(process.cwd(), "data", "feedback.json");

// Função helper para tentar escrever em arquivo (não falha em produção)
function tryWriteFile(filePath: string, data: Box[] | Feedback[]): void {
  try {
    // Garante que o diretório existe
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`Dados salvos em ${filePath}`);
  } catch (error) {
    // Em produção (serverless), o sistema de arquivos pode ser somente leitura
    // Não falhamos, apenas logamos o aviso
    const err = error as NodeJS.ErrnoException;
    if (err.code === "EROFS" || err.code === "EACCES") {
      console.warn(
        `Não foi possível escrever em ${filePath} (sistema somente leitura). Dados mantidos apenas em memória.`
      );
    } else {
      console.warn(`Erro ao escrever em ${filePath}:`, err.message);
    }
  }
}

// Função helper para ler arquivo JSON
function tryReadFile(filePath: string): Box[] | Feedback[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data) as Box[] | Feedback[];
    }
  } catch (error) {
    const err = error as Error;
    console.warn(`Erro ao ler ${filePath}:`, err.message);
  }
  return [];
}

// Carrega dados iniciais dos arquivos JSON
function loadInitialData() {
  try {
    const boxesData = tryReadFile(boxesPath);
    boxesStorage = Array.isArray(boxesData) ? (boxesData as Box[]) : [];
    console.log(`Carregados ${boxesStorage.length} boxes do arquivo`);
  } catch (error) {
    console.warn("Erro ao carregar boxes.json inicial:", error);
    boxesStorage = [];
  }

  try {
    const feedbackData = tryReadFile(feedbackPath);
    feedbackStorage = Array.isArray(feedbackData)
      ? (feedbackData as Feedback[])
      : [];
    console.log(`Carregados ${feedbackStorage.length} feedbacks do arquivo`);
  } catch (error) {
    console.warn("Erro ao carregar feedback.json inicial:", error);
    feedbackStorage = [];
  }
}

// Inicializa os dados na primeira importação
loadInitialData();

// Boxes Storage
export const boxesStore = {
  getAll: (): Box[] => boxesStorage,

  getById: (id: string): Box | null => {
    return boxesStorage.find((b) => b.id === id) || null;
  },

  create: (data: Omit<Box, "id">): Box => {
    const newBox: Box = {
      id: randomUUID(),
      ...data,
    };
    boxesStorage.push(newBox);
    console.log(
      `Box criado: ${newBox.id} - ${newBox.name}. Total no storage: ${boxesStorage.length}`
    );
    // Tenta persistir no arquivo (não falha se não conseguir)
    tryWriteFile(boxesPath, boxesStorage);
    return newBox;
  },

  update: (id: string, data: Partial<Omit<Box, "id">>): Box | null => {
    const index = boxesStorage.findIndex((b) => b.id === id);
    if (index === -1) return null;

    boxesStorage[index] = {
      ...boxesStorage[index],
      ...data,
    };
    // Tenta persistir no arquivo (não falha se não conseguir)
    tryWriteFile(boxesPath, boxesStorage);
    return boxesStorage[index];
  },

  delete: (id: string): boolean => {
    const initialLength = boxesStorage.length;
    boxesStorage = boxesStorage.filter((b) => b.id !== id);
    const deleted = boxesStorage.length < initialLength;
    if (deleted) {
      // Tenta persistir no arquivo (não falha se não conseguir)
      tryWriteFile(boxesPath, boxesStorage);
    }
    return deleted;
  },
};

// Feedback Storage
export const feedbackStore = {
  getAll: (): Feedback[] => feedbackStorage,

  create: (feedback: Feedback): Feedback => {
    feedbackStorage.push(feedback);
    // Tenta persistir no arquivo (não falha se não conseguir)
    tryWriteFile(feedbackPath, feedbackStorage);
    return feedback;
  },
};

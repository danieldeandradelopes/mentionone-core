import File from "@/types/FileType";

export const UPLOAD_KEYS = {
  upload: (value: File) => ["upload", value],
} as const;

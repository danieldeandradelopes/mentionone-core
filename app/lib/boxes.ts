// lib/boxes.ts
import { boxesStore } from "./storage";

export interface Box {
  id: string;
  name: string;
  location: string;
}

/*
 * GET ALL
 */
export async function getAllBoxes(): Promise<Box[]> {
  return boxesStore.getAll();
}

/*
 * GET ONE
 */
export async function getBoxById(id: string): Promise<Box | null> {
  return boxesStore.getById(id);
}

/*
 * CREATE
 */
export async function createBox(data: Omit<Box, "id">): Promise<Box> {
  return boxesStore.create(data);
}

/*
 * UPDATE
 */
export async function updateBox(
  id: string,
  data: Partial<Omit<Box, "id">>
): Promise<Box | null> {
  return boxesStore.update(id, data);
}

/*
 * DELETE
 */
export async function deleteBox(id: string): Promise<boolean> {
  return boxesStore.delete(id);
}

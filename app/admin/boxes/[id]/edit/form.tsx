"use client";

import { useState } from "react";
import {
  useUpdateBox,
  useDeleteBox,
} from "@/hooks/integration/boxes/mutations";
import Boxes from "@/@backend-types/Boxes";

export default function EditBoxForm({ box }: { box: Boxes }) {
  const [name, setName] = useState(box.name);
  const [location, setLocation] = useState(box.location);
  const [slug, setSlug] = useState(box.slug);
  const updateBoxMutation = useUpdateBox();
  const deleteBoxMutation = useDeleteBox();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await updateBoxMutation.mutateAsync({
        id: box.id,
        name,
        location,
        slug,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    if (!confirm(`Tem certeza que deseja excluir a caixa "${box.name}"?`)) {
      return;
    }

    try {
      await deleteBoxMutation.mutateAsync(box.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border p-3 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        className="w-full border p-3 rounded-lg"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      {/* Campo slug opcional */}
      <input
        type="text"
        placeholder="URL amigável (slug) - opcional"
        value={slug}
        onChange={(e) => {
          // Permitir só letras, números, hífen e underline
          const limpa = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
          setSlug(limpa);
        }}
        className="w-full border p-3 rounded-lg"
      />
      <small className="text-xs text-gray-500">
        Pode usar apenas letras, números, hífen (-) e underline (_). Deixe em
        branco para gerar automaticamente.
      </small>

      {updateBoxMutation.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {updateBoxMutation.error.message || "Erro ao atualizar box"}
        </div>
      )}

      <button
        type="submit"
        disabled={updateBoxMutation.isPending}
        className="w-full bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {updateBoxMutation.isPending ? "Salvando..." : "Salvar alterações"}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteBoxMutation.isPending}
        className="w-full bg-red-600 text-white p-3 rounded-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {deleteBoxMutation.isPending ? "Excluindo..." : "Excluir caixa"}
      </button>
    </form>
  );
}

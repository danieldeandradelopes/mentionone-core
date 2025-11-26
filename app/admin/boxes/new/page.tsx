// app/admin/boxes/new/page.tsx
"use client";

import { useState } from "react";
import { useCreateBox } from "@/hooks/integration/boxes/mutations";

export default function NewBoxPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [slug, setSlug] = useState(""); // novo campo opcional
  const createBoxMutation = useCreateBox();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createBoxMutation.mutateAsync({
        name,
        location,
        slug,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar nova caixa</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome da caixa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border p-3 rounded-lg"
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

        {createBoxMutation.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {createBoxMutation.error.message || "Erro ao criar box"}
          </div>
        )}

        <button
          type="submit"
          disabled={createBoxMutation.isPending}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createBoxMutation.isPending ? "Criando..." : "Criar"}
        </button>
      </form>
    </div>
  );
}

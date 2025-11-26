// app/admin/boxes/new/page.tsx
"use client";

import { useState } from "react";
import { useCreateBox } from "@/hooks/integration/boxes/mutations";

export default function NewBoxPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const createBoxMutation = useCreateBox();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createBoxMutation.mutateAsync({ name, location });
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

// app/admin/settings/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin • Settings",
};

export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Configurações do Painel</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Geral</h2>

        <form className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Nome da organização</label>
            <input
              type="text"
              className="border p-2 rounded"
              placeholder="Ex: Minha Empresa"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">E-mail de suporte</label>
            <input
              type="email"
              className="border p-2 rounded"
              placeholder="exemplo@empresa.com"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </form>
      </section>
    </div>
  );
}

// app/admin/boxes/page.tsx
"use client";

import Link from "next/link";
import BoxesList from "./BoxesList";

export default function BoxesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Caixas</h1>
        <Link
          href="/admin/boxes/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Criar caixa
        </Link>
      </div>

      <BoxesList />
    </div>
  );
}

"use client";

import { useGetBoxes } from "@/hooks/integration/boxes/queries";
import Boxes from "@/@backend-types/Boxes";
import Link from "next/link";

export default function QRCodesPage() {
  const { data: boxes = [], isLoading, error } = useGetBoxes();

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-gray-500 text-center py-8">
          Carregando caixas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-red-500 text-center py-8">
          Erro ao carregar caixas. Tente novamente.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">QR Codes</h1>
        <p className="text-gray-600">
          Acesse o QR Code de cada caixa para compartilhar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boxes.length === 0 && (
          <p className="text-gray-500 text-center col-span-2">
            Nenhuma caixa criada ainda.
          </p>
        )}

        {boxes.map((box: Boxes) => (
          <div
            key={box.id}
            className="p-4 border rounded-xl bg-white flex flex-col items-center gap-4"
          >
            <div className="text-center">
              <p className="font-semibold text-lg">{box.name}</p>
              <p className="text-sm text-gray-500">{box.location}</p>
            </div>

            <Link
              href={`/admin/boxes/${box.id}/qrcode`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Ver QR Code
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

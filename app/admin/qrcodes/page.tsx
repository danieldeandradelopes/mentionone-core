import Boxes from "@/app/entities/Boxes";
import Link from "next/link";
import { getApiUrl } from "@/app/lib/api";

async function getBoxes() {
  const baseUrl = getApiUrl();
  const res = await fetch(`${baseUrl}/api/boxes`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function QRCodesPage() {
  const boxes = await getBoxes();

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

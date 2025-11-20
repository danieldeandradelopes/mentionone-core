"use client";

import { use, useState, useEffect } from "react";
import QRCode from "qrcode-generator";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";

function getPublicUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default function QrCodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [copied, setCopied] = useState(false);
  const [box, setBox] = useState<{ name: string; location: string } | null>(
    null
  );

  const publicUrl = getPublicUrl();
  const boxUrl = `${publicUrl}/qr/${id}`;

  // Gera QRCode diretamente (nada assíncrono)
  const qr = QRCode(0, "L");
  qr.addData(boxUrl);
  qr.make();
  const svgTag = qr.createSvgTag({
    cellSize: 6,
    margin: 4,
  });

  useEffect(() => {
    // Busca informações da box
    fetch(`/api/boxes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setBox({ name: data.name, location: data.location });
        }
      })
      .catch(() => {
        // Ignora erro
      });
  }, [id]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(boxUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/admin/qrcodes"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={18} />
        Voltar para QR Codes
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">QR Code da Box</h1>
        {box && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">{box.name}</p>
            <p className="text-sm text-gray-500">{box.location}</p>
          </div>
        )}

        <div className="flex flex-col items-center gap-6">
          <div
            className="bg-white p-6 rounded-lg border-2 border-gray-200"
            dangerouslySetInnerHTML={{ __html: svgTag }}
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL do QR Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={boxUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Escaneie este QR Code para acessar o formulário de feedback desta
            box
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ boxId: string }>;
};

export default function QRFeedbackPage({ params }: Props) {
  const { boxId } = use(params);

  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!boxId) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600">
          URL inválida! Parâmetro boxId não informado.
        </h1>
        <p className="text-gray-600 text-center">
          Por favor, acesse via link correto ou peça suporte.
        </p>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(boxId, text, category);

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        boxId,
        text,
        category,
      }),
    });

    router.push(`/qr/${boxId}/thank-you`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-white">
      <div className="w-full max-w-md mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Deixe sua sugestão
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sua opinião é anônima e ajuda muito.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-50 p-5 rounded-2xl border"
        >
          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite sua sugestão..."
            className="p-3 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Selecione uma categoria (obrigatório)</option>
            <option value="servico">Serviço</option>
            <option value="limpeza">Limpeza</option>
            <option value="atendimento">Atendimento</option>
            <option value="infraestrutura">Infraestrutura</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </main>
  );
}

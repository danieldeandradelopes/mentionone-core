import { use } from "react";

type TYProps = {
  params: Promise<{ boxId: string }>;
};

export function generateStaticParams() {
  return [];
}

export function ThankYou({ params }: TYProps) {
  const { boxId } = use(params);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
      <h1 className="text-3xl font-bold mb-4">Obrigado! 🎉</h1>
      <p className="text-gray-600 max-w-sm mb-6">
        Sua sugestão foi registrada com sucesso.
      </p>

      <a href={`/qr/${boxId}`} className="text-indigo-600 underline">
        Enviar outra sugestão
      </a>
    </main>
  );
}

export default ThankYou;

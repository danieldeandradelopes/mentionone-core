"use client";

import { useGetFeedbacks } from "@/hooks/integration/feedback/queries";

export default function FeedbackListPage() {
  const { data: feedbacks, isLoading, error } = useGetFeedbacks();
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>Erro ao carregar feedbacks: {error.message}</div>;
  }
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold">Feedbacks Recebidos</h1>
        <p className="text-gray-500 text-sm">
          Total: {feedbacks?.length} feedbacks
        </p>
      </header>

      <div className="space-y-4">
        {feedbacks?.length === 0 && (
          <p className="text-gray-500">Nenhum feedback encontrado.</p>
        )}

        {feedbacks?.map((fb) => (
          <div
            key={fb.id}
            className="p-4 bg-white rounded-xl shadow border border-gray-100"
          >
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full mb-2">
              {fb.category}
            </span>

            {/* Text */}
            {fb.text ? (
              <p className="text-gray-700 whitespace-pre-wrap">{fb.text}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">Sem texto</p>
            )}

            {/* Metadata */}
            <div className="text-xs text-gray-400 mt-3 space-y-1">
              <p>ID: {fb.id}</p>
              <p>Box: {fb.box_id}</p>
              <p>{new Date(fb.created_at ?? "").toLocaleString("pt-BR")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

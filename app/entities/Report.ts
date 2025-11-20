export default class Report {
  constructor(
    readonly id: string,
    readonly boxId: string | null, // box filtrado (ou null para "todos")
    readonly category: string | null, // categoria filtrada (ou null)
    readonly startDate: Date | null, // período inicial
    readonly endDate: Date | null, // período final
    readonly totalFeedbacks: number, // quantidade total no período
    readonly groupedByCategory: Record<string, number>, // contagem por categoria
    readonly groupedByDay: Record<string, number> // contagem por dia
  ) {}
}

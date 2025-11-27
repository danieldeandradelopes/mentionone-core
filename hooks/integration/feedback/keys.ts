export const FEEDBACK_KEYS = {
  all: () => ["feedbacks"] as const,
  lists: () => [...FEEDBACK_KEYS.all(), "list"] as const,
  list: () => [...FEEDBACK_KEYS.lists()] as const,
  details: () => [...FEEDBACK_KEYS.all(), "detail"] as const,
  detail: (id: number) => [...FEEDBACK_KEYS.details(), id] as const,
  byBox: (boxId: number) => [...FEEDBACK_KEYS.all(), "box", boxId] as const,
  reports: () => [...FEEDBACK_KEYS.all(), "report"] as const,
  report: (filters: {
    boxId?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => [...FEEDBACK_KEYS.reports(), filters] as const,
} as const;

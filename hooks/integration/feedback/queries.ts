import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { FEEDBACK_KEYS } from "./keys";
import Feedback from "@/@backend-types/Feedback";

export const useGetFeedbacks = () => {
  return useQuery<Feedback[], Error>({
    queryKey: FEEDBACK_KEYS.list(),
    queryFn: async () => {
      const response = await api.get<Feedback[]>({
        url: "/feedbacks",
      });
      return response;
    },
    retry: false,
    refetchOnWindowFocus: true,
  });
};

export const useGetFeedback = (id: number) => {
  return useQuery<Feedback, Error>({
    queryKey: FEEDBACK_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<Feedback>({
        url: `/feedbacks/${id}`,
      });
      return response;
    },
    retry: false,
    enabled: !!id,
  });
};

export const useGetFeedbacksByBox = (boxId: number) => {
  return useQuery<Feedback[], Error>({
    queryKey: FEEDBACK_KEYS.byBox(boxId),
    queryFn: async () => {
      const response = await api.get<Feedback[]>({
        url: `/feedbacks/box/${boxId}`,
      });
      return response;
    },
    retry: false,
    enabled: !!boxId,
  });
};

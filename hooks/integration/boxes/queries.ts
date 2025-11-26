import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BOXES_KEYS } from "./keys";
import Boxes from "@/src/@backend-types/Boxes";

export const useGetBoxes = () => {
  return useQuery<Boxes[], Error>({
    queryKey: BOXES_KEYS.list(),
    queryFn: async () => {
      const response = await api.get<Boxes[]>({
        url: "/boxes",
      });
      return response;
    },
    retry: false,
    refetchOnWindowFocus: true,
  });
};

export const useGetBox = (id: number) => {
  return useQuery<Boxes, Error>({
    queryKey: BOXES_KEYS.detail(id),
    queryFn: async () => {
      const response = await api.get<Boxes>({
        url: `/boxes/${id}`,
      });
      return response;
    },
    retry: false,
    enabled: !!id,
  });
};

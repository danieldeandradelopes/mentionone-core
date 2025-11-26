import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { BRANDING_KEYS } from "./keys";
import Branding from "@/@backend-types/Branding";

export const useGetBranding = () => {
  return useQuery<Branding[], Error, Branding[]>({
    queryKey: [BRANDING_KEYS.branding],
    queryFn: async () => {
      const response = await api.get<Branding[]>({
        url: `/branding`,
      });

      return response;
    },
    retry: false,
  });
};

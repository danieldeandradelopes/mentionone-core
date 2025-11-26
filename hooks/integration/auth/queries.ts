import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AUTH_KEYS } from "./keys";
import { User } from "@/app/lib/auth";

export interface UserSession {
  id: number;
  name: string;
  email: string;
  access_level: string;
  avatar: string;
  phone: string;
  enterprise?: {
    id: number;
    name: string;
  };
}

export const useGetUserSession = () => {
  const { isAuthenticated } = useAuth();

  return useQuery<UserSession, Error, UserSession>({
    queryKey: AUTH_KEYS.userSession(),
    queryFn: async () => {
      // O api.get já adiciona automaticamente o token do localStorage
      const response = await api.get<UserSession>({
        url: "/users/session",
      });

      return response;
    },
    retry: false,
    enabled: isAuthenticated(),
    refetchOnWindowFocus: true,
  });
};

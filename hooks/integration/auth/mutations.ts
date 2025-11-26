import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AUTH_KEYS, LoginCredentials } from "./keys";
import Authentication from "@/@backend-types/Authentication";
import { defaultEnterprise } from "@/hooks/utils/use-auth";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation<Authentication, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      // O backend identifica automaticamente se é superadmin ou usuário normal
      const response = await api.post<Authentication>({
        url: "/login",
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      // Salva a sessão usando o hook de auth (localStorage + cookies)
      await login(
        response.token,
        response.user,
        response.Enterprise || defaultEnterprise
      );

      return response;
    },
    mutationKey: AUTH_KEYS.login({ email: "", password: "" }),
    onError: (err) => {
      console.error("Erro ao fazer login:", err);
    },
    retry: false,
  });
};

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logout();
    },
    mutationKey: AUTH_KEYS.logout(),
    retry: false,
  });
};

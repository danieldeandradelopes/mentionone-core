import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_KEYS } from "./keys";
import Product from "@/@backend-types/Product";

export const useGetProducts = (filters?: {
  type?: "physical" | "digital";
  is_active?: boolean;
  category?: string;
  search?: string;
}) => {
  const { getToken } = useAuth();

  return useQuery<Product[], Error, Product[]>({
    queryKey: [PRODUCTS_KEYS.useGetProducts],
    queryFn: async () => {
      const response = await api.get<Product[]>({
        url: "/products",
        queryParams: filters as Record<string, string>,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken(),
  });
};

export const useGetProduct = (productId: number) => {
  const { getToken } = useAuth();

  return useQuery<Product, Error, Product>({
    queryKey: [PRODUCTS_KEYS.useGetProduct],
    queryFn: async () => {
      const response = await api.get<Product>({
        url: `/products/${productId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response;
    },
    retry: false,
    enabled: !!getToken() && !!productId,
  });
};

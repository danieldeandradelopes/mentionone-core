import {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/@backend-types/Product";
import { StoreScheduleByBarberShopRequest } from "@/@backend-types/schedules.dtos";
import { useAuth } from "@/hooks/utils/use-auth";
import { api } from "@/services/api";
import showNotification from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_KEYS } from "./keys";

export const useCreateProduct = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateProductRequest>({
    mutationFn: async (data) => {
      const { title, description, image_url, price, stock, type, category } =
        data;

      await api.post<void>({
        url: "/products",
        data: {
          title,
          description,
          image_url,
          price,
          stock,
          type,
          category,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [PRODUCTS_KEYS.useCreateProduct],
    onError: (err) => console.error("Erro ao criar produto:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_KEYS.useGetProducts],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateProductRequest>({
    mutationFn: async (data) => {
      const {
        id,
        title,
        description,
        image_url,
        price,
        stock,
        type,
        category,
      } = data;

      await api.put<void>({
        url: `/products/${id}`,
        data: {
          id,
          title,
          description,
          image_url,
          price,
          stock,
          type,
          category,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [PRODUCTS_KEYS.useUpdateProduct],
    onError: (err) => console.error("Erro ao atualizar produto:", err),
    onSuccess: () => {
      showNotification("Produto atualizado com sucesso");

      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_KEYS.useGetProducts],
      });
    },
  });
};

export const useCreateScheduleByBarberShop = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, StoreScheduleByBarberShopRequest>({
    mutationFn: async (data) => {
      const {
        start_date,
        barber_id,
        service_ids,
        customer_name,
        customer_phone,
      } = data;

      await api.post<void>({
        url: "/schedules/by-barber-shop",
        data: {
          start_date,
          barber_id,
          service_ids,
          customer_name,
          customer_phone,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [PRODUCTS_KEYS.useCreateProduct],
    onError: (err) => console.error("Erro ao criar produto:", err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_KEYS.useGetProducts],
      });

      showNotification("Produto deletado com sucesso");
    },
  });
};

export const useDeleteProduct = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (productId) => {
      await api.delete<void>({
        url: `/products/${productId}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
    },
    mutationKey: [PRODUCTS_KEYS.useDeleteProduct],
    onError: (err) => {
      console.error("Erro ao deletar produto:", err);
      showNotification("Erro ao deletar produto: " + err.message);
    },
    onSuccess: () => {
      showNotification("Produto deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: [PRODUCTS_KEYS.useGetProducts],
      });
    },
  });
};

"use server";

import { cookies } from "next/headers";

const SESSION_NAME = "admin_session";
const TOKEN_NAME = "auth_token";
const USER_NAME = "user_data";

export interface User {
  id: number;
  name: string;
  email: string;
  access_level: string;
  avatar: string;
  phone: string;
  updated_at?: string;
  created_at?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Server Action para criar sessão a partir do cliente
export async function createSessionAction(token: string, user: User) {
  const cookieStore = await cookies();

  // Salva o token
  cookieStore.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    secure: process.env.NODE_ENV === "production",
  });

  // Salva os dados do usuário
  cookieStore.set({
    name: USER_NAME,
    value: JSON.stringify(user),
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    secure: process.env.NODE_ENV === "production",
  });

  // Mantém compatibilidade com sistema antigo
  cookieStore.set({
    name: SESSION_NAME,
    value: "active",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

// Server Action para destruir sessão
export async function destroySessionAction() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_NAME);
  cookieStore.delete(TOKEN_NAME);
  cookieStore.delete(USER_NAME);

  // Garante a remoção definindo os cookies com maxAge 0
  cookieStore.set({
    name: SESSION_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  cookieStore.set({
    name: TOKEN_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  cookieStore.set({
    name: USER_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

// Função para verificar autenticação (usada em Server Components)
export async function isAuthenticated(): Promise<boolean> {
  const cookie = (await cookies()).get(SESSION_NAME)?.value;
  const token = (await cookies()).get(TOKEN_NAME)?.value;

  // Verifica se tem sessão ativa E token válido
  return cookie === "active" && !!token;
}

// Função para obter token (usada em Server Components)
export async function getAuthToken(): Promise<string | null> {
  const token = (await cookies()).get(TOKEN_NAME)?.value;
  return token || null;
}

// Função para obter usuário (usada em Server Components)
export async function getUser(): Promise<User | null> {
  const userCookie = (await cookies()).get(USER_NAME)?.value;
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie) as User;
  } catch {
    return null;
  }
}

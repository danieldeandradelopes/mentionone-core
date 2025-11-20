import { cookies } from "next/headers";

const SESSION_NAME = "admin_session";

export async function createSession() {
  (await cookies()).set({
    name: SESSION_NAME,
    value: "active",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
  // Garante a remoção definindo o cookie com maxAge 0
  cookieStore.set({
    name: SESSION_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function isAuthenticated() {
  const cookie = (await cookies()).get(SESSION_NAME)?.value;
  return cookie === "active";
}

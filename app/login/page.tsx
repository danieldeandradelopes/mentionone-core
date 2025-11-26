"use server";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  // Se já estiver autenticado, redireciona para o admin
  const authenticated = await isAuthenticated();
  if (authenticated) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <LoginForm />
    </div>
  );
}

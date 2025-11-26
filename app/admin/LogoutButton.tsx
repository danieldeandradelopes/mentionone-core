"use client";
import { useLogout } from "@/hooks/integration/auth/mutations";

export default function LogoutButton() {
  const logoutMutation = useLogout();

  function logout() {
    logoutMutation.mutate();
  }

  return (
    <button
      onClick={logout}
      className="text-red-500"
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? "Saindo..." : "Sair"}
    </button>
  );
}

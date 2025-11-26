"use client";

import { useLogin } from "@/hooks/integration/auth/mutations";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(email, password);

    await loginMutation.mutateAsync({
      email,
      password,
    });
  }

  const error = loginMutation.error?.message;
  const loading = loginMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-sm p-6 rounded-xl shadow"
    >
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Login
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full border p-2 rounded-lg disabled:opacity-50"
          placeholder="seu@email.com"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Senha
        </label>
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full border p-2 rounded-lg disabled:opacity-50"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

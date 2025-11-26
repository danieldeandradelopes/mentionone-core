import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/app/lib/auth";
import { login, loginSuperAdmin } from "@/app/lib/auth-api";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const isSuperAdmin = formData.get("superadmin")?.toString() === "true";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    let loginResponse;

    try {
      if (isSuperAdmin) {
        loginResponse = await loginSuperAdmin({ email, password });
      } else {
        loginResponse = await login({ email, password });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login";
      return NextResponse.json({ error: message }, { status: 401 });
    }

    // Cria a sessão com os dados do login
    await createSession(loginResponse.token, loginResponse.user);

    return NextResponse.json({
      success: true,
      user: loginResponse.user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao processar login";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

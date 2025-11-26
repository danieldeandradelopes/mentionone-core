import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const token = req.cookies.get("auth_token")?.value;

  const isProtected = req.nextUrl.pathname.startsWith("/admin");

  // Verifica se tem sessão ativa E token válido
  if (isProtected && (!session || session !== "active" || !token)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

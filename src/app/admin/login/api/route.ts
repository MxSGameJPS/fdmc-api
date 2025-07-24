import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const username = body.get("username");
  const password = body.get("password");

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  if (username === user && password === pass) {
    // Autorizado: cria um cookie de sessão simples
    const response = NextResponse.redirect(
      new URL("/admin/painel", request.url)
    );
    response.cookies.set("fdmc_admin_auth", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 horas
    });
    return response;
  }

  // Não autorizado: redireciona de volta para login com erro
  const params = new URLSearchParams({ error: "1" });
  return NextResponse.redirect(
    new URL("/admin/login?" + params.toString(), request.url)
  );
}

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const username = req.body.username || req.body.get?.("username");
  const password = req.body.password || req.body.get?.("password");

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  if (username === user && password === pass) {
    // Autorizado: cria um cookie de sessão simples
    res.setHeader(
      "Set-Cookie",
      `fdmc_admin_auth=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
        60 * 60 * 8
      }`
    );
    res.writeHead(302, { Location: "/admin/painel" });
    return res.end();
  }

  // Não autorizado: redireciona de volta para login com erro
  res.writeHead(302, { Location: "/admin/login?error=1" });
  return res.end();
}

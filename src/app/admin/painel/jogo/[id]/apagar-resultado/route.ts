import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  // Extrair o id da URL
  const url = new URL(request.url);
  const id = url.pathname.split("/").filter(Boolean).pop();
  if (!id) {
    return NextResponse.json(
      { error: "ID do jogo não informado." },
      { status: 400 }
    );
  }

  // Atualiza todos os campos de resultado para null
  const { error } = await supabase
    .from("jogos")
    .update({
      resultado_mandante: null,
      resultado_visitante: null,
      gols_marcados: null,
      pior_jogador: null,
      melhor_jogador: null,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Redireciona de volta para o painel (URL absoluta)
  const origin = request.headers.get("origin") || "http://localhost:3000";
  return NextResponse.redirect(origin + "/admin/painel");
}

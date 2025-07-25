import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  // Busca todos os resultados dos jogos
  const { data, error } = await supabase
    .from("jogos")
    .select(
      "id, mandante, visitante, resultado_mandante, resultado_visitante, gols_marcados, melhor_jogador, pior_jogador, data, hora, campeonato, rodada, local, escudo_mandante, escudo_visitante"
    )
    .order("data", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

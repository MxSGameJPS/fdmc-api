import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: jogos, error: jogosError } = await supabase
    .from("jogos")
    .select(
      "id, mandante, visitante, resultado_mandante, resultado_visitante, gols_marcados, melhor_jogador, pior_jogador, data, hora, campeonato, rodada, local, escudo_mandante, escudo_visitante"
    )
    .order("data", { ascending: true });

  if (jogosError) {
    return NextResponse.json({ error: jogosError.message }, { status: 500 });
  }

  return NextResponse.json(jogos);
}

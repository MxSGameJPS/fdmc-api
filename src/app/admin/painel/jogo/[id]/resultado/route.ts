import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  // Extrair o id da URL manualmente
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Pega o penúltimo segmento, que é o id do jogo
  const id = pathParts[pathParts.length - 2];
  if (!id) {
    return NextResponse.json(
      { error: "ID do jogo não informado." },
      { status: 400 }
    );
  }
  const formData = await request.formData();

  // Converter corretamente os valores vindos do formData
  const resultado_mandanteRaw = formData.get("resultado_mandante");
  const resultado_visitanteRaw = formData.get("resultado_visitante");
  const gols_marcadosRaw = formData.getAll("gols_marcados");
  const pior_jogadorRaw = formData.get("pior_jogador");
  const melhor_jogadorRaw = formData.get("melhor_jogador");

  const resultado_mandante: number | null =
    resultado_mandanteRaw === null || resultado_mandanteRaw === ""
      ? null
      : Number(resultado_mandanteRaw);
  const resultado_visitante: number | null =
    resultado_visitanteRaw === null || resultado_visitanteRaw === ""
      ? null
      : Number(resultado_visitanteRaw);

  // Converter array de FormDataEntryValue para string[]
  const gols_marcados: string[] | null =
    gols_marcadosRaw.length === 0
      ? null
      : gols_marcadosRaw.map((v) => (typeof v === "string" ? v : ""));

  const pior_jogador: string | null =
    !pior_jogadorRaw ||
    typeof pior_jogadorRaw !== "string" ||
    pior_jogadorRaw === ""
      ? null
      : pior_jogadorRaw;
  const melhor_jogador: string | null =
    !melhor_jogadorRaw ||
    typeof melhor_jogadorRaw !== "string" ||
    melhor_jogadorRaw === ""
      ? null
      : melhor_jogadorRaw;

  const updateData = {
    resultado_mandante,
    resultado_visitante,
    gols_marcados,
    pior_jogador,
    melhor_jogador,
  };

  const { error } = await supabase
    .from("jogos")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Redireciona de volta para o painel (URL absoluta)
  const origin = request.headers.get("origin") || "http://localhost:3000";
  return NextResponse.redirect(origin + "/admin/painel", 303);
}

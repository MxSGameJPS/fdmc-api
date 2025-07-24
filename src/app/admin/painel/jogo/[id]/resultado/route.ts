import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const formData = await request.formData();

  let resultado_mandante = formData.get("resultado_mandante");
  let resultado_visitante = formData.get("resultado_visitante");

  // Novos campos do formulário
  // Pega todos os checkboxes marcados (gols_marcados pode ser múltiplo)
  let gols_marcados = formData.getAll("gols_marcados");
  // Radio para pior e melhor
  let pior_jogador = formData.get("pior_jogador");
  let melhor_jogador = formData.get("melhor_jogador");

  // Converter para number ou null
  resultado_mandante =
    resultado_mandante === null ||
    resultado_mandante === undefined ||
    resultado_mandante === ""
      ? null
      : Number(resultado_mandante);
  resultado_visitante =
    resultado_visitante === null ||
    resultado_visitante === undefined ||
    resultado_visitante === ""
      ? null
      : Number(resultado_visitante);

  // Se não marcar nenhum, salva null
  if (gols_marcados.length === 0) gols_marcados = null;
  if (
    pior_jogador === null ||
    pior_jogador === undefined ||
    pior_jogador === ""
  )
    pior_jogador = null;
  if (
    melhor_jogador === null ||
    melhor_jogador === undefined ||
    melhor_jogador === ""
  )
    melhor_jogador = null;

  // Forçar tipo para any para evitar erro de tipagem do FormDataEntryValue
  const updateData: any = {
    resultado_mandante,
    resultado_visitante,
    gols_marcados,
    pior_jogador,
    melhor_jogador,
  };

  if (!params.id) {
    return NextResponse.json(
      { error: "ID do jogo não informado." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("jogos")
    .update(updateData)
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Redireciona de volta para o painel (URL absoluta)
  const origin = request.headers.get("origin") || "http://localhost:3000";
  return NextResponse.redirect(origin + "/admin/painel");
}

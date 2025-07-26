import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: jogos, error: jogosError } = await supabase
    .from("jogos")
    .select("*")
    .order("data", { ascending: true });

  const { data: elenco, error: elencoError } = await supabase
    .from("elenco")
    .select("*")
    .order("nome", { ascending: true });

  if (jogosError || elencoError) {
    return NextResponse.json(
      {
        error: jogosError?.message || elencoError?.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ jogos, elenco });
}

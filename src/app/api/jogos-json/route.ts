import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "jogos.json");
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);
    return NextResponse.json(json.jogos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao ler jogos.json" },
      { status: 500 }
    );
  }
}

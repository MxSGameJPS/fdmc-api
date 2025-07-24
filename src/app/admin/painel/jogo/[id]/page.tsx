import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import styles from "../../painel.module.css";
import Image from "next/image";
import VoltarBtn from "./VoltarBtn";
export default async function JogoPage({ params }: { params: { id: string } }) {
  // Buscar o jogo pelo id na tabela do Supabase
  const { data: jogo, error } = await supabase
    .from("jogos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !jogo) return notFound();

  // Carregar elenco do Botafogo do arquivo JSON local
  const elenco = [
    { posicao: "Goleiro", nome: "John Victor" },
    { posicao: "Goleiro", nome: "Raul" },
    { posicao: "Goleiro", nome: "Joel Loor" },
    { posicao: "Goleiro", nome: "Leo Linck" },
    { posicao: "Defensor", nome: "Mateo Ponte" },
    { posicao: "Defensor", nome: "Vitinho" },
    { posicao: "Defensor", nome: "Alexander Barboza" },
    { posicao: "Defensor", nome: "Bastos" },
    { posicao: "Defensor", nome: "Alex Telles" },
    { posicao: "Defensor", nome: "Fernando Marçal" },
    { posicao: "Defensor", nome: "Kaio Pantaleão" },
    { posicao: "Defensor", nome: "David Ricardo" },
    { posicao: "Defensor", nome: "Cuiabano" },
    { posicao: "Meio-campista", nome: "Allan" },
    { posicao: "Meio-campista", nome: "Marlon Freitas" },
    { posicao: "Meio-campista", nome: "Kauê" },
    { posicao: "Meio-campista", nome: "Santiago Rodríguez" },
    { posicao: "Meio-campista", nome: "Álvaro Montoro" },
    { posicao: "Meio-campista", nome: "Danilo" },
    { posicao: "Meio-campista", nome: "Newton" },
    { posicao: "Meio-campista", nome: "Jordan Barrera" },
    { posicao: "Atacante", nome: "Savarino" },
    { posicao: "Atacante", nome: "Artur" },
    { posicao: "Atacante", nome: "Matheus Martins" },
    { posicao: "Atacante", nome: "Nathan Fernandes" },
    { posicao: "Atacante", nome: "Kayke" },
    { posicao: "Atacante", nome: "Joaquín Correa" },
    { posicao: "Atacante", nome: "Gonzalo Mastriani" },
    { posicao: "Atacante", nome: "Jeffinho" },
    { posicao: "Atacante", nome: "Arthur Cabral" },
  ];

  return (
    <div className={styles.painelBg}>
      <div
        className={styles.card}
        style={{ maxWidth: 500, margin: "40px auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <VoltarBtn />
          <form
            method="POST"
            action={`/admin/painel/jogo/${params.id}/apagar-resultado`}
            style={{ display: "inline" }}
          >
            <button type="submit" className={styles.deleteBtn}>
              Apagar Resultado
            </button>
          </form>
        </div>
        <div className={styles.cardHeader}>
          <Image
            src={jogo.escudo_mandante}
            alt={jogo.mandante}
            width={40}
            height={40}
          />
          <span className={styles.time}>{jogo.mandante}</span>
          <span className={styles.x}>x</span>
          <span className={styles.time}>{jogo.visitante}</span>
          <Image
            src={jogo.escudo_visitante}
            alt={jogo.visitante}
            width={40}
            height={40}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.info}>
            <b>Data:</b> {jogo.data}
          </div>
          <div className={styles.info}>
            <b>Hora:</b> {jogo.hora}
          </div>
          <div className={styles.info}>
            <b>Campeonato:</b> {jogo.campeonato}
          </div>
          <div className={styles.info}>
            <b>Rodada:</b> {jogo.rodada}
          </div>
          <div className={styles.info}>
            <b>Local:</b> {jogo.local}
          </div>
        </div>
        <form
          method="POST"
          action={`/admin/painel/jogo/${params.id}/resultado`}
          style={{ marginTop: 24 }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="number"
              name="resultado_mandante"
              min={0}
              defaultValue={jogo.resultado_mandante ?? ""}
              placeholder="Mandante"
              className={styles.resultInput}
              required
            />
            <span className={styles.x}>x</span>
            <input
              type="number"
              name="resultado_visitante"
              min={0}
              defaultValue={jogo.resultado_visitante ?? ""}
              placeholder="Visitante"
              className={styles.resultInput}
              required
            />
          </div>

          <div style={{ margin: "24px 0 12px 0" }}>
            <span className={styles.pergunta}>Quem marcou gols?</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: 8,
              }}
            >
              {elenco.map((j) => (
                <label
                  key={j.nome}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input type="checkbox" name="gols_marcados" value={j.nome} />
                  <span className={styles.elencoNome}>
                    {j.nome}{" "}
                    <span className={styles.elencoPosicao}>({j.posicao})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ margin: "18px 0 12px 0" }}>
            <span className={styles.pergunta}>Quem foi o pior da partida?</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: 8,
              }}
            >
              {elenco.map((j) => (
                <label
                  key={j.nome + "-pior"}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input type="radio" name="pior_jogador" value={j.nome} />
                  <span className={styles.elencoNome}>
                    {j.nome}{" "}
                    <span className={styles.elencoPosicao}>({j.posicao})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ margin: "18px 0 24px 0" }}>
            <span className={styles.pergunta}>
              Quem foi o melhor da partida?
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: 8,
              }}
            >
              {elenco.map((j) => (
                <label
                  key={j.nome + "-melhor"}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input type="radio" name="melhor_jogador" value={j.nome} />
                  <span className={styles.elencoNome}>
                    {j.nome}{" "}
                    <span className={styles.elencoPosicao}>({j.posicao})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.saveBtn}>
            Salvar Resultado
          </button>
        </form>
      </div>
    </div>
  );
}

import styles from "./painel.module.css";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import LogoutBtn from "./LogoutBtn";

type Jogo = {
  id: string;
  data: string;
  hora: string;
  mandante: string;
  visitante: string;
  campeonato: string;
  rodada: string;
  escudo_mandante: string;
  escudo_visitante: string;
  local: string;
  resultado_mandante: number | null;
  resultado_visitante: number | null;
  gols_marcados: string[] | null;
  melhor_jogador: string | null;
  pior_jogador: string | null;
};

export default async function PainelPage() {
  const { data: jogos, error } =
    (await supabase
      .from("jogos")
      .select("*")
      .order("data", { ascending: true })
      .throwOnError()
      // @ts-ignore
      .single?.({ cache: "no-store" })) ?? {};

  if (error)
    return (
      <div style={{ color: "#b00", textAlign: "center", marginTop: 40 }}>
        Erro ao carregar jogos: {error.message}
      </div>
    );
  if (!jogos || jogos.length === 0)
    return (
      <div style={{ color: "#333", textAlign: "center", marginTop: 40 }}>
        Nenhum jogo encontrado na tabela do Supabase.
      </div>
    );

  return (
    <div className={styles.painelBg}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1 className={styles.painelTitle}>Jogos</h1>
        <LogoutBtn />
      </div>
      <div className={styles.cardsGrid}>
        {jogos.map((jogo: Jogo) => (
          <Link
            key={jogo.id}
            href={`/admin/painel/jogo/${jogo.id}`}
            className={styles.card}
            tabIndex={0}
            role="button"
            prefetch={false}
          >
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
                <b>Data:</b> {jogo.data ?? "-"}
              </div>
              <div className={styles.info}>
                <b>Hora:</b> {jogo.hora ?? "-"}
              </div>
              <div className={styles.info}>
                <b>Campeonato:</b> {jogo.campeonato ?? "-"}
              </div>
              <div className={styles.info}>
                <b>Rodada:</b> {jogo.rodada ?? "-"}
              </div>
              <div className={styles.info}>
                <b>Local:</b> {jogo.local ?? "-"}
              </div>

              {/* Resultado */}
              {jogo.resultado_mandante !== null &&
                jogo.resultado_visitante !== null && (
                  <div className={styles.info}>
                    <b>Resultado:</b> {jogo.resultado_mandante} x{" "}
                    {jogo.resultado_visitante}
                  </div>
                )}

              {/* Gols marcados */}
              {jogo.gols_marcados &&
                Array.isArray(jogo.gols_marcados) &&
                jogo.gols_marcados.length > 0 && (
                  <div className={styles.info}>
                    <b>Gols:</b> {jogo.gols_marcados.join(", ")}
                  </div>
                )}

              {/* Melhor jogador */}
              {jogo.melhor_jogador && (
                <div className={styles.info}>
                  <b>Melhor:</b> {jogo.melhor_jogador}
                </div>
              )}

              {/* Pior jogador */}
              {jogo.pior_jogador && (
                <div className={styles.info}>
                  <b>Pior:</b> {jogo.pior_jogador}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

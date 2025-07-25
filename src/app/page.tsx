import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 32 }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: 36,
          fontWeight: 900,
          color: "#222",
          marginBottom: 24,
        }}
      >
        API FDMC - Documentação
      </h1>
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px #0001",
          padding: 32,
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#222",
            marginBottom: 24,
          }}
        >
          Endpoints
        </h2>
        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#005a9c" }}>
              /api/jogos
            </div>
            <div style={{ color: "#444", marginBottom: 4 }}>
              Lista completa de jogos (todos os campos)
            </div>
            <div style={{ fontSize: 14, color: "#888" }}>
              Método: <b>GET</b>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#005a9c" }}>
              /api/resultados
            </div>
            <div style={{ color: "#444", marginBottom: 4 }}>
              Resultados dos jogos (apenas campos relevantes para o app: placar,
              gols, melhor e pior jogador)
            </div>
            <div style={{ fontSize: 14, color: "#888" }}>
              Método: <b>GET</b>
            </div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
              <b>Retorna:</b> id, mandante, visitante, resultado_mandante,
              resultado_visitante, gols_marcados, melhor_jogador, pior_jogador,
              data, hora, campeonato, rodada, local, escudo_mandante,
              escudo_visitante
            </div>
          </div>
        </div>
        <div style={{ margin: "32px 0 0 0", textAlign: "center" }}>
          <Link href="/admin/login">
            <button
              style={{
                background: "#ffd700",
                color: "#000",
                fontWeight: 700,
                fontSize: 18,
                border: "none",
                borderRadius: 8,
                padding: "12px 32px",
                cursor: "pointer",
                boxShadow: "0 2px 8px #0002",
              }}
            >
              Login Painel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

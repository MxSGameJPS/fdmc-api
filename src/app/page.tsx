import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 32 }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 32,
          color: "#222",
        }}
      >
        Bem-vindo à API FDMC
      </h1>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px #0001",
          padding: 32,
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            color: "#222",
          }}
        >
          Endpoints disponíveis:
        </h2>
        <ul
          style={{
            marginBottom: 32,
            color: "#222",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <li>
            <code style={{ color: "#222", fontWeight: 700 }}>/api/jogos</code> —
            Lista de jogos
          </li>
          <li>
            <code style={{ color: "#222", fontWeight: 700 }}>/api/elenco</code>{" "}
            — Elenco do Botafogo
          </li>
          <li>
            <code style={{ color: "#222", fontWeight: 700 }}>
              /api/resultados
            </code>{" "}
            — Resultados dos jogos
          </li>
        </ul>
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
  );
}

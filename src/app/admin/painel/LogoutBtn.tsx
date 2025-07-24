"use client";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  function handleLogout() {
    // Aqui você pode limpar cookies/localStorage se usar autenticação real
    router.push("/");
  }
  return (
    <button
      onClick={handleLogout}
      style={{
        background: "#fff",
        color: "#b00",
        border: "2px solid #b00",
        fontWeight: 700,
        fontSize: "1rem",
        borderRadius: 6,
        padding: "4px 12px",
        marginLeft: 8,
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      Deslogar
    </button>
  );
}

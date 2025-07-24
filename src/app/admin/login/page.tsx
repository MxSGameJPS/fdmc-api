"use client";
import Image from "next/image";
import styles from "./login.module.css";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error") === "1";

  return (
    <div className={styles["login-bg"]}>
      <div className={styles["login-card"]}>
        <Image
          src="/image/LOGO.png"
          alt="Logo FDMC"
          width={90}
          height={90}
          style={{ marginBottom: 24 }}
        />
        <h2 className={styles["login-title"]}>Painel FDMC</h2>
        {hasError && (
          <div className={styles["login-error"]}>
            Você não tem autorização para entrar aqui.
          </div>
        )}
        <form
          method="POST"
          action="/admin/login/api"
          className={styles["login-form"]}
        >
          <div className={styles["login-form-group"]}>
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              autoComplete="username"
              className={styles["login-input"]}
              required
            />
          </div>
          <div className={styles["login-form-group"]}>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              autoComplete="current-password"
              className={styles["login-input"]}
              required
            />
          </div>
          <button type="submit" className={styles["login-btn"]}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

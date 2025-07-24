"use client";
import styles from "../../painel.module.css";

export default function VoltarBtn() {
  return (
    <button
      type="button"
      className={styles.backBtn}
      onClick={() => window.history.back()}
    >
      ← Voltar
    </button>
  );
}

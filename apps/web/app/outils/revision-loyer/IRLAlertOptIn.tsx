"use client";

import { useState } from "react";
import { track } from "@ecosysteme/analytics";

export function IRLAlertOptIn() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/irl-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        track({ name: "email_capture", props: { tool: "revision-loyer", source: "irl-alert" } });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-4 rounded-lg border border-primary/20 bg-primary-light p-4">
        <p className="text-sm text-primary font-medium">
          Vous recevrez une alerte des la publication du prochain IRL par l&apos;INSEE.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-lg border border-border bg-surface-card p-4">
      <p className="text-xs font-medium text-foreground">
        Recevoir une alerte gratuite quand l&apos;IRL du prochain trimestre est publie par l&apos;INSEE
      </p>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-lg border border-border bg-surface-card px-3 py-2 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {status === "loading" ? "..." : "S&apos;inscrire"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-1.5 text-xs text-danger">Une erreur est survenue. Reessayez.</p>
      )}
      <p className="mt-1.5 text-[10px] text-muted-light">
        Pas de spam. Uniquement une alerte par trimestre. Desinscription en un clic.
      </p>
    </form>
  );
}

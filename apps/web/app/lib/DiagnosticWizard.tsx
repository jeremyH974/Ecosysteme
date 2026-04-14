"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@ecosysteme/analytics";
import {
  type Profil,
  type DiagnosticQuestion,
  type DiagnosticResult,
  PROFIL_QUESTIONS,
  PROFIL_LABELS,
  generateDiagnosticResult,
} from "./diagnostic";

function QuestionField({ q, value, onChange }: { q: DiagnosticQuestion; value: string; onChange: (v: string) => void }) {
  if (q.type === "number") {
    return (
      <div>
        <label className="block text-sm font-medium text-foreground">{q.label}</label>
        {q.helpText && <p className="mt-0.5 text-xs text-muted">{q.helpText}</p>}
        <div className="relative mt-1.5">
          <input type="number" inputMode="decimal" placeholder={q.placeholder} value={value}
            onChange={(e) => onChange(e.target.value)} min={0} step="any"
            className="w-full rounded-lg border border-border bg-surface-card px-3.5 py-2.5 text-sm text-foreground shadow-sm placeholder:text-muted-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          {q.suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted">{q.suffix}</span>}
        </div>
      </div>
    );
  }

  if (q.type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-foreground">{q.label}</label>
        {q.helpText && <p className="mt-0.5 text-xs text-muted">{q.helpText}</p>}
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface-card px-3.5 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">Choisir...</option>
          {q.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
  }

  // radio
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{q.label}</p>
      {q.helpText && <p className="mt-0.5 text-xs text-muted">{q.helpText}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {q.options?.map((o) => (
          <button key={o.value} type="button" onClick={() => onChange(o.value)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              value === o.value ? "border-primary bg-primary-light text-primary" : "border-border bg-surface-card text-muted hover:border-border-hover"
            }`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultView({ result, profil, onRestart }: { result: DiagnosticResult; profil: Profil; onRestart: () => void }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface-card overflow-hidden">
        <div className="border-b border-border/60 bg-primary-light px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{result.titre}</p>
          <p className="mt-1 text-sm text-foreground">{result.description}</p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-muted mb-4">{result.insight}</p>
          <div className="space-y-3">
            {result.outils.map((o) => (
              <Link key={o.url} href={o.url}
                onClick={() => track({ name: "situation_click", props: { situation: profil } })}
                className="group flex items-start gap-3 rounded-lg border border-border p-3 transition-all hover:border-primary/30 hover:shadow-sm">
                <span className={`mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full ${o.priorite === "haute" ? "bg-primary" : "bg-muted-light"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">{o.name}</p>
                  <p className="text-xs text-muted">{o.pourquoi}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <button type="button" onClick={onRestart}
        className="text-xs text-muted hover:text-foreground transition-colors">
        Recommencer le diagnostic
      </button>
    </div>
  );
}

export function DiagnosticWizard() {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  function selectProfil(p: Profil) {
    setProfil(p);
    setStep(0);
    setAnswers({});
    setResult(null);
    track({ name: "situation_click", props: { situation: p } });
  }

  function restart() {
    setProfil(null);
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  // Ecran 1 : choix du profil
  if (!profil) {
    return (
      <div>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted">Quelle est votre situation ?</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(["salarie", "independant", "immobilier", "impots"] as const).map((p) => {
            const info = PROFIL_LABELS[p];
            return (
              <button key={p} type="button" onClick={() => selectProfil(p)}
                className="group rounded-xl border border-border bg-surface-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-sm">
                <span className="text-2xl">{info.icon}</span>
                <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">{info.title}</p>
                <p className="mt-0.5 text-xs text-muted">{info.accroche}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Ecran 3 : resultat
  if (result) {
    return <ResultView result={result} profil={profil} onRestart={restart} />;
  }

  // Ecran 2 : questions
  const questions = PROFIL_QUESTIONS[profil];
  const currentQ = questions[step];
  if (!currentQ) return null;

  const isLast = step === questions.length - 1;
  const canNext = !!answers[currentQ.id];

  function next() {
    if (isLast) {
      setResult(generateDiagnosticResult(profil!, answers));
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => step === 0 ? restart() : setStep((s) => s - 1)}
          className="text-xs text-muted hover:text-foreground transition-colors">
          {step === 0 ? "Changer de profil" : "Retour"}
        </button>
        <p className="text-xs text-muted">{step + 1} / {questions.length}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="space-y-4">
        <QuestionField q={currentQ} value={answers[currentQ.id] || ""} onChange={(v) => setAnswers((a) => ({ ...a, [currentQ.id]: v }))} />

        <div className="flex gap-2">
          <button type="button" onClick={next} disabled={!canNext && currentQ.type !== "number"}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-40">
            {isLast ? "Voir mon diagnostic" : "Suivant"}
          </button>
          {currentQ.type === "number" && !canNext && (
            <button type="button" onClick={next}
              className="rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface">
              Passer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

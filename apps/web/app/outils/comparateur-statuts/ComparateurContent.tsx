import Link from "next/link";

const COMPARAISON = [
  { critere: "Plafond de CA (services)", ae: "77 700 EUR", sasu: "Illimite" },
  { critere: "Cotisations sociales", ae: "~21,1% du CA", sasu: "~65% du salaire net" },
  { critere: "Regime fiscal", ae: "Micro (abattement 34-71%)", sasu: "IS (15-25%)" },
  { critere: "Protection sociale", ae: "SSI (minimale)", sasu: "Regime general (complete)" },
  { critere: "Comptabilite", ae: "Livre des recettes", sasu: "Bilan comptable complet" },
  { critere: "TVA", ae: "Franchise en base (<36 800 EUR)", sasu: "Assujetti (recuperation)" },
  { critere: "Responsabilite", ae: "Illimitee (patrimoine personnel)", sasu: "Limitee aux apports" },
  { critere: "Cout de creation", ae: "Gratuit (en ligne)", sasu: "~500-2 000 EUR" },
  { critere: "Cout annuel comptable", ae: "0 EUR (facile seul)", sasu: "1 500-3 000 EUR/an" },
  { critere: "Dividendes", ae: "Non applicable", sasu: "PFU 30% apres IS" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function ComparateurContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Quand choisir l&apos;auto-entreprise vs la SASU ?">
        <p>
          Le choix entre auto-entreprise (micro-entreprise) et SASU depend principalement de trois facteurs :
          votre chiffre d&apos;affaires previsionnel, vos charges reelles et votre besoin de protection sociale.
        </p>
        <p>
          <strong className="text-foreground">L&apos;auto-entreprise</strong> est ideale pour demarrer une activite avec un CA
          inferieur a 77 700 EUR (services) ou 188 700 EUR (vente). Sa simplicite administrative est imbattable :
          pas de comptabilite complexe, pas de bilan, cotisations calculees sur le CA (pas de charges fixes).
        </p>
        <p>
          <strong className="text-foreground">La SASU</strong> devient avantageuse a partir d&apos;un CA d&apos;environ
          70 000-80 000 EUR en services, quand les charges reelles sont significatives (plus de 34% du CA) et
          que l&apos;optimisation salaire/dividendes permet de reduire le poids global des cotisations.
        </p>
      </Section>

      <Section title="Tableau comparatif detaille">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Critere</th>
                <th className="py-2 text-right font-medium">Auto-entrepreneur</th>
                <th className="py-2 text-right font-medium">SASU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COMPARAISON.map((c) => (
                <tr key={c.critere}>
                  <td className="py-2 font-medium text-foreground">{c.critere}</td>
                  <td className="py-2 text-right text-muted">{c.ae}</td>
                  <td className="py-2 text-right text-muted">{c.sasu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light mt-2">
          Chiffres indicatifs 2026. Source : URSSAF, Service-Public.fr.
        </p>
      </Section>

      <Section title="Parcours type de transition AE vers SASU">
        <p>
          La transition de l&apos;auto-entreprise vers la SASU se fait generalement en trois etapes :
        </p>
        <div className="space-y-3 mt-3">
          {[
            { etape: "1", titre: "Analyse du seuil de rentabilite", desc: "Comparez vos charges reelles a l&apos;abattement forfaitaire de la micro-entreprise. Si vos charges depassent 34% du CA (BNC), la SASU devient potentiellement plus avantageuse." },
            { etape: "2", titre: "Creation de la SASU", desc: "Redigez les statuts, deposez le capital social (1 EUR minimum), immatriculez au greffe. Prevoyez un expert-comptable (1 500-3 000 EUR/an) et un compte bancaire professionnel." },
            { etape: "3", titre: "Fermeture de l&apos;auto-entreprise", desc: "Declarez la cessation d&apos;activite AE aupres de l&apos;URSSAF. Transferez vos clients et contrats. La transition peut se faire le meme jour." },
          ].map((e) => (
            <div key={e.etape} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{e.etape}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{e.titre}</p>
                <p className="text-xs text-muted" dangerouslySetInnerHTML={{ __html: e.desc }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Repartition ideale salaire/dividendes" },
            { name: "Simulateur auto-entrepreneur", url: "/outils/simulateur-auto-entrepreneur", desc: "Cotisations et revenu net en micro" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Votre tranche marginale d&apos;imposition" },
          ].map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary">{tool.name}</p>
              <p className="mt-0.5 text-xs text-muted" dangerouslySetInnerHTML={{ __html: tool.desc }} />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

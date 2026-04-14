import Link from "next/link";

const BAREME_FISCAL = [
  { cv: "3 CV", j5000: "d x 0,529", de5001a20000: "(d x 0,316) + 1 065", plus20000: "d x 0,370" },
  { cv: "4 CV", j5000: "d x 0,606", de5001a20000: "(d x 0,340) + 1 330", plus20000: "d x 0,407" },
  { cv: "5 CV", j5000: "d x 0,657", de5001a20000: "(d x 0,357) + 1 395", plus20000: "d x 0,407" },
  { cv: "6 CV", j5000: "d x 0,665", de5001a20000: "(d x 0,374) + 1 435", plus20000: "d x 0,407" },
  { cv: "7 CV et plus", j5000: "d x 0,661", de5001a20000: "(d x 0,374) + 1 435", plus20000: "d x 0,407" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function IndemniteKmContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Bareme kilometrique fiscal 2025-2026">
        <p>
          Le bareme kilometrique est publie chaque annee par l&apos;administration fiscale. Il permet aux
          salaries qui optent pour les frais reels de deduire leurs frais de deplacement professionnel
          de leur revenu imposable. Le bareme couvre l&apos;amortissement du vehicule, l&apos;assurance, les
          reparations et le carburant.
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Puissance fiscale</th>
                <th className="py-2 text-right font-medium">Jusqu&apos;a 5 000 km</th>
                <th className="py-2 text-right font-medium">5 001 a 20 000 km</th>
                <th className="py-2 text-right font-medium">Au-dela de 20 000 km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {BAREME_FISCAL.map((b) => (
                <tr key={b.cv}>
                  <td className="py-2 font-medium text-foreground">{b.cv}</td>
                  <td className="py-2 text-right text-muted">{b.j5000}</td>
                  <td className="py-2 text-right text-muted">{b.de5001a20000}</td>
                  <td className="py-2 text-right text-muted">{b.plus20000}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          d = distance annuelle parcourue en km. Source : Service-Public.fr — Bareme applicable aux revenus 2024-2025.
        </p>
      </Section>

      <Section title="Frais reels vs abattement forfaitaire de 10%">
        <p>
          Lors de votre declaration de revenus, vous avez le choix entre deux options pour deduire
          vos frais professionnels :
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Abattement forfaitaire</p>
            <p className="mt-1 text-sm font-medium text-foreground">10% du salaire net imposable</p>
            <p className="mt-1 text-xs text-muted">Applique automatiquement par le fisc. Pas de justificatif. Plafonne a 14 171 EUR (2026). C&apos;est l&apos;option par defaut.</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Frais reels</p>
            <p className="mt-1 text-sm font-medium text-foreground">Montant exact des frais</p>
            <p className="mt-1 text-xs text-muted">Kilometriques + repas + autres frais justifies. Avantageux si vos frais depassent 10% de votre salaire.</p>
          </div>
        </div>
      </Section>

      <Section title="Quand opter pour les frais reels ?">
        <p>
          L&apos;option frais reels est avantageuse quand le montant total de vos frais professionnels depasse
          l&apos;abattement forfaitaire de 10%. Concretement :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-foreground">Trajet domicile-travail long :</strong> si vous parcourez plus de 30 km
            aller (soit 60 km/jour), les frais kilometriques seuls depassent souvent l&apos;abattement.
          </li>
          <li>
            <strong className="text-foreground">Frais de repas :</strong> si vous ne pouvez pas manger chez vous le midi,
            vous pouvez deduire la difference entre le cout du repas et la valeur du repas pris a domicile (5,35 EUR en 2026).
          </li>
          <li>
            <strong className="text-foreground">Double residence :</strong> si votre conjoint travaille dans une autre ville,
            les frais de logement et de transport sont deductibles.
          </li>
        </ul>
        <p>
          Exemple : pour un salaire net imposable de 25 000 EUR, l&apos;abattement forfaitaire est de 2 500 EUR.
          Si vos frais kilometriques seuls s&apos;elevent a 3 200 EUR (12 000 km avec un 5 CV), il est plus avantageux
          d&apos;opter pour les frais reels.
        </p>
      </Section>

      <Section title="Vehicule electrique : majoration de 20%">
        <p>
          Les proprietaires de vehicules electriques beneficient d&apos;une <strong className="text-foreground">majoration de 20%</strong> du
          bareme kilometrique. Cette mesure, en vigueur depuis 2021, vise a encourager la transition vers
          les vehicules propres.
        </p>
        <p>
          Par exemple, pour un vehicule electrique de 5 CV parcourant 12 000 km/an, le montant deductible
          passe de 5 679 EUR a <strong className="text-foreground">6 815 EUR</strong> (5 679 x 1,20).
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Impact fiscal de vos frais reels" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertir votre salaire" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez votre revenu en France" },
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

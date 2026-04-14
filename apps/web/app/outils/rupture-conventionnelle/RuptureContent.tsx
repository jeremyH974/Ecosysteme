import Link from "next/link";

const ETAPES_PROCEDURE = [
  { etape: "1. Entretien(s)", delai: "Libre", desc: "Au moins un entretien entre le salarie et l&apos;employeur. Le salarie peut se faire assister." },
  { etape: "2. Signature", delai: "Apres entretien(s)", desc: "Signature de la convention de rupture par les deux parties." },
  { etape: "3. Retractation", delai: "15 jours calendaires", desc: "Chaque partie peut se retracter sans motif pendant 15 jours." },
  { etape: "4. Homologation", delai: "15 jours ouvrables", desc: "Envoi a la DREETS qui dispose de 15 jours ouvrables pour valider." },
  { etape: "5. Rupture effective", delai: "Lendemain homologation", desc: "Le contrat est rompu au plus tot le lendemain de l&apos;homologation." },
];

const EXEMPLE_CALCUL = [
  { label: "Salaire de reference", valeur: "3 000 EUR" },
  { label: "Anciennete", valeur: "10 ans" },
  { label: "Indemnite legale (1/4 par an)", valeur: "3 000 x 1/4 x 10 = 7 500 EUR" },
  { label: "Indemnite minimale", valeur: "7 500 EUR" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

export function RuptureContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Guide : calcul de l&apos;indemnite de rupture conventionnelle">
        <p>
          La rupture conventionnelle est un mode de rupture amiable du contrat de travail a duree indeterminee (CDI).
          Elle permet au salarie et a l&apos;employeur de convenir ensemble des conditions de la fin du contrat,
          notamment le montant de l&apos;indemnite et la date de depart.
        </p>
        <p>
          Contrairement au licenciement ou a la demission, la rupture conventionnelle ouvre droit aux allocations
          chomage (ARE) et garantit une indemnite au moins egale a l&apos;indemnite legale de licenciement.
        </p>
      </Section>

      <Section title="Conditions pour beneficier d&apos;une rupture conventionnelle">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "CDI", label: "Type de contrat", source: "Uniquement" },
            { value: "8 mois", label: "Anciennete minimum", source: "Depuis 2023" },
            { value: "Oui", label: "Droit au chomage", source: "ARE" },
            { value: "15 jours", label: "Delai de retractation", source: "Calendaires" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface-card p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
              <p className="text-[10px] text-muted-light">{s.source}</p>
            </div>
          ))}
        </div>
        <p>
          La rupture conventionnelle est reservee aux salaries en CDI. Les salaries en CDD ou en contrat temporaire
          ne peuvent pas en beneficier. Le salarie doit justifier d&apos;au moins 8 mois d&apos;anciennete ininterrompue
          chez le meme employeur.
        </p>
        <p>
          Certaines situations excluent la rupture conventionnelle : salarie en arret maladie d&apos;origine professionnelle,
          conge maternite, ou lorsqu&apos;elle est proposee dans un contexte de harcelement.
        </p>
      </Section>

      <Section title="Procedure de rupture conventionnelle">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Etape</th>
                <th className="py-2 text-right font-medium">Delai</th>
                <th className="py-2 text-left font-medium pl-4">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {ETAPES_PROCEDURE.map((e) => (
                <tr key={e.etape}>
                  <td className="py-2 font-medium text-foreground whitespace-nowrap">{e.etape}</td>
                  <td className="py-2 text-right text-primary font-medium whitespace-nowrap">{e.delai}</td>
                  <td className="py-2 text-muted pl-4">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-light">
          Source : articles L1237-11 a L1237-16 du Code du travail.
        </p>
      </Section>

      <Section title="Calcul detaille de l&apos;indemnite">
        <p>
          L&apos;indemnite de rupture conventionnelle ne peut pas etre inferieure a l&apos;indemnite legale de licenciement.
          La formule legale est la suivante :
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="font-medium text-foreground">Pour les 10 premieres annees :</p>
          <p className="text-primary font-bold">1/4 de mois de salaire par annee d&apos;anciennete</p>
          <p className="font-medium text-foreground mt-3">Au-dela de 10 ans :</p>
          <p className="text-primary font-bold">1/3 de mois de salaire par annee d&apos;anciennete supplementaire</p>
        </div>
        <p>
          Le salaire de reference correspond a la formule la plus avantageuse entre : la moyenne des 12 derniers mois
          de salaire brut ou la moyenne des 3 derniers mois (avec proratisation des primes annuelles).
        </p>
      </Section>

      <Section title="Exemple chiffre : 10 ans d&apos;anciennete, 3 000 EUR brut">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border/40">
              {EXEMPLE_CALCUL.map((e) => (
                <tr key={e.label}>
                  <td className="py-2 text-muted">{e.label}</td>
                  <td className="py-2 text-right font-medium text-foreground">{e.valeur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Pour un salarie avec 12 ans d&apos;anciennete au meme salaire, le calcul serait :
          (1/4 x 3 000 x 10) + (1/3 x 3 000 x 2) = 7 500 + 2 000 = <strong className="text-foreground">9 500 EUR</strong>.
        </p>
      </Section>

      <Section title="Differences avec le licenciement">
        <p>
          <strong className="text-foreground">Rupture conventionnelle :</strong> procedure amiable, pas de motif necessaire,
          droit au chomage, indemnite negociable (minimum = indemnite legale), homologation par la DREETS.
        </p>
        <p>
          <strong className="text-foreground">Licenciement :</strong> decision unilaterale de l&apos;employeur, necessite un motif
          (personnel ou economique), preavis obligatoire, possibilite de contestation aux prud&apos;hommes.
        </p>
        <p>
          La rupture conventionnelle est souvent plus avantageuse pour le salarie car elle ouvre systematiquement
          droit au chomage et permet de negocier une indemnite supra-legale.
        </p>
      </Section>

      <Section title="Fiscalite de l&apos;indemnite de rupture conventionnelle">
        <p>
          L&apos;indemnite de rupture conventionnelle beneficie d&apos;un regime fiscal avantageux. Elle est exoneree
          d&apos;impot sur le revenu dans la limite du plus eleve des trois montants suivants :
        </p>
        <div className="rounded-lg border border-border bg-surface-card p-4 space-y-2">
          <p className="text-foreground">1. L&apos;indemnite legale ou conventionnelle de licenciement</p>
          <p className="text-foreground">2. 2 fois la remuneration annuelle brute de l&apos;annee civile precedente</p>
          <p className="text-foreground">3. 50% de l&apos;indemnite totale percue</p>
          <p className="text-xs text-muted-light mt-2">Plafond absolu : 6 fois le PASS annuel (278 208 EUR en 2024)</p>
        </div>
        <p>
          L&apos;indemnite est egalement exoneree de cotisations sociales et de CSG/CRDS dans la limite de 2 PASS (92 736 EUR en 2024).
          Au-dela, elle est soumise a cotisations des le premier euro.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertissez votre salaire brut en net" },
            { name: "Simulateur TMI", url: "/outils/simulateur-tmi", desc: "Calculez votre taux marginal d&apos;imposition" },
            { name: "Allocation chomage", url: "/outils/allocation-chomage", desc: "Estimez votre ARE apres rupture" },
            { name: "Simulateur retraite", url: "/outils/simulateur-retraite", desc: "Impact sur votre future pension" },
            { name: "Niveau de richesse", url: "/outils/niveau-richesse", desc: "Situez votre salaire en France" },
            { name: "Optimisation SASU", url: "/outils/optimisation-sasu", desc: "Creez votre entreprise apres votre depart" },
          ].map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group rounded-lg border border-border bg-surface-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <p className="text-sm font-medium text-foreground group-hover:text-primary">{tool.name}</p>
              <p className="mt-0.5 text-xs text-muted">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

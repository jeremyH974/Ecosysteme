import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-muted space-y-3">{children}</div>
    </section>
  );
}

const FERIES_FIXES = [
  { date: "1er janvier", nom: "Jour de l'An" },
  { date: "1er mai", nom: "Fete du Travail" },
  { date: "8 mai", nom: "Victoire 1945" },
  { date: "14 juillet", nom: "Fete Nationale" },
  { date: "15 aout", nom: "Assomption" },
  { date: "1er novembre", nom: "Toussaint" },
  { date: "11 novembre", nom: "Armistice 1918" },
  { date: "25 decembre", nom: "Noel" },
];

const FERIES_MOBILES = [
  { nom: "Lundi de Paques", calcul: "Paques + 1 jour" },
  { nom: "Ascension", calcul: "Paques + 39 jours (un jeudi)" },
  { nom: "Lundi de Pentecote", calcul: "Paques + 50 jours" },
];

export function JoursOuvresContent() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <Section title="Jours ouvres vs jours ouvrables : quelle difference ?">
        <p>
          La distinction entre jours ouvres et jours ouvrables est essentielle en droit du travail
          francais, notamment pour le decompte des conges payes et des delais legaux.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Jours ouvres</p>
            <p className="mt-1 text-sm font-medium text-foreground">Lundi au vendredi</p>
            <p className="mt-1 text-xs text-muted">
              5 jours par semaine, hors jours feries. C&apos;est le mode de decompte le plus courant
              dans les entreprises modernes. Un salarie a temps plein dispose de 25 jours ouvres
              de conges par an.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Jours ouvrables</p>
            <p className="mt-1 text-sm font-medium text-foreground">Lundi au samedi</p>
            <p className="mt-1 text-xs text-muted">
              6 jours par semaine, hors dimanches et jours feries. C&apos;est le mode legal par defaut
              pour le decompte des conges payes selon le Code du travail. Un salarie dispose de
              30 jours ouvrables de conges par an.
            </p>
          </div>
        </div>
        <p>
          Les deux modes sont equivalents : 25 jours ouvres = 30 jours ouvrables = 5 semaines de conges payes.
          En pratique, la plupart des entreprises utilisent le decompte en jours ouvres.
        </p>
      </Section>

      <Section title="Les 11 jours feries francais">
        <p>
          L&apos;article L3133-1 du Code du travail definit 11 jours feries legaux en France metropolitaine.
          Parmi eux, 8 sont a date fixe et 3 dependent de la date de Paques.
        </p>

        <p className="font-medium text-foreground mt-4">8 jours feries fixes</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Date</th>
                <th className="py-2 text-left font-medium">Nom</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {FERIES_FIXES.map((f) => (
                <tr key={f.date}>
                  <td className="py-2 font-medium text-foreground">{f.date}</td>
                  <td className="py-2 text-muted">{f.nom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-medium text-foreground mt-4">3 jours feries mobiles</p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="py-2 text-left font-medium">Nom</th>
                <th className="py-2 text-left font-medium">Calcul</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {FERIES_MOBILES.map((f) => (
                <tr key={f.nom}>
                  <td className="py-2 font-medium text-foreground">{f.nom}</td>
                  <td className="py-2 text-muted">{f.calcul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Comment est calculee la date de Paques ?">
        <p>
          Paques est une fete mobile dont la date est calculee selon un algorithme astronomique
          (algorithme de Meeus/Jones/Butcher). Elle tombe toujours un dimanche entre le 22 mars et le
          25 avril. En 2026, Paques tombe le 5 avril.
        </p>
        <p>
          Trois jours feries en dependent : le lundi de Paques (lendemain), l&apos;Ascension (39 jours
          apres, toujours un jeudi) et le lundi de Pentecote (50 jours apres). L&apos;Ascension cree
          souvent un &laquo; pont &raquo; car elle tombe un jeudi, incitant a prendre le vendredi en conge.
        </p>
      </Section>

      <Section title="Ponts et jours de pont">
        <p>
          Un &laquo; pont &raquo; designe le jour travaille isole entre un jour ferie et le weekend. Par exemple,
          quand un jour ferie tombe un jeudi, le vendredi est un jour de pont. De meme, si un ferie
          tombe un mardi, le lundi devient un pont.
        </p>
        <p>
          Les ponts ne sont pas automatiquement chomes. L&apos;employeur peut decider de les accorder
          (avec ou sans recuperation), ou la convention collective peut les prevoir. En 2026, les principaux
          ponts sont lies a l&apos;Ascension (jeudi 14 mai) et a la Fete Nationale (mardi 14 juillet).
        </p>
      </Section>

      <Section title="Jours ouvres et conges payes">
        <p>
          Le decompte des conges payes est directement lie a la notion de jours ouvres ou ouvrables.
          Le Code du travail prevoit 30 jours ouvrables (ou 25 jours ouvres) par an pour un salarie a temps plein.
        </p>
        <p>
          Pour calculer la duree d&apos;une absence en conges, on decompte les jours ouvres (ou ouvrables)
          entre le premier jour d&apos;absence et le jour de reprise. Les jours feries chomes ne sont pas
          decomptes des conges.
        </p>
        <p>
          Utilisez notre{" "}
          <Link href="/outils/conges-payes" className="text-primary hover:underline">calculateur de conges payes</Link>
          {" "}pour estimer votre indemnite de conges.
        </p>
      </Section>

      <Section title="Outils complementaires">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Conges payes", url: "/outils/conges-payes", desc: "Calculez votre indemnite de conges" },
            { name: "Frais reels", url: "/outils/frais-reels-impots", desc: "Comparez frais reels vs forfait 10%" },
            { name: "Simulateur brut/net", url: "/outils/simulateur-brut-net", desc: "Convertir votre salaire" },
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

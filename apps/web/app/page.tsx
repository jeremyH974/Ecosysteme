import Link from "next/link";

const SITUATIONS = [
  { id: "salarie", title: "Je suis salarie", count: 8, icon: "\u{1F4BC}", href: "/situations/salarie" },
  { id: "independant", title: "Je me lance a mon compte", count: 4, icon: "\u{1F4BB}", href: "/situations/independant" },
  { id: "immobilier", title: "J&apos;investis en immobilier", count: 4, icon: "\u{1F3E0}", href: "/situations/immobilier" },
  { id: "impots", title: "Je prepare mes impots", count: 5, icon: "\u{1F4CA}", href: "/situations/impots" },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-border bg-surface-card">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Calculez vos droits en 60 secondes
          </h1>
          <p className="mt-2 text-sm text-muted">
            Rupture, salaire, immobilier, impots — resultats exacts, sources officielles
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {SITUATIONS.map((s) => (
              <Link key={s.id} href={s.href}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 text-left transition-all hover:border-primary/30 hover:shadow-sm">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary" dangerouslySetInnerHTML={{ __html: s.title }} />
                  <p className="text-xs text-muted">{s.count} outils</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-light">
            302 tests &middot; Baremes officiels a jour &middot; 18 calculateurs gratuits
          </p>
        </div>
      </section>
    </main>
  );
}

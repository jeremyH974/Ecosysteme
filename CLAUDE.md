# CLAUDE.md — Reference projet Ecosysteme

## Stack technique
- Framework : Next.js 15, App Router, React 19
- Langage : TypeScript strict (no any)
- Style : Tailwind CSS v4
- Tests : Vitest (302 tests, 0 echec)
- Validation : Zod sur tous les inputs
- Package manager : pnpm (workspaces)
- Monorepo : Turborepo
- Email : Brevo
- Analytics : Plausible
- PDF : @react-pdf/renderer + fallback .txt
- Hebergement : Vercel + GitHub auto-deploy

## Commandes essentielles
```bash
pnpm dev          # Demarrer le serveur de developpement (port 3000)
pnpm test         # Lancer tous les tests
pnpm build        # Build de production
pnpm lint         # Verification ESLint
```

## Architecture monorepo
```
apps/web/                     # Application Next.js principale
packages/core/                # Primitives de calcul (fonctions pures)
packages/regulatory/          # Moteur reglementaire + baremes
packages/ui/                  # Design system partage
packages/pdf/                 # Service generation PDF
packages/analytics/           # Evenements Plausible normalises
```

## Regles critiques

1. Zero valeur reglementaire hardcodee — tout dans baremes.json avec source
2. Zero fonction de calcul sans tests
3. Zero deploiement avec tests en echec
4. Zero `any` TypeScript sans commentaire justificatif
5. Zero CTA de monetisation avant l'affichage du resultat
6. Maximum 3 champs obligatoires par formulaire d'outil

## Carte du projet

### Pattern fichiers — chaque outil suit ce modele
```
apps/web/app/outils/[slug]/
├── page.tsx          # Server component (metadata, Breadcrumb, JsonLd)
├── *Page.tsx         # Client component (formulaire, calcul, resultat)
└── *Content.tsx      # Contenu editorial SEO
```

### 18 outils en production
```
/outils/rupture-conventionnelle
/outils/simulateur-brut-net
/outils/optimisation-sasu
/outils/simulateur-auto-entrepreneur
/outils/comparateur-statuts
/outils/simulateur-tmi
/outils/indemnites-km
/outils/revision-loyer
/outils/frais-notaire
/outils/rendement-locatif
/outils/plus-value-immobiliere
/outils/niveau-richesse
/outils/allocation-chomage
/outils/simulateur-retraite
/outils/jours-ouvres
/outils/frais-reels-impots
/outils/prime-activite
/outils/conges-payes
```

### Fichiers de donnees partages
```
apps/web/app/lib/situations.ts      # 4 situations de vie + mapping outils
apps/web/app/lib/next-steps.ts      # Recommandations "Et maintenant ?" par outil
apps/web/app/lib/faq-data.ts        # 90+ FAQ items pour 18 outils
apps/web/app/lib/diagnostic.ts      # Questions + logique diagnostic
apps/web/app/lib/NextStepBlock.tsx   # 1 seule suggestion par outil
apps/web/app/lib/ExportPDFButton.tsx # Export PDF avec fallback .txt
```

### Design system
- Theme CSS : `apps/web/app/globals.css` (variables `--color-*`)
- Palette : teal primary, amber accent, slate backgrounds
- Dark mode : toggle + localStorage + prefers-color-scheme
- Inputs : `color: var(--color-foreground)` force globalement

### Baremes reglementaires
- Fichier unique : `packages/regulatory/data/baremes.json` (20 baremes)
- Changelog : `BAREME_CHANGELOG.md` (historique complet)
- Script audit : `scripts/audit-baremes.ts`
- Derniere verification : 2026-04-14

### Primitives de calcul (packages/core/src/)
```
salary/    rupture, brut-net, chomage, retraite, richesse, prime-activite, conges
fiscal/    IR, IS, PFU, AE, SASU-optim, IK, comparateur, frais-reels
property/  loyer, notaire, rendement, plus-value
dates/     jours-ouvres (algorithme Paques Meeus/Jones/Butcher)
```

### Limitations connues (documenter dans TrustFooter)
- PDF : @react-pdf/renderer fragile sur Vercel → fallback .txt actif
- Chomage : SJR approxime, degressivite non implementee > 4 939 EUR
- Retraite : estimation +/-20%, SAM = salaire actuel
- `comparerStatuts` : `calculerIRSimple` local (evite import circulaire)

### Synergies actives (moteur de recommandation)
```
rupture-conventionnelle → allocation-chomage
allocation-chomage      → comparateur-statuts
simulateur-brut-net     → frais-reels-impots
comparateur-statuts     → optimisation-sasu
optimisation-sasu       → simulateur-tmi
frais-notaire           → rendement-locatif
rendement-locatif       → revision-loyer
frais-reels-impots      → simulateur-tmi
indemnites-km           → frais-reels-impots
jours-ouvres            → frais-reels-impots
simulateur-tmi          → frais-reels-impots
```

## Standards de qualite

- Bareme avec URL source officielle et date de verification
- Minimum 10 cas de tests par primitive
- TrustFooter avec limitations sur chaque outil
- Formulaire teste sur iPhone SE (375px)
- `inputMode="decimal"` sur tous les champs numeriques
- Phrase d'interpretation sous chaque resultat principal
- 1 seule suggestion "Et maintenant ?" par outil
- Ne jamais promouvoir avant audit de fiabilite des calculs

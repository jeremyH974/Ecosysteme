# Ecosysteme — Calculateurs utilitaires de reference (France)

## Projet

Ecosysteme de produits utilitaires pour les Francais : calculateurs, simulateurs et generateurs dans les domaines droit du travail, freelance/societe, immobilier et fiscalite.

**Document de reference** : `C:\Users\jerem\Downloads\MASTER_PROMPT_CLAUDE_CODE.md` — contient les regles absolues, la stack, l'architecture et les standards qualite.

## Stack

- **Monorepo** : Turborepo + pnpm
- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript strict (no any, noUncheckedIndexedAccess)
- **Styling** : Tailwind CSS v4
- **Tests** : Vitest + Testing Library
- **Validation** : Zod (tous les inputs et baremes)

## Architecture

```
packages/core/       Primitives de calcul PURES (zero effet de bord)
packages/regulatory/ Moteur reglementaire (baremes JSON + Zod)
packages/ui/         Design system (ToolLayout, FormField, ResultCard, TrustFooter)
packages/analytics/  Evenements normalises
packages/pdf/        Generation PDF
apps/web/            Application Next.js
```

## Regles critiques

1. **Les primitives de calcul ne lisent jamais les baremes** — elles recoivent les valeurs en params
2. **Zod validation** sur tous les inputs utilisateur et les baremes
3. **Aucun arrondi silencieux** dans les primitives — precision complete
4. **TrustFooter obligatoire** sur chaque page d'outil (sources, dates, cas couverts/non couverts)
5. **Tests avant tout** — minimum 10 cas par primitive, dont edge cases
6. **Jamais de `any`** en TypeScript sans justification commentee
7. **CTA monetisation uniquement APRES le resultat** — jamais avant

## Commandes

```bash
pnpm install          # Installer les dependances
pnpm run dev          # Demarrer le serveur de dev
pnpm turbo run build  # Build complet
pnpm turbo run test   # Lancer tous les tests
pnpm turbo run lint   # Linter
```

## Baremes

Les baremes reglementaires sont dans `packages/regulatory/data/baremes.json`. Chaque bareme doit avoir :
- `source_url` : lien vers le texte officiel
- `verifie_le` : date de derniere verification
- `verifie_par` : initiales du verificateur

**Ne jamais hardcoder une valeur reglementaire sans source documentee.**

## Conventions

- Primitives : `calculer[Action][Domaine]` (ex: `calculerIndemniteRuptureConventionnelle`)
- Composants : `[Nom][Type]` (ex: `RuptureForm`, `ResultCard`)
- Hooks : `use[Domaine][Action]` (ex: `useRuptureCalc`)
- Commits : Conventional Commits (`feat`, `fix`, `test`, `bareme`, `chore`)

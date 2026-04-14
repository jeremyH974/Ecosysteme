# Rapport de projet — Ecosysteme
## Date : 14 avril 2026

---

## 1. ETAT DES LIEUX

### Metriques cles

| Metrique | Valeur |
|---|---|
| **Outils operationnels** | 14 |
| **Tests automatises** | 249 (0 echec) |
| **Routes deployees** | 22 |
| **Fichiers source** | 137 (.ts/.tsx) |
| **Lignes de code** | ~10 900 |
| **Commits** | 16 |
| **Baremes reglementaires** | 12 |
| **FAQ pedagogiques** | 58+ questions |
| **Pages avec contenu editorial** | 11/14 |

### Production

- **URL** : https://ecosysteme-tools.vercel.app
- **GitHub** : https://github.com/jeremyH974/Ecosysteme
- **Deploiement** : auto-deploy sur push main (Vercel + GitHub)
- **CI/CD** : GitHub Actions (lint → typecheck → test → build)

---

## 2. CE QUI A ETE CONSTRUIT

### 2.1 Infrastructure (Phase 0)

- Monorepo Turborepo + pnpm avec 6 packages
- TypeScript strict (no any, noUncheckedIndexedAccess)
- Tailwind CSS v4 avec theme semantique
- Vitest + Testing Library
- Zod validation sur tous les inputs et baremes
- ESLint flat config + Prettier
- Design system : 10 composants partages (ToolLayout, FormField, ResultCard, TrustFooter, FAQ, Tooltip, ShareButton, CrossPromo, ProgressBar, ExportPDF)

### 2.2 Outils (14)

| # | Domaine | Outil | Primitives | Tests |
|---|---|---|---|---|
| 1 | Droit du travail | Rupture conventionnelle | calculerIndemniteRuptureConventionnelle | 27 |
| 2 | Salaire | Simulateur brut/net (6 champs bidirectionnel) | calculerBrutNet | 22 |
| 3 | Salaire | Niveau de richesse | calculerNiveauRichesse | 10 |
| 4 | Salaire | Allocations chomage (ARE) | calculerAllocationChomage | 10 |
| 5 | Salaire | Simulateur retraite | calculerRetraite | 10 |
| 6 | Freelance | Optimisation SASU | optimiserRemunerationSASU + calculerIR + calculerIS + calculerPFU | 14+12+8+7 |
| 7 | Freelance | Auto-entrepreneur | calculerAutoEntrepreneur | 10 |
| 8 | Freelance | Comparateur SASU vs AE | comparerStatuts | 8 |
| 9 | Immobilier | Revision loyer IRL | calculerRevisionLoyer | 19 |
| 10 | Immobilier | Frais de notaire | calculerFraisNotaire | 8 |
| 11 | Immobilier | Rendement locatif | calculerRendementLocatif | 10 |
| 12 | Immobilier | Plus-value immobiliere | calculerPlusValueImmo | 10 |
| 13 | Fiscalite | Simulateur TMI | calculerIR (reutilise) | — |
| 14 | Fiscalite | Indemnites kilometriques | calculerIndemnitesKm | 7 |

### 2.3 Design

- Palette statut-net : primary teal (#0d9488), amber accent, slate backgrounds
- Mode sombre complet (toggle + localStorage + prefers-color-scheme)
- Navbar sticky avec blur backdrop
- Footer enrichi avec maillage interne (10 liens)
- ResultCard premium avec header gradient + accordeon anime
- Composants responsive mobile-first

### 2.4 SEO

| Element | Statut |
|---|---|
| Meta title/description optimisees | 15/15 pages |
| Canonical URLs | Toutes les pages |
| Open Graph | Toutes les pages |
| Twitter Card | Layout global |
| JSON-LD WebSite + Organization | Layout |
| JSON-LD BreadcrumbList | 15 pages |
| JSON-LD FAQPage | 14 pages (58+ Q&A) |
| JSON-LD WebApplication | 14 pages |
| Breadcrumb visuel | 15 pages |
| sitemap.xml | 17 URLs |
| robots.txt | Configure |
| Contenu editorial riche | 11/14 outils |
| Maillage interne | Chaque page = 3-6 liens |

### 2.5 Fonctionnalites transversales

- Export PDF (@react-pdf/renderer) sur les 14 outils
- Moteur de recommandation croisee (14 outils lies)
- Analytics normalises (events: tool_start, tool_complete, pdf_download, etc.)
- Page /outils avec navigation par categories
- Page 404 personnalisee
- Profils utilisateurs sur landing (salarie, freelance, bailleur)
- Bouton de partage natif (Web Share API)

---

## 3. PRECONISATIONS

### 3.1 Priorite haute (impact fort, effort modere)

#### A. Nom de domaine personnalise
- Acheter un domaine (ex: ecosysteme-outils.fr ou calcul-france.fr)
- Configurer sur Vercel (Settings > Domains)
- Mettre a jour metadataBase, sitemap, canonical, JSON-LD
- **Impact** : credibilite, SEO, branding

#### B. Google Search Console
- Soumettre le sitemap.xml
- Verifier la propriete (balise meta ou DNS)
- Suivre l'indexation et les performances
- **Impact** : visibilite Google, correction rapide des erreurs

#### C. Contenu editorial sur les 3 outils manquants
- plus-value-immobiliere, indemnites-km, comparateur-statuts n'ont pas encore de Content component
- Ajouter le meme pattern que les 11 autres
- **Impact** : SEO, temps passe sur page, maillage

#### D. Images et Open Graph
- Creer une image OG par outil (1200x630px) avec titre + resultat exemple
- Ajouter og:image sur chaque page
- **Impact** : CTR sur les reseaux sociaux, apparence dans les partages

### 3.2 Priorite moyenne (amelioration continue)

#### E. Page de blog / guides
- Creer /blog ou /guides avec des articles longs (1500+ mots)
- Sujets : "Comment negocier sa rupture conventionnelle", "SASU ou auto-entrepreneur en 2024", "Investir dans l'immobilier locatif"
- Maillage vers les outils correspondants
- **Impact** : trafic organique longue traine, autorite du domaine

#### F. Internationalisation (i18n)
- Extraire les textes dans des fichiers de constantes /locales/fr/
- Preparer la structure pour une version multilingue
- **Impact** : scalabilite, marche francophone (Belgique, Suisse, Canada)

#### G. Tests E2E avec Playwright
- Tester le parcours complet de chaque outil (saisie → resultat → PDF)
- Integrer dans la CI/CD
- **Impact** : confiance, regression zero

#### H. Performance
- Auditer avec Lighthouse (cible > 90 sur mobile)
- Lazy load des sections editoriales sous le fold
- Preload de la font Inter
- Code splitting des composants lourds (PDF)
- **Impact** : Core Web Vitals, ranking Google

### 3.3 Priorite basse (nice to have)

#### I. Email capture (Brevo)
- Formulaire "Recevoir ce calcul par email" apres le resultat
- Double opt-in, RGPD compliant
- Newsletter avec mises a jour des baremes
- **Impact** : retention, monetisation future

#### J. Monetisation contextuelle
- CTA "Un expert-comptable peut vous aider" apres les resultats SASU/AE
- Affiliation vers des services complementaires (creation societe, assurance)
- Toujours APRES le resultat (regle du Master Prompt)
- **Impact** : revenu

#### K. PWA (Progressive Web App)
- manifest.json + service worker
- Installation sur mobile
- Fonctionnement offline pour les calculs deja charges
- **Impact** : engagement mobile, retention

#### L. Comparaison internationale
- Version pour la Belgique, Suisse, Luxembourg (comme brut-en-net.fr)
- Reutiliser l'architecture, changer les baremes
- **Impact** : marche x4

---

## 4. ARCHITECTURE TECHNIQUE

```
Ecosysteme/
├── apps/web/                 Next.js 15 App Router
│   ├── app/
│   │   ├── layout.tsx        Root layout + navbar + footer + schemas
│   │   ├── page.tsx          Landing page (14 outils, profils, categories)
│   │   ├── not-found.tsx     404 personnalisee
│   │   ├── sitemap.ts        17 URLs
│   │   ├── robots.ts         Config crawlers
│   │   ├── api/pdf/          API generation PDF
│   │   ├── lib/              Composants partages (Breadcrumb, FAQ data, JsonLd, etc.)
│   │   └── outils/
│   │       ├── page.tsx      Index /outils
│   │       └── [14 dossiers] 1 page.tsx + 1 PageComponent.tsx + 1 Content.tsx chacun
│   └── public/
├── packages/
│   ├── core/                 16 primitives de calcul pures
│   │   ├── src/salary/       brut-net, rupture, chomage, retraite, richesse
│   │   ├── src/fiscal/       IR, IS, PFU, AE, SASU optim, km, comparateur
│   │   ├── src/property/     loyer, frais notaire, rendement, plus-value
│   │   └── tests/            249 tests
│   ├── regulatory/           Noyau reglementaire (12 baremes Zod-valides)
│   ├── ui/                   10 composants design system
│   ├── analytics/            Events normalises
│   └── pdf/                  @react-pdf/renderer
└── tooling/                  tsconfig, eslint, prettier partages
```

---

## 5. CONCLUSION

Le projet Ecosysteme est **fonctionnellement complet** par rapport au Master Prompt initial (etapes 0-5) et va bien au-dela avec la densification (14 outils vs 4 prevus), le contenu editorial riche, le SEO avance, le dark mode, et le design premium.

Les prochaines etapes les plus impactantes sont :
1. **Domaine personnalise** (credibilite)
2. **Google Search Console** (indexation)
3. **Images OG** (CTR reseaux sociaux)
4. **Blog/guides** (trafic organique)

Le cout marginal d'ajout d'un nouvel outil est maintenant tres faible (~1h) grace a l'architecture modulaire et aux composants partages.

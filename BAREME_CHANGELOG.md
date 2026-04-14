# Changelog des baremes reglementaires

Ce fichier documente toutes les modifications de baremes reglementaires avec les sources officielles.

---

## 2026-04-14 — Ajout baremes jours feries, frais repas, IKV velo

### Jours feries France metropolitaine — AJOUTE
- **8 jours fixes** + **4 jours mobiles** (Paques, lundi de Paques, Ascension, lundi de Pentecote)
- **Source** : [Code du travail — Art. L3133-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902611)

### Valeur repas pris a domicile — AJOUTE
- **Valeur** : 5,20 EUR (2024)
- **Usage** : calcul des frais reels de repas deductibles
- **Source** : [URSSAF — Frais professionnels](https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html)

### Indemnite kilometrique velo (IKV) — AJOUTE
- **Valeur** : 0,35 EUR/km
- **Source** : [Service-Public — IKV 2024](https://www.service-public.fr/particuliers/vosdroits/F34715)

---

## 2026-04-14 — Audit complet + mise a jour 2026

### SMIC
- **Ancienne valeur** : 11.65 EUR/h (2024)
- **Nouvelle valeur** : 12.02 EUR/h (+1.18%)
- **Date d'effet** : 01/01/2026
- **Source** : [info.gouv.fr](https://www.info.gouv.fr/actualite/le-smic-revalorise-au-1er-janvier-2026)
- **SMIC mensuel brut** : 1 823.03 EUR (151.67h)

### Plafond Securite Sociale (PASS)
- **Ancienne valeur** : 3 864 EUR/mois — 46 368 EUR/an
- **Nouvelle valeur** : 4 005 EUR/mois — 48 060 EUR/an (+2%)
- **Date d'effet** : 01/01/2026
- **Source** : [URSSAF](https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/plafonds-securite-sociale.html)
- **Impact** : seuil de la tranche 1 des cotisations vieillesse et AGIRC-ARRCO

### Bareme IR (revenus 2025)
- **Anciennes tranches** : 11 293 / 28 797 / 82 341 / 177 106
- **Nouvelles tranches** : 11 600 / 29 579 / 84 577 / 181 917 (+0.9%)
- **Date d'effet** : declaration 2026
- **Source** : [Service-Public](https://www.service-public.gouv.fr/particuliers/vosdroits/F1419)

### Bareme IR (revenus 2024) — AJOUTE
- **Tranches** : 11 294 / 28 797 / 82 341 / 177 106
- **Source** : [Legifrance — LFI 2025](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049034498)
- **Usage** : declaration 2025

### Bareme kilometrique — CORRIGE
- **Anciennes valeurs (erronees)** : 5CV=0.636, 7+CV=0.697, T3 variable
- **Nouvelles valeurs (BOFIP)** : 5CV=0.657, 7+CV=0.661, T3=0.407 pour tous
- **Source** : [BOFIP BOI-BAREME-000001](https://bofip.impots.gouv.fr/bofip/2185-PGP.html/identifiant=BOI-BAREME-000001-20230720)

### IRL — CORRIGES + COMPLETES
- **IRL T2 2024** : 144.44 → 145.17 (erreur corrigee)
- **IRL T4 2024** : 145.47 → 144.64 (erreur corrigee)
- **Ajouts** : T1 2025 (145.47), T2 2025 (146.68), T3 2025 (145.77), T4 2025 (145.78)
- **Source** : [ANIL/INSEE](https://www.anil.org/outils/indices-et-plafonds/tableau-de-lirl/)

### ARE (Allocations chomage) — MIS A JOUR
- **Part fixe** : 12.95 → 13.18 EUR/jour
- **Plancher** : 31.59 → 32.13 EUR/jour
- **Date d'effet** : 01/07/2025
- **Source** : [France Travail](https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/lessentiel-a-savoir-sur-lallocat/quelle-somme-vais-je-recevoir/comment-est-calcule-le-montant-d.html)

### Cotisations salariales
- **Taux salariales** : INCHANGES (CSG 6.8%+2.4%, CRDS 0.5%, vieillesse 6.9%+0.4%, AGIRC-ARRCO 3.15%/8.64%)
- **Note** : seules les patronales vieillesse deplafonnee ont change (2.02% → 2.11%)
- **Source** : [URSSAF](https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html)

### IS, PFU, Rupture conventionnelle
- **IS** : 15%/25% avec seuil 42 500 EUR — INCHANGE
- **PFU** : 12.8% IR + 17.2% PS = 30% — INCHANGE
- **Rupture conventionnelle** : 1/4 + 1/3 — INCHANGE
- **Sources** : Service-Public, Legifrance

---

## Calendrier des prochaines verifications

| Bareme | Publication attendue | Action |
|---|---|---|
| IRL T1 2026 | Avril 2026 | Ajouter dans baremes.json |
| SMIC | Janvier 2027 | Verifier revalorisation |
| PASS | Janvier 2027 | Verifier revalorisation |
| Bareme IR 2027 | Decembre 2026 (LFI) | Mettre a jour tranches |
| Cotisations | Janvier 2027 | Verifier taux URSSAF |
| ARE | Juillet 2026 | Verifier revalorisation Unedic |
| Bareme km | Fevrier 2027 | Verifier BOFIP |

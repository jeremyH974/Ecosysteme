export {
  calculerIndemniteRuptureConventionnelle,
  RuptureInputSchema,
  RuptureOutputSchema,
  type RuptureInput,
  type RuptureOutput,
} from "./rupture-conventionnelle.js";

export {
  calculerBrutNet,
  BrutNetInputSchema,
  BrutNetOutputSchema,
  type BrutNetInput,
  type BrutNetOutput,
} from "./brut-net.js";

export {
  calculerNiveauRichesse,
  NiveauRichesseInputSchema,
  NiveauRichesseOutputSchema,
  type NiveauRichesseInput,
  type NiveauRichesseOutput,
} from "./niveau-richesse.js";

export {
  calculerAllocationChomage,
  AllocationChomageInputSchema,
  AllocationChomageOutputSchema,
  type AllocationChomageInput,
  type AllocationChomageOutput,
} from "./allocation-chomage.js";

export {
  calculerRetraite,
  RetraiteInputSchema,
  RetraiteOutputSchema,
  type RetraiteInput,
  type RetraiteOutput,
} from "./simulateur-retraite.js";

export {
  calculerPrimeActivite,
  PrimeActiviteInputSchema,
  PrimeActiviteOutputSchema,
  type PrimeActiviteInput,
  type PrimeActiviteOutput,
} from "./prime-activite.js";

export {
  calculerCongesPayes,
  CongesPayesInputSchema,
  CongesPayesOutputSchema,
  type CongesPayesInput,
  type CongesPayesOutput,
} from "./conges-payes.js";

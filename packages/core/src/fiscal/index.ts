export {
  calculerIR,
  IRInputSchema,
  IROutputSchema,
  type IRInput,
  type IROutput,
} from "./impot-revenu.js";

export {
  calculerIS,
  ISInputSchema,
  ISOutputSchema,
  type ISInput,
  type ISOutput,
} from "./impot-societes.js";

export {
  calculerPFU,
  PFUInputSchema,
  PFUOutputSchema,
  type PFUInput,
  type PFUOutput,
} from "./pfu.js";

export {
  optimiserRemunerationSASU,
  SASUOptimInputSchema,
  SASUOptimOutputSchema,
  type SASUOptimInput,
  type SASUOptimOutput,
  type ScenarioComparatif,
} from "./sasu-optim.js";

export {
  calculerAutoEntrepreneur,
  AEInputSchema,
  AEOutputSchema,
  type AEInput,
  type AEOutput,
} from "./auto-entrepreneur.js";

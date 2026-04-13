import { describe, test, expect } from "vitest";
import {
  MonetaryAmountSchema,
  PositiveAmountSchema,
  PercentageSchema,
  AnneeSchema,
  MoisSchema,
} from "../src/types.js";

describe("MonetaryAmountSchema", () => {
  test("accepte 0", () => {
    expect(MonetaryAmountSchema.safeParse(0).success).toBe(true);
  });

  test("accepte un montant positif", () => {
    expect(MonetaryAmountSchema.safeParse(2500.5).success).toBe(true);
  });

  test("rejette un montant negatif", () => {
    expect(MonetaryAmountSchema.safeParse(-100).success).toBe(false);
  });
});

describe("PositiveAmountSchema", () => {
  test("accepte un montant strictement positif", () => {
    expect(PositiveAmountSchema.safeParse(1).success).toBe(true);
  });

  test("rejette 0", () => {
    expect(PositiveAmountSchema.safeParse(0).success).toBe(false);
  });
});

describe("PercentageSchema", () => {
  test("accepte 0", () => {
    expect(PercentageSchema.safeParse(0).success).toBe(true);
  });

  test("accepte 1", () => {
    expect(PercentageSchema.safeParse(1).success).toBe(true);
  });

  test("accepte 0.25", () => {
    expect(PercentageSchema.safeParse(0.25).success).toBe(true);
  });

  test("rejette > 1", () => {
    expect(PercentageSchema.safeParse(1.5).success).toBe(false);
  });

  test("rejette < 0", () => {
    expect(PercentageSchema.safeParse(-0.1).success).toBe(false);
  });
});

describe("AnneeSchema", () => {
  test("accepte 0", () => {
    expect(AnneeSchema.safeParse(0).success).toBe(true);
  });

  test("accepte 30", () => {
    expect(AnneeSchema.safeParse(30).success).toBe(true);
  });

  test("rejette un nombre decimal", () => {
    expect(AnneeSchema.safeParse(2.5).success).toBe(false);
  });

  test("rejette un nombre negatif", () => {
    expect(AnneeSchema.safeParse(-1).success).toBe(false);
  });
});

describe("MoisSchema", () => {
  test("accepte 0", () => {
    expect(MoisSchema.safeParse(0).success).toBe(true);
  });

  test("accepte 11", () => {
    expect(MoisSchema.safeParse(11).success).toBe(true);
  });

  test("rejette 12", () => {
    expect(MoisSchema.safeParse(12).success).toBe(false);
  });

  test("rejette -1", () => {
    expect(MoisSchema.safeParse(-1).success).toBe(false);
  });
});

import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: [
    "@ecosysteme/core",
    "@ecosysteme/regulatory",
    "@ecosysteme/ui",
    "@ecosysteme/analytics",
    "@ecosysteme/pdf",
  ],
};

export default config;

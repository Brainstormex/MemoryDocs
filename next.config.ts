import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@langchain/community",
    "@langchain/core",
    "langchain",
    "pdf-parse",
  ],
};

export default nextConfig;

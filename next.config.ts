import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SUNRISE_SUNSET_API_URL: process.env.SUNRISE_SUNSET_API_URL,
    SUNRISE_SUNSET_API_KEY: process.env.SUNRISE_SUNSET_API_KEY,
    NEXT_PUBLIC_INTERNAL_HEADER_KEY: process.env.NEXT_PUBLIC_INTERNAL_HEADER_KEY
  }
};

export default nextConfig;

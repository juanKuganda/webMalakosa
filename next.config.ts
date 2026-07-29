import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Allow all Supabase hostnames for images
      },
    ],
    unoptimized: true, // Bypass Next.js server image optimization to prevent SSRF private IP blocks on NAT64 networks
  },
};

export default nextConfig;

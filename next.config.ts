import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Allow all Supabase hostnames for images
      },
    ],
  },
};

export default nextConfig;

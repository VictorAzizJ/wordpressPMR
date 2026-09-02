import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/glossary",
        destination: "/resources/glossary",
        permanent: true,
      },
      {
        source: "/archive/policy",
        destination: "/archive/collections-management-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

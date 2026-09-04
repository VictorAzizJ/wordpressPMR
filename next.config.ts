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
      {
        source: "/archive",
        has: [{ type: "query", key: "q", value: "(?<q>.+)" }],
        destination: "/archive/browse?q=:q",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

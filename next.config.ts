import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: "/auth/forgot-password",
        permanent: false,
      },
      {
        source: "/verify-otp",
        destination: "/auth/verify-otp",
        permanent: false,
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
        permanent: false,
      },
      {
        source: "/register",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

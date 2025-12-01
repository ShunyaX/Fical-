/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.jikan.moe",
        pathname: "/v4/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
import withTM from "next-transpile-modules";
const nextConfig = withTM(["shared"])({
  reactStrictMode: true,
  swcMinify: true,
});

export default nextConfig;

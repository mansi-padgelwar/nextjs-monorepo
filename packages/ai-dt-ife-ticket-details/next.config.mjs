// /** @type {import('next').NextConfig} */
// import { withTM } from "next-transpile-modules";
// // import i18n from './next-i18next.config.js';
// console.log(i18n)
// const nextConfig = withTM(["shared-lib"])({
//   reactStrictMode: true,
//   output: 'standalone',
//   // i18n,
//   swcMinify: true
// });

// export default nextConfig;
/** @type {import('next').NextConfig} */
import withTM from "next-transpile-modules";
import { i18n } from './next-i18next.config.js';

const nextConfig = withTM(["shared"])({
  reactStrictMode: true,
  output: 'standalone',
  i18n,
  swcMinify: true
});

export default nextConfig;
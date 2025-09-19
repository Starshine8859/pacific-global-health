/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },        // you can turn this off later
  typescript: { ignoreBuildErrors: true },     // you can turn this off later
  images: { unoptimized: true },               // fine for simple/static deploys
  reactStrictMode: false,                      // optional
  compiler: {
    // valid in Next 15 — removes console.* in production bundles
    removeConsole: process.env.NODE_ENV === "production",
  },
  // ❌ devIndicators removed (deprecated)
  // ❌ experimental.suppressHydrationWarning removed (invalid)
}

export default nextConfig

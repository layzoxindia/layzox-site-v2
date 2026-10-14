/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/cine.css", headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  // Kept permissive so a stray type warning never blocks a deploy while the
  // design is still moving. Run `npm run typecheck` to see real type errors,
  // and set this to false once the site is stable.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  // Homepage and the section pages (approach, services, ai-agents, principles, contact) are static files in public/ sharing public/cine.css; other pages (/about, /privacy, /terms ...) stay in the app.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/cinematic.html" },
        { source: "/approach", destination: "/approach.html" },
        { source: "/services", destination: "/services.html" },
        { source: "/ai-agents", destination: "/ai-agents.html" },
        { source: "/principles", destination: "/principles.html" },
        { source: "/contact", destination: "/contact.html" },
      ],
    };
  },
};

export default nextConfig;

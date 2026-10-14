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
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      // Report-only first: it logs violations in the browser console without blocking anything.
      // After a clean pass on every page, rename this header to "Content-Security-Policy".
      {
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob:",
          "connect-src 'self'",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join("; "),
      },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/motion.js", headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }] },
      { source: "/cine.css", headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  // Type errors fail the build. ESLint is not configured in this project, so it is skipped during builds.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  // Homepage and the section pages (approach, services, ai-agents, principles, contact) are static files in public/ sharing public/cine.css; the about, why-layzox, faq, careers, privacy, terms and /services/* pages are static files too. The matching app/ routes are now unused fallbacks.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/cinematic.html" },
        { source: "/approach", destination: "/approach.html" },
        { source: "/services", destination: "/services.html" },
        { source: "/ai-agents", destination: "/ai-agents.html" },
        { source: "/principles", destination: "/principles.html" },
        { source: "/contact", destination: "/contact.html" },
        { source: "/about", destination: "/about.html" },
        { source: "/why-layzox", destination: "/why-layzox.html" },
        { source: "/faq", destination: "/faq.html" },
        { source: "/careers", destination: "/careers.html" },
        { source: "/privacy", destination: "/privacy.html" },
        { source: "/terms", destination: "/terms.html" },
        { source: "/services/custom", destination: "/svc-custom.html" },
        { source: "/services/automation", destination: "/svc-automation.html" },
        { source: "/services/web", destination: "/svc-web.html" },
        { source: "/services/mobile", destination: "/svc-mobile.html" },
        { source: "/services/cloud", destination: "/svc-cloud.html" },
        { source: "/services/consulting", destination: "/svc-consulting.html" },
      ],
    };
  },
};

export default nextConfig;

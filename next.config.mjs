/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    // Keep in sync with public/_headers (used by Cloudflare Pages).
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
      { key: "Content-Security-Policy", value: csp },
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
  // Every visible page is a static file in public/ (index.html, approach.html, services/custom.html ...) sharing public/cine.css.
  // On Cloudflare Pages those files are served at clean URLs automatically; here the rewrites below do the same job.
  // The matching app/ routes are unused fallbacks.
  // Preserve the old corporate website's indexed and shared links.
  async redirects() {
    return [
      // Serve the site on one host only: layzox.com -> www.layzox.com
      { source: "/:path*", has: [{ type: "host", value: "layzox.com" }], destination: "https://www.layzox.com/:path*", permanent: true },
      // Earlier builds of this site
      { source: "/cinematic", destination: "/", permanent: true },
      { source: "/cinematic.html", destination: "/", permanent: true },
      ...["custom", "automation", "web", "mobile", "cloud", "consulting"].map((s) => ({ source: `/svc-${s}`, destination: `/services/${s}`, permanent: true })),
      // Old corporate website
      { source: "/software-development-company-ranchi", destination: "/services/custom", permanent: true },
      { source: "/custom-software-development", destination: "/services/custom", permanent: true },
      { source: "/ai-automation", destination: "/services/automation", permanent: true },
      { source: "/web-application-development", destination: "/services/web", permanent: true },
      { source: "/mobile-app-development", destination: "/services/mobile", permanent: true },
      { source: "/cloud-data-engineering", destination: "/services/cloud", permanent: true },
      { source: "/technology-consulting", destination: "/services/consulting", permanent: true },
      { source: "/solutions", destination: "/approach", permanent: true },
      { source: "/engineering", destination: "/approach", permanent: true },
      { source: "/delivery", destination: "/approach", permanent: true },
      { source: "/process", destination: "/approach", permanent: true },
      { source: "/products", destination: "/services", permanent: true },
      { source: "/thank-you", destination: "/contact", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
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
        { source: "/support", destination: "/support.html" },
        { source: "/cookies", destination: "/cookies.html" },
        { source: "/accessibility", destination: "/accessibility.html" },
        { source: "/security", destination: "/security.html" },
        { source: "/sitemap", destination: "/sitemap.html" },
        { source: "/industries", destination: "/industries.html" },
        { source: "/industries/clinics", destination: "/industries/clinics.html" },
        { source: "/industries/real-estate", destination: "/industries/real-estate.html" },
        { source: "/industries/education", destination: "/industries/education.html" },
        { source: "/industries/hospitality", destination: "/industries/hospitality.html" },
        { source: "/industries/distribution", destination: "/industries/distribution.html" },
        { source: "/industries/solar", destination: "/industries/solar.html" },
        { source: "/engagement", destination: "/engagement.html" },
        { source: "/book", destination: "/book.html" },
        { source: "/insights", destination: "/insights.html" },
        { source: "/insights/whatsapp-orders-to-one-system", destination: "/insights/whatsapp-orders-to-one-system.html" },
        { source: "/insights/ai-voice-agents-lead-follow-up", destination: "/insights/ai-voice-agents-lead-follow-up.html" },
        { source: "/insights/custom-software-vs-off-the-shelf", destination: "/insights/custom-software-vs-off-the-shelf.html" },
        { source: "/resources/automation-checklist", destination: "/resources/automation-checklist.html" },
        { source: "/services/custom", destination: "/services/custom.html" },
        { source: "/services/automation", destination: "/services/automation.html" },
        { source: "/services/web", destination: "/services/web.html" },
        { source: "/services/mobile", destination: "/services/mobile.html" },
        { source: "/services/cloud", destination: "/services/cloud.html" },
        { source: "/services/consulting", destination: "/services/consulting.html" },
      ],
    };
  },
};

export default nextConfig;

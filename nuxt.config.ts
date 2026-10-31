// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// Course images live on Vercel Blob. Allow that origin in the CSP.
const blobOrigin = (() => {
  try {
    return new URL(process.env.NUXT_PUBLIC_BLOB_BASE_URL || "").origin;
  } catch {
    return "";
  }
})();

const csp = [
  "default-src 'self'",
  // Nuxt injects a small inline bootstrap script for the runtime config/payload.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `img-src 'self' data: https://i.ytimg.com ${blobOrigin}`.trim(),
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: "th" },
      title: "NA TRADES · Understand The Logic of Time & Price",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "คอร์สเทรด ICT Concept, Quarterly Theory และ Fractal Model สอนอ่านเวลาและราคาให้เป็นระบบ โดย NA TRADES",
        },
        { name: "theme-color", content: "#070b16" },
        { property: "og:title", content: "Understand The Logic of Time & Price · NA TRADES" },
        {
          property: "og:description",
          content: "ICT · Quarterly Theory · Fractal Model เรียนจบเปิดกราฟแล้วรู้ว่าต้องรออะไร เข้าตรงไหน",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/images/og-cover.png" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },
  routeRules: {
    "/**": {
      headers: {
        "Content-Security-Policy": csp,
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    },
  },
  runtimeConfig: {
    // Server-only (never sent to the browser). Set on Vercel as NUXT_GAS_URL, etc.
    gasUrl: "",
    gasSecret: "",
    sheetId: "",
    driveFolderPrivate: "",
    driveFolderOnline: "",
    public: {
      fbLink: "",
      telegramLink: "",
      youtubeLink: "",
      igLink: "",
      tiktokLink: "",
      discordLink: "",
      bentoLink: "",
      blobBaseUrl: "",
      courseLink: "",
      showBuyCourse: "",
      privateCourseLink: "",
      showBuyPrivateCourse: "",
      // Enrollment / bank transfer
      enrollEnabled: "",
      pricePrivate: "",
      priceOnline: "",
      bankName: "",
      bankAccountNo: "",
      bankAccountName: "",
      lineLink: "",
    },
  },
});

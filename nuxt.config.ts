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

// Public address of the site, used for absolute share-image and canonical URLs.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || "https://www.natrades.com").replace(/\/+$/, "");

const csp = [
  "default-src 'self'",
  // Nuxt injects a small inline bootstrap script for the runtime config/payload.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  `img-src 'self' data: blob: https://i.ytimg.com ${blobOrigin}`.trim(),
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
        { property: "og:title", content: "NA TRADES · The Logic of Time & Price" },
        {
          property: "og:description",
          content: "เข้าใจเวลา อ่านราคาเป็น เทรดอย่างมีเหตุผล · ICT · Quarterly Theory · Fractal Model",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `${siteUrl}/images/og/home.jpg` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "NA TRADES" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
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
    // Values are read at build time from process.env (as the old site did) and can
    // still be overridden at runtime by the same NUXT_* variables.
    // Server-only (never sent to the browser). Set on Vercel as NUXT_GAS_URL, etc.
    gasUrl: process.env.NUXT_GAS_URL || "",
    gasSecret: process.env.NUXT_GAS_SECRET || "",
    sheetId: process.env.NUXT_SHEET_ID || "",
    driveFolderPrivate: process.env.NUXT_DRIVE_FOLDER_PRIVATE || "",
    driveFolderOnline: process.env.NUXT_DRIVE_FOLDER_ONLINE || "",
    public: {
      siteUrl,
      fbLink: process.env.NUXT_PUBLIC_FB_LINK || "",
      telegramLink: process.env.NUXT_PUBLIC_TELEGRAM_LINK || "",
      youtubeLink: process.env.NUXT_PUBLIC_YOUTUBE_LINK || "",
      igLink: process.env.NUXT_PUBLIC_IG_LINK || "",
      tiktokLink: process.env.NUXT_PUBLIC_TIKTOK_LINK || "",
      discordLink: process.env.NUXT_PUBLIC_DISCORD_LINK || "",
      bentoLink: process.env.NUXT_PUBLIC_BENTO_LINK || "",
      blobBaseUrl: process.env.NUXT_PUBLIC_BLOB_BASE_URL || "",
      courseLink: process.env.NUXT_PUBLIC_COURSE_LINK || "",
      showBuyCourse: process.env.NUXT_PUBLIC_SHOW_BUY_COURSE || "",
      privateCourseLink: process.env.NUXT_PUBLIC_PRIVATE_COURSE_LINK || "",
      showBuyPrivateCourse: process.env.NUXT_PUBLIC_SHOW_BUY_PRIVATE_COURSE || "",
      // Enrollment / bank transfer
      enrollEnabled: process.env.NUXT_PUBLIC_ENROLL_ENABLED || "",
      pricePrivate: process.env.NUXT_PUBLIC_PRICE_PRIVATE || "25900",
      priceOnline: process.env.NUXT_PUBLIC_PRICE_ONLINE || "15900",
      priceCoaching: process.env.NUXT_PUBLIC_PRICE_COACHING || "12900",
      // 1:1 Coaching price when bought with the live (private) plan.
      priceCoachingPrivate: process.env.NUXT_PUBLIC_PRICE_COACHING_PRIVATE || "9900",
      bankName: process.env.NUXT_PUBLIC_BANK_NAME || "",
      bankAccountNo: process.env.NUXT_PUBLIC_BANK_ACCOUNT_NO || "",
      bankAccountName: process.env.NUXT_PUBLIC_BANK_ACCOUNT_NAME || "",
      lineLink: process.env.NUXT_PUBLIC_LINE_LINK || "",
      // Live Private Group round: dates as YYYY-MM-DD, schedule as free text. Empty = hidden.
      privateStartDate: process.env.NUXT_PUBLIC_PRIVATE_START_DATE || "",
      privateCloseDate: process.env.NUXT_PUBLIC_PRIVATE_CLOSE_DATE || "",
      privateSchedule: process.env.NUXT_PUBLIC_PRIVATE_SCHEDULE || "",
    },
  },
});

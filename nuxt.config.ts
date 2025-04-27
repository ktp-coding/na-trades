// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  rootDir: __dirname,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "@": "~",
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/images/favicon.ico",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      fbLink: process.env.NUXT_PUBLIC_FB_LINK,
      telegramLink: process.env.NUXT_PUBLIC_TELEGRAM_LINK,
      youtubeLink: process.env.NUXT_PUBLIC_YOUTUBE_LINK,
      igLink: process.env.NUXT_PUBLIC_IG_LINK,
      bentoLink: process.env.NUXT_PUBLIC_BENTO_LINK,
      blobBaseUrl: process.env.NUXT_PUBLIC_BLOB_BASE_URL,
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-svgo"],
  css: ["@/assets/css/main.css"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: "#4778F5",
            primaryBackground: "#0A0F2914",
            secondaryBackground: "#F0F4FE",
            primaryText: "#14151A",
            secondaryText: "#0F132499",
            primaryBorder: "#E9EAEC",
            danger: "#E6483D",
          },
        },
      },
    },
  },
});

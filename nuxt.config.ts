export default defineNuxtConfig({
  runtimeConfig: {
    apiKeyBot: "",
    apiKeyAi: "",
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  // modules: ["@nuxtus/nuxt-localtunnel"],
  // localtunnel: {
  //   local_https: true,
  //   local_key: "./localhost.pem",
  //   local_cert: "./localhost.pem",
  //   local_ca: "./localhost.crt",
  // },
});

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return config.browserUrl
})

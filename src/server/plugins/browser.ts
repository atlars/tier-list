export default defineNitroPlugin(async (nitro) => {
  const logger = useLogger()

  // Initialize browswer connection on startup
  const browser = await useBrowser()
  if (!browser) {
    logger.fatal('Cannot connect to browswer instance')
  }

  nitro.hooks.hook('close', async () => {
    const logger = useLogger()
    logger.info('Closing the browswer instance')
    const browser = await useBrowser()
    if (browser) await browser.disconnect()
  })
})

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('close', async () => {
    const logger = useLogger()
    logger.info('Closing the browswer instance')
    const browser = await useBrowser()
    await browser.close()
  })
})

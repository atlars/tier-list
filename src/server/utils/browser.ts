import type { Browser } from 'puppeteer-core'
import puppeteer from 'puppeteer-core'
import { useRuntimeConfig } from '#imports'

let browser: Browser

export async function useBrowser(): Promise<Browser> {
  const config = useRuntimeConfig()
  const logger = useLogger()

  if (!browser || !browser.connected) {
    logger.info(`Connecting to browser at ${config.browserUrl}`)
    try {
      // Discover websocket endpoint
      const response = await fetch(`${config.browserUrl}/json/version`)
      const data = await response.json()
      const browserWSEndpoint = data.webSocketDebuggerUrl
      logger.info(`Discovered browswer ws endpoint ${browserWSEndpoint}`)

      browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
        acceptInsecureCerts: true,
      })
    } catch (e) {
      logger.error('Failed to connect to browser:', e)
    }
  }
  return browser
}

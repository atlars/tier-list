import { promises as dns } from 'node:dns'
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
      const browserUrl = new URL(config.browserUrl)
      // Chrome dev tools only accepts an ip address or localhost as the host
      // https://github.com/puppeteer/puppeteer/issues/2242#issuecomment-544219536
      const { address: browserIp } = await dns.lookup(browserUrl.hostname)
      // Discover websocket endpoint
      const response = await fetch(`${browserUrl.protocol}${browserIp}:${browserUrl.port}/json/version`)
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

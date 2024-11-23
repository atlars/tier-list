import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

let browser: Browser

export async function useBrowser(): Promise<Browser> {
  const logger = useLogger()
  if (!browser) {
    logger.info('Creating new browser instance')
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })
  }
  return browser
}

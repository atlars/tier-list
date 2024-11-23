import type { ConsolaInstance } from 'consola'
import { createConsola } from 'consola'

let logger: ConsolaInstance

export function useLogger(): ConsolaInstance {
  if (!logger) {
    logger = createConsola({
      level: 3,
      formatOptions: {
        date: true,
      },
    })
  }
  return logger
}

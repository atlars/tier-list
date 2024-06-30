import { z, type ZodType } from "zod"

export const tierElementSchema = z.object({
  id: z.string(),
  text: z.string().optional(),
  textColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  imageUrl: z.string().optional()
}) satisfies ZodType<TierElement>

export const tierRowSchema = z.object({
  id: z.string(),
  text: z.string(),
  textColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  elements: z.array(tierElementSchema)
}) satisfies ZodType<TierRow>

export const tierListSchema = z.object({
  id: z.string(),
  name: z.string(),
  tierRows: z.array(tierRowSchema),
  availableElements: z.array(tierElementSchema)
}) satisfies ZodType<TierList>
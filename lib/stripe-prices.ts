/**
 * Stripe Price IDs (live mode) — safe to import in both client and server components.
 */
export const PRICES = {
  single_monthly:      'price_1T7mK7FHuM8bVCysVeIyid7R',
  single_annual:       'price_1T7mKqFHuM8bVCys5VBKMv32',
  single_annual_value: 'price_1T9ENmFHuM8bVCyshJD6horO',  // $399/year
  family_monthly:      'price_1T7mTpFHuM8bVCysnIuOQ7TH',
  family_annual:       'price_1T7mUCFHuM8bVCysjh5nLTFi',
  school_monthly:      'price_1T7mVLFHuM8bVCysVf41Fur9',
  school_annual:       'price_1T7mVkFHuM8bVCysp3GTMmsl',
  per_course:          'price_1T9ELRFHuM8bVCys7LV8lfyb',   // $149 one-time
} as const

export type PriceKey = keyof typeof PRICES

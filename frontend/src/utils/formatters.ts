/**
 * Format a number as financial currency with comma separation and 2 decimal places.
 * Example: -131719.4 -> "-131,719.40"
 */
export const formatFinancial = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format an integer or percentage with commas.
 * Example: 88919081 -> "88,919,081"
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

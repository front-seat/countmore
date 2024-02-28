/** Format an integer, with appropriate commas. */
export const formatNumber = (n: number): string => n.toLocaleString();

/** Format a percentage, with `decimalPlaces` places. */
export const formatPercent = (n: number, decimalPlaces: number = 0): string => {
  const multiplier = Math.pow(10, decimalPlaces);
  return `${Math.round(n * 100 * multiplier) / multiplier}%`;
};

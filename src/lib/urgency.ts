/**
 * Deterministic urgency text generator for static builds.
 * Uses product name hash to consistently assign urgency messages.
 */

const urgencyMessages = [
  'Selling fast',
  'Popular pick',
  'Trending now',
  'Reader favorite',
  'Top rated',
];

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getUrgencyText(productName: string): string {
  const hash = simpleHash(productName);
  return urgencyMessages[hash % urgencyMessages.length];
}

export function getBuyCount(productName: string): number {
  const hash = simpleHash(productName);
  return 8 + (hash % 42);
}

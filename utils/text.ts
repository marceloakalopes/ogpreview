/**
 * Truncate text to a maximum length
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the text
 * @returns The truncated text
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}
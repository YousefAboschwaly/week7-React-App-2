/**
 * Truncates a given text to a specified maximum length and appends ellipsis if it exceeds the limit.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [max=50] - The maximum length of the text before truncation. Defaults to 50 if not provided.
 * @returns {string} - The truncated text with ellipsis appended if it exceeds the maximum length, otherwise the original text.
 */
export function textSlicer(text:string, max:number = 50) {
  if (text.length >= max) return `${text.slice(0, max)} ...`;
  return text;
}


/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

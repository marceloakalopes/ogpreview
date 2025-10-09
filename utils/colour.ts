import sharp from "sharp";

/**
 * Get the dominant colour of an image
 * @param image - The image to get the dominant colour of
 * @returns The dominant colour of the image
 */

export async function getDominantColor(image: Buffer) {
  const { data } = await sharp(image)
    .resize(1, 1, { fit: "fill" })
    .removeAlpha() 
    .raw()
    .toBuffer({ resolveWithObject: true });

  const [r, g, b] = data;
  return { r, g, b };
}

/**
 * Get the text color based on the dominant colour
 * @param r - The red value
 * @param g - The green value
 * @param b - The blue value
 * @returns The text color
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export async function getTextColor(r: number, g: number, b: number) {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128 ? "black" : "white";
}

/**
 * Normalize the tone of the dominant colour
 * @param r - The red value
 * @param g - The green value
 * @param b - The blue value
 * @returns The normalized tone
 */
export async function normalizeTone({ r, g, b }: { r: number; g: number; b: number }) {
    // Normalize to 0–1
    let rf = r / 255;
    let gf = g / 255;
    let bf = b / 255;
  
    // Relative luminance
    const luminance = 0.2126 * rf + 0.7152 * gf + 0.0722 * bf;
  
    let factor = 1.0;
    let saturation = 1.0;
  
    if (luminance > 0.75) {
      factor = 0.8;
      saturation = 0.9;
    } else if (luminance < 0.25) {
      factor = 1.2;
      saturation = 0.9;
    }
  
    rf = Math.min(1, Math.max(0, rf * factor));
    gf = Math.min(1, Math.max(0, gf * factor));
    bf = Math.min(1, Math.max(0, bf * factor));
  
    const avg = (rf + gf + bf) / 3;
    rf = avg + (rf - avg) * saturation;
    gf = avg + (gf - avg) * saturation;
    bf = avg + (bf - avg) * saturation;
  
    return {
      r: Math.round(rf * 255),
      g: Math.round(gf * 255),
      b: Math.round(bf * 255),
    };
  }
  

/**
 * Creates a tone-adjusted subtext color similar to iOS link previews.
 * - If the main text is dark, the subtext will be slightly darker than the background.
 * - If the main text is light, the subtext will be slightly lighter than the background.
 * @param bg - Background color (0–255)
 * @param mainText - Chosen primary text color
 * @returns CSS RGB string
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export async function getSubTextColor(bg: { r: number, g: number, b: number }, mainText: "black" | "white") {
    const adjust = (c: number, amount: number) =>
      Math.max(0, Math.min(255, c + amount)); // clamp to [0, 255]
  
    const toneShift = mainText === 'white' ? 40 : -40; // If background is dark -> lighten it; if it's light -> darken it
  
    const r = adjust(bg.r, toneShift);
    const g = adjust(bg.g, toneShift);
    const b = adjust(bg.b, toneShift);
  
    return `rgb(${r}, ${g}, ${b})`;
  }
  
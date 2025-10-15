import sharp from "sharp";

export type RGB = {
  r: number;
  g: number;
  b: number;
};

const srgbToLinear = (v: number) => {
  const x = v / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};

const linearToSrgb = (v: number) =>
  Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));

const relLuminance = (r: number, g: number, b: number) => {
  const R = srgbToLinear(r), G = srgbToLinear(g), B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const contrast = (L1: number, L2: number) => {
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
};

const blendToward = (c: number, t: number, toward: 0 | 1) =>
  toward === 1 ? c + (1 - c) * t : c * (1 - t);

const toLin = (rgb: {r:number;g:number;b:number}) =>
  ({ r: srgbToLinear(rgb.r), g: srgbToLinear(rgb.g), b: srgbToLinear(rgb.b) });

const fromLin = (lin: {r:number;g:number;b:number}) =>
  ({ r: linearToSrgb(lin.r), g: linearToSrgb(lin.g), b: linearToSrgb(lin.b) });

/**
 * Get the dominant colour of an image
 * @param image - The image to get the dominant colour of
 * @returns The dominant colour of the image
 */

export async function getDominantColor(image: Buffer): Promise<RGB> {
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
export function getTextColor(r: number, g: number, b: number): "black" | "white" {
  const Lbg = relLuminance(r, g, b);
  const cBlack = contrast(Lbg, 0); // black luminance = 0
  const cWhite = contrast(1, Lbg); // white luminance = 1
  return cBlack >= cWhite ? "black" : "white";
}

/**
 * Normalize the tone of the dominant colour
 * @param r - The red value
 * @param g - The green value
 * @param b - The blue value
 * @returns The normalized tone
 */
export function normalizeTone({ r, g, b }: { r: number; g: number; b: number }): RGB {
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
export function getSubTextColor(
  bg: { r: number; g: number; b: number },
  mainText: "black" | "white",
): { r: number; g: number; b: number } {
  if (mainText === "black") {
    const hsl = rgbToHsl(bg.r, bg.g, bg.b);
    const darkerHsl = { h: hsl.h, s: hsl.s, l: hsl.l * 0.5 };
    return hslToRgb(darkerHsl.h, darkerHsl.s, darkerHsl.l);
  } else {
    const hsl = rgbToHsl(bg.r, bg.g, bg.b);
    const lighterHsl = { h: hsl.h, s: hsl.s, l: Math.min(1, hsl.l + (1 - hsl.l) * 0.5) };
    return hslToRgb(lighterHsl.h, lighterHsl.s, lighterHsl.l);
  }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
  
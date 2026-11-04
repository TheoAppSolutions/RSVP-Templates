export type ColorPalette = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;

const SWATCH_DEFINITIONS = [
  { name: "Sunshine", shade: 200 },
  { name: "Blush", shade: 300 },
  { name: "Lemon", shade: 400 },
  { name: "Tangerine", shade: 500 },
  { name: "Plum", shade: 700 },
] as const;

export function createSwatches(colors: ColorPalette) {
  return SWATCH_DEFINITIONS.map(({ name, shade }) => ({ name, color: colors[shade] }));
}

export const ATTIRE = [
  {
    label: "Party looks",
    note: "Colorful shirts, smart trousers, or a relaxed suit with a little personality.",
    image: "/attire-men.webp",
    alt: "Examples of colorful semi-formal party outfits",
  },
  {
    label: "Festive dress",
    note: "A midi, cocktail dress, or polished jumpsuit in a joyful color.",
    image: "/attire-women.webp",
    alt: "Examples of colorful semi-formal dresses",
  },
] as const;

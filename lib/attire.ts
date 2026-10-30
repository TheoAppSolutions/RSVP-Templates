export type ColorPalette = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;

const SWATCH_DEFINITIONS = [
  { name: "Mist", shade: 200 },
  { name: "Powder", shade: 300 },
  { name: "Dusty Blue", shade: 400 },
  { name: "Steel", shade: 500 },
  { name: "Slate", shade: 700 },
] as const;

export function createSwatches(colors: ColorPalette) {
  return SWATCH_DEFINITIONS.map(({ name, shade }) => ({ name, color: colors[shade] }));
}

export const ATTIRE = [
  {
    label: "Gentlemen",
    note: "Suit and tie, or a barong, paired with dress shoes.",
    image: "/attire-men.webp",
    alt: "Three examples of semi-formal menswear, including a barong Tagalog",
  },
  {
    label: "Ladies",
    note: "Midi or cocktail dress, with heels or dressy flats.",
    image: "/attire-women.webp",
    alt: "Three examples of semi-formal dresses",
  },
] as const;

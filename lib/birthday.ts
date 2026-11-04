export const BIRTHDAY_THEMES = {
  1: {
    kicker: "A tiny milestone, a huge celebration",
    age: "ONE",
    title: "Lemuel turns one",
    invite: "Join us for a bright, playful afternoon as our little birthday star takes his first trip around the sun.",
    palette: "Sunshine · Sky · Sprinkles",
  },
  2: {
    kicker: "An invitation to celebrate",
    age: "18",
    title: "Lemuel’s 18th birthday debut",
    invite: "An evening of new beginnings, beautiful memories, and the people who have made every chapter worth celebrating.",
    palette: "Plum · Blush · Champagne",
  },
  3: {
    kicker: "A life well lived, a night well loved",
    age: "60",
    title: "Lemuel’s 60th birthday",
    invite: "Come raise a glass to six decades of stories, laughter, friendship, and the joy Lemuel brings to every room.",
    palette: "Citrus · Terracotta · Ink",
  },
} as const;

export type BirthdayVariant = keyof typeof BIRTHDAY_THEMES;

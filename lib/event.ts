export type Venue = { label: string; name: string; address: string };

export const EVENT = {
  honoree: "Lemuel",
  celebrant: "Lemuel",
  age: "birthday",
  initials: "L",
  dateLong: "Monday, December 21, 2026",
  dateShort: "12 · 21 · 2026",
  time: "5:00 PM",
  dateISO: "2026-12-21T17:00:00+08:00",
  rsvpBy: "December 10, 2026",
  theme: "Birthday Celebration",
  color: "Sunset & Confetti",
  dressCode: "Colorful semi-formal",
  reception: { label: "Birthday celebration", name: "Hotel Alejandro", address: "Tacloban City" },
};

export const VENUES = [EVENT.reception] as const;
export const EVENT_TIMESTAMP = new Date(EVENT.dateISO).getTime();

export const MEDIA = {
  tagline: "Come celebrate a new chapter, a full heart, and a very special birthday with Lemuel.",
  hero: "/hero.webp",
  music: { src: "/music/background_music.mp3", volume: 0.5 },
  gallery: Array.from({ length: 8 }, (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.webp`),
};

export const GIFT = {
  title: "A little gift",
  message: "Your presence is the best gift. If you would like to make Lemuel’s birthday extra special, a small monetary gift toward his next adventure would be warmly appreciated.",
  qr: "/gift-qr.webp" as string | null,
  qrLabel: "Birthday gift QR",
};

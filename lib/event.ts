export type Venue = { label: string; name: string; address: string };

export const EVENT = {
  honoree: "Raymund & Vanessa",
  groom: "Raymund Gumba",
  bride: "Vanessa Navera",
  initials: "R & V",
  dateLong: "Monday, December 21, 2026",
  dateShort: "12 · 21 · 2026",
  time: "1:30 PM",
  dateISO: "2026-12-21T13:30:00+08:00",
  theme: "Minimalist",
  color: "Dusty Blue",
  dressCode: "Semi-formal",
  ceremony: { label: "Ceremony", name: "Sacred Heart Church", address: "Tacloban City" },
  reception: { label: "Reception", name: "Hotel Alejandro Roof Deck", address: "Tacloban City" },
};

export const VENUES = [EVENT.ceremony, EVENT.reception] as const;
export const EVENT_TIMESTAMP = new Date(EVENT.dateISO).getTime();

export const MEDIA = {
  tagline: "Two hearts, one beautiful beginning. Join us as we say “I do.”",
  hero: "/hero.webp",
  music: { src: "/music/background_music.mp3", volume: 0.5 },
  gallery: Array.from({ length: 8 }, (_, i) => `/gallery/${String(i + 1).padStart(2, "0")}.webp`),
};

export const GIFT = {
  title: "Gift Policy",
  message: "Your presence at our wedding is the greatest gift of all. Should you wish to bless us further, a monetary gift would be warmly appreciated as we begin our life together.",
  qr: "/gift-qr.webp" as string | null,
  qrLabel: "Gift QR Code",
};

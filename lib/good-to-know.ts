import { EVENT } from "@/lib/event";

export const GOOD_TO_KNOW_NOTES = [
  {
    eyebrow: "Guest list",
    title: "May I bring a guest?",
    template3Title: "May I bring a guest?",
    body: "Please check your invitation for the number of seats reserved for your party. We are keeping the celebration cozy so every guest feels included.",
  },
  {
    eyebrow: "A little ones note",
    title: "Are children welcome?",
    template3Title: "Are children welcome?",
    body: "Absolutely. Little guests are welcome to join the fun, especially for Lemuel’s first birthday celebration.",
  },
  {
    eyebrow: "Gift guide",
    title: "What about gifts?",
    template3Title: "What about gifts?",
    body: "Your presence is more than enough. If you would like to give, a small contribution toward Lemuel’s next adventure is appreciated.",
  },
  {
    eyebrow: "Privacy notice",
    title: "May I take photos?",
    template3Title: "May I take photos?",
    body: "Please do! Capture the cake, the candles, and the happy chaos. Tag Lemuel’s family so we can relive the day together.",
  },
  {
    eyebrow: "Time observance",
    title: "When should I arrive?",
    template3Title: "When should I arrive?",
    body: "Please arrive 15 minutes early so you have time to say hello, find your seat, and be ready for the birthday program.",
  },
  {
    eyebrow: "Occasion focus",
    title: "Come ready to celebrate",
    template3Title: "Any other requests?",
    body: `Bring your appetite, your best birthday energy, and a warm wish for ${EVENT.honoree}.`,
  },
] as const;

import { EVENT } from "@/lib/event";

export const GOOD_TO_KNOW_NOTES = [
  {
    eyebrow: "Guest list",
    title: "May I bring a plus-one?",
    template3Title: "May I bring a plus-one?",
    body: "We have intentionally kept our guest list intimate so that we can celebrate with the people closest to us. Please join us only with the guest named on your invitation.",
  },
  {
    eyebrow: "A little ones note",
    title: "Can children attend?",
    template3Title: "Can children attend?",
    body: "We love your little ones, but our celebration will be adults-only, with the exception of immediate family children. Thank you for understanding and helping us keep the day relaxed and intimate.",
  },
  {
    eyebrow: "Gift guide",
    title: "Your presence is enough",
    template3Title: "What about gifts?",
    body: "Having you with us is the greatest gift. If you would like to bless us as we begin married life, a monetary gift would be warmly appreciated—but please know that your presence means the most.",
  },
  {
    eyebrow: "Privacy notice",
    title: "Be fully present with us",
    template3Title: "May I take photos?",
    body: "Our ceremony will be unplugged. Kindly keep phones and cameras tucked away during the ceremony, and please wait for us to share first before posting wedding photos online.",
  },
  {
    eyebrow: "Time observance",
    title: "We will begin on time",
    template3Title: "When should I arrive?",
    body: "We are grateful to everyone traveling to celebrate with us. Please arrive early enough to be seated before the ceremony begins, so we can honor the day’s timeline together.",
  },
  {
    eyebrow: "Occasion focus",
    title: "Today is about the couple",
    template3Title: "Any other requests?",
    body: `Please save proposals, pregnancy announcements, and other major announcements for another occasion. Today is dedicated to celebrating ${EVENT.honoree}.`,
  },
] as const;

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({ src: "../fonts/cormorant-garamond-latin.woff2", weight: "300 600", variable: "--font-serif" });
const sans = localFont({ src: "../fonts/jost-latin.woff2", weight: "300 500", variable: "--font-sans" });
const script = localFont({ src: "../fonts/dancing-script-latin.woff2", variable: "--font-script" });

export const metadata: Metadata = {
  title: "Raymund & Vanessa — Wedding RSVP templates",
  description: "Explore three invitation designs for Raymund and Vanessa's wedding.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable} ${script.variable}`}>{children}</body></html>;
}

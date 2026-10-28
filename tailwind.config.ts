import type { Config } from "tailwindcss";

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const dusty = Object.fromEntries(shades.map((shade) => [shade, `rgb(var(--dusty-${shade}) / <alpha-value>)`]));

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./templates/**/*.{ts,tsx}"],
  theme: { extend: { colors: { dusty }, fontFamily: { serif: ["var(--font-serif)"], sans: ["var(--font-sans)"], script: ["var(--font-script)"] } } },
  plugins: [],
};
export default config;

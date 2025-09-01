// app/fonts.ts
import localFont from "next/font/local";

export const rightGroteskTight = localFont({
  src: [{ path: "./fonts/RightGrotesk-TightMedium.otf", weight: "500", style: "normal" }],
  variable: "--font-rightgrotesk-tight",
  display: "swap",
  preload: true,
});
